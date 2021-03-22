import React, { useState, useRef } from 'react';
import InputNotice from './InputNotice';

interface inputProps {
  onAdd(input: string): void;
}

const AddTask: React.FunctionComponent<inputProps> = props => {

  const inputField = useRef<HTMLInputElement>(null);

  const [inputNoticeVisible, setInputNoticeVisible] = useState<boolean>(false);

  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length) setInputNoticeVisible(false);
  }

  const handleAddBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (input.length) {
      props.onAdd(input);
      setInput('');
    } else {
      setInputNoticeVisible(true);
    }
    if (inputField.current !== null) {
      inputField.current.focus();
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      if (input.length) {
        props.onAdd(input);
        setInput('');
      } else {
        setInputNoticeVisible(true);
      }
      if (inputField.current !== null) inputField.current.focus();
    }
  }


  return (
    <>
      <div className="inputBox">
        <div className="inputFieldBox">
          <input type="text" placeholder="Type task title" autoFocus={true}
            value={input}
            className="todoInput"
            ref={inputField}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        </div>
        <div>
          <button className="todoInputBtn" onClick={handleAddBtn}>Add task</button>
        </div>
      </div>
      {inputNoticeVisible && <InputNotice />}
    </>
  );
}

export default AddTask;