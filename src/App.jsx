import { useState } from 'react';
import AddTodo from './AddTodo';
import TodoProvider from './TodoProvider';
import TodosList from './TodosList';
import { SunIcon, MoonIcon } from './assets';

function App() {
  const [mode, setMode] = useState('dark');
  if (mode === 'dark') document.querySelector('html').classList.add('dark');
  else document.querySelector('html').classList.remove('dark');

  return (
    <main className="w-10/12 pt-12 md:pt-16 mx-auto max-w-xl">
      <header className="mb-6 md:mb-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl text-white font-bold tracking-[0.2em]">TODO</h1>
        <button className="" onClick={() => setMode((curr) => (curr === 'dark' ? 'light' : 'dark'))}>
          {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>
      <div>
        <TodoProvider>
          <AddTodo />
          <TodosList />
        </TodoProvider>
      </div>
    </main>
  );
}

export default App;
