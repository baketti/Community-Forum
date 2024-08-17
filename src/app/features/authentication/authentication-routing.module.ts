import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { RegisterComponent as RegisterPage } from './pages/register/register.component';
import { LoginComponent as LoginPage } from './pages/login/login.component';
import { LoginGuardService } from '@/app/core/guards/login-guard/login-guard.service';

const routes: Routes = [
  { path: '', component: AuthenticationComponent, children: [
    { path: 'login', component: LoginPage, canActivate: [LoginGuardService] },
    { path: 'registration', component: RegisterPage },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
