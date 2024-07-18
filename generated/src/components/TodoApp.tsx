'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const updateTodo = (id: number, text: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text } : todo))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const incompleteCount = todos.length - completedCount

  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <div className="my-4">
        <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'} className="mr-2">All</Button>
        <Button onClick={() => setFilter('active')} variant={filter === 'active' ? 'default' : 'outline'} className="mr-2">Active</Button>
        <Button onClick={() => setFilter('completed')} variant={filter === 'completed' ? 'default' : 'outline'}>Completed</Button>
      </div>
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
        onToggle={toggleTodo}
      />
      <div className="mt-4">
        <p>Completed: {completedCount}</p>
        <p>Incomplete: {incompleteCount}</p>
      </div>
    </div>
  )
}
