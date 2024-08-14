import React from 'react';
import { useTodoContext } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { TodoStatus, TodoPriority, SortField, SortOrder } from '@/types/todo';

const TodoFilters: React.FC = () => {
  const { filters, setFilters, sort, setSort, searchTerm, setSearchTerm } = useTodoContext();

  const handleStatusFilter = (status: TodoStatus | undefined) => {
    setFilters({ ...filters, status });
  };

  const handlePriorityFilter = (priority: TodoPriority | undefined) => {
    setFilters({ ...filters, priority });
  };

  const handleSort = (field: SortField) => {
    if (sort.field === field) {
      setSort({ ...sort, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ field, order: 'asc' });
    }
  };

  return (
    <div className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <span className="mr-2">Status:</span>
        <Button
          size="sm"
          variant={filters.status === 'todo' ? 'default' : 'outline'}
          onClick={() => handleStatusFilter('todo')}
        >
          Todo
        </Button>
        <Button
          size="sm"
          variant={filters.status === 'in progress' ? 'default' : 'outline'}
          onClick={() => handleStatusFilter('in progress')}
        >
          In Progress
        </Button>
        <Button
          size="sm"
          variant={filters.status === 'complete' ? 'default' : 'outline'}
          onClick={() => handleStatusFilter('complete')}
        >
          Complete
        </Button>
        <Button
          size="sm"
          variant={!filters.status ? 'default' : 'outline'}
          onClick={() => handleStatusFilter(undefined)}
        >
          All
        </Button>
      </div>
      <div className="mb-2">
        <span className="mr-2">Priority:</span>
        <Button
          size="sm"
          variant={filters.priority === 'low' ? 'default' : 'outline'}
          onClick={() => handlePriorityFilter('low')}
        >
          Low
        </Button>
        <Button
          size="sm"
          variant={filters.priority === 'medium' ? 'default' : 'outline'}
          onClick={() => handlePriorityFilter('medium')}
        >
          Medium
        </Button>
        <Button
          size="sm"
          variant={filters.priority === 'high' ? 'default' : 'outline'}
          onClick={() => handlePriorityFilter('high')}
        >
          High
        </Button>
        <Button
          size="sm"
          variant={!filters.priority ? 'default' : 'outline'}
          onClick={() => handlePriorityFilter(undefined)}
        >
          All
        </Button>
      </div>
      <div>
        <span className="mr-2">Sort by:</span>
        {['dueDate', 'createdDate', 'startedDate', 'completedDate', 'priority', 'status'].map((field) => (
          <Button
            key={field}
            size="sm"
            variant={sort.field === field ? 'default' : 'outline'}
            onClick={() => handleSort(field as SortField)}
          >
            {field} {sort.field === field && (sort.order === 'asc' ? '↑' : '↓')}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilters;