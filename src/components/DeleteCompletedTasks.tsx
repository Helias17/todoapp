import React from 'react';
import { ITodoItem } from '../interfaces';

type DeleteCompletedTasksProps = {
  todoList: ITodoItem[];
  onDeleteAllCompleted(): void
}

const DeleteCompletedTasks: React.FC<DeleteCompletedTasksProps> = ({ todoList, onDeleteAllCompleted }) => {

  const fulfilledTasks = todoList.filter(todoItem => todoItem.completed === true);
  console.log(fulfilledTasks.length);

  if (fulfilledTasks.length < 2) return null;

  return (
    <div>
      <button className="todoInputBtn" onClick={onDeleteAllCompleted}>
        Delete completed tasks
      </button>
    </div>
  )
}

export default DeleteCompletedTasks;