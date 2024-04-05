import { Component } from '@angular/core';
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

  
  // signin: FormGroup = new FormGroup({
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  // });

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router) { }

  logIn(){

    this.router.navigate(['/MonthlyPlaning']);
  }

  userLogIn(/*e:Event*/){
    //e.preventDefault();
    //send to server
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }
    
    this.router.navigate(['/monthly-planning']);
    console.time('click');
  }
}
