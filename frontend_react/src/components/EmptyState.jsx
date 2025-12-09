import React from 'react';

/**
 * PUBLIC_INTERFACE
 * EmptyState shows a simple message prompting the user to add a task.
 */
export default function EmptyState() {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      No tasks yet. Add a task to get started.
    </div>
  );
}
