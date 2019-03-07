export class UpdateSearchTerm {
  static readonly type = '[Filter] UpdateSearchTerm';

  constructor(public term: string) {
  }
}

export class UpdateFilterType {
  static readonly type = '[Filter] UpdateFilterType';

  constructor(public type: string) {
  }
}

export class UpdateStatus {
  static readonly type = '[Filter] UpdateStatus';

  constructor(public status: string) {
  }
}
