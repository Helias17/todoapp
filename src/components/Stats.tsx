import React from 'react';
import { ITodoItem } from '../interfaces';

type StatsProps = {
  todoList: ITodoItem[];
}

const Stats: React.FC<StatsProps> = ({ todoList }) => {

  const fulfilledTasks = todoList.filter(todoItem => todoItem.completed === true)

  return (
    <ul className="todoHeaderStats">
      {todoList.length ? <li>Total tasks: {todoList.length}</li> : ''}
      {todoList.length ? <li>Fulfilled: {fulfilledTasks.length}</li> : ''}
      {todoList.length ? <li>Waiting: {todoList.length - fulfilledTasks.length}</li> : ''}


    </ul >
  );
}

export default Stats;