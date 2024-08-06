import { IPost } from '@/app/models/Post';
import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';
import { PostsService } from '@/app/services/posts/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Subscription } from 'rxjs';
import { CreatePostDialogComponent } from '../../components/create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  totalPosts: number = 0;
  private subscription: Subscription = new Subscription();
  page: number = 0;
  per_page: number = 10;
  private pageSizeOptions: number[] = [5, 10, 25, 100];
  page_size_options:number[] = [...this.pageSizeOptions]
  searchPostForm: FormGroup;
  get isDisabled():boolean{
    return this.searchPostForm.invalid;
  };

  constructor(
    private postsService: PostsService, 
    public dialog: MatDialog,
    public loadingSrv: LoadingService,
    public paginationSrv: PaginationService,
    private dialogHandlerSrv: DialogHandlerService
  ) { 
      this.openCreatePostDialog = this.openCreatePostDialog.bind(this);
      this.searchPostForm = this.initSearchPostForm
    }
  
  private get initSearchPostForm(): FormGroup {
    return new FormGroup({
      searchStr: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fetchPosts();
    this.subscription.add(
      this.paginationSrv.pagination$.subscribe(pagination => {
        this.totalPosts = pagination.totalItems;
        this.per_page = pagination.per_page || 0;
        this.page = pagination.page || 0;
      })
    );
    this.searchPostForm.valueChanges.pipe(
      debounceTime(1000)).subscribe(() => {
        this.fetchPostsByTitle();
      }
    );
  }

  fetchPosts(): void {
    const { page, per_page } = this;
    this.postsService.getPosts(page+1, per_page).subscribe({
      next: this.handleResponse.bind(this),
      error: console.error
    });
  }
  
  fetchPostsByTitle(): void {
    const { page, per_page } = this;
    const { searchStr } = this.searchPostForm.value;
    this.postsService.getPostsByTitle(searchStr,page+1, per_page).subscribe({
      next: this.handleResponse.bind(this),
      error: console.error
    });
  }

  refresh(): void {
    if(this.hasActiveFilterByTitle()){
      this.fetchPostsByTitle()
    }else{
      this.fetchPosts();
    }
  }
  
  handleResponse(posts: IPost[]): void {
    if(!posts.length && this.totalPosts){
      this.refresh();
    }
    this.posts = posts;
    this.updatePageSizeOptions();
  }

  onPageChange(event: PageEvent) {
    const { pageIndex, pageSize } = event
    this.paginationSrv.updatePagination(pageIndex, pageSize);
    this.refresh();
  }

  updatePageSizeOptions() {
    this.page_size_options = [
      ...this.pageSizeOptions.filter(option => option < this.totalPosts)
    ];
  }

  hasActiveFilterByTitle(): boolean {
    if(!!this.searchPostForm.value) {
      return true;
    }
    return false;
  }

  openCreatePostDialog() {
    this.dialogHandlerSrv.setIsDialogOpened();
    const dialogRef = this.dialog.open(CreatePostDialogComponent,{
      width: '350px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(post => {
      this.dialogHandlerSrv.setIsDialogClosed();
      if(post){
        this.updatePosts(post);
      }
    });
  }

  updatePosts(post: IPost) {
    this.posts = [post, ...this.posts];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
