import React from 'react'
import { Todo } from '@/app/page'

interface TodoCountProps {
  todos: Todo[]
}

const TodoCount: React.FC<TodoCountProps> = ({ todos }) => {
  const completedCount = todos.filter((todo) => todo.completed).length
  const incompleteCount = todos.length - completedCount

  return (
    <div className="mt-4 text-sm text-gray-600">
      <p>Complete: {completedCount}</p>
      <p>Incomplete: {incompleteCount}</p>
    </div>
  )
}

export default TodoCount