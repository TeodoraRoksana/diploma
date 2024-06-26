import { Component, SimpleChanges } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import { Day } from 'src/app/models/day';
import { MenuComponent } from '../menu/menu.component';
import { WeekCellComponent } from './components-for-calendar/week-cell/week-cell.component';
import {MonthlyPlanningDialogComponent} from './components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component'
import { Task } from 'src/app/models/task';
import { GenerateMonth } from 'src/app/services/generate-month.service';
import { TaskService } from 'src/app/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskByDate } from 'src/app/models/taskByDate';
import { Router } from '@angular/router';
import { TagForMenu } from 'src/app/models/tagForMenu';

@Component({
  selector: 'app-monthly-planning',
  templateUrl: './monthly-planning.component.html',
  styleUrls: ['./monthly-planning.component.css'],
  providers: [
    GenerateMonth
  ]
})

export class MonthlyPlanningComponent {
  generalListOfTasks: Task[] = [];
  filtredListOfTasks: Task[] = [];

  localListOfTags: TagForMenu[] = [];

  monthTasks: Task[] = [];
  weekTasks: Task[] = [];
  tasksByWeeks: {
    start: Date,
    end: Date,
    tasks: Task[],
  }[] = [];
  dayTasks: Task[] = [];
  dayTasksMap?: Map<number, Task[]>;
  weekTasksMap?: Map<number, Task[]>;

  taskByDate = new TaskByDate();

  dayInMs = 86_400_000;

  daysOfMonthWeek: Day[][] = new Array(new Array);
  listOfNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  taskFromDialog = new Task;

  currentDate = new Date(Date.now())
  year = this.currentDate.getFullYear()
  month = this.currentDate.getMonth()

  monthName = this.formatMonthView()

  constructor(public dialog: MatDialog, 
    private generateMonth : GenerateMonth, 
    private taskService:TaskService,
    private router: Router,
  ) {}

  ngOnInit() : void{
    this.daysOfMonthWeek = this.generateMonth.getMonth(this.year, this.month);
    this.taskFromDialog.tag = null;

    this.taskByDate.user_Id = 1;
    this.taskByDate.typeDate = "month";
    this.taskByDate.date = this.currentDate;
    
    this.fetchMonth();

  }

  isImportant(){
    this.filtredListOfTasks.sort((a, b) => {
      if(a.important && !b.important) 
        return -1;
      else if(!a.important && b.important)
        return 1;

      return 0;
    })
  }

  sortViewTasks(){
    console.log('month call');

    //this.filtredListOfTasks = this.generalListOfTasks
    
    

    this.monthTasks = this.filtredListOfTasks.filter(t => t.mode == "month" && this.belongsToThisMonth(t.beginDate!));
    this.weekTasks = this.filtredListOfTasks.filter(t => t.mode == "week" && (this.belongsToThisMonth(t.beginDate!) || this.belongsToThisMonth(t.endDate!)));
    this.dayTasks = this.filtredListOfTasks.filter(t => t.mode == "day" && this.belongsToThisMonth(t.beginDate!));

    this.dayTasksMap = this.dayTasks.reduce((acc, v) => {
      const key = MonthlyPlanningComponent.removeTime(v.beginDate!).getTime()
      const tasks = acc.get(key)
      tasks
        ? tasks.push(v)
        : acc.set(key, [v])
      return acc
    }, new Map<number, Task[]>())

    this.weekTasksMap = this.weekTasks.reduce((acc, v) => {
      const key = MonthlyPlanningComponent.removeTime(v.beginDate!).getTime()
      const tasks = acc.get(key)
      tasks
        ? tasks.push(v)
        : acc.set(key, [v])
      return acc
    }, new Map<number, Task[]>())

    // console.log('Map', [...this.dayTasksMap.entries()]);

    for (const day of this.daysOfMonthWeek.flat(2)) {
      const key = MonthlyPlanningComponent.removeTime(day.date).getTime()
      const tasks = this.dayTasksMap.get(key)
      
      if (tasks) {
        day.listOfTasks = tasks
      } else {
        day.listOfTasks = []
      }
    }
    
    this.tasksByWeeks = []
    for (const week of this.daysOfMonthWeek) {
      const firstDayOfTheWeek = week.at(0)!
      const key = MonthlyPlanningComponent.removeTime(firstDayOfTheWeek.date).getTime()
      const tasks = this.weekTasksMap.get(key)
      
      const start = firstDayOfTheWeek.date;
      const end = new Date(
        firstDayOfTheWeek.date.getFullYear(),
        firstDayOfTheWeek.date.getMonth(),
        firstDayOfTheWeek.date.getDate() + 6
      );

      if (tasks) {
        this.tasksByWeeks.push({ start, end, tasks })
      } else {
        this.tasksByWeeks.push({ start, end, tasks: [] })
      }
    }
  }

