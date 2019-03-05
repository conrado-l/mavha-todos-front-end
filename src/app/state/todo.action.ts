import {Todo} from './todo.model';

export class AddTodo {
  static readonly type = '[Todo] Add';

  constructor(public payload: Todo) {
  }
}

export class GetTodos {
  static readonly type = '[Todo] Get';
}

export class UpdateTodo {
  static readonly type = '[Todo] Update';

  constructor(public id: number) {
  }
}

export class DeleteTodo {
  static readonly type = '[Todo] Delete';

  constructor(public id: number) {
  }
}
