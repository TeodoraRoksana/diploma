import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

import errorData from '../../../../HttpErrorData.json';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.css']
})
export class TagDialogComponent {
  tagNameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  tag_name_hint = "";

  tag = new Tag();

  constructor(
    public dialogRef: MatDialogRef<TagDialogComponent>,
    
    private tagService:TagService,
    ) {}

    onNoClick(): void {
      this.dialogRef.close(null);
    }

    save(){
      if([this.tagNameFormControl,]
        .some(control => control.invalid))
        return;

        this.tag.usersId = 1; //add selector user id
        this.tagService
        .postTag(this.tag)
        .subscribe({
          next: (result: Tag) => {
            this.tag = result;
            this.dialogRef.close(this.tag);
          },
          error: ({ error, message, status } : HttpErrorResponse) => {
            if (error == errorData.TagNameAlreadyExist) {
              console.log('Fuck mate, find you!', error);
              this.tag_name_hint = "tag's name already exists!";
              this.tagNameFormControl.setErrors({tagExists: true});
            } else {
              console.log('Unknown error:', error);
              this.tag_name_hint = 'Unknown error:' + error;
            }
          }
        });

        //this.dialogRef.close(this.tag);
    }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (
      // control.dirty || control.touched || 
      isSubmitted));
  }
}
