import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { SnackbarMessageService } from '../../notification/snackbar-message.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  const snackMessage = inject(SnackbarMessageService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.error('Unauthorized request:', err);
          router.navigate(['error/401']); 
          authService.logout();
        } else if (err.status === 500) {
          console.error('Internal Server Error:', err);
          router.navigate(['error/500']);
        } else if (err.status === 404 || err.status === 0) {
          console.error('not found error:', err);
          snackMessage.show({
            message: err.status === 404 ? 'No data found' : 
            `The initial connection between Cloudflare's network and the origin web server timed out. As a result, the web page can not be displayed. Please try again in a few minutes.`,
          });
          //router.navigate(['error/404']);
        } else if (err.status === 422) {
          console.error('Data validation error:', err);
          const { field, message } = err.error[0];
          snackMessage.show({
            message: `User registration failed:\n ${field} ${message}`,
          });
        } else {
          console.error('HTTP error:', err);
          router.navigate(['error/500']);
        }
      return throwError(() => "errorInterceptor throwError => "+err); 
    })
  );
};
