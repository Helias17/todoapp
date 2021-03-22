import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import DeleteCompletedTasks from './components/DeleteCompletedTasks';
import { ITodoItem } from './interfaces';
import Stats from './components/Stats';

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
        } else {
          todoItem.completed = true;
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

  const handleDeleteCompletedTasks = () => {
    const needToRemove = window.confirm('Are you sure to delete all completed tasks?');
    if (needToRemove) setTodoList(prev => prev.filter(todoItem => todoItem.completed !== true));
  }

  return (
    <div className="todoApp">
      <h1 className="todoTitle">My task list</h1>
      {!!todoList.length && (
        <header className="todoHeader">
          <Stats todoList={todoList} />
          <DeleteCompletedTasks
            onDeleteAllCompleted={handleDeleteCompletedTasks}
            todoList={todoList}
          />
        </header>
      )}
      <TodoList
        todoList={todoList}
        onToggle={handleToggleTaskItem}
        onDelete={handleDeleteTaskItem}
      />
      <AddTask onAdd={handleAdd} />
    </div>
  );
}

export default App;
