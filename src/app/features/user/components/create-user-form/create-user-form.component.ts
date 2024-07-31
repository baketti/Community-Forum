import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '@/app/services/users/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoadingService } from '@/app/services/loading/loading.service';
import { IUser } from '@/app/models/User';
import { SnackbarMessageService } from '@/app/services/notification/snackbar-message.service';
import { FormValidationService } from '@/app/services/form-validation/form-validation.service';
import { PaginationService } from '@/app/services/pagination/pagination.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css'
})
export class CreateUserFormComponent implements OnInit{

  @Output() formSubmit: EventEmitter<void> = new EventEmitter();
  @Input() form!:FormGroup;
  get isDisabled():boolean{
    return this.form.invalid;
  };

  constructor(
    private formValidationService: FormValidationService,
    public loadingSrv: LoadingService,
  ) { }

  ngOnInit(){
    if (!this.form) {
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        status: new FormControl(''),
        gender: new FormControl('',[Validators.required]),
      });
    }
  }

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
