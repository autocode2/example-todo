export type TodoStatus = 'todo' | 'in progress' | 'complete';

export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  content: string;
  status: TodoStatus;
  dueDate?: Date;
  createdDate: Date;
  startedDate?: Date;
  completedDate?: Date;
  tags?: string[];
  priority?: TodoPriority;
}

export interface TodoFilters {
  status?: TodoStatus;
  tags?: string[];
  priority?: TodoPriority;
  dueDate?: Date;
}

export type SortField = 'dueDate' | 'createdDate' | 'startedDate' | 'completedDate' | 'priority' | 'status';
export type SortOrder = 'asc' | 'desc';

export interface TodoSort {
  field: SortField;
  order: SortOrder;
}