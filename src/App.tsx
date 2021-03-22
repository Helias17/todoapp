import React, { useState } from 'react';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import { ITodoItem } from './interfaces';

const App: React.FC = () => {

  const [todoList, setTodoList] = useState<ITodoItem[]>([]);

  const handleAdd = (input: string) => {
    const newTodoItem: ITodoItem = {
      title: input,
      id: Date.now(),
      completed: false
    };
    setTodoList(prev => [newTodoItem, ...prev]);
  }

  return (
    <div className="todoApp">
      <h1 className="todoHeader">My task list</h1>
      <TodoList todoList={todoList} />
      <AddTask onAdd={handleAdd} />
    </div>
  );
}

export default App;
