import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task";
import { TaskByDate } from "../models/taskByDate";
import { MonthlyPlanningDialogComponent } from "../components/monthly-planning/components-for-calendar/monthly-planning-dialog/monthly-planning-dialog.component";

@Injectable({
    providedIn: 'root'
  })
  export class TaskService {
    private url = "https://localhost:7142/Tasks";
  
    constructor(private http: HttpClient) { }
  
    public getTaskByUserId(userId: number) : Observable<Task[]>{
      return this.http.get<Task[]>(`${this.url}` + '?user_id=' + 3); // change
    }
  
    public postTask(task: Task) : Observable<Task>{
      task.userId = 3; //store userId
      task.beginDate = MonthlyPlanningDialogComponent.toISODate(task.beginDate!)
      task.endDate = MonthlyPlanningDialogComponent.toISODate(task.endDate!)

      return this.http.post<Task>(`${this.url}`, task);
    }
  
    public putTask(task: Task) : Observable<Task>{
      task.userId = 3; //store userId
      task.beginDate = MonthlyPlanningDialogComponent.toISODate(task.beginDate!)
      task.endDate = MonthlyPlanningDialogComponent.toISODate(task.endDate!)
      
      return this.http.put<Task>(`${this.url}`, task)
    }

    public deleteTask(id: number) : Observable<Task>{
        return this.http.delete<Task>(`${this.url}` + '?id=' + id);
    }

    public getTaskForCurrentPage(data: TaskByDate) : Observable<Task[]>{
      data.user_Id = 3;
        return this.http.post<Task[]>(`${this.url}/GetTasksByDate`, data);
      }
  }