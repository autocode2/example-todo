import { Todo, TodoFilters, TodoSort } from '@/types/todo';

export function filterTodos(todos: Todo[], filters: TodoFilters): Todo[] {
  return todos.filter((todo) => {
    // Filter by status
    if (filters.status?.length && !filters.status.includes(todo.status)) {
      return false;
    }

    // Filter by tags
    if (filters.tags?.length) {
      if (!todo.tags?.some((tag) => filters.tags?.includes(tag))) {
        return false;
      }
    }

    // Filter by priority
    if (filters.priority?.length && todo.priority) {
      if (!filters.priority.includes(todo.priority)) {
        return false;
      }
    }

    // Filter by due date range
    if (filters.dueDateFrom && todo.dueDate) {
      if (new Date(todo.dueDate) < new Date(filters.dueDateFrom)) {
        return false;
      }
    }
    if (filters.dueDateTo && todo.dueDate) {
      if (new Date(todo.dueDate) > new Date(filters.dueDateTo)) {
        return false;
      }
    }

    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return todo.content.toLowerCase().includes(searchLower);
    }

    return true;
  });
}

export function sortTodos(todos: Todo[], sort: TodoSort): Todo[] {
  return [...todos].sort((a, b) => {
    const multiplier = sort.direction === 'asc' ? 1 : -1;

    switch (sort.field) {
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return multiplier * (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

      case 'createdDate':
        return multiplier * (new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());

      case 'startedDate':
        if (!a.startedDate && !b.startedDate) return 0;
        if (!a.startedDate) return 1;
        if (!b.startedDate) return -1;
        return multiplier * (new Date(a.startedDate).getTime() - new Date(b.startedDate).getTime());

      case 'completedDate':
        if (!a.completedDate && !b.completedDate) return 0;
        if (!a.completedDate) return 1;
        if (!b.completedDate) return -1;
        return multiplier * (new Date(a.completedDate).getTime() - new Date(b.completedDate).getTime());

      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aPriority = a.priority ? priorityOrder[a.priority] : 0;
        const bPriority = b.priority ? priorityOrder[b.priority] : 0;
        return multiplier * (aPriority - bPriority);

      case 'status':
        const statusOrder = { todo: 1, in_progress: 2, complete: 3 };
        return multiplier * (statusOrder[a.status] - statusOrder[b.status]);

      default:
        return 0;
    }
  });
}