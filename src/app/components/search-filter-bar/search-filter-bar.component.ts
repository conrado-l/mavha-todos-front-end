import {Component, OnInit} from '@angular/core';
import {Filter} from '../../state/filter/filter.model';
import {TodoFilterState} from '../../interfaces/todoFilterState';
import {FilterState} from '../../state/filter/filter.state';
import {UpdateFilterType, UpdateSearchTerm, UpdateStatus} from '../../state/filter/filter.action';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-search-filter-bar',
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.scss']
})
export class SearchFilterBarComponent implements OnInit {
  states: TodoFilterState[];

  constructor(private store: Store) {
  }

  @Select(FilterState.getFilters) filter$: Observable<Filter>;

  ngOnInit() {
    this.states = [
      {
        name: 'Todos',
        value: 'all'
      },
      {
        name: 'Pendientes',
        value: 'pending'
      },
      {
        name: 'Completados',
        value: 'completed'
      }
    ];
  }

  updateSearchTerm(term: string) {
    this.store.dispatch(new UpdateSearchTerm(term));
  }

  updateFilterType(type: string) {
    this.store.dispatch(new UpdateFilterType(type));
  }

  updateStatus(status: string): void {
    this.store.dispatch(new UpdateStatus(status));
  }

}
