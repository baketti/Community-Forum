import { IPost } from '@/app/models/Post';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';
import { PostsService } from '@/app/services/posts/posts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.scss'
})
export class CreatePostDialogComponent implements OnInit{

  newPostForm!:FormGroup;
  get isDisabled():boolean{
    return this.newPostForm.invalid;
  };

  constructor(
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    public loadingSrv: LoadingService,
    private postSrv: PostsService,
    private snackMessage: SnackbarMessageService,
    private formValidationService: FormValidationService,
    private paginationSrv: PaginationService
  ){}

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      title: new FormControl('', [
        Validators.required, 
        Validators.minLength(3)
      ]),
      body: new FormControl('', [
        Validators.required, 
        Validators.minLength(4)
      ])
    });
  }

  onSubmit():void {
    const newPost = this.newPostForm.value;
    this.postSrv.postPost(newPost).subscribe({
      next: (post) => {
        console.log("Post created: ", post);
        this.closeDialog(post);
        this.paginationSrv.setPaginationAfterCreate();
        this.snackMessage.show({
          message:"Post created successfully!",
          duration: 5000
        });
      },
      error: (err) => {
        this.snackMessage.show({
          message:"Error while creating post..."
        });
      }
    });
  }

  closeDialog(post:IPost) {
    console.log("Post created closeDialog : ", post);
    this.dialogRef.close(post);
  }

  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(
      fieldName,
      this.newPostForm
    );
  }

  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.newPostForm
    );
}

}
