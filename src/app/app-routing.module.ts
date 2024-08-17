import { RouteGuardService } from '@/app/core/guards/route-guard/route-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'app', 
    loadChildren: () => import('./features/features.module'),
    canActivate: [RouteGuardService] 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./features/authentication/authentication.module')
  }, 
  { path: '**', redirectTo: 'app/errors' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
