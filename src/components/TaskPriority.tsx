import React, { useState } from 'react';
import { Priority, TaskPriorityType } from '../interfaces'


export const priority: Priority[] = [
  { name: 'Low', selected: false },
  { name: 'Medium', selected: true },
  { name: 'High', selected: false },
];

const TaskPriority: React.FC<TaskPriorityType> = ({ onPriorityChange }) => {

  const [radioState, setRadioState] = useState(priority);

  const handleChange = (arrIndex: number) => {

    const updatedRadioState: Priority[] = [...radioState];

    updatedRadioState.forEach((radioItem, index) => {
      radioItem.selected = index === arrIndex ? true : false;
    })

    setRadioState(updatedRadioState);
    onPriorityChange(arrIndex);
  }

  return (
    <div className="taskPriority animate__animated animate__bounceInDown">
      <p className="taskPriority__title">Task priority:</p>
      {radioState.map((radioItem, index) => <div key={index}>
        <input type="radio" name="priority" className="taskPriority__input"
          checked={radioItem.selected}
          id={radioItem.name.toLowerCase()}
          onChange={handleChange.bind(null, index)}
        />
        <label htmlFor={radioItem.name.toLowerCase()}
          className="taskPriority__label">
          {radioItem.name}
        </label>
      </div>)}
    </div>
  );
}

export default TaskPriority;