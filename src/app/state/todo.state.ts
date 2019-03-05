import {State, Action, StateContext, Selector, Select, Store} from '@ngxs/store';
import {Todo} from './todo.model';
import {CreateTodo, DeleteTodo, GetTodos, ToggleTodo} from './todo.action';
import {APIService} from '../services/api.service';
import {tap} from 'rxjs/operators';
import {FilterState} from './filter.state';
import {Observable} from 'rxjs';
import {Filter} from './filter.model';

export class TodoStateModel {
  todos: Todo[];
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: []
  }
})
export class TodoState {

  constructor(private store: Store, private apiService: APIService) {
  }

  @Selector()
  static getTodoList(state: TodoStateModel) {
    return state.todos;
  }


  @Action(GetTodos)
  getTodos({getState, setState}: StateContext<TodoStateModel>) {
    return this.apiService.getTodos(this.store.selectSnapshot(FilterState.getFilters)).pipe(tap((result) => {
      console.log('list', result);
      const state = getState();
      setState({
        ...state,
        todos: result,
      });
    }));
  }


  @Action(CreateTodo)
  createTodo({getState, patchState}: StateContext<TodoStateModel>, {description, file}: CreateTodo) {
    return this.apiService.createTodo(description, file);
  }

  @Action(ToggleTodo)
  toggleTodo({getState, patchState}: StateContext<TodoStateModel>, {id}: ToggleTodo) {
    return this.apiService.toggleTodo(id);
  }

  @Action(DeleteTodo)
  deleteTodo({getState, setState}: StateContext<TodoStateModel>, {id}: DeleteTodo) {
    return this.apiService.deleteTodo(id);
  }
}
