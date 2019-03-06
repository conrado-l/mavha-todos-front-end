import {State, Action, StateContext, Selector, Select, Store} from '@ngxs/store';
import {Todo} from './todo.model';
import {
  CreateFailed,
  CreateSuccess,
  CreateTodo,
  DeleteTodo,
  GetTodos, GetTodosFailure,
  GetTodosSuccess,
  ToggleTodo
} from './todo.action';
import {APIService} from '../services/api.service';
import {catchError, map, tap} from 'rxjs/operators';
import {FilterState} from './filter.state';
import {Observable, throwError} from "rxjs";

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
  getTodos({getState, setState, dispatch}: StateContext<TodoStateModel>) {
    return this.apiService.getTodos(this.store.selectSnapshot(FilterState.getFilters)).pipe(tap((result) => {
        const state = getState();
        setState({
          ...state,
          todos: result,
        });
        dispatch(new GetTodosSuccess());
      }),
      catchError(() => dispatch(new GetTodosFailure()))
    );
  }


  @Action(CreateTodo)
  createTodo({getState, patchState, dispatch}: StateContext<TodoStateModel>, {description, file}: CreateTodo) {
    return this.apiService.createTodo(description, file).pipe(
      tap(resp => dispatch(new CreateSuccess())),
      catchError(error => dispatch(new CreateFailed()))
    );
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
