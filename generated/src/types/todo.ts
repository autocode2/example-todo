export type TodoStatus = 'todo' | 'in_progress' | 'complete';

export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  dueDate?: string;
  createdDate: string;
  startedDate?: string;
  completedDate?: string;
  tags?: string[];
  priority?: TodoPriority;
}

export interface TodoFilters {
  status?: TodoStatus[];
  tags?: string[];
  priority?: TodoPriority[];
  dueDateFrom?: string;
  dueDateTo?: string;
  search?: string;
}

export type SortField = 'dueDate' | 'createdDate' | 'startedDate' | 'completedDate' | 'priority' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface TodoSort {
  field: SortField;
  direction: SortDirection;
}