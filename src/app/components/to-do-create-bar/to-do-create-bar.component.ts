import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CreateFailed, CreateSuccess, CreateTodo} from '../../state/todo/todo.action';
import {Select, Store, Actions, ofActionSuccessful, ofActionCompleted} from '@ngxs/store';
import {SnotifyService} from 'ng-snotify';
import {TodoState} from '../../state/todo/todo.state';
import {Observable} from 'rxjs';
import {Todo} from '../../state/todo/todo.model';
import Errors from '../../consts/error-messages'
import {map} from "rxjs/operators";

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

  // Get todos from the store
  @Select(TodoState.getTodoList) todos: Observable<Todo[]>;

  constructor(private store: Store, private actions: Actions, private snotifyService: SnotifyService) {
  }

  @Output() createClicked = new EventEmitter();

  ngOnInit() {
    this.description = '';
    this.attachment = null;
    this.loading = false;

    // Notify success
    this.actions.pipe(ofActionSuccessful(CreateSuccess)).subscribe(() => {
        this.description = '';
        this.attachment = null;
        this.snotifyService.success('El to-do fue creado exitosamente');
      }
    );

    // Notify failure
    this.actions.pipe(ofActionSuccessful(CreateFailed)).pipe(map((res) => res.response))
      .subscribe((res) => {
          if (res.error && res.error.error && res.error.error.code) { // TODO: extract to an error handling service
            this.snotifyService.error(Errors[res.error.error.code]);
          } else {
            this.snotifyService.error('Se produjo un error al crear el to-do');
          }
        }
      );

    // Hide spinner and enable input on completion
    this.actions.pipe(ofActionCompleted(CreateSuccess, CreateFailed)).subscribe(() => {
        this.loading = false;
      }
    );
  }

  createTodo(): void {
    // Prevent from creating empty to-dos
    if (!this.description.trim().length) {
      this.snotifyService.error('La descripción es obligatoria');
      return;
    }

    // Show feedback
    this.loading = true;

    // Create the to-do, wait for creation and reset the data for the next one
    this.store.dispatch(new CreateTodo(this.description, this.attachment));
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
