import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { IntroHeaderComponent } from './components/intro-header/intro-header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ToDoCreateBarComponent } from './components/to-do-create-bar/to-do-create-bar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    IntroHeaderComponent,
    TodoItemComponent,
    SearchInputComponent,
    ToDoCreateBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
