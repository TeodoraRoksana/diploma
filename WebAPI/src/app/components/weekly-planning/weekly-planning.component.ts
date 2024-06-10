import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Day } from 'src/app/models/day';
import { Task } from 'src/app/models/task';
import { TaskByDate } from 'src/app/models/taskByDate';
import { TaskService } from 'src/app/services/task.service';
import { MonthlyPlanningDialogComponent } from '../monthly-planning/components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component';

@Component({
  selector: 'app-weekly-planning',
  templateUrl: './weekly-planning.component.html',
  styleUrls: ['./weekly-planning.component.css']
})
export class WeeklyPlanningComponent {
  @Input() generalListOfTasks: Task[] = [];
  filtredListOfTasks: Task[] = [];
  
  days: Day[] = [];
  weekTasks: Task[] = [];

  taskByDate = new TaskByDate();
  listOfNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  taskFromDialog = new Task;

  @Input() currentDate = this.now();

  constructor(
    public dialog: MatDialog, 
    private taskService: TaskService
  ) {}

  ngOnInit() : void{
    this.generateWeek();
    this.taskFromDialog.tag = null;

    this.taskByDate.user_Id = 1;
    this.taskByDate.typeDate = "week";
    this.taskByDate.date = this.currentDate;
    
    this.fetchWeek();
  }

  now() {
    return new Date(Date.now())
  }

  goWeek(dir: number) {
    this.currentDate = new Date(this.y(), this.m(), this.d() + 7 * dir)
    this.ngOnInit()
    this.processTasksToDays()
  }

  today() {
    this.currentDate = this.now() 
    this.ngOnInit()
    this.processTasksToDays()
  }

  y() { return this.currentDate.getFullYear() }
  m() { return this.currentDate.getMonth() }
  d() { return this.currentDate.getDate() }

  formatMonthView() {
    const nowY = this.now().getFullYear()

    const d1 = this.getThisWeeksMonday(this.currentDate)
    const d2 = this.addDay(this.getNextWeeksMonday(this.currentDate), -1)

    const m1 = d1.getMonth()
    const m2 = d2.getMonth()

    const y1 = d1.getFullYear()
    const y2 = d2.getFullYear()

    return (
      d1.getDate()
      + (
        m1 == m2
          ? ''
          : (' ' + d1.toLocaleString('en-US', { month: 'long' }))
        )
      + (
        (y1 == y2)
          ? ''
          : (' ' + y1)
        )
      + ' - '
      + d2.getDate()
      + ' '
      + d2.toLocaleString('en-US', { month: 'long' })
      + (
        (y1 == y2 && y2 == nowY)
          ? ''
          : (' ' + y2)
      )
    )
  }

  processTasksToDays() {
    this.weekTasks = this.filtredListOfTasks.filter(t => t.mode == "week" && this.belongsToThisWeek(t.beginDate!));
    const dayTasks = this.filtredListOfTasks.filter(t => t.mode == "day" && this.belongsToThisWeek(t.beginDate!));

    const weekTasksMap = dayTasks.reduce((acc, v) => {
      const key = this.removeTime(v.beginDate!).getTime()
      const tasks = acc.get(key)
      tasks
        ? tasks.push(v)
        : acc.set(key, [v])
      return acc
    }, new Map<number, Task[]>())

    this.days.forEach(day => {
      const key = this.removeTime(day.date).getTime()
      const tasks = weekTasksMap.get(key)
      day.listOfTasks = tasks || []
    })
  }

  fetchWeek() {
    this.taskService
    .getTaskForCurrentPage(this.taskByDate) //store userId
    .subscribe({
      next: (result: Task[]) => {
        this.generalListOfTasks = result;
      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        console.log('Unknown error:', error);
      }
    });
  }

  generateWeek() {
    const list: Day[] = [];

    const start = this.getThisWeeksMonday(this.currentDate)
    const end = this.getNextWeeksMonday(this.currentDate)

    let date = new Date(start)

    while (date.getTime() < end.getTime()) {
      list.push(new Day(date, false))
      date = this.addDay(date)
    }

    this.days = list
  }

  addDay(date: Date, dir?: number) {
    const d = new Date(date)
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (dir || 1))
  }

  getThisWeeksMonday(date: Date) {
    const d = new Date(date)
    const offset = (d.getDay() - 1 + 7) % 7
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - offset)
  }

  getNextWeeksMonday(date: Date) {
    return this.addDay(this.getThisWeeksMonday(date), 7)
  }

  removeTime(date: Date) {
    let d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  belongsToThisWeek(date: Date) {
    const d = new Date(date)
    const d1 = this.getThisWeeksMonday(d)
    const d2 = this.getThisWeeksMonday(this.currentDate)
    return d1.getTime() == d2.getTime()
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open
    (MonthlyPlanningDialogComponent, {
      data: this.taskFromDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.taskFromDialog = new Task;
        this.taskFromDialog.tag = null;
        return;
      }
      
      this.taskFromDialog = result; 
      
      if (this.belongsToThisWeek(this.taskFromDialog.beginDate!)) {
        this.generalListOfTasks.push(this.taskFromDialog);
        this.processTasksToDays()
      }

      this.taskFromDialog = new Task;
      this.taskFromDialog.tag = null;
    });
  }
}
