import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';


import { Task } from 'src/app/models/task';
import { Day } from 'src/app/models/day';
import { MonthlyPlanningDialogComponent } from '../monthly-planning-dialog/monthly-planning-dialog.component';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.css'],
  // standalone: true,
  // imports: [
  //   MatIconModule,
  //   MatButtonModule,
  //   NgFor,
  //   MatDialogModule,
  // ],
})
export class DayCellComponent {
  // numberOfDay = 0;
  
  @Input()  
  dayData! : Day;
  
  @Output() sortTasks = new EventEmitter<void>();

  mode:string = 'day';
  taskFromDialog = new Task;

  constructor(public dialog: MatDialog) {}

  sortViewTasks(){
    console.log('day emit');
    this.sortTasks.emit()
  }

  openDialog(/*date: Date*/): void {
    //let dateForForm = date;
    this.taskFromDialog.mode = this.mode;
    this.taskFromDialog.beginDate = this.dayData.date;
    this.taskFromDialog.endDate = this.dayData.date;

    console.log("[day-cell] ", this.taskFromDialog);
    
    const dialogRef = this.dialog.open
    (MonthlyPlanningDialogComponent, {
      data: this.taskFromDialog,
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

      if(result != null)
        this.dayData.listOfTasks.push(result);
    
      
    });
  }
  
  
}
