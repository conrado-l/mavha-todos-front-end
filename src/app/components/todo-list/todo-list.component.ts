import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Todo} from '../../state/todo.model';
import {TodoState} from '../../state/todo.state';
import {GetTodos} from '../../state/todo.action';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetTodos());
  }

  // updateSearchTerm(term: string) {
  //   if (this.filter.value === term) {
  //     return;
  //   }
  //   this.filter.value = term;
  //   // this.getTodos();
  // }
  //
  // updateFilter(filter: string) {
  //   this.filter.name = filter;
  //   // this.getTodos();
  // }
  //
  // updateStatus(status: string) {
  //   this.status = status;
  //   // this.getTodos();
  // }

  // getTodos() {
  //   this.todos = this.apiService.getTodos({status: this.status, filter: this.filter});
  // }

}

