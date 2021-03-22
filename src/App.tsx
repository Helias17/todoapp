import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import { ITodoItem } from './interfaces';

const App: React.FC = () => {

  const [todoList, setTodoList] = useState<ITodoItem[]>([]);

  useEffect(() => {
    const savedTaskList: ITodoItem[] = JSON.parse(localStorage.getItem('todoAppTaskList') || '[]');
    setTodoList(savedTaskList);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoAppTaskList', JSON.stringify(todoList));
  }, [todoList])

  const handleAdd = (input: string) => {
    const newTodoItem: ITodoItem = {
      title: input,
      id: Date.now(),
      completed: false
    };
    setTodoList(prev => [newTodoItem, ...prev]);
  }

  const handleToggleTaskItem = (id: number) => {
    const updatedTodoList: ITodoItem[] = todoList.map(todoItem => {
      if (todoItem.id === id) {
        if (todoItem.completed) {
          todoItem.completed = false;
          console.log('set true');
        } else {
          todoItem.completed = true;
          console.log('set false');
        }
      }
      return todoItem;
    });
    setTodoList(updatedTodoList);
  }

  const handleDeleteTaskItem = (id: number) => {
    const needToRemove = window.confirm('Are you sure to delete this task?');
    if (needToRemove) setTodoList(prev => prev.filter(todoItem => todoItem.id !== id));

  }

  return (
    <div className="todoApp">
      <h1 className="todoHeader">My task list</h1>
      <TodoList
        todoList={todoList}
        onToggle={handleToggleTaskItem}
        onDelete={handleDeleteTaskItem} />
      <AddTask onAdd={handleAdd} />
    </div>
  );
}

export default App;
