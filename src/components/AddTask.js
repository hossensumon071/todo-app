import { useRef, useState } from "react";

const AddTask = ({tasks , setTasks}) => {
  const [task, setTask] = useState('');
  const inputRef = useRef(null)

  // add task handle event
  const addTaskHandler = (e) => {
    e.preventDefault();
    taskPosting(task)
    // post task into server
    inputRef.current.blur();
    setTask("");
  }

  // task posting
  const taskPosting = async(text) => {
    const res = await fetch(
      'https://lively-juniper-breeze.glitch.me/tasks', {
       method: 'POST',
       headers: {
        "content-type": "application/json"
       },
       body: JSON.stringify({ text })
      });

      const data = await res.json();
      // real time data updation 
      setTasks([...tasks, data])
  };
  return (
    <form className="bg-gray-900 container mx-auto flex justify-between p-10" onSubmit={addTaskHandler}>
      <input
       ref={inputRef}
       value={task}
       onChange={(e)=>setTask(e.target.value)}
       required
       type="text"
       placeholder="What things to do?" 
       className='bg-transparent outline-none border-b-2 py-2 px-5 focus:border-teal-600 border-gray-400'
       />
      <button
       type="submit"
       className="bg-teal-900/30 py-2 px-5 border-2 border-teal-500 rounded text-teal-500 hover:bg-teal-500 hover:text-gray-900 duration-300">
        Add Task
      </button>
    </form>
  );
};

export default AddTask;