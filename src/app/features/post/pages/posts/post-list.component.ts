import { IPost, IPostFe } from '@/app/models/Post';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { CreatePostDialogComponent } from '../../components/create-post-dialog/create-post-dialog.component';
import { select, Store } from '@ngrx/store';
import { getPostsList } from '@/app/features/post/store/posts/posts.selectors';
import { AppState } from '@/app/core/store/app/app.state';
import { getPostsByTitleRequest, getPostsRequest, getPostsResponseSuccess } from '@/app/features/post/store/posts/posts.actions';
import { restartPagination, updatePagination } from '@/app/shared/store/pagination/pagination.actions';
import { getPagination } from '@/app/shared/store/pagination/pagination.selectors';
import { DialogHandlerService } from '@/app/core/services/dialog-handler/dialog-handler.service';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts$: Observable<IPostFe[]> = this.store.select(getPostsList);
  totalPosts: number = 0;
  page: number = 0;
  per_page: number = 10;
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  page_size_options:number[] = [...this.pageSizeOptions]
  searchPostForm: FormGroup;
  get isDisabled():boolean{
    return this.searchPostForm.invalid;
  };
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    public loadingSrv: LoadingService,
    public dialogHandlerSrv: DialogHandlerService
  ) { 
      this.openCreatePostDialog = this.openCreatePostDialog.bind(this);
      this.searchPostForm = this.initSearchPostForm;
      this.addSubscriptions();
    }
 
  ngOnInit(): void {
    this.store.dispatch(restartPagination());
    this.fetchPosts();  
  }
   
  private get initSearchPostForm(): FormGroup {
    return new FormGroup({
      searchStr: new FormControl(''),
    });
  }

  addSubscriptions(): void {
    this.subscription.add(
      this.store.pipe(select(getPagination)).subscribe(pagination => {
        this.totalPosts = pagination.totalItems;
        this.per_page = pagination.per_page;
        this.page = pagination.page;
        this.updatePageSizeOptions();
      }),
    )
    this.posts$.subscribe((posts) => {
      //this is a workaround for the paginator issue
      //it handles the case when items doesn't reach the current page
      //For example, if we are on page 2 and items after search are only 2
      if(!posts.length && this.totalPosts){
        this.refresh();
      }
    })  
    this.searchPostForm.valueChanges.pipe(
      debounceTime(1000)).subscribe((value) => {
        this.fetchPostsByTitle(value.searchStr);
      }
    );  
  }

  fetchPosts(): void {
    const { page, per_page } = this;
    this.store.dispatch(getPostsRequest({
      page: page+1, per_page
    }));
  }
  
  fetchPostsByTitle(searchStr:string): void {    
    const { page, per_page } = this;
    this.store.dispatch(getPostsByTitleRequest({
      searchStr, page: page+1, per_page
    }))
  }

  refresh(): void {
    if(this.hasActiveFilterByTitle()){
      const { searchStr } = this.searchPostForm.value;
      this.fetchPostsByTitle(searchStr);
    }else{
      this.fetchPosts();
    }
  }
  
  onPageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event;
    this.store.dispatch(updatePagination({
      page: pageIndex, per_page: pageSize
    }));
    this.refresh();
  }

  updatePageSizeOptions() {
    this.page_size_options = [
      ...this.pageSizeOptions.filter(option => option < this.totalPosts)
    ];
  }

  hasActiveFilterByTitle(): boolean {
    const { searchStr } = this.searchPostForm.value;
    if(!!searchStr) {
      return true;
    }
    return false;
  }

  openCreatePostDialog() {
    this.dialogHandlerSrv.setIsDialogOpened();
    this.dialog.open(CreatePostDialogComponent,{
      width: '350px',
      data: {}
    }).afterClosed().subscribe(()=>{
      this.dialogHandlerSrv.setIsDialogClosed();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.totalPosts = 0;
  }
}
