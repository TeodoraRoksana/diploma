import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPlanningComponent } from './monthly-planning.component';

describe('MonthlyPlanningComponent', () => {
  let component: MonthlyPlanningComponent;
  let fixture: ComponentFixture<MonthlyPlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyPlanningComponent]
    });
    fixture = TestBed.createComponent(MonthlyPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
