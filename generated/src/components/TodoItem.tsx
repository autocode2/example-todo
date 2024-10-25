import React from 'react';
import { Todo, TodoStatus, TodoPriority } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { useTodo } from '@/context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { updateTodo, deleteTodo } = useTodo();

  const handleStatusChange = (newStatus: TodoStatus) => {
    updateTodo({ ...todo, status: newStatus });
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    complete: 'bg-green-100 text-green-800',
  };

  return (
    <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-lg font-medium">{todo.content}</p>
          
          <div className="flex gap-2 mt-2">
            <span className={`px-2 py-1 rounded-full text-sm ${statusColors[todo.status]}`}>
              {todo.status.replace('_', ' ')}
            </span>
            
            {todo.priority && (
              <span className={`px-2 py-1 rounded-full text-sm ${priorityColors[todo.priority]}`}>
                {todo.priority}
              </span>
            )}
          </div>

          {todo.tags && todo.tags.length > 0 && (
            <div className="flex gap-1 mt-2">
              {todo.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-sm text-gray-500 mt-2">
            {todo.dueDate && (
              <p>Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
            )}
            <p>Created: {new Date(todo.createdDate).toLocaleDateString()}</p>
            {todo.startedDate && (
              <p>Started: {new Date(todo.startedDate).toLocaleDateString()}</p>
            )}
            {todo.completedDate && (
              <p>Completed: {new Date(todo.completedDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {todo.status !== 'in_progress' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleStatusChange('in_progress')}
            >
              Start
            </Button>
          )}
          
          {todo.status !== 'complete' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleStatusChange('complete')}
            >
              Complete
            </Button>
          )}
          
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}