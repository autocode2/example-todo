import React from 'react'

function TodoFilter({ filter, setFilter }) {
  return (
    <div className="todo-filter">
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
        All
      </button>
      <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>
        Active
      </button>
      <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>
        Completed
      </button>
    </div>
  )
}

export default TodoFilter