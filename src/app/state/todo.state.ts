import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Todo} from './todo.model';
import {AddTodo, DeleteTodo, GetTodos, UpdateTodo} from './todo.action';
import {APIService} from '../services/api.service';
import {tap} from 'rxjs/operators';

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

  constructor(private apiService: APIService) {
    console.log('store created');
  }

  @Selector()
  static getTodoList(state: TodoStateModel) {
    return state.todos;
  }


  @Action(GetTodos)
  getTodos({getState, setState}: StateContext<TodoStateModel>) {
    return this.apiService.getTodos(null).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        todos: result,
      });
    }));
  }

  //
  // @Action(AddTodo)
  // addTodo({getState, patchState}: StateContext<TodoStateModel>, {payload}: AddTodo) {
  //   return this.apiService.createTodo(payload).pipe(tap((result) => {
  //     const state = getState();
  //     patchState({
  //       todos: [...state.todos, result]
  //     });
  //   }));
  // }
  //
  // @Action(UpdateTodo)
  // updateTodo({getState, setState}: StateContext<TodoStateModel>, {payload, id}: UpdateTodo) {
  //   return this.apiService.updateTodo(id).pipe(tap((result) => {
  //     const state = getState();
  //     const todoList = [...state.todos];
  //     const todoIndex = todoList.findIndex(item => item.id === id);
  //     todoList[todoIndex] = result;
  //     setState({
  //       ...state,
  //       todos: todoList,
  //     });
  //   }));
  // }
  //
  //
  // @Action(DeleteTodo)
  // deleteTodo({getState, setState}: StateContext<TodoStateModel>, {id}: DeleteTodo) {
  //   return this.apiService.deleteTodo(id).pipe(tap(() => {
  //     const state = getState();
  //     const filteredArray = state.todos.filter(item => item.id !== id);
  //     setState({
  //       ...state,
  //       todos: filteredArray,
  //     });
  //   }));
  // }
  //
  // @Action(SetSelectedTodo)
  // setSelectedTodoId({getState, setState}: StateContext<TodoStateModel>, {payload}: SetSelectedTodo) {
  //   const state = getState();
  //   setState({
  //     ...state,
  //     selectedTodo: payload
  //   });
  // }
}
