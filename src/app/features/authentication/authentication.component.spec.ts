import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from '@/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StoreModule } from '@ngrx/store';
import { mockReducer } from '@/app/app.component.spec';
import { EffectsModule } from '@ngrx/effects';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthenticationComponent,
        LoginFormComponent,
        RegistrationFormComponent,
        RegisterComponent,
        LoginComponent
      ],
      imports: [
        StoreModule.forRoot({ mock: mockReducer }),
        EffectsModule.forRoot([]),
        CommonModule,
        AuthenticationRoutingModule,
        MatCardModule,
        SharedModule,
        MatFormFieldModule,
        MatInputModule, 
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
