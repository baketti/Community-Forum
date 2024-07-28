import { IComment } from '@/app/models/Comment';
import { IUser } from '@/app/models/User';
import { AuthenticationService } from '@/app/services/authentication/authentication.service';
import { CommentsService } from '@/app/services/comments/comments.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrl: './post-comment-form.component.scss'
})
export class PostCommentFormComponent {
  constructor(
    private commentsSrv: CommentsService,
    private authSrv: AuthenticationService,
    private snackMessage: SnackbarMessageService
  ) { } 

  commentForm = new FormGroup({
    comment: new FormControl<string|null>(null)
  });
  get loggedUser():IUser {
    return this.authSrv.getCurrentUser();
  }

  get isDisabled(): boolean {
    const { comment} = this.commentForm.value
    return comment === null || comment === '';
  };
  @Input() postId!: number; 
  @Output() commentCreated = new EventEmitter<string>();

  handleSubmit(): void {
    const { comment } = this.commentForm.value;
    const newComment: Omit<IComment, 'id'> = {
      post_id: this.postId,
      name: this.loggedUser.name,
      email: this.loggedUser.email,
      body: comment as string
    }
    this.commentsSrv.postComment(this.postId, newComment).subscribe({
      next: (res) => {
        this.commentCreated.emit(comment as string);
        this.snackMessage.show({
          message: "Comment created successfully",
          duration: 5000
        });
      },
      error: (err) => {
        console.error('Error creating comment', err);
        this.snackMessage.show({
          message: "Error while creating comment...",
        });
      }
    });
    this.commentForm.reset({
      comment: null
    });
  }
}
