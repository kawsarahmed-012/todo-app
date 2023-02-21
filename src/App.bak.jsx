import { useRef, useState } from 'react';

function App() {
  const [todoItems, setTodoItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [startPos, setStartPos] = useState(null);

  const todos = useRef();

  function dragEnterHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e) {
    const itemBoundaryPos = Math.abs(Math.ceil((e.clientY - todos.current.getBoundingClientRect().top - 12) / 40));
    let endPos;

    if (itemBoundaryPos < startPos) endPos = itemBoundaryPos;
    else if (itemBoundaryPos - 1 > startPos) endPos = itemBoundaryPos - 1;
    else return;

    setTodoItems((curr) => {
      curr = structuredClone(curr);
      const toMove = curr.splice(startPos, 1);

      curr.splice(endPos, 0, toMove);
      return curr;
    });
  }

  return (
    <>
      <div ref={todos} onDrop={dropHandler} onDragOver={dragEnterHandler}>
        {todoItems.map((todo, index) => (
          <p className="my-4 first:mt-0" key={index} draggable onDragStart={() => setStartPos(index)} onDragEnd={() => setStartPos(null)}>
            {todo}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
