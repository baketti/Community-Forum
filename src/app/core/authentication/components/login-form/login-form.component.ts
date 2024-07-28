import { AuthenticationService, AuthData } from '@/app/services/authentication/authentication.service';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup;

  constructor(
    private authSrv: AuthenticationService, 
    private formValidationService: FormValidationService,
    public loadingService: LoadingService
  ) { 
    this.loginForm = this.initLoginForm();
  }

  private initLoginForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      token: new FormControl('', [
        Validators.required,
        Validators.minLength(64),
        Validators.maxLength(64),
      ])
    });
  }

  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(
      fieldName,
      this.loginForm
    );
  }

  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.loginForm
    );
  }
  
  onLoginSubmit():void {
    const AuthData: AuthData = this.loginForm.value;
    this.authSrv.login(AuthData);
  }
}
