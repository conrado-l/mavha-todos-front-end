import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../../interfaces/todo';
import {TodoService} from '../../state';
import {APIService} from '../../services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(private apiService: APIService) {
  }

  todos: Observable<Todo[]>;
  status = 'all'; // TODO: use flux pattern (NGRX/RxJS/Akita) for managing global state
  filter = {
    name: 'description',
    value: ''
  };

  ngOnInit() {
    this.getTodos();
  }

  updateSearchTerm(term: string) {
    if (this.filter.value === term) {
      return;
    }
    this.filter.value = term;
    this.getTodos();
  }

  updateFilter(filter: string) {
    this.filter.name = filter;
    this.getTodos();
  }

  updateStatus(status: string) {
    this.status = status;
    this.getTodos();
  }

  getTodos() {
    this.todos = this.apiService.getTodos({status: this.status, filter: this.filter});
  }

}

