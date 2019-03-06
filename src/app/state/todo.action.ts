// TODO: create actions for search, filter, update and delete

export class CreateTodo {
  static readonly type = '[Todo] Create';

  constructor(public description: string, public file: object) {
  }
}

export class GetTodos {
  static readonly type = '[Todo] Get';
}

export class ToggleTodo {
  static readonly type = '[Todo] Toggle';

  constructor(public id: number) {
  }
}

export class DeleteTodo {
  static readonly type = '[Todo] Delete';

  constructor(public id: number) {
  }
}

export class CreateSuccess {
  static readonly type = '[Todo] CreateSuccess';
}

export class CreateFailed {
  static readonly type = '[Todo] CreateFailed';
}

export class GetTodosSuccess {
  static readonly type = '[Todo] GetTodosSuccess';
}

export class GetTodosFailure {
  static readonly type = '[Todo] GetTodosFailure';
}


