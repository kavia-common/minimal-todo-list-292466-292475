import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList renders a list of TodoItem components inside a semantic list.
 */
export default function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    <ul className="todo-list" aria-label="Todo list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
