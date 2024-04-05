import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';

import { DayCellComponent } from '../day-cell/day-cell.component';
import { Day } from 'src/app/models/day';


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

  // ngOnInit() : void{
  //   //get from service days for current week
  //   for(var i = 1; i <= 7; i++){
  //     var day = new Day();
  //     day.numberOfDay = i;
  //     this.listOfDays.push(day);
  //   }
  // }
}
