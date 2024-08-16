import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { LoginFormComponent } from './login-form.component';
import { AuthenticationService } from '@/app/services/authentication/authentication.service';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '@/app/shared/shared.module';
import { SpinnerComponent } from '@/app/shared/components/spinner/spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginFormComponent,
        SpinnerComponent
      ],
      imports: [
        MatFormFieldModule,
        SharedModule,
        ReactiveFormsModule,
        MatInputModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
        BrowserAnimationsModule
      ],
      providers: [
        AuthenticationService, 
        FormValidationService,
        LoadingService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Sign in" title', () => {
    const title = el.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain("Sign in");
  });
});
