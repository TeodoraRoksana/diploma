import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import {NgFor, AsyncPipe} from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import  { DateTime }  from  "ts-luxon" ;
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';


import { Task } from 'src/app/models/task';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (
      // control.dirty || control.touched || 
      isSubmitted));
  }
}

interface Modes{
  value: string;
  viewValue: string;
}

export declare const COMMA = 188;
export declare const ENTER = 13;

@Component({
  selector: 'app-monthly-planning-dialog',
  templateUrl: './monthly-planning-dialog.component.html',
  styleUrls: ['./monthly-planning-dialog.component.css'],
  standalone: true,
  imports: [
    FormsModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    NgIf, 
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgFor,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatDialogModule,
  ],
})
export class MonthlyPlanningDialogComponent {
  dataTask: Task = new Task;
  
  hideRequired='true';
  selectedMode = '';

  nameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  modes:Modes[] = [
    {value: 'day', viewValue: 'Day'},
    {value: 'week', viewValue: 'Week'},
    {value: 'month', viewValue: 'Month'},    
  ];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // disabled = false;

  // formControlItem: FormControl = new FormControl('');
  // maxTime: DateTime = DateTime.local().set({
  //   hour: 16,
  // });
  // minTime: DateTime = DateTime.local().set({
  //   hour: 14,
  // });
  // required: boolean = !1;
  
  // @ViewChild('timepicker') timepicker: any;

  // openFromIcon(timepicker: { open: () => void }) {
  //   if (!this.formControlItem.disabled) {
  //     timepicker.open();
  //   }
  // }
   
  // onClear($event: Event) {
  //   this.formControlItem.setValue(null);
  // }

  //separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Home', 'Study'];

  //@ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;

  announcer = Inject(LiveAnnouncer);

  constructor(
    public dialogRef: MatDialogRef<MonthlyPlanningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: Task,
    ) {
    this.filteredTags = this.tagsCtrl.valueChanges.
    pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && this.tags.length < 1) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagsCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(this.tags.length < 1){
      this.tags.push(event.option.viewValue);
    }
     // this.tagsInput.nativeElement.value = '';
    
    this.tagsCtrl.setValue(null);
    
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  colorOfTag = "";

  onNoClick(): void {
    this.dialogRef.close();
  }
}
