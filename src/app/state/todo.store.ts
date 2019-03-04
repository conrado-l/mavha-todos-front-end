import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Todo } from './todo.model';

export interface TodoState extends EntityState<Todo> {}

@StoreConfig({ name: 'todo' })
export class TodoStore extends EntityStore<TodoState, Todo> {

  constructor() {
    super();
  }

}

export const todoStore = new TodoStore();

