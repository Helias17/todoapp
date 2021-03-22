import React, { useState } from 'react';

interface inputProps {
  onAdd(input: string): void;
}

const AddTask: React.FunctionComponent<inputProps> = props => {

  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleAddBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.onAdd(input);
    setInput('');
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      props.onAdd(input);
      setInput('');
    }
  }

  return (
    <div className="inputBox">
      <div className="inputFieldBox">
        <input type="text" placeholder="Type task title" value={input}
          className="todoInput"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div>
        <button className="todoInputBtn" onClick={handleAddBtn}>Add task</button>
      </div>
    </div>
  );
}

export default AddTask;