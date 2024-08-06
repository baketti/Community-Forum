import { IUser } from '@/app/models/User';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { LoadingService } from '@/app/services/loading/loading.service';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { UsersService } from '@/app/services/users/users.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  registerForm: FormGroup;

  constructor(
    private formValidationService: FormValidationService,
    private usersService: UsersService,
    public loadingService: LoadingService,
    private snackMessage: SnackbarMessageService,
    private router: Router
  ) {
    this.registerForm = this.initRegisterForm;
  }

  private get initRegisterForm(): FormGroup {
    return new FormGroup(
      {
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
      },
    )
  }

  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(
      fieldName,
      this.registerForm
    );
  }

  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.registerForm
    );
  }

  onRegisterSubmit() {
    this.usersService.postUser(this.registerForm.value).subscribe({
      next: this.handlePostUser.bind(this),
      error: this.handlePostUserError.bind(this)
    });
  }

  handlePostUser(user: IUser): void {
    this.registerForm.reset();
    this.router.navigate(['auth/login']);
    this.snackMessage.show({
      message:"User registered successfully",
      duration: 5000
    });
  }

  handlePostUserError(error: any): void {
    this.snackMessage.show({
      message:"An error occurred during user registration",
      duration: 5000
    });
  }
}
