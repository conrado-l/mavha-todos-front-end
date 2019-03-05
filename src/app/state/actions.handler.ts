import {Injectable} from '@angular/core';
import {Actions, ofActionSuccessful, Store} from '@ngxs/store';
import {CreateTodo, DeleteTodo, GetTodos, ToggleTodo} from './todo.action';
import {UpdateFilterType, UpdateSearchTerm, UpdateStatus} from './filter.action';

@Injectable()
export class TodoHandler {
  constructor(private store: Store, private actions$: Actions) {

    actions$
      .pipe(ofActionSuccessful(UpdateSearchTerm, UpdateStatus, UpdateFilterType, CreateTodo, ToggleTodo, DeleteTodo))
      .subscribe(() => {
        this.store.dispatch(new GetTodos());
      });
  }
}
