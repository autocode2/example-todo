import React, { useState } from 'react'
import { Todo } from '@/app/page'
import { Button } from '@/components/ui/button'

interface TodoListProps {
  todos: Todo[]
  deleteTodo: (id: number) => void
  updateTodo: (id: number, text: string) => void
  toggleTodo: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, updateTodo, toggleTodo }) => {
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const handleEdit = (todo: Todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const handleUpdate = (id: number) => {
    updateTodo(id, editText)
    setEditId(null)
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="h-4 w-4"
          />
          {editId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-grow p-1 border rounded"
            />
          ) : (
            <span className={`flex-grow ${todo.completed ? 'line-through' : ''}`}>
              {todo.text}
            </span>
          )}
          {editId === todo.id ? (
            <Button onClick={() => handleUpdate(todo.id)} size="sm">Save</Button>
          ) : (
            <Button onClick={() => handleEdit(todo)} size="sm">Edit</Button>
          )}
          <Button onClick={() => deleteTodo(todo.id)} variant="destructive" size="sm">Delete</Button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList