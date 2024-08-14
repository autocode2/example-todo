import React, { createContext, useContext, useState, useEffect } from 'react';
import { Todo, TodoFilters, TodoSort, TodoStatus, TodoPriority } from '@/types/todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdDate'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  filters: TodoFilters;
  setFilters: (filters: TodoFilters) => void;
  sort: TodoSort;
  setSort: (sort: TodoSort) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<TodoFilters>({});
  const [sort, setSort] = useState<TodoSort>({ field: 'createdDate', order: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load todos from localStorage on initial render
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdDate'>) => {
    const newTodo: Todo = {
      ...todo,
      id: Date.now().toString(),
      createdDate: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const value = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    filters,
    setFilters,
    sort,
    setSort,
    searchTerm,
    setSearchTerm,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};