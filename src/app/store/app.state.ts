import {State, Action} from '@ngxs/store';

export class Add {
  static readonly type = 'Add';
}

@State<number>({
  name: 'count',
  defaults: 0
})
export class CountState {
  @Action(Add)
  add({getState, setState}) {
    const state = getState();
    setState(state + 1);
  }
}
