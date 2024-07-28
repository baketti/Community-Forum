import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { errorInterceptor } from './error.interceptor';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { SnackbarMessageService } from '../../notification/snackbar-message.service';

describe('errorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Router,
        AuthenticationService,
        SnackbarMessageService
      ]
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
