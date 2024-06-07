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
export class TagService {
  private url = "https://localhost:7142/FilterNames";

  constructor(private http: HttpClient) { }

  public getTagByUserId(userId: number) : Observable<Tag[]>{
    return this.http.get<Tag[]>(`${this.url}` + '?user_id=' + userId); // change
  }

  public postTag(tag: Tag) : Observable<Tag>{
    return this.http.post<Tag>(`${this.url}`, tag);
  }

  public putTag(tag: Tag) : Observable<Tag>{
    return this.http.put<Tag>(`${this.url}`, tag)
  }

  public deleteTag(id: number) : Observable<Tag>{
    return this.http.delete<Tag>(`${this.url}` + '?id=' +  id)
  }
}
