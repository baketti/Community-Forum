import { Component, Inject, OnInit } from '@angular/core';
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
  styleUrl: './create-user-dialog.component.css'
})
export class CreateUserDialogComponent implements OnInit {

  newUserForm!:FormGroup;
  get isDisabled():boolean{
    return this.newUserForm.invalid;
  };

  constructor(
    private userSrv:UsersService,
    public loadingSrv: LoadingService,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private snackMessage: SnackbarMessageService,
    private paginationSrv: PaginationService
  ) { }

  ngOnInit(){
    this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl(''),
      gender: new FormControl('',[Validators.required]),
    })
  }

  onSubmit() {
    console.log(this.newUserForm.value);
    const user = this.newUserForm.value;
    this.userSrv.postUser(user).subscribe({
      next: (res) => {
        this.closeDialog(res);
        this.paginationSrv.setPaginationAfterCreate();
        this.snackMessage.show({
          message:"User created successfully",
          duration: 5000
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  closeDialog(user:IUser) {
    this.dialogRef.close(user);
  }
}
