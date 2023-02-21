import { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext();

const reducer = (state, { type, payload }) => {
  let workingState = structuredClone(state);
  let index;

  switch (type) {
    case 'add':
      workingState.push({
        id: uuidv4(),
        task: payload.task,
        status: 'active',
      });
      break;

    case 'toggle':
      index = workingState.findIndex((todo) => todo.id === payload.id);
      workingState[index].status = workingState[index].status === 'active' ? 'completed' : 'active';
      break;

    case 'remove':
      index = workingState.findIndex((todo) => todo.id === payload.id);
      workingState.splice(index, 1);
      break;

    case 'reorder':
      const toMove = workingState.splice(payload.startPos, 1);
      workingState.splice(payload.endPos, 0, ...toMove);
      break;

    case 'clear':
      return workingState.filter((todo) => todo.status === 'active');
  }

  localStorage.setItem('todos', JSON.stringify(workingState));
  return workingState;
};

function TodoProvider({ children } = props) {
  const defaultTodos = [
    { id: '84a1c1bc-234f-44a9-9bf1-51b2f615e809', task: 'create new todo adding feature', status: 'completed' },
    { id: '813366c7-8e3a-46fd-9d85-f54dfdc4e4e7', task: 'view list todo', status: 'completed' },
    { id: '1892819c-0cae-48f3-bf6f-21c33eae3fd5', task: 'add toggle active status todo button', status: 'completed' },
    { id: 'f27b47d9-c19e-4f7d-921d-c7eb880b6efc', task: 'add remove todo button', status: 'completed' },
    { id: '996e5bfc-a919-4b2c-9b4d-ecd99eb0095e', task: 'add clear completed button', status: 'completed' },
    { id: '67f9296b-a25d-4258-b42b-62b2e41bdc8a', task: 'add sorting method', status: 'completed' },
    { id: '8f5cbcf6-cfd6-44df-a000-5cae2c5f2926', task: 'add local storage support', status: 'completed' },
    { id: '61fe5265-88a6-4331-ba29-36badcee14a6', task: 'add drag and drop feature', status: 'active' },
  ];

  const [todos, todosActionDispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')) || defaultTodos);

  return <TodoContext.Provider value={{ todos, todosActionDispatch }}>{children}</TodoContext.Provider>;
}

export default TodoProvider;
