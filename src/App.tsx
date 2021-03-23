import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import DeleteCompletedTasks from './components/DeleteCompletedTasks';
import { ITodoItem } from './interfaces';
import Stats from './components/Stats';
import replaceSpecialChars from './replaceSpecialChars';

const App: React.FC = () => {

  const [todoList, setTodoList] = useState<ITodoItem[]>([]);

  useEffect(() => {
    const savedTaskList: ITodoItem[] = JSON.parse(localStorage.getItem('todoAppTaskList') || '[]');
    setTodoList(savedTaskList);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoAppTaskList', JSON.stringify(todoList));
  }, [todoList])

  const handleAdd = (input: string, priority: number) => {

    const newTodoItem: ITodoItem = {
      title: replaceSpecialChars(input),
      id: Date.now(),
      completed: false,
      priority
    };
    setTodoList(prev => [newTodoItem, ...prev]);
  }

  const handleToggleTaskItem = (id: number) => {
    const updatedTodoList: ITodoItem[] = todoList.map(todoItem => {
      if (todoItem.id === id) {
        todoItem.completed = !todoItem.completed;
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
    if (needToRemove) setTodoList(prev => prev.filter(todoItem => !todoItem.completed));
  }

  return (
    <div className="todoApp">
      <header className="pageHeader">
        <h1 className="todoTitle animate__animated animate__bounceInDown">My task list</h1>
        {!!todoList.length && (
          <div className="todoHeader">
            <Stats todoList={todoList} />
            <DeleteCompletedTasks
              onDeleteAllCompleted={handleDeleteCompletedTasks}
              todoList={todoList}
            />
          </div>
        )}
      </header>
      <main className="todoBody">
        <TodoList
          todoList={todoList}
          onToggle={handleToggleTaskItem}
          onDelete={handleDeleteTaskItem}
        />
        <AddTask onAdd={handleAdd} />
      </main>
    </div>
  );
}

export default App;
