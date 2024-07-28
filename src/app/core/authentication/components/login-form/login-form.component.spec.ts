import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginFormComponent } from './login-form.component';
import { AuthenticationService } from '@/app/services/authentication/authentication.service';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '@/app/shared/shared.module';
import { SpinnerComponent } from '@/app/shared/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginFormComponent,
        SpinnerComponent
      ],
      imports: [
        MatFormFieldModule,
        SharedModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthenticationService, 
        FormValidationService,
        LoadingService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
