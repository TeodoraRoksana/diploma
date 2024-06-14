import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';

import { DayCellComponent } from '../day-cell/day-cell.component';
import { Day } from 'src/app/models/day';
import { Task } from 'src/app/models/task';


@Component({
  selector: 'app-week-cell',
  templateUrl: './week-cell.component.html',
  styleUrls: ['./week-cell.component.css'],
  // standalone: true,
  // imports: [
  //   MatButtonModule,
  //   DayCellComponent,
  //   NgFor,
  // ],
})
export class WeekCellComponent {
  // listOfDays: Day[] = [];
  @Input()
  listOfDays!: Day[];
  
  @Output() sortTasks = new EventEmitter<void>();
  @Output() newTask = new EventEmitter<Task>();

  sortViewTasks() {
    console.log('week emit');
    this.sortTasks.emit()
  }

  newTaskFromDay(task: Task){
    this.newTask.emit(task);
  }

  // ngOnInit() : void{
  //   //get from service days for current week
  //   for(var i = 1; i <= 7; i++){
  //     var day = new Day();
  //     day.numberOfDay = i;
  //     this.listOfDays.push(day);
  //   }
  // }
}
