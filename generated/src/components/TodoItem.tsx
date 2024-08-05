import React from 'react';
import { Todo } from '@/types/todo';
import { Button } from '@/components/ui/button';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-grow p-1 border rounded"
        />
      ) : (
        <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </span>
      )}
      <Button onClick={handleEdit} variant="outline" size="sm">
        {isEditing ? 'Save' : 'Edit'}
      </Button>
      <Button onClick={() => onDelete(todo.id)} variant="destructive" size="sm">
        Delete
      </Button>
    </div>
  );
};

export default TodoItem;