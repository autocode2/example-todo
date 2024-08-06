import React from 'react'
import { Button } from '@/components/ui/button'

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed'
  setFilter: (filter: 'all' | 'active' | 'completed') => void
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <Button
        onClick={() => setFilter('all')}
        variant={filter === 'all' ? 'default' : 'outline'}
      >
        All
      </Button>
      <Button
        onClick={() => setFilter('active')}
        variant={filter === 'active' ? 'default' : 'outline'}
      >
        Active
      </Button>
      <Button
        onClick={() => setFilter('completed')}
        variant={filter === 'completed' ? 'default' : 'outline'}
      >
        Completed
      </Button>
    </div>
  )
}

export default TodoFilter