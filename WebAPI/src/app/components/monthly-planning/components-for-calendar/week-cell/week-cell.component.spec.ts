import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCellComponent } from './week-cell.component';

describe('WeekCellComponent', () => {
  let component: WeekCellComponent;
  let fixture: ComponentFixture<WeekCellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekCellComponent]
    });
    fixture = TestBed.createComponent(WeekCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
