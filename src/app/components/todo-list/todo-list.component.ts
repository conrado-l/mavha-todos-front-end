import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor() {
  }

  ngOnInit() {
    this.todos = [
      {
        id: 1,
        description: 'Cook dinner',
        status: false,
        attachment: 'plate.jpg',
        createdAt: 'today',
        updatedAt: 'tomorrow'
      },
      {
        id: 1,
        description: 'Cook dinner',
        status: false,
        attachment: 'dinner.jpg',
        createdAt: 'today',
        updatedAt: 'tomorrow'
      }
    ];
  }
}

