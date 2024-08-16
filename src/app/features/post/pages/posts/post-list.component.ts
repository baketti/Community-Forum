import { IPost } from '@/app/models/Post';
import { LoadingService } from '@/app/services/loading/loading.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { CreatePostDialogComponent } from '../../components/create-post-dialog/create-post-dialog.component';
import { select, Store } from '@ngrx/store';
import { getPostsList } from '@/app/features/post/store/posts/posts.selectors';
import { AppState } from '@/app/core/store/app/app.state';
import { getPostsByTitleRequest, getPostsRequest } from '@/app/features/post/store/posts/posts.actions';
import { updatePagination } from '@/app/shared/store/pagination/pagination.actions';
import { getPagination } from '@/app/shared/store/pagination/pagination.selectors';
import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts$: Observable<IPost[]> = this.store.select(getPostsList);
  totalPosts: number = 0;
  page: number = 0;
  per_page: number = 10;
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  page_size_options:number[] = [...this.pageSizeOptions]
  searchPostForm: FormGroup;
  get isDisabled():boolean{
    return this.searchPostForm.invalid;
  };
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    public loadingSrv: LoadingService,
    private dialogHandlerSrv: DialogHandlerService
  ) { 
      this.openCreatePostDialog = this.openCreatePostDialog.bind(this);
      this.searchPostForm = this.initSearchPostForm;
      this.addSubscriptions();
    }
 
  ngOnInit(): void {
    this.fetchPosts();
    this.searchPostForm.valueChanges.pipe(
      debounceTime(1000)).subscribe((value) => {
        this.fetchPostsByTitle(value.searchStr);
      }
    );      
  }
   
  private get initSearchPostForm(): FormGroup {
    return new FormGroup({
      searchStr: new FormControl(''),
    });
  }

  private addSubscriptions(): void {
    this.subscription.add(
      this.store.pipe(select(getPagination)).subscribe(pagination => {
        this.totalPosts = pagination.totalItems;
        this.per_page = pagination.per_page;
        this.page = pagination.page;
        this.updatePageSizeOptions();
      }),
    )
    this.posts$.subscribe((posts)=> {
      if(!posts.length && this.totalPosts){
        this.refresh();
      }
    })
  }

  fetchPosts(): void {
    const { page, per_page } = this;
    this.store.dispatch(getPostsRequest({
      page: page+1, per_page
    }))
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
      this.fetchPostsByTitle(searchStr)
    }else{
      this.fetchPosts();
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
  }
}
