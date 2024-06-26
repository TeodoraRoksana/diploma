import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditDialogComponent } from './tag-edit-dialog.component';

describe('TagEditDialogComponent', () => {
  let component: TagEditDialogComponent;
  let fixture: ComponentFixture<TagEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagEditDialogComponent]
    });
    fixture = TestBed.createComponent(TagEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
