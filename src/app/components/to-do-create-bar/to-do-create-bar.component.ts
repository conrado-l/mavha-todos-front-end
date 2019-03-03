import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-to-do-create-bar',
  templateUrl: './to-do-create-bar.component.html',
  styleUrls: ['./to-do-create-bar.component.scss']
})
export class ToDoCreateBarComponent implements OnInit {
  description: string = '';

  createTodo(): void {
    if (!this.description.length) {
      return;
    }
    console.log(this.description);
    this.description = '';
  }

  ngOnInit() {
  }

}
