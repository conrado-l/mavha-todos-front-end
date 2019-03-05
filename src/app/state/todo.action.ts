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
