import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserLogIn } from '../../models/userLogIn';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  userLog = new UserLogIn;

  constructor(private router: Router) { }

  logIn(){

    this.router.navigate(['/MonthlyPlaning']);
  }
}
