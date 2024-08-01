import React, { useState } from 'react'

function TodoList({ todos, deleteTodo, updateTodo, toggleTodo }) {
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleEdit = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  const handleUpdate = (id) => {
    updateTodo(id, editText)
    setEditId(null)
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          {editId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleUpdate(todo.id)}>Save</button>
            </>
          ) : (
            <>
              <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default TodoList