import { 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  Component, 
  Input, 
  OnChanges, 
  SimpleChanges 
} from '@angular/core';
import { IUser } from '@/app/models/User';
import { Router } from '@angular/router';
import { LoadingService } from '@/app/services/loading/loading.service';
import { UsersService } from '@/app/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersTableComponent implements OnChanges {
  private _users: IUser[] = [];

  @Input() 
  set users(usersList: IUser[]){
    this._users = usersList;
  };
  get users(): IUser[] {
    return this._users;
  }

  displayedColumns = ['name','email','gender','status','edit','delete'];

  constructor(
    private router:Router, 
    public loadingSrv: LoadingService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();
  }

  handleRowClick(user: IUser): void {
    this.router.navigate(['app/users', user.id]);
  }

  openDeleteUserDialog(userId: number): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: userId
    });

    dialogRef.afterClosed().subscribe(userId => {
      if(userId){
        this.updateUsers(userId);
      }
    });
  }

  updateUsers(userId: number): void {
    this.users=[...this.users.filter(user => user.id !== userId)];
    this.cdr.detectChanges();
  }
}
