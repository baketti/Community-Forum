import { Component, Input } from '@angular/core';
import { AuthenticationService } from '@/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { IUser } from '../../../models/User';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.scss'
})
export class AppbarComponent {
  constructor(
    private authSrv: AuthenticationService, 
    private router: Router
  ) { }

  get isLoggedIn():boolean {
    return this.authSrv.isLogged();
  }

  get currentUser():IUser | null {
    return this.authSrv.getCurrentUser();
  }

  goToLoginPage():void {
    this.router.navigate(['auth/login']);
  }

  handleLogout():void {
    this.authSrv.logout();
    this.router.navigate(['auth/login']);
  }

  goToUsersPage():void {
    this.router.navigate(['app/users']);
  }

  goToPostsPage():void {
    this.router.navigate(['app/posts']);
  }

  goToUserProfile():void {
    this.router.navigate(['app/users', this.currentUser?.id]);
  }
}
