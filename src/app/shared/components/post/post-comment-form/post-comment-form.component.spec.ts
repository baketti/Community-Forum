import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCommentFormComponent } from './post-comment-form.component';
import { AuthenticationService } from '@/app/services/authentication/authentication.service';
import { CommentsService } from '@/app/services/comments/comments.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { IUser } from '@/app/models/User';
import { IComment } from '@/app/models/Comment';

describe('PostCommentFormComponent', () => {
  let component: PostCommentFormComponent;
  let fixture: ComponentFixture<PostCommentFormComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let commentsService: jasmine.SpyObj<CommentsService>;
  let snackMessageService: jasmine.SpyObj<SnackbarMessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['getCurrentUser']);
    const commentsServiceSpy = jasmine.createSpyObj('CommentsService', ['postComment']);
    const snackMessageServiceSpy = jasmine.createSpyObj('SnackbarMessageService', ['show']);

    await TestBed.configureTestingModule({
      declarations: [PostCommentFormComponent],
      imports: [
        MatFormFieldModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: CommentsService, useValue: commentsServiceSpy },
        { provide: SnackbarMessageService, useValue: snackMessageServiceSpy },
        provideHttpClientTesting(),
        provideHttpClient()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    commentsService = TestBed.inject(CommentsService) as jasmine.SpyObj<CommentsService>;
    snackMessageService = TestBed.inject(SnackbarMessageService) as jasmine.SpyObj<SnackbarMessageService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.commentForm).toBeTruthy();
    expect(component.commentForm.get('comment')).toBeTruthy();
  });

  it('should return the logged user', () => {
    const user: IUser = { name: 'Test User', email: 'test@example.com' } as IUser;
    authService.getCurrentUser.and.returnValue(user);
    expect(component.loggedUser).toEqual(user);
  });

  it('should return true if comment is empty', () => {
    component.commentForm.setValue({ comment: '' });
    expect(component.isDisabled).toBeTrue();
  });

  it('should return false if comment is not empty', () => {
    component.commentForm.setValue({ comment: 'Test comment' });
    expect(component.isDisabled).toBeFalse();
  });

  it('should handle form submission', () => {
    const user: IUser = { name: 'Test User', email: 'test@example.com' } as IUser;
    authService.getCurrentUser.and.returnValue(user);
    component.postId = 1;
    component.commentForm.setValue({ comment: 'Test comment' });

    const newComment: Omit<IComment, 'id'> = {
      post_id: 1,
      name: 'Test User',
      email: 'test@example.com',
      body: 'Test comment'
    };

    commentsService.postComment.and.returnValue(of(newComment as IComment));
    component.handleSubmit();

    expect(commentsService.postComment).toHaveBeenCalledWith(1, newComment);
    expect(component.commentForm.value.comment).toBeNull();
  });

  it('should handle post comment success', () => {
    const comment: IComment = { 
      id: 1, 
      post_id: 1, 
      name: 'Test User', 
      email: 'test@example.com', 
      body: 'Test comment' 
    };
    spyOn(component.commentCreated, 'emit');
    component.handlePostComment(comment);
    expect(component.commentCreated.emit).toHaveBeenCalledWith(comment);
    expect(snackMessageService.show).toHaveBeenCalledWith({
      message: 'Comment created successfully',
      duration: 3000
    });
  });

  it('should handle post comment error', () => {
    component.handlePostCommentError('Error');
    expect(snackMessageService.show).toHaveBeenCalledWith({
      message: 'Error while creating comment',
    });
  });
});