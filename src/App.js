import { useState, useEffect, createContext } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskList from "./components/TaskList";

export const DeleteHandlerContext  = createContext()

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // getting data from the server
    fetchingData();

  }, []);

  // fetching data
  const fetchingData = async () => {
    try{
      const res = await fetch('https://lively-juniper-breeze.glitch.me/tasks')
      if(!res.ok) throw new Error('Something went wrong');
      const data = await res.json();
      setTasks(data)
      setLoading(false)
    } catch (error) {
      setError(error.message)
    }
  };
  // delete event
  const handleDelete = (id) => {
    // delete data
    deleteData(id)
    // set updated task
    setTasks(
      tasks.filter(task => id !== task.id)
    );
  };

  const deleteData = async(id) => {
    await fetch(`https://lively-juniper-breeze.glitch.me/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
  }
  return (
    <div className="wrapper bg-gradient-to-t from-gray-900 to-teal-900 min-h-screen text-xl text-gray-100 flex flex-col py-10">
      <DeleteHandlerContext.Provider value={handleDelete}>
        <Header></Header>
        <AddTask tasks={tasks} setTasks={setTasks}></AddTask>
        <TaskList tasks={tasks}></TaskList>
        <Footer></Footer>
      </DeleteHandlerContext.Provider>
    </div>
  );
}

export default App;
