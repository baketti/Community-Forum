import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostDialogComponent } from './create-post-dialog.component';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';
import { PostsService } from '@/app/services/posts/posts.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '@/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { IPost } from '@/app/models/Post';

describe('CreatePostDialogComponent', () => {
  let component: CreatePostDialogComponent;
  let fixture: ComponentFixture<CreatePostDialogComponent>;
  let postSrv: PostsService;
  let snackMessage: SnackbarMessageService;
  let paginationSrv: PaginationService;
  const post: IPost = { 
    id: 1, 
    title: 'Test Post', 
    body: 'This is a test post',
    user_id: 1
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        SharedModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        LoadingService,
        PostsService,
        SnackbarMessageService,
        FormValidationService,
        PaginationService,
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideHttpClientTesting(),
        provideHttpClient()
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostDialogComponent);
    component = fixture.componentInstance;
    postSrv = TestBed.inject(PostsService);
    snackMessage = TestBed.inject(SnackbarMessageService);
    paginationSrv = TestBed.inject(PaginationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.newPostForm).toBeDefined();
    expect(component.newPostForm.controls['title']).toBeDefined();
    expect(component.newPostForm.controls['body']).toBeDefined();
  });

  it('should disable the submit button if the form is invalid', () => {
    component.newPostForm.controls['title'].setValue('');
    expect(component.isDisabled).toBeTrue();
  });

  it('should enable the submit button if the form is valid', () => {
    component.newPostForm.controls['title'].setValue('Sample Title');
    component.newPostForm.controls['body'].setValue('Sample Body');
    expect(component.isDisabled).toBeFalse();
  });

  it('should call postSrv.postPost on form submit', () => {
    spyOn(postSrv, 'postPost').and.returnValue(of(post));
    component.newPostForm.controls['title'].setValue('Sample Title');
    component.newPostForm.controls['body'].setValue('Sample Body');
    component.onSubmit();
    expect(postSrv.postPost).toHaveBeenCalled();
  });

  it('should handle successful post creation', () => {
    spyOn(postSrv, 'postPost').and.returnValue(of(post));
    spyOn(component, 'handlePostSubmit');
    component.onSubmit();
    expect(component.handlePostSubmit).toHaveBeenCalled();
  });

  it('should handle post creation error', () => {
    spyOn(postSrv, 'postPost').and.returnValue(throwError(() => new Error('Error')));
    spyOn(component, 'handlePostSubmitError');
    component.onSubmit();
    expect(component.handlePostSubmitError).toHaveBeenCalled();
  });

  it('should close the dialog on successful post creation', () => {
    component.handlePostSubmit(post);
    expect(component.dialogRef.close).toHaveBeenCalledWith(post);
  });

  it('should close the dialog on post creation error', () => {
    component.handlePostSubmitError(new Error('Error'));
    expect(component.dialogRef.close).toHaveBeenCalledWith(null);
  });
});