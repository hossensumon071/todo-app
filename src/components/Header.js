import { HiDocumentText } from "react-icons/hi";

const Header = () => {
  return (
    <div className='header'>
      <h1 className='uppercase font-semibold text-teal-500 tracking-wider flex gap-2 items-center'>
        <span>
          <HiDocumentText/>
        </span>
        <span>Todo App</span>
      </h1>
    </div>
  );
};

export default Header;