import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

import { UserLogIn } from '../models/userLogIn';

import errorData from '../../../HttpErrorData.json';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "https://localhost:7142/User/";

  constructor(private http: HttpClient) { }

  public logIn(userLogIn: UserLogIn) : Observable<UserLogIn>{
    return this.http.post<UserLogIn>(`${this.url}LogIn`, userLogIn);
  }

}
