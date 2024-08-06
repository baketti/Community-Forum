import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '@/app/services/users/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '@/app/services/loading/loading.service';
import { IUser } from '@/app/models/User';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';

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

  constructor(
    private userSrv:UsersService,
    public loadingSrv: LoadingService,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private snackMessage: SnackbarMessageService,
    private paginationSrv: PaginationService
  ) {
    this.newUserForm = this.initNewUserForm
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
    this.userSrv.postUser(user).subscribe({
      next: this.handlePostUser.bind(this),
      error: this.handlePostUserError.bind(this)
    });
  }

  handlePostUser(user: IUser) {
    this.closeDialog(user);
    this.paginationSrv.setPaginationAfterCreate();
    this.snackMessage.show({
      message:"User created successfully",
      duration: 5000
    });
  }

  handlePostUserError(error: any) {
    this.closeDialog(null);
    this.snackMessage.show({
      message:"An error occurred while creating user",
      duration: 5000
    });
  }

  closeDialog(user: IUser | null) {
    this.dialogRef.close(user);
  }
}
