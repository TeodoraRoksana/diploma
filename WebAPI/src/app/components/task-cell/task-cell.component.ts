import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { ColorDefinitionService } from 'src/app/services/color-definition.service';
import { TaskEditDialogComponent } from './components-for-task/task-edit-dialog/task-edit-dialog.component';
import { MonthlyPlanningComponent } from '../monthly-planning/monthly-planning.component';

@Component({
  selector: 'app-task-cell',
  templateUrl: './task-cell.component.html',
  styleUrls: ['./task-cell.component.css'],
  providers:[
    ColorDefinitionService,
  ]
})
export class TaskCellComponent {
  @Input() task!: Task;
  @Input() refreshPageFunctoin!: Function
  
  @Output() sortTasks = new EventEmitter<number>();

  oldDate!: Date | null;

  taskColor = "#ffffff";

  constructor(
    public dialog: MatDialog,
    private colorDefinitionService: ColorDefinitionService,
  ){
  }

  colorBlack(color: string) : boolean{
    return this.colorDefinitionService.shouldTextBeBlack(color);
  }

  ngOnInit() {
    if(this.task.tag != null){
      this.taskColor = this.task.tag?.color;
    }

    this.oldDate = new Date(this.task.beginDate!);

  }

  openDialogEditTask(task: Task){
    //console.log("[task-cell] ", this.taskFromDialog);
    const dialogRef = this.dialog.open
    (TaskEditDialogComponent, {
      data: task,
    });
    
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('cell emit');
      this.sortTasks.emit()

      if(!result){ //fine?
        return;
      }
      //this.taskFromDialog = result; 
      console.log("taskFromDialog edit ", this.task);
      
      if(this.task.mode != 'day' 
        || MonthlyPlanningComponent.removeTime(task.beginDate!).getTime() != 
        (MonthlyPlanningComponent.removeTime(this.oldDate!).getTime())){//filter?
        //reset tasks in page
        if(this.refreshPageFunctoin)
          Function.call(this.refreshPageFunctoin);
        else
          console.log("reset page!");
        
      }
    });
  }
}
