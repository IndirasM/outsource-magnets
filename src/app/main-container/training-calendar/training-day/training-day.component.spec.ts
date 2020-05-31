import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDayComponent } from './training-day.component';

describe('TrainingDayComponent', () => {
  let component: TrainingDayComponent;
  let fixture: ComponentFixture<TrainingDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
