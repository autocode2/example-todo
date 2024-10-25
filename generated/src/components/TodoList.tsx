import React from 'react';
import { useTodo } from '@/context/TodoContext';
import { TodoItem } from './TodoItem';
import { filterTodos, sortTodos } from '@/lib/todoUtils';

export function TodoList() {
  const { state } = useTodo();
  const { todos, filters, sort } = state;

  const filteredTodos = filterTodos(todos, filters);
  const sortedTodos = sortTodos(filteredTodos, sort);

  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No todos yet. Add your first todo above!
      </div>
    );
  }

  if (sortedTodos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No todos match your current filters.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}