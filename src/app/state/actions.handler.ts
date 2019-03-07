import {Injectable} from '@angular/core';
import {Actions, ofActionSuccessful, Store} from '@ngxs/store';
import {CreateSuccess, DeleteTodo, GetTodos, ToggleSuccess} from './todo.action';
import {UpdateFilterType, UpdateSearchTerm, UpdateStatus} from './filter.action';

@Injectable()
export class TodoHandler {
  constructor(private store: Store, private actions$: Actions) {

    // TODO: add positive and negative feedback for every action
    actions$
      .pipe(ofActionSuccessful(UpdateSearchTerm, UpdateStatus, UpdateFilterType, CreateSuccess, ToggleSuccess, DeleteTodo))
      .subscribe(() => {
        this.store.dispatch(new GetTodos());
      });
  }
}
