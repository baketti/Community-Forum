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
import { MatTable } from '@angular/material/table';
import { UsersTableDataSource } from './users-table-datasource';

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
  @ViewChild(MatTable) table!: MatTable<IUser>;
  dataSource = new UsersTableDataSource();
  private subscription: Subscription = new Subscription();
  searchForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    public paginationSrv: PaginationService,
    private dialogHandlerSrv: DialogHandlerService,
    public loadingSrv: LoadingService
  ) {
    this.searchForm = new FormGroup({
        searchstr : new FormControl(''),
        gender : new FormControl(''),
        status : new FormControl('')
    });
    this.openCreateUserDialog = this.openCreateUserDialog.bind(this);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.subscription.add(
      this.paginationSrv.pagination$.subscribe(pagination => {
        console.log("Pagination limit: ", pagination.per_page);  
        this.totalUsers = pagination.totalItems;
        this.per_page = pagination.per_page || 0;
        this.page = pagination.page || 0;
        console.log("pagination updated");
      })
    );
    this.searchForm.valueChanges.pipe(
      debounceTime(1000)).subscribe(value => {
        console.log('Search value changed:', value);
        this.fetchUsersByFilters();
      })
      this.refresh();
    }

  fetchUsers(): void {
    const { page, per_page } = this;
    console.log("Page: ", page);
    this.usersService.getUsers(page+1, per_page).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  fetchUsersByFilters(): void {
    const { page } = this;
    const filters:Filters = this.searchForm.value;
    const { searchstr } = filters;
    let filterObj = {};
    if(isEmail(searchstr)) {
      filterObj = {...filters, email: searchstr};
    }else {
      filterObj = {...filters, name: searchstr};
    }
    this.usersService.getUsersByFilters(filterObj, page+1, this.per_page).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  refresh(): void {
    console.log("refresh");
    console.log("refresh pagination ",this.page," ", this.per_page);
    if(this.hasActiveFilters()){
      this.fetchUsersByFilters()
    }else{
      this.fetchUsers();
    }
  }

  handleResponse(users: IUser[]): void {
    console.log("handleResponse: ", users);
    if(!users.length && this.totalUsers){
      this.refresh();
    }
    this.users = users;
    this.table.dataSource = users;
    this.updatePageSizeOptions();
    console.log("Users: ", this.users);
  }

  handleError(error: string): void {
    console.log("Error: ", error);
  }

  onPageChange(event: PageEvent) {
    console.log("Event: ", event);
    console.log("Search form value : ", this.searchForm.value);
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

  updateUsers(user:IUser) {
    this.users = [user,...this.users];
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
