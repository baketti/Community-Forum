import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserDialogComponent } from './create-user-dialog.component';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { UsersService } from '@/app/services/users/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { UserGender, UserStatus } from '@/app/models/User';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialogComponent;
  let fixture: ComponentFixture<CreateUserDialogComponent>;
  let userSrv: UsersService;
  const user = { 
    id: 1, 
    name: 'Test User', 
    email: 'test@example.com', 
    gender: UserGender.MALE, 
    status: UserStatus.ACTIVE
  }
  beforeEach(async () => {
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
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserDialogComponent);
    component = fixture.componentInstance;
    userSrv = TestBed.inject(UsersService);
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
    spyOn(userSrv, 'postUser').and.returnValue(of(user));
    component.newUserForm.controls['name'].setValue('John Doe');
    component.newUserForm.controls['email'].setValue('john.doe@example.com');
    component.newUserForm.controls['status'].setValue('active');
    component.newUserForm.controls['gender'].setValue('male');
    component.onSubmit();
    expect(userSrv.postUser).toHaveBeenCalled();
  });

/*   it('should handle successful user creation', () => {
    spyOn(userSrv, 'postUser').and.returnValue(of(user));
    spyOn(component, 'handlePostUser');
    component.onSubmit();
    expect(component.handlePostUser).toHaveBeenCalled();
  }); */

 /*  it('should handle user creation error', () => {
    spyOn(userSrv, 'postUser').and.returnValue(throwError(() => new Error('Error')));
    spyOn(component, 'handlePostUserError');
    component.onSubmit();
    expect(component.handlePostUserError).toHaveBeenCalled();
  }); */

/*   it('should close the dialog on successful user creation', () => {
    const user = { 
      id: 1, 
      name: 'Test User', 
      email: 'test@example.com', 
      gender: UserGender.MALE, 
      status: UserStatus.ACTIVE
    }
    component.handlePostUser(user);
    expect(component.dialogRef.close).toHaveBeenCalledWith(user);
  }); */

/*   it('should close the dialog on user creation error', () => {
    component.handlePostUserError(new Error('Error'));
    expect(component.dialogRef.close).toHaveBeenCalledWith(null);
  }); */
});
