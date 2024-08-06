import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@/app/models/User';
import { UsersService } from '@/app/services/users/users.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private usersService: UsersService,
    public loadingSrv: LoadingService,
    private snackMessage: SnackbarMessageService,
    private paginationSrv: PaginationService
  ) { } 

  handleDelete(userId: number): void {
    this.usersService.deleteUsersByUserId(userId).subscribe({
      next: () => this.handleSuccessDelete(userId),
      error: () => this.handleFailDelete(userId)
    });
  }

  handleSuccessDelete(userId:number):void {
    this.closeDialog(userId);
    this.paginationSrv.setPaginationAfterDelete()
    this.snackMessage.show({
      message: "User deleted successfully!",
      duration: 5000
    });
  }

  handleFailDelete(userId:number):void {
    this.closeDialog(userId);
    this.snackMessage.show({
      message: "Error while deleting user",
    });
  }

  closeDialog(userId:number) {
    this.dialogRef.close(userId);
  }
}
