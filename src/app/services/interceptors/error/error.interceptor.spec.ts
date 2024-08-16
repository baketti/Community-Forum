import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { SnackbarMessageService } from '../../notification/snackbar-message.service';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let snackMessageSpy: jasmine.SpyObj<SnackbarMessageService>;

  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));

  beforeEach(() => {
    const router = jasmine.createSpyObj('Router', ['navigate'],{url:''});
    const authService = jasmine.createSpyObj('AuthenticationService', ['logout']);
    const snackMessage = jasmine.createSpyObj('SnackbarMessageService', ['show']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: AuthenticationService, useValue: authService },
        { provide: SnackbarMessageService, useValue: snackMessage }
      ]
    });

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    snackMessageSpy = TestBed.inject(SnackbarMessageService) as jasmine.SpyObj<SnackbarMessageService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle 500 error', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => throwError(() => new HttpErrorResponse({ status: 500 }))

    interceptor(req, next).subscribe({
      error: () => {
        expect(routerSpy.navigate).toHaveBeenCalledWith(['error/500']);
        expect(snackMessageSpy.show).toHaveBeenCalledWith({
          message: 'Network error, check your connection'
        });
      }
    });
  });

  it('should handle 404 error', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn =  () => throwError(() => new HttpErrorResponse({ status: 404 }))

    interceptor(req, next).subscribe({
      error: () => {
        expect(snackMessageSpy.show).toHaveBeenCalledWith({
          message: 'No data found'
        });
      }
    });
  });

  it('should handle 422 error', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => throwError(() => new HttpErrorResponse({
      status: 422, 
      error: [{ 
        field: 'email', 
        message: 'is invalid' 
      }] 
    }))

    interceptor(req, next).subscribe({
      error: () => {
        expect(snackMessageSpy.show).toHaveBeenCalledWith({
          message: 'email is invalid',
        });
      }
    });
  });

  it('should handle unknown error', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => throwError(() => new HttpErrorResponse({ status: 999 }))

    interceptor(req, next).subscribe({
      error: () => {
        expect(routerSpy.navigate).toHaveBeenCalledWith(['error/500']);
      }
    });
  });
});