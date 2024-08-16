import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserFormComponent } from './create-user-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingService } from '@/app/services/loading/loading.service';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockReducer } from '@/app/app.component.spec';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('CreateUserFormComponent', () => {
  let component: CreateUserFormComponent;
  let fixture: ComponentFixture<CreateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserFormComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        SharedModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
      ],
      providers: [
        FormValidationService,
        LoadingService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserFormComponent);
    component = fixture.componentInstance;

    component.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      status: new FormControl('', [
        Validators.required,
      ]),
      gender: new FormControl('', [
        Validators.required,
      ]),
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
