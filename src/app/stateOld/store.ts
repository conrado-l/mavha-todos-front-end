import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {CategoryModel} from './model';
import {Todo} from "../interfaces/todo";

export interface CategoryState extends EntityState<CategoryModel> {
}

export interface SessionState {
  todos: Todo[];
  filter: string;
  description: string;
}

export function createInitialState(): SessionState {
  return {
    todos: [],
    filter: 'all',
    description: ''
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'category'})
export class CategoryStore extends EntityStore<CategoryState, CategoryModel> {
  constructor() {
    super(createInitialState());
  }
}
