import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserDialogComponent } from './create-user-dialog.component';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';
import { UsersService } from '@/app/services/users/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateUserFormComponent } from '../create-user-form/create-user-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialogComponent;
  let fixture: ComponentFixture<CreateUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateUserDialogComponent,
        CreateUserFormComponent
      ],
      imports: [
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers: [
        LoadingService,
        UsersService,
        SnackbarMessageService,
        FormValidationService,
        PaginationService,
        { provide: MatDialogRef, useValue: {} },
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
