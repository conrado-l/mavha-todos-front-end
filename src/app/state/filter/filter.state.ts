import {State, Action, StateContext, Selector} from '@ngxs/store';
import {UpdateSearchTerm, UpdateFilterType, UpdateStatus} from './filter.action';

export class FilterStateModel {
  type: string;
  value: string;
  status: string;
}

@State<FilterStateModel>({
  name: 'filter',
  defaults: {
    type: 'description',
    value: '',
    status: 'all'
  }
})
export class FilterState {

  constructor() {
  }

  @Selector()
  static getFilters(state: FilterStateModel) {
    return state;
  }

  @Action(UpdateSearchTerm, { cancelUncompleted: true }) // TODO: add input debounce
  UpdateSearchTerm({getState, setState}: StateContext<FilterStateModel>, {term}: UpdateSearchTerm) {
    const state = getState();
    setState({
      ...state,
      value: term
    });
  }

  @Action(UpdateFilterType)
  UpdateFilterType({getState, setState}: StateContext<FilterStateModel>, {type}: UpdateFilterType) {
    const state = getState();
    setState({
      ...state,
      type
    });
  }

  @Action(UpdateStatus)
  UpdateStatus({getState, setState}: StateContext<FilterStateModel>, {status}: UpdateStatus) {
    const state = getState();
    setState({
      ...state,
      status
    });
  }
}
