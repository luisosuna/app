import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders calculator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/calculator/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders number buttons', () => {
  render(<App />);
  for (let i = 0; i <= 9; i++) {
    const button = screen.getByRole('button', { name: i.toString() });
    expect(button).toBeInTheDocument();
  }
});

test('performs basic addition', () => {
  render(<App />);
  
  fireEvent.click(screen.getByRole('button', { name: '2' }));
  fireEvent.click(screen.getByRole('button', { name: '+' }));
  fireEvent.click(screen.getByRole('button', { name: '3' }));
  fireEvent.click(screen.getByRole('button', { name: '=' }));
  
  // Use more specific selector for the display area
  const displayArea = document.querySelector('.display');
  expect(displayArea).toHaveTextContent('5');
});

test('theme toggle changes button text', () => {
  render(<App />);
  
  const themeButton = screen.getByRole('button', { name: /dark/i });
  expect(themeButton).toBeInTheDocument();
  
  fireEvent.click(themeButton);
  
  expect(screen.getByRole('button', { name: /light/i })).toBeInTheDocument();
});

test('clear button resets calculator', () => {
  render(<App />);
  
  fireEvent.click(screen.getByRole('button', { name: '5' }));
  fireEvent.click(screen.getByRole('button', { name: '+' }));
  fireEvent.click(screen.getByRole('button', { name: '3' }));
  
  fireEvent.click(screen.getByRole('button', { name: 'CLEAR' }));
  
  // Use more specific selector for the display area
  const displayArea = document.querySelector('.display');
  expect(displayArea).toHaveTextContent('0');
});