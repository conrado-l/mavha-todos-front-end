import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TodoFilterState} from '../../interfaces/todoFilterState';

@Component({
  selector: 'app-search-filter-bar',
  templateUrl: './search-filter-bar.component.html',
  styleUrls: ['./search-filter-bar.component.scss']
})
export class SearchFilterBarComponent implements OnInit {
  states: TodoFilterState[];
  activeStatus = 'all'; // TODO: use flux pattern (NGRX/RxJS/Akita) for managing global stateOld
  filter = {
    name: 'description',
    value: ''
  };
  @Output() termInput = new EventEmitter();
  @Output() filterChange = new EventEmitter();
  @Output() statusChange = new EventEmitter();

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

  updateSearchTerm(description: string) {
    this.termInput.emit(description);
  }

  updateFilter(filter: string) {
    this.filter.name = filter;
    this.filterChange.emit(filter);
  }

  updateStatus(status: string): void {
    this.activeStatus = status;
    this.statusChange.emit(status);
  }

}
