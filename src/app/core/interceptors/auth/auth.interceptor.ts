import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@/environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);  

  let token;
  
  if (
    router.url === '/auth/registration' 
    && req.method === 'POST' 
    && !authService.isLogged()
  ) {
    token = environment.go_rest_token
  } else {
    token = authService.getSessionToken();
  }
  
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    }
  });

  return next(authReq);
};
