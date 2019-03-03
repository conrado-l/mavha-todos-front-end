import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCreateBarComponent } from './to-do-create-bar.component';

describe('ToDoCreateBarComponent', () => {
  let component: ToDoCreateBarComponent;
  let fixture: ComponentFixture<ToDoCreateBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoCreateBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoCreateBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
