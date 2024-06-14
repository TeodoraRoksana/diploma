import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';


import { Task } from 'src/app/models/task';
import { Day } from 'src/app/models/day';
import { MonthlyPlanningDialogComponent } from '../monthly-planning/components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component';
import { GenerateMonth } from 'src/app/services/generate-month.service';
import { Router } from '@angular/router';
import { TaskByDate } from 'src/app/models/taskByDate';
import { TaskService } from 'src/app/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TagForMenu } from 'src/app/models/tagForMenu';

@Component({
  selector: 'app-daily-planning',
  templateUrl: './daily-planning.component.html',
  styleUrls: ['./daily-planning.component.css'],
  providers: [
    GenerateMonth,
  ]
  // standalone: true,
  // imports: [
  //   MatIconModule,
  //   MatButtonModule,
  //   NgFor,
  //   MatDialogModule,
  // ],
})

export class DailyPlanningComponent {
  dayData = new Day(this.now(), false);
  filteredListOfTasks = this.dayData.listOfTasks;

  @Input('currentDate') currentDate_string!:string;

  currentDate = this.now()

  mode: string = 'day';
  taskFromDialog = new Task;
  taskByDate = new TaskByDate();

  calendar: Day[][] = this.updCalendar()

  localListOfTags: TagForMenu[] = [];

  ngOnChanges(){
    if(this.currentDate_string) {
      this.currentDate = MonthlyPlanningDialogComponent.toISODate(new Date(this.currentDate_string))
      this.dayData.date =this.currentDate

      this.taskFromDialog.tag = null;
      this.taskByDate.user_Id = 3;
      this.taskByDate.typeDate = "day";
      this.taskByDate.date = this.dayData.date;
  
      this.fetchDay();

      this.updCalendar()
    }
  }

  ngOnInit(){
    // this.taskFromDialog.tag = null;

    // this.taskByDate.user_Id = 1;
    // this.taskByDate.typeDate = "day";
    // this.taskByDate.date = this.dayData.date;

    // this.fetchDay();
  }

  fetchDay() {
    this.taskService
    .getTaskForCurrentPage(this.taskByDate) //store userId
    .subscribe({
      next: (result: Task[]) => {
        this.dayData.listOfTasks = result;
        this.filteredListOfTasks = result;
        this.filterByTags();

      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        console.log('Unknown error:', error);
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private generateMonth: GenerateMonth,
    private router: Router,
    private taskService: TaskService,
  ) {}

  nextMonth(dir: number) {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + dir)
    this.updCalendar()
  }

  today() {
    this.currentDate = this.now()
    this.updCalendar()
  }

  now() {
    return new Date(Date.now())
  }

  updCalendar() {
    this.calendar = this.generateMonth.getMonth(this.currentDate.getFullYear(), this.currentDate.getMonth());
    return this.calendar
  }

  formatMonthView() {
    const nowY = this.now().getFullYear()
    const y = this.currentDate.getFullYear()
    return this.currentDate.toLocaleString('en-US', { month: 'short' }) + ' ' + (y == nowY ? '' : y)
  }

  formatDateView() {
    const nowY = this.now().getFullYear()
    const y = this.dayData.date.getFullYear()
    return this.dayData.date.getDate() + ' ' + this.dayData.date.toLocaleString('en-US', { month: 'long' }) + ' ' + (y == nowY ? '' : y)
  }

  removeTime(date: Date) {
    let d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  
  routeToDay(date: Date){
    this.router.navigate(['daily-planning/' + date.toISOString()]);
  }

  openDialog(): void {
    this.taskFromDialog.mode = 'day';
  
    this.taskFromDialog.beginDate = new Date(this.dayData.date);
    this.taskFromDialog.endDate = new Date(this.dayData.date);
    
    const dialogRef = this.dialog.open
    (MonthlyPlanningDialogComponent, {
      data: this.taskFromDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result){ //fine?
        this.taskFromDialog = new Task();
        this.taskFromDialog.tag = null;
        return;
      }
      
      this.taskFromDialog = result; 
      
      if (this.removeTime(this.taskFromDialog.beginDate!).getTime() == this.removeTime(this.dayData.date).getTime() 
        && this.removeTime(this.taskFromDialog.endDate!).getTime() == this.removeTime(this.dayData.date).getTime()) {
        this.dayData.listOfTasks.push(this.taskFromDialog);  
        this.filterByTags();      
      }

      this.taskFromDialog = new Task();
      this.taskFromDialog.tag = null;

    });
  }

  processTasksToDay(){
    this.filteredListOfTasks = this.dayData.listOfTasks.filter(task => {
      return this.removeTime(task.beginDate!).getTime() == this.removeTime(this.dayData.date).getTime() 
      && this.removeTime(task.endDate!).getTime() == this.removeTime(this.dayData.date).getTime()
    })

    this.filterByTags();

  }

  isImportant(){
    this.filteredListOfTasks.sort((a, b) => {
      if(a.important && !b.important) 
        return -1;
      else if(!a.important && b.important)
        return 1;

      return 0;
    })
  }

  filter(listOfTags: TagForMenu[]){
    this.localListOfTags = listOfTags;
    this.filterByTags();
  }

  filterByTags(){
    if(!this.localListOfTags.length){
      this.filteredListOfTasks = this.dayData.listOfTasks;
      this.isImportant();
      return;
    }
      

    const tags = this.localListOfTags.map(({tag}) => tag.id)
    const noTagSelected = tags.some(id => id == -1)

    this.filteredListOfTasks = this.dayData.listOfTasks.filter(({ tag }) => {
      if (tags.some(id => id == tag?.id)) return true
      if (noTagSelected && tag == null) return true
      return false
    })
    this.isImportant()
  }
}
