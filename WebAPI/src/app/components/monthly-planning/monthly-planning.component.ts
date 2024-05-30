import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

import { Day } from 'src/app/models/day';
import { MenuComponent } from '../menu/menu.component';
import { WeekCellComponent } from './components-for-calendar/week-cell/week-cell.component';
import {MonthlyPlanningDialogComponent} from './components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component'
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-monthly-planning',
  templateUrl: './monthly-planning.component.html',
  styleUrls: ['./monthly-planning.component.css'],
  // standalone: true,
  // imports: [
  //   MatIconModule,
  //   MatButtonModule,
  //   NgFor,
  //   MenuComponent,
  //   WeekCellComponent,
  //   MatDialogModule,
  // ],
})

export class MonthlyPlanningComponent {
  dayInMs = 86_400_000;

  daysOfMonthWeek: Day[][] = new Array(new Array);
  listOfNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  taskFromDialog = new Task;

  currentDate = new Date(Date.now())
  year = this.currentDate.getFullYear()
  month = this.currentDate.getMonth()

  monthName = this.formatMonthView()

  constructor(public dialog: MatDialog) {}

  ngOnInit() : void{
    this.daysOfMonthWeek = this.getMonth(this.year, this.month);
  }

  getMonth(year: number, month: number): Day[][] {
    const list: Day[] = [];

    let date = new Date(year, month, 1);
    const offset = ((date.getDay() + 6) % 7);
    let day = 1 - offset
    date = new Date(year, month, day);

    let endDate = new Date(year, month + 1, 1);
    const offset2 = ((8 - endDate.getDay()) % 7);
    endDate = new Date(year, month + 1, 1 + offset2);

    while(date.getTime() < endDate.getTime()){
      const greyed = this.fit(this.month, 12) !== date.getMonth()
      
      list.push(new Day(date, greyed));

      date = new Date(year, month, ++day);
    }

    return list.reduce<Day[][]>((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/7)
    
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
    
      resultArray[chunkIndex].push(item)
    
      return resultArray
    }, [])
  }

  nextMonth(dir: number) {
    this.month += dir

    this.currentDate = new Date(this.year, this.month)

    this.monthName = this.formatMonthView()
    
    this.daysOfMonthWeek = this.getMonth(this.year, this.month);
  }

  today() {
    this.currentDate = new Date(Date.now())
    this.year = this.currentDate.getFullYear()
    this.month = this.currentDate.getMonth()
    this.monthName = this.formatMonthView()
    
    this.daysOfMonthWeek = this.getMonth(this.year, this.month);
  }

  private fit(v: number, r: number) {
    return (v % r + r) % r
  }

  private formatMonthView() {
    const y = this.currentDate.getFullYear()
    return this.currentDate.toLocaleString('en-US', { month: 'long' }) + ' ' + (y == this.year ? '' : y)
  }

  openDialog(): void {
    //let dateForForm = date;
    console.time('dialog');
    
    const dialogRef = this.dialog.open
    (MonthlyPlanningDialogComponent, {
      data: {mode: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.taskFromDialog = result;
    
      for (const day of this.daysOfMonthWeek.flat(2)) {
        if (day.date.getTime() == this.taskFromDialog.beginDate.getTime()) {
          day.listOfTasks.push(this.taskFromDialog);
          break;
        }
      }

    console.timeEnd('saveTask');
    });
  }
}
