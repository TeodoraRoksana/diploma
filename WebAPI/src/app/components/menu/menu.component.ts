import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTreeModule} from '@angular/material/tree';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatTreeModule,
  ],
})
export class MenuComponent {
  

  currentMonth = new Date;
  nameOfMonth = this.currentMonth.getMonth();
}
