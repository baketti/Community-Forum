import { IComment } from '@/app/models/Comment';
import { IPost } from '@/app/models/Post';
import { CommentsService } from '@/app/services/comments/comments.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { UsersService } from '@/app/services/users/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class SinglePostComponent implements OnInit {
    @Input() post!: IPost;
    postUserName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    comments: IComment[] = [];
    showComments: boolean = false;
    get newComment(): Omit<IComment,'body'> {
      return {
        id: 0,
        post_id: this.post.id,
        name: "",
        email: "",
      }
    };

    constructor(
      private commentsSrv: CommentsService,
      private usersSrv: UsersService,
      public loadingSrv: LoadingService
    ) { }

    ngOnInit(): void {
      this.fetchComments();
      //this.getPostUserName(this.post.user_id);
    }

    fetchComments(): void {
      if(this.post) {
        this.commentsSrv.getComments(this.post.id).subscribe({
          next: this.handleCommentsResponse.bind(this),
          error: (error) => console.error(error)
        });
      }
    }

    handleCommentsResponse(comments: IComment[]): void {
      this.comments = comments || [];
    }

    toggleComments(): void {
      this.showComments = !this.showComments
    }

    updateComments(comment:string): void {
      const newComment = { ...this.newComment, body: comment };
      this.comments = [...this.comments, newComment];
    }
    
    getPostUserName(userId: number): void {
      this.usersSrv.getUserDetails(userId).subscribe(user => {
        this.postUserName$.next(user.name);
      });
    }
}
