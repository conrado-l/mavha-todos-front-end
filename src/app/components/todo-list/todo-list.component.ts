import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: object[];

  constructor() {
  }

  ngOnInit() {
    this.todos = [
      {
        id: 1,
        description: 'Cook dinner',
        status: false
      },
      {
        id: 2,
        description: 'Angular',
        status: true
      }
    ];
  }

}
