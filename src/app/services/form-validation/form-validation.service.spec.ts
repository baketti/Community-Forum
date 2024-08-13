import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationService } from './form-validation.service';

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fieldHasError', () => {
    it('should return true if the field is invalid and touched', () => {
      const formGroup = new FormGroup({
        email: new FormControl('', [Validators.required])
      });
      formGroup.controls['email'].markAsTouched();
      expect(service.fieldHasError('email', formGroup)).toBe(true);
    });

    it('should return false if the field is valid or not touched', () => {
      const formGroup = new FormGroup({
        email: new FormControl('', [Validators.required])
      });
      expect(service.fieldHasError('email', formGroup)).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should return required error message', () => {
      const formGroup = new FormGroup({
        email: new FormControl('', [Validators.required])
      });
      formGroup.controls['email'].markAsTouched();
      expect(service.getErrorMessage('email', formGroup)).toBe('email is required');
    });

    it('should return email error message', () => {
      const formGroup = new FormGroup({
        email: new FormControl('invalid-email', [Validators.email])
      });
      formGroup.controls['email'].markAsTouched();
      expect(service.getErrorMessage('email', formGroup)).toBe('Must be email');
    });

    it('should return minlength error message', () => {
      const formGroup = new FormGroup({
        username: new FormControl('abc', [Validators.minLength(5)])
      });
      formGroup.controls['username'].markAsTouched();
      expect(service.getErrorMessage('username', formGroup)).toBe('username should contain at least 5 characters');
    });

    it('should return maxlength error message', () => {
      const formGroup = new FormGroup({
        username: new FormControl('abcdefgh', [Validators.maxLength(5)])
      });
      formGroup.controls['username'].markAsTouched();
      expect(service.getErrorMessage('username', formGroup)).toBe('username should contain max 5 characters');
    });

    it('should return notUnique error message', () => {
      const formGroup = new FormGroup({
        email: new FormControl('', [Validators.required])
      });
      formGroup.controls['email'].setErrors({ notUnique: true });
      expect(service.getErrorMessage('email', formGroup)).toBe('This email has already been taken');
    });
  });

  describe('setErrorMessage', () => {
    it('should set notUnique error on the field', () => {
      const formGroup = new FormGroup({
        email: new FormControl('')
      });
      service.setErrorMessage('email', formGroup);
      expect(formGroup.controls['email'].errors).toEqual({ notUnique: true });
    });
  });
});
