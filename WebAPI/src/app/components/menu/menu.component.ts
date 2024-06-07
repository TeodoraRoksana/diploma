import { Component } from '@angular/core';
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
  showPlanningTree = true;
  showFilterTree = true;

  currentMonth = new Date;
  nameOfMonth = this.currentMonth.getMonth();

  listOfTags = new Array<Tag>();

  constructor(
    public dialog: MatDialog,
    private colorDefinitionService: ColorDefinitionService,
    private router: Router,
    private store:Store<AppState>
  ) {
    store.select(selectTagsFromStore)
    .subscribe({
      next: (result: Tag[]) => {
        this.listOfTags = JSON.parse(JSON.stringify(result))
        //result.forEach(t => this.listOfTags.push(Object.assign({}, t)));
      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        console.log('Tag get from store error:', error);
      }
    });
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

  openDialogEditTag(tag: Tag){
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

