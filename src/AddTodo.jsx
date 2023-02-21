import { useRef, useContext } from 'react';
import { TodoContext } from './TodoProvider';

function AddTodo() {
  const inputRef = useRef();
  const { todosActionDispatch } = useContext(TodoContext);

  const submitHandler = (e) => {
    e.preventDefault();
    todosActionDispatch({ type: 'add', payload: { task: inputRef.current.value } });
    inputRef.current.value = '';
  };

  return (
    <form className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center rounded-md bg-white dark:bg-dark-very-dark-desaturated-blue" onSubmit={submitHandler}>
      <span className="block w-5 h-5 md:w-6 md:h-6 mr-2 rounded-full border-2 border-light-very-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2"></span>
      <input className="w-full block text-sm md:text-lg bg-transparent pt-1 placeholder:text-light-dark-grayish-blue dark:placeholder:text-dark-dark-grayish-blue text-light-very-dark-grayish-blue dark:text-dark-light-grayish-blue-1" type="text" ref={inputRef} placeholder="Create a new todo..." />
    </form>
  );
}

export default AddTodo;
