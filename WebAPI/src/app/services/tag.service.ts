import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

import { UserLogIn } from '../models/userLogIn';

import errorData from '../../../HttpErrorData.json';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "https://localhost:7142/Tag/";

  constructor(private http: HttpClient) { }

  public getTagByUserId(userId: number) : Observable<Tag[]>{
    return this.http.post<Tag[]>(`${this.url}LogIn`, userId); // change
  }

}
