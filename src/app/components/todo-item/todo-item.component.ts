import {Component, Input, OnInit} from '@angular/core';
import {Store, Actions, ofActionDispatched} from '@ngxs/store';
import {DeleteTodo, ToggleFailed, ToggleSuccess, ToggleTodo} from '../../state/todo/todo.action';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  toggling: boolean;
  @Input() description: string;
  @Input() attachment: string;
  @Input() status: boolean;
  @Input() id: number;

  constructor(private store: Store, private actions: Actions) {
  }

  ngOnInit() {
    this.toggling = false;

    // Show spinner
    this.actions.pipe(ofActionDispatched(ToggleTodo)).subscribe((todoId: number) => {
      if (todoId === this.id) { // TODO: fix, not working
        this.toggling = true;
      }
    });

    // Hide spinner
    this.actions.pipe(ofActionDispatched(ToggleSuccess, ToggleFailed)).subscribe((todoId: number) => {
      if (todoId === this.id) {
        this.toggling = false;
      }
    });
  }

  toggleTodo() {
    this.store.dispatch(new ToggleTodo(this.id));
  }

  deleteTodo() {
    this.store.dispatch(new DeleteTodo(this.id));
  }

  downloadAttachment() {
    var link = document.createElement('a');
    link.href = this.attachment;
    link.target = '_blank';
    link.download = this.attachment;
    link.click();
  }

}
