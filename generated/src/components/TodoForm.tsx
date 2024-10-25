import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Todo, TodoPriority } from '@/types/todo';
import { useTodo } from '@/context/TodoContext';

export function TodoForm() {
  const { addTodo } = useTodo();
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<TodoPriority | ''>('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;

    const newTodo: Omit<Todo, 'id' | 'createdDate'> = {
      content: content.trim(),
      status: 'todo',
      ...(dueDate && { dueDate }),
      ...(priority && { priority: priority as TodoPriority }),
      ...(tags && { tags: tags.split(',').map(tag => tag.trim()).filter(Boolean) }),
    };

    addTodo(newTodo);
    
    // Reset form
    setContent('');
    setDueDate('');
    setPriority('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TodoPriority | '')}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma-separated)"
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Todo
      </Button>
    </form>
  );
}