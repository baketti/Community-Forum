import { RouteGuardService } from '@/app/services/guards/route-guard/route-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },//insert here HomeComponent
  { 
    path: 'app', 
    loadChildren: () => 
      import('./features/features.module').then(m => 
        m.FeaturesModule
    ),
    canActivate: [RouteGuardService] 
  },
  { 
    path: 'auth', 
    loadChildren: () => 
      import('./core/authentication/authentication.module').then(m => 
        m.AuthenticationModule
      ) 
  }, 
  { path: '**', redirectTo: 'app/errors' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
