import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MatCardModule } from '@angular/material/card';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        RegistrationFormComponent
      ],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        SharedModule,
        MatSelectModule,
        ReactiveFormsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});