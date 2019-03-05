import {Injectable} from '@angular/core';
import {Actions, ofActionErrored, ofActionSuccessful, Store} from '@ngxs/store';
import {CreateTodo, DeleteTodo, GetTodos, ToggleTodo} from './todo.action';
import {UpdateFilterType, UpdateSearchTerm, UpdateStatus} from './filter.action';
import {SnotifyService} from 'ng-snotify';

@Injectable()
export class TodoHandler {
  constructor(private store: Store, private actions$: Actions, private snotifyService: SnotifyService) {

    actions$
      .pipe(ofActionSuccessful(UpdateSearchTerm, UpdateStatus, UpdateFilterType, CreateTodo, ToggleTodo, DeleteTodo))
      .subscribe(() => {
        this.store.dispatch(new GetTodos());
      });

    actions$
      .pipe(ofActionErrored(GetTodos))
      .subscribe(() => {
        this.snotifyService.error('Se produjo un error al obtener los todos');
      });
  }
}
