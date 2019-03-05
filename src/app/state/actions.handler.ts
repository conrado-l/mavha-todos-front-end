import {Injectable} from '@angular/core';
import {Actions, ofAction, ofActionSuccessful, Store} from '@ngxs/store';
import {GetTodos} from './todo.action';
import {UpdateSearchTerm} from "./filter.action";

@Injectable()
export class TodoHandler {
  constructor(private store: Store, private actions$: Actions) {
    console.log('todo handler created');

    actions$.pipe(
      ofActionSuccessful(UpdateSearchTerm)
    ).subscribe(action => {
      this.store.dispatch(new GetTodos());
    });
  }
}
