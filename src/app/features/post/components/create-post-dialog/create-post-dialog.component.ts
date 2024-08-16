import { AppState } from '@/app/core/store/app/app.state';
import { postPostRequest, postPostResponseFailure, postPostResponseSuccess } from '@/app/features/post/store/posts/posts.actions';
import { IPost, Post } from '@/app/models/Post';
import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.scss'
})
export class CreatePostDialogComponent implements OnDestroy{
  private subscription: Subscription;
  newPostForm:FormGroup;
  get isDisabled():boolean{
    return this.newPostForm.invalid;
  };

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    public loadingSrv: LoadingService,
    private dialogHandlerSrv: DialogHandlerService,
    private formValidationService: FormValidationService,
    public dialogRef: MatDialogRef<CreatePostDialogComponent>
  ){
    this.newPostForm = this.initNewPostForm;
    this.subscription = this.subscribeActions();
  }

  private get initNewPostForm(): FormGroup {
    return new FormGroup({
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
    const post: Post = this.newPostForm.value;
    this.store.dispatch(postPostRequest({post}))
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

  subscribeActions(): Subscription {
    return merge(
      this.actions$.pipe(ofType(postPostResponseSuccess)),
      this.actions$.pipe(ofType(postPostResponseFailure))
    ).subscribe(action => {
      switch(action.type){
        case(postPostResponseSuccess.type):
          this.closeDialog(action.post);
          break;
        case(postPostResponseFailure.type):
          this.closeDialog(null);
          break;        
      }
    });
  }

  closeDialog(post: IPost|null) {
    this.dialogHandlerSrv.setIsDialogClosed();
    this.dialogRef.close(post);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