  fetchMonth(){
    this.taskService
    .getTaskForCurrentPage(this.taskByDate) //store userId
    .subscribe({
      next: (result: Task[]) => {
        this.generalListOfTasks = result;
        this.filtredListOfTasks = result; //filtr

        // console.table(this.generalListOfTasks);
        
        //this.sortViewTasks();
        this.filterByTags();

      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        console.log('Unknown error:', error);
      }
    });
  }

  nextMonth(dir: number) {
    this.month += dir

    this.currentDate = new Date(this.year, this.month)

    this.monthName = this.formatMonthView()
    
    this.daysOfMonthWeek = this.generateMonth.getMonth(this.year, this.month);

    this.taskByDate.date = new Date(this.year, this.month+1);
    this.fetchMonth();
  }

  today() {
    this.currentDate = new Date(Date.now())
    this.year = this.currentDate.getFullYear()
    this.month = this.currentDate.getMonth()
    this.monthName = this.formatMonthView()
    
    this.daysOfMonthWeek = this.generateMonth.getMonth(this.year, this.month);
    
    this.taskByDate.date = new Date(this.year, this.month+1);
    this.fetchMonth();
  }


  private formatMonthView() {
    const y = this.currentDate.getFullYear()
    return this.currentDate.toLocaleString('en-US', { month: 'long' }) + ' ' + (y == this.year ? '' : y)
  }

  openDialog(mode?: string, beginDate?: Date, endDate?: Date): void {
    if(mode)
      this.taskFromDialog.mode = mode;
    if(beginDate && endDate){
      this.taskFromDialog.beginDate = new Date(beginDate);
      this.taskFromDialog.endDate = new Date(endDate);
    }
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
      
      if (this.belongsToThisMonth(this.taskFromDialog.beginDate!) || this.belongsToThisMonth(this.taskFromDialog.endDate!)) {
        this.generalListOfTasks.push(this.taskFromDialog);
        this.filterByTags();
        //this.sortViewTasks()
      }


      this.taskFromDialog = new Task();
      this.taskFromDialog.tag = null;

    });
  }

  static removeTime(date: Date) {
    let d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  belongsToThisMonth(date: Date) {
    const d = new Date(date)
    const d1 = new Date(d.getFullYear(), d.getMonth())
    const d2 = new Date(this.year, this.month)
    return d1.getTime() == d2.getTime()
  }

  
  routeToWeek(date: Date){
    this.router.navigate(['weekly-planning/' + date.toISOString()]);
  }

  filter(listOfTags: TagForMenu[]){
    this.localListOfTags = listOfTags;
    this.filterByTags();
  }

  filterByTags(){
    // if(id){
    //   for(let i = 0; i < this.generalListOfTasks.length; i++){
    //     if(this.generalListOfTasks[i].id == id){
    //       this.generalListOfTasks.splice(i, 1);
    //       break;
    //     }
    //   }
    // }

    if(!this.localListOfTags.length){
      this.filtredListOfTasks = this.generalListOfTasks;
      this.isImportant();
      this.sortViewTasks();
      return;
    }
      

    const tags = this.localListOfTags.map(({tag}) => tag.id)
    const noTagSelected = tags.some(id => id == -1)

    this.filtredListOfTasks = this.generalListOfTasks.filter(({ tag }) => {
      if (tags.some(id => id == tag?.id)) return true
      if (noTagSelected && tag == null) return true
      return false
    })
    this.isImportant();
    this.sortViewTasks()
  }

  newTaskFromDay(newTask: Task){
    this.generalListOfTasks.push(newTask);
    this.filterByTags();
  }
}
