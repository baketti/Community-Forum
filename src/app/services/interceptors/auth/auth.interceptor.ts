import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/authentication.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const token = authService.getSessionToken();
  
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    }
  });
  return next(authReq);
};
