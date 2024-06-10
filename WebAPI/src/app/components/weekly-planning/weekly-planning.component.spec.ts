import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPlanningComponent } from './weekly-planning.component';

describe('WeeklyPlanningComponent', () => {
  let component: WeeklyPlanningComponent;
  let fixture: ComponentFixture<WeeklyPlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyPlanningComponent]
    });
    fixture = TestBed.createComponent(WeeklyPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
