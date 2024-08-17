import { IComment } from '@/app/models/Comment';
import { IPost } from '@/app/models/Post';
import { CommentsService } from '@/app/core/services/comments/comments.service';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { UsersService } from '@/app/core/services/users/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent implements OnInit {
    @Input() post!: IPost;
    comments: IComment[] = [];
    newComment!: IComment;
    showComments: boolean = false;

    constructor(
      private commentsSrv: CommentsService,
      public loadingSrv: LoadingService
    ) { }

    ngOnInit(): void {
      this.fetchComments();
    }

    fetchComments(): void {
      if(this.post) {
        this.commentsSrv.getComments(this.post.id).subscribe({
          next: this.handleCommentsResponse.bind(this),
          error: console.error
        });
      }
    }

    handleCommentsResponse(comments: IComment[]): void {
      this.comments = comments || [];
    }

    toggleComments(): void {
      this.showComments = !this.showComments
    }

    updateComments(newComment:IComment): void {
      this.comments = [newComment, ...this.comments];
    }
}
