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
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, text: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text } : todo)));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 mr-2"
        />
        <Button onClick={addTodo}>Add Todo</Button>
      </div>
      <div className="mb-4">
        <Button onClick={() => setFilter('all')} className="mr-2">All</Button>
        <Button onClick={() => setFilter('completed')} className="mr-2">Completed</Button>
        <Button onClick={() => setFilter('incomplete')}>Incomplete</Button>
      </div>
      <div className="mb-4">
        <p>Completed: {completedCount}</p>
        <p>Incomplete: {incompleteCount}</p>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            <input
              type="text"
              value={todo.text}
              onChange={(e) => updateTodo(todo.id, e.target.value)}
              className="border p-2 mr-2 flex-1"
            />
            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </main>
  );
}
