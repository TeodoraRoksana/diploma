import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgFor } from '@angular/common';

import { Task } from 'src/app/models/task';
import { Day } from 'src/app/models/day';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgFor,
  ],
})
export class DayCellComponent {
  // numberOfDay = 0;
  
  @Input()  
  dayData! : Day;

  
  
  
}
