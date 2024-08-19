import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginGuardService } from './login-guard.service';

describe('LoginGuardService', () => {
  let service: LoginGuardService;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', ['isLogged']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        LoginGuardService,
        { provide: AuthenticationService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(LoginGuardService);
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to users if user is logged in', () => {
    authService.isLogged.and.returnValue(true);

    const result = service.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['app/users']);
  });

  it('should allow activation if user is not logged in', () => {
    authService.isLogged.and.returnValue(false);

    const result = service.canActivate(
      {} as ActivatedRouteSnapshot, 
      {} as RouterStateSnapshot
    );
    expect(result).toBeTrue();
  });
});