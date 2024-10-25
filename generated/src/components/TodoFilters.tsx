import React from 'react';
import { Button } from '@/components/ui/button';
import { TodoFilters, TodoStatus, TodoPriority, TodoSort, SortField } from '@/types/todo';
import { useTodo } from '@/context/TodoContext';

export function TodoFiltersComponent() {
  const { state, setFilters, setSort } = useTodo();
  const { filters, sort } = state;

  const handleStatusFilter = (status: TodoStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    setFilters({ ...filters, status: newStatuses });
  };

  const handlePriorityFilter = (priority: TodoPriority) => {
    const currentPriorities = filters.priority || [];
    const newPriorities = currentPriorities.includes(priority)
      ? currentPriorities.filter(p => p !== priority)
      : [...currentPriorities, priority];
    
    setFilters({ ...filters, priority: newPriorities });
  };

  const handleSort = (field: SortField) => {
    if (sort.field === field) {
      setSort({ field, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ field, direction: 'asc' });
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <div className="space-y-2">
        <h3 className="font-medium">Filter by Status:</h3>
        <div className="flex gap-2">
          {(['todo', 'in_progress', 'complete'] as TodoStatus[]).map((status) => (
            <Button
              key={status}
              variant={filters.status?.includes(status) ? 'default' : 'outline'}
              onClick={() => handleStatusFilter(status)}
            >
              {status.replace('_', ' ')}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Filter by Priority:</h3>
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as TodoPriority[]).map((priority) => (
            <Button
              key={priority}
              variant={filters.priority?.includes(priority) ? 'default' : 'outline'}
              onClick={() => handlePriorityFilter(priority)}
            >
              {priority}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Sort by:</h3>
        <div className="flex gap-2 flex-wrap">
          {(['dueDate', 'createdDate', 'startedDate', 'completedDate', 'priority', 'status'] as SortField[]).map((field) => (
            <Button
              key={field}
              variant={sort.field === field ? 'default' : 'outline'}
              onClick={() => handleSort(field)}
              className="flex items-center gap-1"
            >
              {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
              {sort.field === field && (
                <span>{sort.direction === 'asc' ? '↑' : '↓'}</span>
              )}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Search:</h3>
        <input
          type="text"
          value={filters.search || ''}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search todos..."
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Due Date Range:</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={filters.dueDateFrom || ''}
            onChange={(e) => setFilters({ ...filters, dueDateFrom: e.target.value })}
            className="p-2 border rounded-md"
          />
          <input
            type="date"
            value={filters.dueDateTo || ''}
            onChange={(e) => setFilters({ ...filters, dueDateTo: e.target.value })}
            className="p-2 border rounded-md"
          />
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          setFilters({});
          setSort({ field: 'createdDate', direction: 'desc' });
        }}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );
}