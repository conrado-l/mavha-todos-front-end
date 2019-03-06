import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Select, Store, Actions, ofActionSuccessful, ofActionCompleted, ofAction} from '@ngxs/store';
import {Todo} from '../../state/todo.model';
import {TodoState} from '../../state/todo.state';
import {GetTodos, GetTodosFailure} from '../../state/todo.action';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;

  constructor(private store: Store, private actions: Actions, private snotifyService: SnotifyService) {
  }

  ngOnInit() {
    // Get todos when the component is initialized
    this.store.dispatch(new GetTodos());

    // Notify failure
    this.actions.pipe(ofAction(GetTodosFailure)).subscribe(() => {
        this.snotifyService.error('Se produjo un al obtener los todos');
      }
    );
  }

}

