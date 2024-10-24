'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type FilterType = 'all' | 'active' | 'completed'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false
        }
      ])
      setNewTodo('')
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === editingId ? { ...todo, text: editText.trim() } : todo
        )
      )
      setEditingId(null)
      setEditText('')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeTodos = todos.filter(todo => !todo.completed).length
  const completedTodos = todos.filter(todo => todo.completed).length

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Todo App</h1>

        {/* Add Todo Form */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={addTodo}>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
          >
            Active ({activeTodos})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedTodos})
          </Button>
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-2 p-4 bg-card rounded-lg shadow"
            >
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-2 py-1 border rounded-md"
                    autoFocus
                  />
                  <Button size="icon" onClick={saveEdit}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={cancelEdit}>
                    <X className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5"
                  />
                  <span
                    className={`flex-1 ${
                      todo.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => startEditing(todo)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}