import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagDialogComponent } from 'src/app/components/tag-dialog/tag-dialog.component';
import { Tag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';

import errorData from '../../../../../../HttpErrorData.json';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-tag-edit-dialog',
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['./tag-edit-dialog.component.css']
})
export class TagEditDialogComponent {
  tagNameFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  tag_name_hint = "";

  tag = new Tag();

  constructor(
    public dialogRef: MatDialogRef<TagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public tagData: Tag,
    private tagService:TagService,
    ) {
      this.tag = tagData;

      console.log(tagData);
      
    }

    onNoClick(): void {
      this.dialogRef.close(null);
    }

    save(){
      if([this.tagNameFormControl,]
        .some(control => control.invalid))
        return;

        this.tagService
        .putTag(this.tag)
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

    delete(){
      //u shure??

      this.tagService
        .deleteTag(this.tag.id)
        .subscribe({
          next: (result: Tag) => {
            this.dialogRef.close(this.tag.id);
          },
          error: ({ error, message, status } : HttpErrorResponse) => {
            console.log('Unknown error:', error);
            this.tag_name_hint = 'Unknown error:' + error;
          }
        });
    }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (
      isSubmitted));
  }
}
