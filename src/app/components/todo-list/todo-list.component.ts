import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Select, Store, Actions, ofAction} from '@ngxs/store';
import {Todo} from '../../state/todo.model';
import {TodoState} from '../../state/todo.state';
import {GetTodos, GetTodosFailure, GetTodosSuccess} from '../../state/todo.action';
import {SnotifyService} from 'ng-snotify';
import {ngxLoadingAnimationTypes} from 'ngx-loading';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;

  loading = false;
  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  primaryColour = 'dodgerblue'; // TODO: extract to file for reutilization
  secondaryColour = 'white'; // TODO: extract to file for reutilization
  backdropBackgroundColour = 'rgba(255,255,255,0.8)'; // TODO: extract to file for reutilization

  constructor(private store: Store, private actions: Actions, private snotifyService: SnotifyService) {
  }

  ngOnInit() {
    // Get todos when the component is initialized
    this.store.dispatch(new GetTodos());

    // Hide spinner
    this.actions.pipe(ofAction(GetTodosFailure, GetTodosSuccess)).subscribe(() => {
        this.loading = false;
      }
    );

    // Show spinner
    this.actions.pipe(ofAction(GetTodos)).subscribe(() => {
        this.loading = true;
      }
    );

    // Notify failure
    this.actions.pipe(ofAction(GetTodosFailure)).subscribe(() => {
        this.snotifyService.error('Se produjo un al obtener los todos');
      }
    );
  }

}

