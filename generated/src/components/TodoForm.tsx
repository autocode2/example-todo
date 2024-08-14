import React, { useState } from 'react';
import { useTodoContext } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Todo, TodoPriority } from '@/types/todo';

const TodoForm: React.FC = () => {
  const { addTodo } = useTodoContext();
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [priority, setPriority] = useState<TodoPriority | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newTodo: Omit<Todo, 'id' | 'createdDate'> = {
      content: content.trim(),
      status: 'todo',
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    if (dueDate) {
      newTodo.dueDate = new Date(dueDate);
    }

    if (priority) {
      newTodo.priority = priority;
    }

    addTodo(newTodo);
    setContent('');
    setDueDate('');
    setTags('');
    setPriority('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Todo content"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TodoPriority)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <Button type="submit">Add Todo</Button>
    </form>
  );
};

export default TodoForm;