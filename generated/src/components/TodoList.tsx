import { Todo } from './TodoApp'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface TodoListProps {
  todos: Todo[]
  onDelete: (id: number) => void
  onUpdate: (id: number, text: string) => void
  onToggle: (id: number) => void
}

export default function TodoList({ todos, onDelete, onUpdate, onToggle }: TodoListProps) {
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const handleEdit = (todo: Todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const handleUpdate = (id: number) => {
    if (editText.trim()) {
      onUpdate(id, editText.trim())
      setEditId(null)
    }
  }

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li key={todo.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="h-5 w-5"
          />
          {editId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => handleUpdate(todo.id)}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdate(todo.id)}
              className="flex-grow p-1 border rounded"
              autoFocus
            />
          ) : (
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
          )}
          <Button onClick={() => handleEdit(todo)} variant="outline" size="sm">Edit</Button>
          <Button onClick={() => onDelete(todo.id)} variant="destructive" size="sm">Delete</Button>
        </li>
      ))}
    </ul>
  )
}