import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { SnackbarMessageService } from '../../services/notification/snackbar-message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  const snackMessage = inject(SnackbarMessageService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if (router.url.includes('login')) {
            snackMessage.show({
              message: 'Invalid token',
            });
          } else {
            router.navigate(['error/401']); 
            snackMessage.show({
              message: 'You are not authorized, please login first',
            });
            authService.logout();
          }
        } else if (err.status === 500) {
          router.navigate(['error/500']);
          snackMessage.show({
            message: 'Network error, check your connection'
          });
        } else if (err.status === 404 || err.status === 0) {
          router.navigate(['error/500']);
          snackMessage.show({
            message: err.status === 404 ? 'No data found' : 
            `The initial connection between Cloudflare's network and the origin web server timed out. As a result, the web page can not be displayed. Please try again in a few minutes.`,
          });
        } else if (err.status === 422) {
          const { field, message } = err.error[0];
          snackMessage.show({
            message: `${field} ${message}`,
          });
        } else {
          router.navigate(['error/500']);
        }
      return throwError(() => "errorInterceptor throwError => "+err); 
    })
  );
};
