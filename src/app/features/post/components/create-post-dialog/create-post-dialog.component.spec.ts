import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostDialogComponent } from './create-post-dialog.component';
import { FormValidationService } from '@/app/core/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/core/services/notification/snackbar-message.service';
import { PostsService } from '@/app/core/services/posts/posts.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '@/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { IPost, IPostFe } from '@/app/models/Post';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { postPostRequest, postPostResponseFailure, postPostResponseSuccess } from '../../store/posts/posts.actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { DialogHandlerService } from '@/app/core/services/dialog-handler/dialog-handler.service';

describe('CreatePostDialogComponent', () => {
  let component: CreatePostDialogComponent;
  let fixture: ComponentFixture<CreatePostDialogComponent>;
  let store: MockStore;
  let actions$: Observable<any>;
  let dialogHandlerSrv: jasmine.SpyObj<DialogHandlerService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<CreatePostDialogComponent>>;

  const post: IPostFe = { 
    id: 1, 
    title: 'Test Post', 
    body: 'This is a test post',
    user_id: 1,
    comments: []
  };
  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const dialogHandlerSrvSpy = jasmine.createSpyObj('DialogHandlerService', ['setIsDialogClosed']);
    await TestBed.configureTestingModule({
      declarations: [CreatePostDialogComponent],
      imports: [
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
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
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DialogHandlerService, useValue: dialogHandlerSrvSpy },
        provideHttpClientTesting(),
        provideHttpClient(),
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<CreatePostDialogComponent>>;
    dialogHandlerSrv = TestBed.inject(DialogHandlerService) as jasmine.SpyObj<DialogHandlerService>;
    store = TestBed.inject(MockStore);
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

  it('should dispatch postPostRequest on form submit', () => {
    spyOn(store, 'dispatch');
    component.newPostForm.controls['title'].setValue('Sample Title');
    component.newPostForm.controls['body'].setValue('Sample Body');
    const expectedAction = postPostRequest({ post: component.newPostForm.value });
    
    component.onSubmit();
    
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should handle successful post creation', () => {
    spyOn(store, 'dispatch');
    spyOn(component, 'closeDialog');
    actions$ = of(postPostResponseSuccess({ post }));
  
    component.subscribeActions();
    component.onSubmit();
  
    expect(store.dispatch).toHaveBeenCalledWith(postPostRequest({ post: component.newPostForm.value }));
    expect(component.closeDialog).toHaveBeenCalledWith(post);
  });

  it('should handle post creation error', () => {
    spyOn(store, 'dispatch');
    spyOn(component, 'closeDialog');
    const error = new Error('Error');
    actions$ = of(postPostResponseFailure({ err: error }));
  
    component.subscribeActions();
    component.onSubmit();
  
    expect(store.dispatch).toHaveBeenCalledWith(postPostRequest({ post: component.newPostForm.value }));
    expect(component.closeDialog).toHaveBeenCalledWith(null);
  });

  it('should close the dialog on successful post creation', () => {
    spyOn(component, 'closeDialog').and.callThrough();
    actions$ = of(postPostResponseSuccess({ post }));
    component.subscribeActions();
    expect(component.closeDialog).toHaveBeenCalledWith(post);
    expect(dialogRef.close).toHaveBeenCalledWith(post);
  });

  it('should close the dialog on post creation error', () => {
    spyOn(component, 'closeDialog').and.callThrough();
    actions$ = of(postPostResponseFailure({ err:'Error' }));
    component.subscribeActions();
    expect(component.closeDialog).toHaveBeenCalledWith(null);
    expect(dialogRef.close).toHaveBeenCalledWith(null);
  });
});