import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/Todo';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(public rest: RestService) {
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todos = [];
    this.rest.getTodos().subscribe((data: Todo[]) => {
      console.log(data);
      this.todos = data;
    });
  }
}

