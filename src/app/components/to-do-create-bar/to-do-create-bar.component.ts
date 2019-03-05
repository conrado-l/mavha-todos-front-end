import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CreateTodo} from '../../state/todo.action';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-to-do-create-bar',
  templateUrl: './to-do-create-bar.component.html',
  styleUrls: ['./to-do-create-bar.component.scss']
})
export class ToDoCreateBarComponent implements OnInit {
  description: string;
  attachment: object;
  loading: boolean;

  // Access the DOM input file element
  @ViewChild('input') attachmentInput: ElementRef;

  constructor(private store: Store) {
  }

  @Output() createClicked = new EventEmitter();

  ngOnInit() {
    this.description = '';
    this.attachment = null;
    this.loading = false;
  }

  createTodo(): void {
    // Prevent from creating empty to-dos
    if (!this.description.trim().length) {
      return;
    }

    // Show feedback
    this.loading = true;

    // Create the to-do, wait for creation and reset the data for the next one
    this.store.dispatch(new CreateTodo(this.description, this.attachment)).subscribe(() => {
      this.loading = false;
      this.description = ''; // TODO: check for errors
      this.attachment = null;
    });
  }

  selectAttachment(files): void {
    // Prevent from selecting multiple files
    if (files.length !== 1) {
      return;
    }
    // Store the selected file
    this.attachment = files[0];
  }

  removeAttachment(): void {
    this.attachment = null;
    // Reset the <input type="file"> element for selecting a new file
    this.attachmentInput.nativeElement.value = '';
  }

}
