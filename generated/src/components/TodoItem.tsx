import React from 'react';
import { Todo } from '@/lib/todos';
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
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center space-x-2 p-2 border-b">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
          className="flex-grow p-1 border rounded"
          autoFocus
        />
      ) : (
        <span
          className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
      <Button variant="destructive" size="sm" onClick={() => onDelete(todo.id)}>Delete</Button>
    </div>
  );
};

export default TodoItem;