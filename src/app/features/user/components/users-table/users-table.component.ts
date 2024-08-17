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
    public dialog: MatDialog
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
    this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: userId
    });
  }
}
