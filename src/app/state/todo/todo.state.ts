import {State, Action, StateContext, Selector, Store} from '@ngxs/store';
import {Todo} from './todo.model';
import {
  CreateFailed,
  CreateSuccess,
  CreateTodo,
  DeleteTodo,
  GetTodos, GetTodosFailure,
  GetTodosSuccess, ToggleFailed, ToggleSuccess,
  ToggleTodo
} from './todo.action';
import {APIService} from '../../services/api.service';
import {catchError, tap} from 'rxjs/operators';
import {FilterState} from '../filter/filter.state';

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
        setTimeout(() => dispatch(new GetTodosSuccess()), 10); // Workaround for NGXS parent-child action completion
      }),
      catchError(() => dispatch(new GetTodosFailure()))
    );
  }

  @Action(CreateTodo)
  createTodo({getState, patchState, dispatch}: StateContext<TodoStateModel>, {description, file}: CreateTodo) {
    return this.apiService.createTodo(description, file).pipe(
      tap(() => dispatch(new CreateSuccess())),
      catchError((err) => dispatch(new CreateFailed(err))));
  }

  @Action(ToggleTodo)
  toggleTodo({getState, patchState, dispatch}: StateContext<TodoStateModel>, {id}: ToggleTodo) {
    return this.apiService.toggleTodo(id).pipe(
      tap(() => setTimeout(() => dispatch(new ToggleSuccess(id)), 10), // Workaround for NGXS parent-child action completion
        catchError(() => dispatch(new ToggleFailed(id)))
      ));
  }

  @Action(DeleteTodo)
  deleteTodo({getState, setState}: StateContext<TodoStateModel>, {id}: DeleteTodo) {
    return this.apiService.deleteTodo(id);
  }
}
