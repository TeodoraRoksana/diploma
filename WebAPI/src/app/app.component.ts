import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setListOfTags } from './store/tags/tag.actions';
import { TagService } from './services/tag.service';
import { Tag } from './models/tag';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Plan B';

  constructor(private store:Store<AppState>,
    tagService: TagService
  ){

    tagService
    .getTagByUserId(1) //store userId
    .subscribe({
      next: (tags: Tag[]) => {
        this.store.dispatch(setListOfTags({ tags }));
        console.log("get tag!", tags);
        
      },
      error: ({ error, message, status } : HttpErrorResponse) => {
        console.log('Tag get error:', error);
      }
    });
    
    this.store.subscribe((snapshot) => console.log(snapshot));
  }
}
