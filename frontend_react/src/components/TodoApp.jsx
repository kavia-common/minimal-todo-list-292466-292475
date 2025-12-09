import React, { useEffect, useMemo, useRef, useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import EmptyState from './EmptyState';

const STORAGE_KEY = 'todos:v1';

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * PUBLIC_INTERFACE
 * TodoApp is the main feature container managing todos, filters, and persistence.
 */
export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'
  const inputRef = useRef(null);

  // Persist todos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // ignore persistence errors
    }
  }, [todos]);

  const remainingCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos]
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Handlers
  const handleAdd = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = {
      id: createId(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos(prev => [newTodo, ...prev]);
    // refocus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleToggle = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const handleEdit = (id, nextText) => {
    const trimmed = nextText.trim();
    if (!trimmed) return;
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: trimmed } : t));
  };

  return (
    <section aria-labelledby="todo-header">
      <header className="header">
        <h1 id="todo-header" className="header__title">Minimal Todo</h1>
      </header>

      <TodoInput
        inputRef={inputRef}
        onAdd={handleAdd}
      />

      <div className="controls" role="region" aria-label="Todo controls">
        <div className="controls__left" aria-live="polite">
          {remainingCount} item{remainingCount === 1 ? '' : 's'} left
        </div>
        <div className="filters" role="tablist" aria-label="Filter todos">
          <button
            type="button"
            className="btn btn--ghost btn--filter"
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--filter"
            aria-pressed={filter === 'active'}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--filter"
            aria-pressed={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {filteredTodos.length > 0 ? (
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
