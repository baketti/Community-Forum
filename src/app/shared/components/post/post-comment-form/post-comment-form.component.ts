import { IComment } from '@/app/models/Comment';
import { IUser } from '@/app/models/User';
import { AuthenticationService } from '@/app/core/services/authentication/authentication.service';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppState } from '@/app/core/store/app/app.state';
import { Store } from '@ngrx/store';
import { postCommentRequest, postCommentResponseSuccess } from '@/app/features/post/store/posts/posts.actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrl: './post-comment-form.component.scss'
})
export class PostCommentFormComponent implements OnInit {
  commentForm: FormGroup;
  get loggedUser():IUser {
    return this.authSrv.getCurrentUser();
  };
  get isDisabled(): boolean {
    const { comment} = this.commentForm.value;
    return comment === null || comment === '';
  };
  @Input() postId!: number; 

  constructor(
    @Inject(Actions) private actions$: Actions,
    private store: Store<AppState>,
    private authSrv: AuthenticationService,
    public loadingSrv: LoadingService,
  ) {
    this.commentForm = this.initCommentForm;
  }

  ngOnInit(): void {
    this.actions$.pipe(
      ofType(postCommentResponseSuccess)).subscribe(() => {
      this.commentForm.reset({
        comment: null
      });
    });
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
    this.store.dispatch(postCommentRequest({comment: newComment}));
  }
}
