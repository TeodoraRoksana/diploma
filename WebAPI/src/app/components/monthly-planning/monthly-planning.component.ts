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
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgFor,
    MenuComponent,
    WeekCellComponent,
    MatDialogModule,
  ],
})

export class MonthlyPlanningComponent {
  daysOfMonthWeek:Day[][] = new Array(new Array);
  listOfNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  taskFromDialog = new Task;

  constructor(public dialog: MatDialog) {}

  ngOnInit() : void{
    console.timeEnd('click');

    const list:Day[] = [];

    const dayInMs = 86_400_000;

    const targetYear = 2024;
    const targetMonth = 2;

    let date = new Date(targetYear, targetMonth, 1);
    const offset = ((date.getDay() + 6) % 7) * dayInMs
    date = new Date(date.getTime() - offset);

    let endDate = new Date(targetYear, targetMonth + 1, 1)
    const offset2 = ((8 - endDate.getDay()) % 7) * dayInMs
    endDate = new Date(endDate.getTime() + offset2);

    while(date.getTime() < endDate.getTime()){
      var day = new Day();
      day.date = date;
      list.push(day);

      date = new Date(date.getTime() + dayInMs);
    }

    this.daysOfMonthWeek = list.reduce<Day[][]>((resultArray, item, index) => { 
      const chunkIndex = Math.floor(index/7)
    
      if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
    
      resultArray[chunkIndex].push(item)
    
      return resultArray
    }, [])
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
        if (day.date.getTime() == this.taskFromDialog.date.getTime()) {
          day.listOfTasks.push(this.taskFromDialog);
          break;
        }
      }

    console.timeEnd('saveTask');
    });
  }
}
