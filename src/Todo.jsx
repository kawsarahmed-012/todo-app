import { CheckIcon, CrossIcon } from './assets';

function Todo({ todo: { id, task, status }, todosActionDispatch, setStartPos, index } = props) {
  const toggleHandler = () => {
    todosActionDispatch({ type: 'toggle', payload: { id } });
  };
  const removeHandler = () => {
    todosActionDispatch({ type: 'remove', payload: { id } });
  };

  return (
    <li className="flex items-center px-4 py-3 border-b-[1px] border-light-very-light-grayish-blue dark:border-dark-very-dark-grayish-blue-2" draggable onDragStart={() => setStartPos(index)} onDragEnd={() => setStartPos(null)}>
      <button className="check-icon isolate relative aspect-square m-[2px] mr-2 w-5 h-5 flex justify-center items-center rounded-full bg-white dark:bg-dark-very-dark-desaturated-blue data-[completed=true]:stroke-white" onClick={toggleHandler} data-completed={status === 'completed'}>
        <CheckIcon />
        <span className="hidden">mark as done</span>
      </button>
      <p onClick={toggleHandler} className="mr-auto text-xs sm:text-base md:text-lg text-light-very-dark-grayish-blue data-[completed=true]:text-light-dark-grayish-blue dark:text-dark-light-grayish-blue-1 dark:data-[completed=true]:text-dark-dark-grayish-blue capitalize overflow-x-hidden cursor-pointer data-[completed=true]:line-through" data-completed={status === 'completed'}>
        {task}
      </p>
      <button className="scale-75" onClick={removeHandler}>
        <CrossIcon />
      </button>
    </li>
  );
}

export default Todo;
