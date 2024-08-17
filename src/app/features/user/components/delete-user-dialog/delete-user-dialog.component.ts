import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/core/services/notification/snackbar-message.service';
import { deleteUserRequest, deleteUserResponseFailure, deleteUserResponseSuccess } from '@/app/features/user/store/users/users.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription, merge } from 'rxjs';
import { AppState } from '@/app/core/store/app/app.state';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    public loadingSrv: LoadingService,
    private store: Store<AppState>,
    private actions$: Actions,
  ) { 
    this.subscription = this.subscribeActions();
  } 

  handleDelete(user_id: number): void {
    this.store.dispatch(deleteUserRequest({ user_id }))
  }

  subscribeActions(): Subscription {
    return merge(
      this.actions$.pipe(ofType(deleteUserResponseSuccess)),
      this.actions$.pipe(ofType(deleteUserResponseFailure))
    ).subscribe(action => {
      switch(action.type){
        case(deleteUserResponseSuccess.type):
          this.closeDialog(action.user_id);
          break;
        case(deleteUserResponseFailure.type):
          this.closeDialog(null);
          break;        
      }
    });
  }

  closeDialog(userId:number|null) {
    this.dialogRef.close(userId);
  }
}
