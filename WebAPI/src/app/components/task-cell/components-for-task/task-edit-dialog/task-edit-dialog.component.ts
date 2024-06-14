import { Component, ElementRef, ViewChild, Inject, Injectable, Output, EventEmitter } from '@angular/core';
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
import { MonthlyPlanningDialogComponent } from 'src/app/components/monthly-planning/components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (
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
export declare const COMMA = 188;
export declare const ENTER = 13;
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: WeekRangeSelectionStrategy,
    },
  ]
})
export class TaskEditDialogComponent {
  @ViewChild('dateMode') dateMode!: ElementRef;
  @ViewChild('monthPicker') monthPicker!: ElementRef;
 
  currentTask = new Task;

  listOfTags!: Tag[];
  hideRequired='true';
  selectedMode = '';
  //colorOfTag = "";

  nameFormControl = new FormControl('', [Validators.required]);
  modeFormControl = new FormControl('', [Validators.required]);
  dateStartFormControl = new FormControl(moment(), [Validators.required]);
  tagFormControl = new FormControl(new Tag(), [Validators.required]);
  dateStartInWeekFormControl = new FormControl(new Date, [Validators.required]);
  dateEndInWeekFormControl = new FormControl(new Date, [Validators.required]);

  matcher = new MyErrorStateMatcher();

  modes:Modes[] = [
    {value: 'day', viewValue: 'Day'},
    {value: 'week', viewValue: 'Week'},
    {value: 'month', viewValue: 'Month'},    
  ];

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: Task,
    private _adapter: DateAdapter<any>,
    private store:Store<AppState>,
    private taskService:TaskService,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    this._adapter.getFirstDayOfWeek = () => 1;

    this.store.select(selectTagsFromStore)
    .subscribe({
      next: (result: Tag[]) => {
        this.listOfTags = result;
        
      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        console.log('Tag get from store error:', error);
      }
    });
    
    this.copyTask(this.currentTask, this.taskData);

    this.modeFormControl.setValue(this.currentTask.mode);
    if(this.currentTask.tag)
      this.tagFormControl.setValue(this.listOfTags.filter(t => t.id == this.currentTask.tag?.id)[0]);
  }

  copyTask(task1: Task, task2: Task){
    task1.id = task2.id;
    task1.name = task2.name;
    task1.beginDate = task2.beginDate;
    task1.endDate = task2.endDate;
    task1.important = task2.important;
    task1.mode = task2.mode;
    task1.note = task2.note;
    task1.tag = task2.tag;
    task1.userId = task2.userId;
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
      // this.taskData.beginDate = MonthlyPlanningDialogComponent.toISODate(this.taskData.beginDate!)
      // this.taskData.endDate = MonthlyPlanningDialogComponent.toISODate(this.taskData.endDate!)
      // console.log("1: ", this.taskData);
    console.log(this.taskData);
    this.copyTask(this.taskData, this.currentTask);
      
    this.taskService
    .putTask(this.taskData)
    .subscribe({
      next: (result: Task) => {
        this.taskData = result;
        this.dialogRef.close(this.taskData);
      },
      error: ({ error, message, status } : HttpErrorResponse) => {
          console.log('Unknown error:', error);
      }
    });
  }

  onSelectedDateMode(){
    this.dateStartFormControl.setValue(null);
    this.dateEndInWeekFormControl.setValue(null);
    this.dateStartInWeekFormControl.setValue(null);
  }

  delete(){
    const dialogRef = this.dialog.open
    (DialogComponent, {
      data: "Are you sure?",
    });
    
    
    dialogRef.afterClosed().subscribe(result => {
      if(!result){ //fine?
        return;
      }
      //this.taskFromDialog = result; 
      this.taskService.deleteTask(this.taskData.id);
      this.dialogRef.close('delete');
      }
    );
  }
}
