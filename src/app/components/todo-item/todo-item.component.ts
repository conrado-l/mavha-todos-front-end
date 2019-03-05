import {Component, Input} from '@angular/core';
import {Store} from '@ngxs/store';
import {DeleteTodo, ToggleTodo} from "../../state/todo.action";

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

  constructor(private store: Store) {
  }

  toggleTodo() {
    this.store.dispatch(new ToggleTodo(this.id));
  }

  deleteTodo() {
    this.store.dispatch(new DeleteTodo(this.id));

  }

}
