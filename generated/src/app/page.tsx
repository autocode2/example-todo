'use client';

import React, { useState } from 'react';
import { Todo, generateId } from '@/lib/todos';
import TodoItem from '@/components/TodoItem';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: generateId(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.length - activeTodos;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Todo App</h1>
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo"
            className="flex-grow p-2 border rounded-l"
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <div className="flex justify-between mb-4">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>
        <div className="mb-4">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
        </div>
        <div className="text-sm text-gray-500">
          <span>{activeTodos} active</span>
          {' | '}
          <span>{completedTodos} completed</span>
        </div>
      </div>
    </main>
  );
}