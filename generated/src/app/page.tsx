'use client'

import { TodoProvider } from '@/context/TodoContext';
import { TodoForm } from '@/components/TodoForm';
import { TodoFiltersComponent } from '@/components/TodoFilters';
import { TodoList } from '@/components/TodoList';

export default function Home() {
  return (
    <TodoProvider>
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Todo App</h1>
        <TodoForm />
        <TodoFiltersComponent />
        <TodoList />
      </main>
    </TodoProvider>
  );
}