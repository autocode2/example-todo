import TodoApp from '@/components/todo-app';

export default function Home() {
  return (
    <main className="container py-8">
      <h1 className="mb-4 text-3xl font-bold">Todo App</h1>
      <TodoApp />
    </main>
  );
}