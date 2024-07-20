import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: crypto.randomUUID(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = filter === 'all'
    ? todos
    : filter === 'completed'
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={addTodo}>Add</Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant={filter === 'all' ? 'default' : 'ghost'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'ghost'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
        <Button
          variant={filter === 'incomplete' ? 'default' : 'ghost'}
          onClick={() => setFilter('incomplete')}
        >
          Incomplete
        </Button>
      </div>

      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={cn(
              'flex items-center justify-between rounded-md border border-input px-4 py-2',
              todo.completed && 'bg-muted text-muted-foreground line-through'
            )}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0"
              />
              <span>{todo.text}</span>
            </div>
            <Button variant="ghost" onClick={() => deleteTodo(todo.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span>
          Completed: {completedCount}, Incomplete: {incompleteCount}
        </span>
      </div>
    </div>
  );
};

export default TodoApp;