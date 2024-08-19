import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostCommentFormComponent } from './post-comment-form.component';
import { AuthenticationService } from '@/app/core/services/authentication/authentication.service';
import { SnackbarMessageService } from '@/app/core/services/notification/snackbar-message.service';
import { provideHttpClient } from '@angular/common/http';
import {  provideHttpClientTesting } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { IUser, UserGender, UserStatus } from '@/app/models/User';
import { IComment } from '@/app/models/Comment';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ScannedActionsSubject } from '@ngrx/store';
import { postCommentResponseSuccess, postCommentRequest, postCommentResponseFailure } from '@/app/features/post/store/posts/posts.actions';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

describe('PostCommentFormComponent', () => {
  let component: PostCommentFormComponent;
  let fixture: ComponentFixture<PostCommentFormComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let store: MockStore;
  let actions$: Observable<any>;
  let snackMessageService: jasmine.SpyObj<SnackbarMessageService>;
  const mockUser: IUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    gender: UserGender.FEMALE,
    status: UserStatus.ACTIVE,
  };

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthenticationService', ['getCurrentUser']);
    authService.getCurrentUser.and.returnValue(mockUser);

    snackMessageService = jasmine.createSpyObj('SnackMessageService', ['show']);

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
        { provide: AuthenticationService, useValue: authService },
        { provide: SnackbarMessageService, useValue: snackMessageService },
        provideHttpClientTesting(),
        provideHttpClient(),
        provideMockStore(),
        provideMockActions(() => actions$),
        Actions,
        ScannedActionsSubject
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentFormComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    snackMessageService = TestBed.inject(SnackbarMessageService) as jasmine.SpyObj<SnackbarMessageService>;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    actions$ = TestBed.inject(Actions);
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
    const comment = 'Test comment';
    component.commentForm.setValue({ comment });

    component.handleSubmit();

    const expectedComment: Omit<IComment, 'id'> = {
      post_id: component.postId,
      name: mockUser.name,
      email: mockUser.email,
      body: comment
    };

    expect(store.dispatch).toHaveBeenCalledWith(postCommentRequest({ comment: expectedComment }));
  });

  it('should handle post comment success', () => {
    const comment: Omit<IComment, 'id'>  = { 
      post_id: component.postId, 
      name: 'Test User', 
      email: 'test@example.com', 
      body: 'Test comment' 
    };

    actions$ = of(postCommentResponseSuccess({ comment: { ...comment, id: 1 } }));

    component.ngOnInit();
    component.commentForm.setValue({ comment: comment.body });
    component.handleSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(postCommentRequest({ comment }));
  });
});