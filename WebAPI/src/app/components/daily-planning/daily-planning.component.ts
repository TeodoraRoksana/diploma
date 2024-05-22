import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';


import { Task } from 'src/app/models/task';
import { Day } from 'src/app/models/day';
import { MonthlyPlanningDialogComponent } from '../monthly-planning/components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component';

@Component({
  selector: 'app-daily-planning',
  templateUrl: './daily-planning.component.html',
  styleUrls: ['./daily-planning.component.css']
  // standalone: true,
  // imports: [
  //   MatIconModule,
  //   MatButtonModule,
  //   NgFor,
  //   MatDialogModule,
  // ],
})

export class DailyPlanningComponent {
  @Input()  
  dayData! : Day;

  mode: string = 'day';
  taskFromDialog = new Task;

  constructor(public dialog: MatDialog) {}

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