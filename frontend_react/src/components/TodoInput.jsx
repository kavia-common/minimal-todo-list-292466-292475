import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoInput provides a controlled input and Add button to create tasks.
 */
export default function TodoInput({ onAdd, inputRef }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const v = value.trim();
    if (!v) return;
    onAdd(v);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="input-row">
      <label htmlFor="new-todo" className="visually-hidden">Add a task</label>
      <input
        id="new-todo"
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Add a task"
        aria-label="Add a task"
      />
      <button
        type="button"
        className="btn btn--primary"
        onClick={submit}
        aria-label="Add task"
      >
        Add
      </button>
    </div>
  );
}
