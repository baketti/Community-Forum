import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    private authService: AuthenticationService, 
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {
    if(this.authService.isLogged()) return true; 
    return this.authService.isAuthenticated$.pipe(
      map(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}
