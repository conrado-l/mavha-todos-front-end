import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {APIService} from "../../services/todos.service";

@Component({
  selector: 'app-to-do-create-bar',
  templateUrl: './to-do-create-bar.component.html',
  styleUrls: ['./to-do-create-bar.component.scss']
})
export class ToDoCreateBarComponent {
  description = '';
  attachment = null;
  @ViewChild('input') attachmentInput: ElementRef;

  constructor(private todoService: APIService) {
  }

  @Output() createClicked = new EventEmitter();

  createTodo(): void {
    this.todoService.createTodo(this.description, this.attachment);
    this.description = '';
    this.attachment = '';
  }

  selectAttachment(files): void {
    if (files.length !== 1) {
      return;
    }
    this.attachment = files[0];
  }

  removeAttachment(): void {
    this.attachment = null;
    this.attachmentInput.nativeElement.value = '';
  }

}
