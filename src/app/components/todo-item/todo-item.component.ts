import {Component, Input} from '@angular/core';
import {APIService} from '../../services/api.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() description: string;
  @Input() attachment: string;
  @Input() status: boolean;
  @Input() id: number;

  constructor(private todoService: APIService) {
  }

  finishTodo() {
    this.todoService.updateTodo(this.id);
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.id);
  }

}
