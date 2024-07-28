import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorsComponent } from './errors.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NetworkErrorComponent } from './pages/network-error/network-error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: ErrorsComponent, children: [
      { path: '401', component: ForbiddenComponent },
      { path: '404', component: NotFoundComponent },
      { path: '500', component: NetworkErrorComponent },
      { path: '', redirectTo: '404', pathMatch: 'full' } 
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
