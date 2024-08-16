import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteUserDialogComponent } from './delete-user-dialog.component';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { UsersService } from '@/app/services/users/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { deleteUserRequest, deleteUserResponseSuccess, deleteUserResponseFailure } from '@/app/features/user/store/users/users.actions';

describe('DeleteUserDialogComponent', () => {
  let component: DeleteUserDialogComponent;
  let fixture: ComponentFixture<DeleteUserDialogComponent>;
  let store: Store;
  let actions$: Actions;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUserDialogComponent],
      imports: [
        MatDialogModule,
        StoreModule.forRoot({})
      ],
      providers: [
        LoadingService,
        UsersService,
        SnackbarMessageService,
        FormValidationService,
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: Actions, useValue: of() }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserDialogComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    actions$ = TestBed.inject(Actions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch deleteUserRequest action on handleDelete', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const userId = 1;
    component.handleDelete(userId);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteUserRequest({ user_id: userId }));
  });

  it('should handle deleteUserResponseSuccess action', () => {
    const successAction = deleteUserResponseSuccess({ user_id: 1 });
    spyOn(actions$, 'pipe').and.returnValue(of(successAction));
    const closeDialogSpy = spyOn(component, 'closeDialog');
    component.subscribeActions();
    expect(closeDialogSpy).toHaveBeenCalledWith(1);
  });

  it('should handle deleteUserResponseFailure action', () => {
    const failureAction = deleteUserResponseFailure({ err: 'Error' });
    spyOn(actions$, 'pipe').and.returnValue(of(failureAction));
    const closeDialogSpy = spyOn(component, 'closeDialog');
    component.subscribeActions();
    expect(closeDialogSpy).toHaveBeenCalledWith(null);
  });
});