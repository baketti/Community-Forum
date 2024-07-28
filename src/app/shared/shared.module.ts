import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';


@NgModule({
  declarations: [
    SpinnerComponent,
    AddButtonComponent
  ],
  imports: [ 
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatFabButton
  ],
  exports: [
    SpinnerComponent,
    AddButtonComponent
  ]
})
export class SharedModule { }
