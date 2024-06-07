import { Component, Input } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ColorDefinitionService } from 'src/app/services/color-definition.service';

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

  taskColor = "#ffffff";

  constructor(
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
  }
}
