import { AuthenticationService } from '@/app/core/services/authentication/authentication.service';
import { FormValidationService } from '@/app/core/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from '@/utils/types';

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
    this.loginForm = this.initLoginForm;
  }

  private get initLoginForm(): FormGroup {
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
