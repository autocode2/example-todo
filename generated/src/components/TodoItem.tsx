import React from 'react';
import { Todo, TodoStatus, TodoPriority } from '@/types/todo';
import { Button } from '@/components/ui/button';
import { useTodoContext } from '@/contexts/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodoContext();

  const handleStatusChange = (newStatus: TodoStatus) => {
    const updates: Partial<Todo> = { status: newStatus };
    if (newStatus === 'in progress' && !todo.startedDate) {
      updates.startedDate = new Date();
    } else if (newStatus === 'complete' && !todo.completedDate) {
      updates.completedDate = new Date();
    }
    updateTodo(todo.id, updates);
  };

  const handlePriorityChange = (newPriority: TodoPriority) => {
    updateTodo(todo.id, { priority: newPriority });
  };

  return (
    <div className="border p-4 mb-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{todo.content}</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-sm">Status: {todo.status}</span>
        {todo.dueDate && (
          <span className="text-sm">Due: {todo.dueDate.toLocaleDateString()}</span>
        )}
        {todo.priority && (
          <span className="text-sm">Priority: {todo.priority}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {todo.tags && todo.tags.map(tag => (
          <span key={tag} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={todo.status === 'todo' ? 'default' : 'outline'}
          onClick={() => handleStatusChange('todo')}
        >
          Todo
        </Button>
        <Button
          size="sm"
          variant={todo.status === 'in progress' ? 'default' : 'outline'}
          onClick={() => handleStatusChange('in progress')}
        >
          In Progress
        </Button>
        <Button
          size="sm"
          variant={todo.status === 'complete' ? 'default' : 'outline'}
          onClick={() => handleStatusChange('complete')}
        >
          Complete
        </Button>
      </div>
      <div className="flex gap-2 mt-2">
        <Button
          size="sm"
          variant={todo.priority === 'low' ? 'default' : 'outline'}
          onClick={() => handlePriorityChange('low')}
        >
          Low
        </Button>
        <Button
          size="sm"
          variant={todo.priority === 'medium' ? 'default' : 'outline'}
          onClick={() => handlePriorityChange('medium')}
        >
          Medium
        </Button>
        <Button
          size="sm"
          variant={todo.priority === 'high' ? 'default' : 'outline'}
          onClick={() => handlePriorityChange('high')}
        >
          High
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;