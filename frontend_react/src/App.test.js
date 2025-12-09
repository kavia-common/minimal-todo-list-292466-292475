import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo input and Add button', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/add a task/i);
  const addBtn = screen.getByRole('button', { name: /add/i });
  expect(input).toBeInTheDocument();
  expect(addBtn).toBeInTheDocument();
});
