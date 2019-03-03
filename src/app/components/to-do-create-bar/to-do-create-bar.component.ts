import {Component, OnInit} from '@angular/core';
import {Store, Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Add, CountState} from '../../store/app.state';

@Component({
  selector: 'app-to-do-create-bar',
  templateUrl: './to-do-create-bar.component.html',
  styleUrls: ['./to-do-create-bar.component.scss']
})
export class ToDoCreateBarComponent implements OnInit {
  description: string = '';

  @Select(CountState) count$: Observable<number>;

  constructor(private store: Store) {
  }

  createTodo(): void {
    console.log('Click');
    // if (!this.description.length) {
    //   return;
    // }

    this.store.dispatch(new Add());
    this.description = '';

  }

  ngOnInit() {
  }

}
