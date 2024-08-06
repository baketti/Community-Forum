import { IComment } from '@/app/models/Comment';
import { IUser } from '@/app/models/User';
import { AuthenticationService } from '@/app/services/authentication/authentication.service';
import { CommentsService } from '@/app/services/comments/comments.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrl: './post-comment-form.component.scss'
})
export class PostCommentFormComponent {
  commentForm: FormGroup;
  get loggedUser():IUser {
    return this.authSrv.getCurrentUser();
  }
  get isDisabled(): boolean {
    const { comment} = this.commentForm.value
    return comment === null || comment === '';
  };
  @Input() postId!: number; 
  @Output() commentCreated = new EventEmitter<IComment>();

  constructor(
    private commentsSrv: CommentsService,
    private authSrv: AuthenticationService,
    private snackMessage: SnackbarMessageService,
    public loadingSrv: LoadingService,
  ) {
    this.commentForm = this.initCommentForm
  }
  
  private get initCommentForm(): FormGroup {
    return new FormGroup({
      comment: new FormControl<string|null>(null)
    });
  }

  handleSubmit(): void {
    const { comment } = this.commentForm.value;
    const newComment: Omit<IComment, 'id'> = {
      post_id: this.postId,
      name: this.loggedUser.name,
      email: this.loggedUser.email,
      body: comment as string
    }
    this.commentsSrv.postComment(this.postId, newComment).subscribe({
      next: this.handlePostComment.bind(this),
      error: this.handlePostCommentError.bind(this)
    });
    this.commentForm.reset({
      comment: null
    });
  }

  handlePostComment(comment: IComment): void {
    console.log("comment:",comment);
    this.commentCreated.emit(comment);
    this.snackMessage.show({
      message: "Comment created successfully",
      duration: 5000
    });
  }

  handlePostCommentError(error: any): void {
    this.snackMessage.show({
      message: "Error while creating comment",
    });
  }
}
