'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-2 mr-2 flex-1"
          placeholder="Add a new todo"
        />
        <Button onClick={addTodo}>Add Todo</Button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl">Counts</h2>
        <p>Completed: {completedCount}</p>
        <p>Incomplete: {incompleteCount}</p>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between mb-2">
            <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
            <div>
              <Button onClick={() => toggleComplete(todo.id)}>{todo.completed ? 'Undo' : 'Complete'}</Button>
              <Button onClick={() => deleteTodo(todo.id)} className="ml-2">Delete</Button>
              <Button onClick={() => updateTodo(todo.id, prompt('Update todo:', todo.text) || todo.text)} className="ml-2">Edit</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}