import { Component, EventEmitter, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTreeModule} from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';
import { Tag } from 'src/app/models/tag';
import { ColorDefinitionService } from 'src/app/services/color-definition.service';
import { TagEditDialogComponent } from './components-for-menu/tag-edit-dialog/tag-edit-dialog.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTags, selectTagsFromStore } from 'src/app/store/tags/tag.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from 'src/app/store/app.state';
import { setListOfTags } from 'src/app/store/tags/tag.actions';
import { TagForMenu } from 'src/app/models/tagForMenu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[
    ColorDefinitionService,
  ]
  // standalone: true,
  // imports: [
  //   MatIconModule,
  //   MatButtonModule,
  //   MatMenuModule,
  //   MatTabsModule,
  //   MatTreeModule,
  // ],
})
export class MenuComponent {
  @Output() sortTasks = new EventEmitter<TagForMenu[]>();
  listTagsForFilter: Tag[] = [];

  showPlanningTree = true;
  showFilterTree = true;

  currentMonth = new Date;
  nameOfMonth = this.currentMonth.getMonth();

  listOfTags = new Array<Tag>();
  listOfTagsWithFlags: TagForMenu[] = [];

  constructor(
    public dialog: MatDialog,
    private colorDefinitionService: ColorDefinitionService,
    private router: Router,
    private store:Store<AppState>
  ) {
    store.select(selectTagsFromStore)
    .subscribe({
      next: (result: Tag[]) => {
        this.listOfTags = JSON.parse(JSON.stringify(result));
        this.convertTags();
        //result.forEach(t => this.listOfTags.push(Object.assign({}, t)));
      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        console.log('Tag get from store error:', error);
      }
    });
  }

  convertTags(){
    const noTag = new Tag()
    noTag.id = -1
    noTag.name = 'No Tag'
    noTag.usersId = 1

    const isSelected = false

    this.listOfTagsWithFlags = [{ tag: noTag, isSelected }].concat(this.listOfTags.map(tag => ({ tag, isSelected })))
  }

  sortViewTasks(){
    console.log('menu emit');
    this.sortTasks.emit(this.listOfTagsWithFlags.filter(t => t.isSelected));
  }

  addTagForFilter(tag: Tag, noTag?:string){
    if(noTag){
      let t = new Tag();
      t.id = -1;
      this.listTagsForFilter.push(t);
      this.sortViewTasks();
    }
    else{
      this.listTagsForFilter.push(tag);
      this.sortViewTasks();
    }
  }

  removeTagForFilter(tag: Tag, noTag?:string){
    let id = noTag ? -1 : tag.id;

    for(let i = 0; i < this.listOfTags.length; i++){
      if(this.listOfTags[i].id == id){
        this.listOfTags.splice(i, 1);
        break;
      }
    }

    this.sortViewTasks();
  }

  showHidePlanningTree(){
    this.showPlanningTree = !this.showPlanningTree;
  }

  showHideFiltersTree(){
    this.showFilterTree = !this.showFilterTree;
  }

  openDialogAddTag(){

    const dialogRef = this.dialog.open
    (TagDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(!result){ //fine?
        return;
      }
      this.listOfTags.push(result);
      this.store.dispatch(setListOfTags({ tags: this.listOfTags }));
      //store push
    });
  }

  openDialogEditTag($event: Event, tag: Tag){
    $event.stopPropagation()
    const dialogRef = this.dialog.open
    (TagEditDialogComponent, {
      data: tag,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(!result){ //fine?
        return;
      }
      if(typeof result == "number"){
        for(let i = 0; i < this.listOfTags.length; i++){
          if(this.listOfTags[i].id == result){
            this.listOfTags.splice(i, 1);
            break;
          }
        }
      }
      //store push
      console.log('list:' + this.listOfTags);
      
      this.store.dispatch(setListOfTags({ tags: this.listOfTags }));
    });
  }

  colorBlack(color: string) : boolean{
    return this.colorDefinitionService.shouldTextBeBlack(color);
  }

  redirect(page: string){
    this.router.navigate([page]);
  }
}

