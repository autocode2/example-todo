import React from 'react';
import { useTodoContext } from '@/contexts/TodoContext';
import TodoItem from './TodoItem';
import { Todo, TodoFilters, TodoSort } from '@/types/todo';

const TodoList: React.FC = () => {
  const { todos, filters, sort, searchTerm } = useTodoContext();

  const filterTodos = (todos: Todo[], filters: TodoFilters): Todo[] => {
    return todos.filter(todo => {
      if (filters.status && todo.status !== filters.status) return false;
      if (filters.priority && todo.priority !== filters.priority) return false;
      if (filters.tags && filters.tags.length > 0) {
        if (!todo.tags || !filters.tags.every(tag => (todo.tags || []).includes(tag))) return false;
      }
      if (filters.dueDate && todo.dueDate) {
        const filterDate = new Date(filters.dueDate);
        const todoDueDate = new Date(todo.dueDate);
        if (filterDate.toDateString() !== todoDueDate.toDateString()) return false;
      }
      return true;
    });
  };

  const sortTodos = (todos: Todo[], sort: TodoSort): Todo[] => {
    return [...todos].sort((a, b) => {
      if (sort.field === 'dueDate') {
        if (!a.dueDate) return sort.order === 'asc' ? 1 : -1;
        if (!b.dueDate) return sort.order === 'asc' ? -1 : 1;
        return sort.order === 'asc'
          ? a.dueDate.getTime() - b.dueDate.getTime()
          : b.dueDate.getTime() - a.dueDate.getTime();
      }
      if (['createdDate', 'startedDate', 'completedDate'].includes(sort.field)) {
        const aDate = a[sort.field as keyof Todo] as Date | undefined;
        const bDate = b[sort.field as keyof Todo] as Date | undefined;
        if (!aDate) return sort.order === 'asc' ? 1 : -1;
        if (!bDate) return sort.order === 'asc' ? -1 : 1;
        return sort.order === 'asc'
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime();
      }
      if (sort.field === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        const aValue = a.priority ? priorityOrder[a.priority] : 0;
        const bValue = b.priority ? priorityOrder[b.priority] : 0;
        return sort.order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (sort.field === 'status') {
        const statusOrder = { todo: 1, 'in progress': 2, complete: 3 };
        return sort.order === 'asc'
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status];
      }
      return 0;
    });
  };

  const searchTodos = (todos: Todo[], term: string): Todo[] => {
    if (!term) return todos;
    const lowercaseTerm = term.toLowerCase();
    return todos.filter(todo =>
      todo.content.toLowerCase().includes(lowercaseTerm) ||
      todo.tags?.some(tag => tag.toLowerCase().includes(lowercaseTerm))
    );
  };

  const filteredAndSortedTodos = sortTodos(
    searchTodos(filterTodos(todos, filters), searchTerm),
    sort
  );

  return (
    <div>
      {filteredAndSortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
