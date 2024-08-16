import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { UsersService } from '@/app/services/users/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@/app/shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      imports: [
        MatFormFieldModule,
        SharedModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
        BrowserAnimationsModule     
      ],  
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        FormValidationService,
        UsersService,
        LoadingService,
        Router,
        provideRouter([])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Sign up" title', () => {
    const title = el.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain("Sign up");
  });
});