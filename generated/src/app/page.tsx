'use client';

import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="container">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>
      <TodoList />
    </main>
  );
}