import React from 'react';
import { ITodoItem } from '../interfaces';
import { priority } from './TaskPriority';

type TodoListProps = {
  todoList: ITodoItem[];
  onToggle(id: number): void;
  onDelete: (id: number) => void; // alternative type syntax
}

const TodoList: React.FC<TodoListProps> = ({ todoList, onDelete, onToggle }) => {

  if (!todoList.length) return (
    <ul className="todoList">
      <li className="todoListItem">No tasks at the moment. You can add first task.</li>
    </ul>
  )

  const itemClassName = 'todoItemLabel ';

  todoList.sort((x, y) => {
    return (y.completed === x.completed) ? 0 : y.completed ? -1 : 1;
  })

  return (
    <ul className="todoList">
      {todoList.map(todoItem => (
        <li className="todoListItem" key={todoItem.id}>
          <label className={todoItem.completed ? `${itemClassName} todoItemLabel_size${todoItem.priority} todoItemLabel_fulfilled` : `${itemClassName} todoItemLabel_size${todoItem.priority}`}
            title={`Importance: ${priority[todoItem.priority].name}`}
          >
            <input type="checkbox" checked={todoItem.completed} className="todoItemCheckbox"
              onChange={onToggle.bind(null, todoItem.id)} />
            <span>{todoItem.title}</span>
          </label>
          <div className="todoItemDel" onClick={() => onDelete(todoItem.id)}></div>
        </li>
      ))}

    </ul>
  );
}

export default TodoList;