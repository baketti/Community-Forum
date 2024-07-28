import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(
    private authService: AuthenticationService, 
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {
    console.log('route ', route);
    console.log('state ', state);
    
    if(this.authService.isLogged()) {
      this.router.navigate(['app/users']);
      return false
    }; 
    return true;
  }
}
