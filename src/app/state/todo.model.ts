import { ID } from '@datorama/akita';

export interface Todo {
  id: ID;
  description: string;
  status: boolean;
  attachment: string;
  createdAt: string;
  updatedAt: string;
}

export function createTodo(params: Partial<Todo>) {
  return {

  } as Todo;
}
