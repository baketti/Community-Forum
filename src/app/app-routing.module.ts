import { RouteGuardService } from '@/app/services/guards/route-guard/route-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },//insert here HomeComponent
  { 
    path: 'app', 
    loadChildren: () => import('./features/features.module'),
    canActivate: [RouteGuardService] 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./core/authentication/authentication.module')
  }, 
  { path: '**', redirectTo: 'app/errors' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
