import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Todo, TodoFilters, TodoSort, TodoStatus, TodoPriority } from '@/types/todo';

interface TodoState {
  todos: Todo[];
  filters: TodoFilters;
  sort: TodoSort;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTERS'; payload: TodoFilters }
  | { type: 'SET_SORT'; payload: TodoSort };

const initialState: TodoState = {
  todos: [],
  filters: {},
  sort: { field: 'createdDate', direction: 'desc' },
};

const TodoContext = createContext<{
  state: TodoState;
  addTodo: (todo: Omit<Todo, 'id' | 'createdDate'>) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  setFilters: (filters: TodoFilters) => void;
  setSort: (sort: TodoSort) => void;
} | null>(null);

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
      };
    default:
      return state;
  }
}

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = useCallback((todoData: Omit<Todo, 'id' | 'createdDate'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdDate: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  }, []);

  const updateTodo = useCallback((todo: Todo) => {
    let updatedTodo = { ...todo };
    
    // Handle status changes and dates
    if (todo.status === 'in_progress' && !todo.startedDate) {
      updatedTodo.startedDate = new Date().toISOString();
    }
    if (todo.status === 'complete' && !todo.completedDate) {
      updatedTodo.completedDate = new Date().toISOString();
    }
    
    dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const setFilters = useCallback((filters: TodoFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const setSort = useCallback((sort: TodoSort) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  }, []);

  return (
    <TodoContext.Provider
      value={{ state, addTodo, updateTodo, deleteTodo, setFilters, setSort }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}