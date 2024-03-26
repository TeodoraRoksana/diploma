import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
})
export class DayCellComponent {
  // numberOfDay = 0;

  @Input()  
  numberOfDay! : number;

  
  
  
}
