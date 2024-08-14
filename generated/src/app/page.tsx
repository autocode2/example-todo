'use client'

import React from 'react';
import { TodoProvider } from '@/contexts/TodoContext';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import TodoFilters from '@/components/TodoFilters';

export default function Home() {
  return (
    <TodoProvider>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Todo App</h1>
        <TodoForm />
        <TodoFilters />
        <TodoList />
      </main>
    </TodoProvider>
  );
}