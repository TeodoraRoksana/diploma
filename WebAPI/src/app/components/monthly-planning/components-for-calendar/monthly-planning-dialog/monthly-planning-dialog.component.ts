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
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { selectTagsFromStore } from 'src/app/store/tags/tag.selectors';
import { Tag } from 'src/app/models/tag';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from 'src/app/services/task.service';

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
      let offsetRight = numberWeek != 0 ?  7 - numberWeek : 0;
      let offsetLeft = numberWeek != 0 ? 1 - numberWeek : -6;


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

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
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
    // {
    //   provide: DateAdapter, useValue: new LuxonDateAdapter('en-GB',{
    //     firstDayOfWeek: 1,
    //     useUtc: true
    //   })
    // }
  ],
})
export class MonthlyPlanningDialogComponent {
  @ViewChild('dateMode') dateMode!: ElementRef;
  @ViewChild('monthPicker') monthPicker!: ElementRef;
 
  listOfTags!: Tag[];
  hideRequired='true';
  selectedMode = '';
  //colorOfTag = "";

  nameFormControl = new FormControl('', [Validators.required]);
  modeFormControl = new FormControl('', [Validators.required]);
  dateStartFormControl = new FormControl(moment(), [Validators.required]);
  dateStartInWeekFormControl = new FormControl(new Date, [Validators.required]);
  dateEndInWeekFormControl = new FormControl(new Date, [Validators.required]);

  matcher = new MyErrorStateMatcher();

  modes:Modes[] = [
    {value: 'day', viewValue: 'Day'},
    {value: 'week', viewValue: 'Week'},
    {value: 'month', viewValue: 'Month'},    
  ];

  constructor(
    public dialogRef: MatDialogRef<MonthlyPlanningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: Task,
    private _adapter: DateAdapter<any>,
    private store:Store<AppState>,
    private taskService:TaskService
    ) {
      
    _adapter.getFirstDayOfWeek = () => 1;

    store.select(selectTagsFromStore)
    .subscribe({
      next: (result: Tag[]) => {
        this.listOfTags = result;
        //result.forEach(t => this.listOfTags.push(Object.assign({}, t)));
      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        console.log('Tag get from store error:', error);
      }
    });
      this.modeFormControl.setValue(taskData.mode);
      this.dateStartInWeekFormControl.setValue(taskData.beginDate);
      this.dateEndInWeekFormControl.setValue(taskData.endDate);
      //this.dateStartFormControl.setValue(taskData.beginDate);
      
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  save(){
    if(
      [
        this.nameFormControl,
        this.modeFormControl,
      ]
      .some(control => control.invalid) || 
        this.dateStartFormControl.invalid &&
        (this.dateStartInWeekFormControl.invalid ||
        this.dateEndInWeekFormControl.invalid)
      
      )
      return;
      // this.taskData.userId = 1; //store userId
      // this.taskData.beginDate! = MonthlyPlanningDialogComponent.toISODate(this.taskData.beginDate!)
      // this.taskData.endDate = MonthlyPlanningDialogComponent.toISODate(this.taskData.endDate!)

      this.taskService
      .postTask(this.taskData)
      .subscribe({
        next: (result: Task) => {
          this.taskData = result;
          this.dialogRef.close(this.taskData);
        },
        error: ({ error, message, status } : HttpErrorResponse) => {
          // if (error == errorData.TagNameAlreadyExist) {
          //   console.log('Fuck mate, find you!', error);
          //   this.tag_name_hint = "tag's name already exists!";
          //   this.tagNameFormControl.setErrors({tagExists: true});
          // } else {
            console.log('Unknown error:', error);
            //this.tag_name_hint = 'Unknown error:' + error;
          //}
        }
      });

      //this.dialogRef.close(this.taskData);
  }

  onSelectedDateMode(){
    this.dateStartFormControl.setValue(null);
  }

  static toISODate(date: Date) {
    const d = new Date(date)
    const tz = d.getTimezoneOffset() * 60 * 1000
    const ms = d.getTime()
    return new Date(ms - tz)
  }
}
