import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '@/app/core/services/loading/loading.service';
import { FormValidationService } from '@/app/core/services/form-validation/form-validation.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  @Output() formSubmit: EventEmitter<void> = new EventEmitter();
  @Input() form!:FormGroup;
  get isDisabled():boolean{
    return this.form.invalid;
  };

  constructor(
    private formValidationService: FormValidationService,
    public loadingSrv: LoadingService,
  ) { }

  onSubmit() {
    this.formSubmit.emit();
  }

  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(
      fieldName,
      this.form
    );
  }

  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(
      fieldName,
      this.form
    );
  }
}
