export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};