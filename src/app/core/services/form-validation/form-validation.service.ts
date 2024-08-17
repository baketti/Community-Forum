import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
 
  constructor() { }
  
  fieldHasError(fieldName: string, targetForm: FormGroup): boolean {
    const formField = targetForm.controls[fieldName];
    return formField.invalid && formField.touched ? true : false;
  }

  getErrorMessage(fieldName: string, targetForm: FormGroup): string {
    const formField = targetForm.get(fieldName);
    const fieldErrors = targetForm.controls[fieldName].errors;
    return formField?.hasError('required')
      ? `${fieldName} is required`
      : formField?.hasError('email')
      ? 'Must be email'
      : formField?.hasError('minlength')
      ? `${fieldName} should contain at least ${fieldErrors?.['minlength'].requiredLength} characters`
      : formField?.hasError('maxlength')
      ? `${fieldName} should contain max ${fieldErrors?.['maxlength'].requiredLength} characters`
      : formField?.hasError('notUnique')
      ? 'This email has already been taken'
      :'';//Unknown error
  }

  setErrorMessage(fieldName: string, targetForm: FormGroup): void {
    const formField = targetForm.get(fieldName);
    formField?.setErrors({
      notUnique: true
    });
  }
}
