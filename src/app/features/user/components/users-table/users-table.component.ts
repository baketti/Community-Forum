import { Component } from '@angular/core';
import { IUser } from '@/app/models/User';
import { Router } from '@angular/router';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getUsersList } from '@/app/features/user/store/users/users.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '@/app/core/services/authentication/authentication.service';
import { SnackbarMessageService } from '@/app/core/services/notification/snackbar-message.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  users$: Observable<IUser[]> = this.store.select(getUsersList);
  dataSource: MatTableDataSource<IUser>;
  displayedColumns = ['name','email','gender','status','edit','delete'];

  constructor(
    private router:Router, 
    private store:Store, 
    public loadingSrv: LoadingService,
    public dialog: MatDialog,
    private authenticationSrv: AuthenticationService,
    private snackMessage: SnackbarMessageService
  ) {
    this.dataSource = new MatTableDataSource<IUser>();
  }

  ngOnInit() {
    this.users$.subscribe(users => {
      this.dataSource.data = users;
    });
  }

  handleRowClick(user: IUser): void {
    this.router.navigate(['app/users', user.id]);
  }

  openDeleteUserDialog(userId: number): void {
    const { id } = this.authenticationSrv.getCurrentUser();
    if(userId === id){
      this.snackMessage.show({
          message: "You cannot delete the user you are currently logged in with!",
          duration: 3000
      });
      return;
    }
    this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: userId
    });
  }
}
