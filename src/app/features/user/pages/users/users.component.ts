import { IUser } from '@/app/models/User';
import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';
import { UsersService } from '@/app/services/users/users.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, Subscription } from 'rxjs';
import { CreateUserDialogComponent } from '../../components/create-user-dialog/create-user-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';

interface Filters {
  searchstr: string;
  gender: string;
  status: string;
}

function isEmail(str: string): boolean {
  if (str.includes('@')) {
    return true;
  }
  return false;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  totalUsers: number = 0;
  page: number = 0;
  per_page: number = 10;
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  page_size_options:number[] = [...this.pageSizeOptions]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private subscription: Subscription = new Subscription();
  searchForm: FormGroup;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    public paginationSrv: PaginationService,
    private dialogHandlerSrv: DialogHandlerService,
    public loadingSrv: LoadingService
  ) {
    this.searchForm = this.initSearchForm
    this.openCreateUserDialog = this.openCreateUserDialog.bind(this);
  }

  private get initSearchForm(): FormGroup {
    return new FormGroup({
      searchstr : new FormControl(''),
      gender : new FormControl(''),
      status : new FormControl('')
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.paginationSrv.pagination$.subscribe(pagination => {
        this.totalUsers = pagination.totalItems;
        this.per_page = pagination.per_page || 0;
        this.page = pagination.page || 0;
      })
    );
    this.searchForm.valueChanges.pipe(
      debounceTime(1000)).subscribe(value => {
        this.fetchUsersByFilters();
      })
    this.refresh();
  }

  fetchUsers(): void {
    const { page, per_page } = this;
    this.usersService.getUsers(page+1, per_page).subscribe({
      next: this.handleResponse.bind(this),
      error: console.error
    });
  }

  fetchUsersByFilters(): void {
    const { page, per_page } = this;
    const filters:Filters = this.searchForm.value;
    const { searchstr } = filters;
    let filterObj = {};
    if(isEmail(searchstr)) {
      filterObj = {...filters, email: searchstr};
    }else {
      filterObj = {...filters, name: searchstr};
    }
    this.usersService.getUsersByFilters(filterObj, page+1, per_page).subscribe({
      next: this.handleResponse.bind(this),
      error: console.error
    });
  }

  refresh(): void {
    if(this.hasActiveFilters()){
      this.fetchUsersByFilters()
    }else{
      this.fetchUsers();
    }
  }

  handleResponse(users: IUser[]): void {
    if(!users.length && this.totalUsers){
      this.refresh();
    }
    this.users = users;
    this.updatePageSizeOptions();
  }

  onPageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event
    this.paginationSrv.updatePagination(pageIndex, pageSize);
    this.refresh();
  }

  updatePageSizeOptions() {
    this.page_size_options = [
      ...this.pageSizeOptions.filter(option => option < this.totalUsers)
    ];
  }

  toggleFilterSelection(controlName: string, value: string): void {
    const control = this.searchForm.get(controlName);
    if (control) {
      control.setValue(control.value === value ? '' : value);
    }
  }

  hasActiveFilters(): boolean {
    const filters = Object.values(this.searchForm.value);
    if(filters.every(filter => filter === '')) {
      return false;
    }
    return true;
  }

  openCreateUserDialog() {
    this.dialogHandlerSrv.setIsDialogOpened();
    const dialogRef = this.dialog.open(CreateUserDialogComponent,{
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(user => {
      this.dialogHandlerSrv.setIsDialogClosed();
      if(user){
        this.updateUsers(user);
      }
    });
  }

  updateUsers(user:IUser) {
    this.users = [user, ...this.users];
  }

  deleteUser(userId: number){
    this.users=[...this.users.filter(user => user.id !== userId)];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
