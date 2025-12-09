import React from 'react';
import './App.css';
import TodoApp from './components/TodoApp';

/**
 * PUBLIC_INTERFACE
 * App is the top-level component rendering the TodoApp within a main tag.
 */
function App() {
  return (
    <div className="app">
      <main className="container" role="main" aria-label="Todo Application">
        <TodoApp />
      </main>
    </div>
  );
}

export default App;
