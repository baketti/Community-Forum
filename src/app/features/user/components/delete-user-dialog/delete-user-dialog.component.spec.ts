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
import { StoreModule } from '@ngrx/store';

describe('DeleteUserDialogComponent', () => {
  let component: DeleteUserDialogComponent;
  let fixture: ComponentFixture<DeleteUserDialogComponent>;

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
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});