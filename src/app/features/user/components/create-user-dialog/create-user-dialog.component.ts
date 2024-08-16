import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '@/app/services/loading/loading.service';
import { IUser } from '@/app/models/User';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { 
  postUserRequest, 
  postUserResponseFailure, 
  postUserResponseSuccess 
} from '@/app/features/user/store/users/users.actions';
import { Subscription, merge } from 'rxjs';
import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';
import { AppState } from '@/app/core/store/app/app.state';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrl: './create-user-dialog.component.scss'
})
export class CreateUserDialogComponent {
  newUserForm:FormGroup;
  get isDisabled():boolean{
    return this.newUserForm.invalid;
  };
  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    public loadingSrv: LoadingService,
    private dialogHandlerSrv: DialogHandlerService,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>
  ) {
    this.newUserForm = this.initNewUserForm;
    this.subscription = this.subscribeActions();
  }

  private get initNewUserForm(): FormGroup {
    return new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(30),
        ]),
        status: new FormControl('', [
          Validators.required,
        ]),
        gender: new FormControl('', [
          Validators.required,
        ]),
      },
    )
  }

  onSubmit() {
    const user = this.newUserForm.value;
    this.store.dispatch(postUserRequest({ user }));
  }

  subscribeActions(): Subscription {
    return merge(
      this.actions$.pipe(ofType(postUserResponseSuccess)),
      this.actions$.pipe(ofType(postUserResponseFailure))
    ).subscribe(action => {
      switch(action.type){
        case(postUserResponseSuccess.type):
          this.closeDialog(action.user);
          break;
        case(postUserResponseFailure.type):
          this.closeDialog(null);
          break;        
      }
    });
  }

  closeDialog(user: IUser|null) {
    this.dialogHandlerSrv.setIsDialogClosed();
    this.dialogRef.close(user);
  }
}
