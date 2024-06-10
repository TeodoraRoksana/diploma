import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';


import { Task } from 'src/app/models/task';
import { Day } from 'src/app/models/day';
import { MonthlyPlanningDialogComponent } from '../monthly-planning/components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component';
import { GenerateMonth } from 'src/app/services/generate-month.service';

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
  @Input() dayData! : Day;
  currentDate = this.now()

  mode: string = 'day';
  taskFromDialog = new Task;

  calendar: Day[][] = this.generateMonth.getMonth(this.currentDate.getFullYear(), this.currentDate.getMonth());

  constructor(public dialog: MatDialog, private generateMonth: GenerateMonth) {}

  nextMonth(dir: number) {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + dir)
    this.calendar = this.generateMonth.getMonth(this.currentDate.getFullYear(), this.currentDate.getMonth());
  }

  today() {
    this.currentDate = this.now()
    this.calendar = this.generateMonth.getMonth(this.currentDate.getFullYear(), this.currentDate.getMonth());
  }

  now() {
    return new Date(Date.now())
  }

  formatMonthView() {
    const nowY = this.now().getFullYear()
    const y = this.currentDate.getFullYear()
    return this.currentDate.toLocaleString('en-US', { month: 'short' }) + ' ' + (y == nowY ? '' : y)
  }

  removeTime(date: Date) {
    let d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  openDialog(/*date: Date*/): void {
    //let dateForForm = date;
    
    const dialogRef = this.dialog.open
    (MonthlyPlanningDialogComponent, {
      data: {mode: this.mode, date: this.dayData.date},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.Name != '') {
        this.dayData.listOfTasks.push(result);
      }
    });
  }
}
