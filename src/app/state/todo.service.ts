import {TodoStore, todoStore} from './todo.store';
import {APIService} from '../services/todos.service';
import {mapTo} from "rxjs/operators";

export class TodoService {

  constructor(private todoStore: TodoStore, APService: APIService) {
  }

  getTodos() {
    // this.apiService.getTodos();
      // .pipe(mapTo(booksMock))
      // .subscribe(books => {
      //   this.booksStore.set(books);
      // });
  }

}

// export const todoService = new TodoService(todoStore, apiService);
