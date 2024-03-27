import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPlanningDialogComponent } from './monthly-planning-dialog.component';

describe('MonthlyPlanningDialogComponent', () => {
  let component: MonthlyPlanningDialogComponent;
  let fixture: ComponentFixture<MonthlyPlanningDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyPlanningDialogComponent]
    });
    fixture = TestBed.createComponent(MonthlyPlanningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
