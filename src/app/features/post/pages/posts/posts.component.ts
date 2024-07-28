import { IPost } from '@/app/models/Post';
import { DialogHandlerService } from '@/app/services/dialog-handler/dialog-handler.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';
import { PostsService } from '@/app/services/posts/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CreatePostDialogComponent } from '../../components/create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  totalPosts: number = 0;
  private subscription: Subscription = new Subscription();
  page: number = 1;
  per_page: number = 10;
  error: string = '';
  searchPostForm!: FormGroup;
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
    this.searchPostForm = new FormGroup({
      searchStr: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fetchPosts();
    this.subscription.add(
      this.paginationSrv.pagination$.subscribe(pagination => {
        this.totalPosts = pagination.totalItems;
      })
    );
    this.searchPostForm.valueChanges.pipe(
        debounceTime(1000)).subscribe(() => {
          this.fetchPostsByTitle();
        }
      );
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fetchPosts(): void {
    const { page, per_page } = this;
    this.postsService.getPosts(page, per_page).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  fetchPostsByTitle(): void {
    const { searchStr } = this.searchPostForm.value;
    this.postsService.getPostsByTitle(searchStr).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleResponse(posts: IPost[]): void {
    this.posts = posts;
    console.log("Posts: ", this.posts);
  }

  handleError(error: string): void {
    this.error = error;
    console.log("Error: ", this.error);
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.per_page = event.pageSize;
    this.fetchPosts();
  }

  openCreatePostDialog() {
    this.dialogHandlerSrv.setIsDialogOpened();
    const dialogRef = this.dialog.open(CreatePostDialogComponent,{
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(post => {
      this.dialogHandlerSrv.setIsDialogClosed();
      console.log(`Dialog closed, result:`,post);
      console.log(this.posts);
      if(post){
        console.log("Post: ", post);
        this.updatePosts(post);
      }
    });
  }

  updatePosts(post: IPost) {
    this.posts = [post, ...this.posts];
  }

}
