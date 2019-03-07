import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
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
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {NgxLoadingModule} from 'ngx-loading';
import {InputClearComponent} from './components/input-clear/input-clear.component';
import {BoxContainerComponent} from './components/box-container/box-container.component';
import { RoundButtonComponent } from './components/round-button/round-button.component';

// Workaround for using action handlers when Angular initializes
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
    SpinnerComponent,
    InputClearComponent,
    BoxContainerComponent,
    RoundButtonComponent,
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
    SnotifyModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
