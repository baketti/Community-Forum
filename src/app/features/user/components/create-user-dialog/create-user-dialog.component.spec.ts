import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserDialogComponent } from './create-user-dialog.component';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { UsersService } from '@/app/services/users/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { UserGender, UserStatus } from '@/app/models/User';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { postUserRequest, postUserResponseFailure, postUserResponseSuccess } from '../../store/users/users.actions';

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialogComponent;
  let fixture: ComponentFixture<CreateUserDialogComponent>;
  let userSrv: UsersService;
  let store: MockStore;
  let actions$: Observable<any>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<CreateUserDialogComponent>>;

  const user = { 
    id: 1, 
    name: 'Test User', 
    email: 'test@example.com', 
    gender: UserGender.MALE, 
    status: UserStatus.ACTIVE
  }
  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [
        CreateUserDialogComponent,
        CreateUserFormComponent
      ],
      imports: [
        MatDialogModule,
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        LoadingService,
        UsersService,
        SnackbarMessageService,
        FormValidationService,
        provideHttpClientTesting(),
        provideHttpClient(),
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<CreateUserDialogComponent>>;
    fixture = TestBed.createComponent(CreateUserDialogComponent);
    component = fixture.componentInstance;
    userSrv = TestBed.inject(UsersService);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.newUserForm).toBeDefined();
    expect(component.newUserForm.controls['name']).toBeDefined();
    expect(component.newUserForm.controls['email']).toBeDefined();
    expect(component.newUserForm.controls['status']).toBeDefined();
    expect(component.newUserForm.controls['gender']).toBeDefined();
  });

  it('should disable the submit button if the form is invalid', () => {
    component.newUserForm.controls['name'].setValue('');
    expect(component.isDisabled).toBeTrue();
  });

  it('should enable the submit button if the form is valid', () => {
    component.newUserForm.controls['name'].setValue('John Doe');
    component.newUserForm.controls['email'].setValue('john.doe@example.com');
    component.newUserForm.controls['status'].setValue('active');
    component.newUserForm.controls['gender'].setValue('male');
    expect(component.isDisabled).toBeFalse();
  });

  it('should call userSrv.postUser on form submit', () => {
    spyOn(store, 'dispatch');
    component.newUserForm.controls['name'].setValue('John Doe');
    component.newUserForm.controls['email'].setValue('john.doe@example.com');
    component.newUserForm.controls['status'].setValue('active');
    component.newUserForm.controls['gender'].setValue('male');
    const expectedAction = postUserRequest({ user: component.newUserForm.value });
    
    component.onSubmit();
    
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should handle successful user creation', () => {
    spyOn(store, 'dispatch');
    spyOn(component, 'closeDialog');
    actions$ = of(postUserResponseSuccess({ user }));
  
    component.subscribeActions();
    component.onSubmit();
  
    expect(store.dispatch).toHaveBeenCalledWith(postUserRequest({ user: component.newUserForm.value }));
    expect(component.closeDialog).toHaveBeenCalledWith(user);
  });

  it('should handle user creation error', () => {
    spyOn(store, 'dispatch');
    spyOn(component, 'closeDialog');
    const error = new Error('Error');
    actions$ = of(postUserResponseFailure({ err: error }));
  
    component.subscribeActions();
    component.onSubmit();
  
    expect(store.dispatch).toHaveBeenCalledWith(postUserRequest({ user: component.newUserForm.value }));
    expect(component.closeDialog).toHaveBeenCalledWith(null);
  });

  it('should close the dialog on successful user creation', () => {
    spyOn(component, 'closeDialog');
    actions$ = of(postUserResponseSuccess({ user }));
    component.subscribeActions();
    expect(component.closeDialog).toHaveBeenCalledWith(user);
  });

  it('should close the dialog on user creation error', () => {
    const error = new Error('Error');
    spyOn(component, 'closeDialog');
    actions$ = of(postUserResponseFailure({ err: error }));
    component.subscribeActions();
    expect(component.closeDialog).toHaveBeenCalledWith(null);
  });
});
