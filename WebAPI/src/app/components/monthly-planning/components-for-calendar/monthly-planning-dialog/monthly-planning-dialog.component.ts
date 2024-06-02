import { Component, ElementRef, ViewChild, Inject, Injectable } from '@angular/core';
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
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import  { DateTime }  from  "ts-luxon" ;
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import { Task } from 'src/app/models/task';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (
      // control.dirty || control.touched || 
      isSubmitted));
  }
}

@Injectable()
export class WeekRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      let numberWeek = this._dateAdapter.getDayOfWeek(date);
      let offsetRight = numberWeek != 6 ?  6 - (numberWeek + 6) % 6 : 0;
      let offsetLeft = -numberWeek;


      const start = this._dateAdapter.addCalendarDays(date, offsetLeft);
      const end = this._dateAdapter.addCalendarDays(date, offsetRight);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

interface Modes{
  value: string;
  viewValue: string;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export declare const COMMA = 188;
export declare const ENTER = 13;
const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-monthly-planning-dialog',
  templateUrl: './monthly-planning-dialog.component.html',
  styleUrls: ['./monthly-planning-dialog.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekRangeSelectionStrategy,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MonthlyPlanningDialogComponent {
  @ViewChild('dateMode') dateMode!: ElementRef;
  @ViewChild('monthPicker') monthPicker!: ElementRef;
  dataTask: Task = new Task;
  
  hideRequired='true';
  selectedMode = '';
  colorOfTag = "";

  nameFormControl = new FormControl('', [Validators.required]);
  modeFormControl = new FormControl('', [Validators.required]);
  dateStartFormControl = new FormControl(moment(), [Validators.required]);

  matcher = new MyErrorStateMatcher();

  modes:Modes[] = [
    {value: 'day', viewValue: 'Day'},
    {value: 'week', viewValue: 'Week'},
    {value: 'month', viewValue: 'Month'},    
  ];

  range = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
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

  

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  save(){

    if(
      [
        this.nameFormControl,
        this.modeFormControl,
        this.dateStartFormControl
      ]
      .some(control => control.invalid)
      )
      return;
      this.dialogRef.close(this.taskData);
  }

  onSelectedDateMode(){
    //this.taskData.mode = this.dateMode.nativeElement.value;
    this.dateStartFormControl.setValue(null);
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    //const ctrlValue =  normalizedMonthAndYear;
    
    //ctrlValue.month(normalizedMonthAndYear.month());
    //ctrlValue.year(normalizedMonthAndYear.year());
    this.dateStartFormControl.setValue(normalizedMonthAndYear);
    datepicker.close();
  }
}
