import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { IntroHeaderComponent } from './components/intro-header/intro-header.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { ToDoCreateBarComponent } from './components/to-do-create-bar/to-do-create-bar.component';
import { SearchFilterBarComponent } from './components/search-filter-bar/search-filter-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    IntroHeaderComponent,
    TodoItemComponent,
    ToDoCreateBarComponent,
    SearchFilterBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
