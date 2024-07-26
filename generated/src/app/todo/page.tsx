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
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const todo: Todo = { id: Date.now(), text: newTodo, completed: false };
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const updateTodo = (id: number, text: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text } : todo));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 rounded mr-2"
          placeholder="Add a new todo"
        />
        <Button onClick={addTodo}>Add Todo</Button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl">Todos</h2>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between mb-2">
              <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
              <div>
                <Button onClick={() => toggleComplete(todo.id)}>{todo.completed ? 'Undo' : 'Complete'}</Button>
                <Button onClick={() => deleteTodo(todo.id)} className="ml-2">Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Completed: {completedCount}</p>
        <p>Incomplete: {incompleteCount}</p>
      </div>
    </div>
  );
}
