import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

import { Day } from 'src/app/models/day';
import { MenuComponent } from '../menu/menu.component';
import { WeekCellComponent } from './components-for-calendar/week-cell/week-cell.component';

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
  ],
})

export class MonthlyPlanningComponent {
  daysOfMonthWeek1:Day[] = [];
  daysOfMonthWeek2:Day[] = [];
  daysOfMonthWeek3:Day[] = [];
  daysOfMonthWeek4:Day[] = [];
  daysOfMonthWeek5:Day[] = [];


  ngOnInit() : void{
    for(var i = 26; i <= 29; i++){
      var day = new Day();
      day.numberOfDay = i;
      this.daysOfMonthWeek1.push(day);
    }
    for(var i = 1; i <= 3; i++){
      var day = new Day();
      day.numberOfDay = i;
      this.daysOfMonthWeek1.push(day);
    }
    for(var i = 4; i <= 10; i++){
      var day = new Day();
      day.numberOfDay = i;
      this.daysOfMonthWeek2.push(day);
    }
    for(var i = 11; i <= 17; i++){
      var day = new Day();
      day.numberOfDay = i;
      this.daysOfMonthWeek3.push(day);
    }
    for(var i = 18; i <= 24; i++){
      var day = new Day();
      day.numberOfDay = i;
      this.daysOfMonthWeek4.push(day);
    }
    for(var i = 25; i <= 31; i++){
      var day = new Day();
      day.numberOfDay = i;
      this.daysOfMonthWeek5.push(day);      
    }
  }
}
