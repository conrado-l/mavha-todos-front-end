import { QueryEntity } from '@datorama/akita';
import { TodoStore, TodoState, todoStore } from './todo.store';
import { Todo } from './todo.model';

export class TodoQuery extends QueryEntity<TodoState, Todo> {

  constructor(protected store: TodoStore) {
    super(store);
  }

}

export const todoQuery = new TodoQuery(todoStore);
