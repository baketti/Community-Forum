import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsRoutingModule } from './errors-routing.module';
import { ErrorsComponent } from './errors.component';
import { MatCardModule } from '@angular/material/card';
import { NetworkErrorComponent } from './pages/network-error/network-error.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
  declarations: [
    ErrorsComponent,
    NetworkErrorComponent,
    ForbiddenComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    MatCardModule
  ]
})
export default class ErrorsModule { }
