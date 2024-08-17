import { IUser } from '@/app/models/User';
import { DialogHandlerService } from '@/app/core/services/dialog-handler/dialog-handler.service';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { CreateUserDialogComponent } from '../../components/create-user-dialog/create-user-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { isEmail } from '@/utils/functions';
import { Filters } from '@/utils/types';
import { AppState } from '@/app/core/store/app/app.state';
import { select, Store } from '@ngrx/store';
import { getUsersByFiltersRequest, getUsersRequest } from '@/app/features/user/store/users/users.actions';
import { getUsersList } from '@/app/features/user/store/users/users.selectors';
import { updatePagination } from '@/app/shared/store/pagination/pagination.actions';
import { getPagination } from '@/app/shared/store/pagination/pagination.selectors';
/* Call methods to get users have +1 on page param because 
while paginator page is an index(it starts from 0)
go rest api page starts from 1 */
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  users$: Observable<IUser[]> = this.store.select(getUsersList);
  totalUsers: number = 0;
  page: number = 0;
  per_page: number = 10;
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  page_size_options:number[] = [...this.pageSizeOptions];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private subscription: Subscription = new Subscription();
  searchForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private dialogHandlerSrv: DialogHandlerService,
    public loadingSrv: LoadingService
  ) {
    this.searchForm = this.initSearchForm;
    this.openCreateUserDialog = this.openCreateUserDialog.bind(this);
    this.addSubscriptions();
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.searchForm.valueChanges.pipe(
      debounceTime(1000)).subscribe(value => {
        this.fetchUsersByFilters();
      })
  }

  private get initSearchForm(): FormGroup {
    return new FormGroup({
      searchstr : new FormControl(''),
      gender : new FormControl(''),
      status : new FormControl('')
    });
  }

  private addSubscriptions(): void {
    this.subscription.add(
      this.store.pipe(select(getPagination)).subscribe(pagination => {
        this.totalUsers = pagination.totalItems;
        this.per_page = pagination.per_page;
        this.page = pagination.page;
        this.updatePageSizeOptions();
      }),
    )
    this.users$.subscribe((users)=> {
      if(!users.length && this.totalUsers){
        this.refresh();
      }
    })
  }

  fetchUsers(): void {
    const { page, per_page } = this;
    this.store.dispatch(getUsersRequest({page:page+1,per_page}))
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
    this.store.dispatch(getUsersByFiltersRequest({
      filters: filterObj, 
      page: page+1,
      per_page
    }))
  }

  refresh(): void {
    if(this.hasActiveFilters()){
      this.fetchUsersByFilters()
    }else{
      this.fetchUsers();
    }
  }

  onPageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event
    this.store.dispatch(updatePagination({
      page: pageIndex, per_page: pageSize
    }));
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
    this.dialog.open(CreateUserDialogComponent,{
      width: '350px',
      data: {}
    }).afterClosed().subscribe(()=>{
      this.dialogHandlerSrv.setIsDialogClosed();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
