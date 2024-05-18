import { Component } from '@angular/core';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { UserSignUp } from 'src/app/models/userSignUp';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (
      // control.dirty || control.touched || 
      isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userSignUp = new UserSignUp;
  hidePassword = true;
  hideRequired="true";

  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router) { }

  signUp(){
    //send to server
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid || this.nameFormControl.invalid) {
      return;
    }
    
    this.router.navigate(['/monthly-planning']);
  }
}
