import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {IntroHeaderComponent} from './components/intro-header/intro-header.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import {ToDoCreateBarComponent} from './components/to-do-create-bar/to-do-create-bar.component';
import {SearchFilterBarComponent} from './components/search-filter-bar/search-filter-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {TodoState} from './state/todo.state';
import {FilterState} from './state/filter.state';
import {HandlerModule} from './state/handler.module';
import {TodoHandler} from './state/actions.handler';
import {AutofocusModule} from 'angular-autofocus-fix';
import {SpinnerComponent} from './components/spinner/spinner.component';

export function noop() {
  return function () {
  };
}

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    IntroHeaderComponent,
    TodoItemComponent,
    ToDoCreateBarComponent,
    SearchFilterBarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([TodoState, FilterState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HandlerModule.forRoot([TodoHandler]),
    AutofocusModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
