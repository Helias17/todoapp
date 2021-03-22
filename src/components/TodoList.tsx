import React from 'react';
import { ITodoItem } from '../interfaces';

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

  return (
    <ul className="todoList">
      {todoList.map(todoItem => (
        <li className="todoListItem" key={todoItem.id}>
          <label className={todoItem.completed ? itemClassName + 'todoItemLabel_fulfilled' : itemClassName}>
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