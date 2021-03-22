import React from 'react';
import { ITodoItem } from '../interfaces';

type TodoListProps = {
  todoList: ITodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todoList }) => {

  return (
    <ul className="todoList">
      {todoList.map(todoItem => (
        <li className="todoListItem" key={todoItem.id}>
          <label className="todoItemLabel">
            <input type="checkbox" checked={todoItem.completed} className="todoItemCheckbox" />
            <span>{todoItem.title}</span>
          </label>
          <div className="todoItemDel"></div>
        </li>
      ))}

    </ul>
  );
}

export default TodoList;