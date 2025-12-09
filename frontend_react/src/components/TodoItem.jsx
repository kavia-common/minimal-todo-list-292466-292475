import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem displays a single todo with checkbox, label, inline edit, and actions.
 */
export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const editRef = useRef(null);

  useEffect(() => {
    if (isEditing && editRef.current) {
      editRef.current.focus();
      editRef.current.select();
    }
  }, [isEditing]);

  const startEdit = () => {
    setDraft(todo.text);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const next = draft.trim();
    if (!next) {
      // Don't save empty. Stay in edit to correct.
      return;
    }
    if (next !== todo.text) {
      onEdit(todo.id, next);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const onEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <li className="todo-item">
      <input
        id={`chk-${todo.id}`}
        className="checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
      />
      <label className="todo-item__label" htmlFor={`chk-${todo.id}`}>
        {isEditing ? (
          <input
            ref={editRef}
            className="todo-edit-input"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onEditKeyDown}
            aria-label={`Edit task: ${todo.text}`}
          />
        ) : (
          <span
            className={`todo-item__text ${todo.completed ? 'text--completed' : ''}`}
            title={todo.text}
          >
            {todo.text}
          </span>
        )}
      </label>

      <div className="todo-actions" role="group" aria-label="Item actions">
        {isEditing ? (
          <>
            <button
              type="button"
              className="btn btn--primary"
              onClick={saveEdit}
              aria-label="Save edit"
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={cancelEdit}
              aria-label="Cancel edit"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={startEdit}
              aria-label="Edit task"
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => onDelete(todo.id)}
              aria-label="Delete task"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
