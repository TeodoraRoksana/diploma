import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  // FormsModule,
  // ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
// import {MatInputModule} from '@angular/material/input';
// import {NgIf} from '@angular/common';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';


import { UserLogIn } from '../../models/userLogIn';
import { UsersService } from 'src/app/services/users.service';
import { Observable, catchError, throwError, of } from 'rxjs';
import errorData from '../../../../HttpErrorData.json';
import { HttpErrorResponse } from '@angular/common/http';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (
      // control.dirty || control.touched || 
      isSubmitted));
  }
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  // standalone: true,
  // imports: [
  //   FormsModule, 
  //   MatInputModule, 
  //   ReactiveFormsModule, 
  //   NgIf, 
  //   MatIconModule,
  //   MatButtonModule,
  // ],
})
export class LogInComponent {
  userLog = new UserLogIn;
  hidePassword = true;
  hideRequired="true";
  email_hint = "";
  resultLogIn = new UserLogIn;

  
  // signin: FormGroup = new FormGroup({
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  // });

  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private userService:UsersService
  ) { }

  logIn(){

    this.router.navigate(['/MonthlyPlaning']);
  }

  userLogIn(/*e:Event*/){
    //e.preventDefault();
    //send to server
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    this.userService
    .logIn(this.userLog)
    .subscribe({
      next: (result: UserLogIn) => {
        this.resultLogIn = result;
        this.router.navigate(['/monthly-planning']);
      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        if (error == errorData.UserEmailNotFound) {
          console.log('Fuck mate, can`t find you!', error);
          this.email_hint = error;
          this.emailFormControl.setErrors({emailNotExists: true});
        } else {
          console.log('Unknown error:', error);
          this.email_hint = 'Default message';
        }
      }
    });
  }
}
