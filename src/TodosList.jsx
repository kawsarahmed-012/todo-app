import { useContext, useState, useRef } from 'react';
import { TodoContext } from './TodoProvider';
import Todo from './Todo';

function TodosList() {
  const todosRef = useRef();
  const [startPos, setStartPos] = useState(null);
  const { todos, todosActionDispatch } = useContext(TodoContext);
  const [filter, setFilter] = useState('');

  const clearHandler = () => {
    todosActionDispatch({ type: 'clear' });
  };

  function dragEnterHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e) {
    const itemBoundaryPos = Math.abs(Math.ceil((e.clientY - todosRef.current.getBoundingClientRect().top - 21) / 41));
    let endPos;

    if (itemBoundaryPos < startPos) endPos = itemBoundaryPos;
    else if (itemBoundaryPos - 1 > startPos) endPos = itemBoundaryPos - 1;
    else return;
    todosActionDispatch({ type: 'reorder', payload: { startPos, endPos } });
  }

  return (
    <>
      <div className="bg-white rounded-md my-4 w-full dark:bg-dark-very-dark-desaturated-blue">
        <ul ref={todosRef} onDrop={dropHandler} onDragOver={dragEnterHandler}>
          {todos
            .filter((todo) => (filter ? todo.status === filter : true))
            .map((todo, index) => (
              <Todo index={index} key={todo.id} todo={todo} todosActionDispatch={todosActionDispatch} setStartPos={setStartPos} />
            ))}
        </ul>
        <div className="relative flex justify-between items-center px-4 py-3 text-light-dark-grayish-blue text-sm md:text-base dark:text-dark-dark-grayish-blue">
          <p>
            {`${todos.reduce((acc, curr) => {
              if (curr.status === 'active') return acc + 1;
              else return acc;
            }, 0)} items left`}
          </p>
          <div className="sort-items flex gap-6 justify-center rounded-md bg-white dark:bg-dark-very-dark-desaturated-blue py-3 md:py-0 text-light-dark-grayish-blue font-bold text-sm md:text-base dark:text-dark-dark-grayish-blue">
            <button className="hover:text-bright-blue" onClick={() => setFilter('')}>
              All
            </button>
            <button className="hover:text-bright-blue" onClick={() => setFilter('active')}>
              Active
            </button>
            <button className="hover:text-bright-blue" onClick={() => setFilter('completed')}>
              Completed
            </button>
          </div>
          <button onClick={clearHandler}>Clear Completed</button>
        </div>
      </div>
    </>
  );
}

export default TodosList;
