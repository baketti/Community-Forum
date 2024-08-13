import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { SnackbarMessageService } from '../notification/snackbar-message.service';
import { UsersService } from '../users/users.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { IUser } from '@/app/models/User';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let usersService: UsersService;
  let router: Router;
  let snackMessage: SnackbarMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsersService,
        Router,
        SnackbarMessageService
      ]
    });
    service = TestBed.inject(AuthenticationService);
    usersService = TestBed.inject(UsersService);
    router = TestBed.inject(Router);
    snackMessage = TestBed.inject(SnackbarMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set session token', () => {
    const spySetSessionData = spyOn(service, 'setSessionData').and.callThrough();
    const spyFindByEmail = spyOn(usersService, 'findByEmail').and.returnValue(of([{ email: 'test@example.com' } as IUser]));
    const spyHandleLogin = spyOn(service, 'handleLogin').and.callThrough();

    service.login({ email: 'test@example.com', token: 'token123' });

    expect(spySetSessionData).toHaveBeenCalledWith({ token: 'token123' });
    expect(spyFindByEmail).toHaveBeenCalledWith('test@example.com');
    expect(spyHandleLogin).toHaveBeenCalled();
  });

  it('should handle login correctly', () => {
    const spySetSessionData = spyOn(service, 'setSessionData').and.callThrough();
    const spySnackMessage = spyOn(snackMessage, 'show').and.callThrough();
    const spyRouterNavigate = spyOn(router, 'navigate').and.callThrough();

    const user: IUser = { email: 'test@example.com' } as IUser;
    service.handleLogin([user]);

    expect(spySetSessionData).toHaveBeenCalledWith({ user });
    expect(service.isAuthenticated$.subscribe(
      (value) => expect(value).toBeTrue()
    ));
    expect(spySnackMessage).toHaveBeenCalledWith({ message: 'Successfully logged in', duration: 3000 });
    expect(spyRouterNavigate).toHaveBeenCalledWith(['app/users']);
  });

  it('should handle invalid login', () => {
    const spySnackMessage = spyOn(snackMessage, 'show').and.callThrough();

    service.handleLogin([]);

    expect(service.isAuthenticated$.subscribe(
      (value) => expect(value).toBeFalse()
    ));
    expect(spySnackMessage).toHaveBeenCalledWith({ message: 'Invalid email', duration: 3000 });
  });

  it('should set session data', () => {
    const spySessionStorageSetItem = spyOn(sessionStorage, 'setItem');

    service.setSessionData({ token: 'token123', user: { email: 'test@example.com' } as IUser });

    expect(spySessionStorageSetItem).toHaveBeenCalledWith('Token', 'token123');
    expect(spySessionStorageSetItem).toHaveBeenCalledWith('User', JSON.stringify({ email: 'test@example.com' }));
  });

  it('should check if user is logged in', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('user');
    expect(service.isLogged()).toBeTrue();
  });

  it('should get session token', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('token123');
    expect(service.getSessionToken()).toBe('token123');
  });

  it('should get current user', () => {
    const user = { email: 'test@example.com' } as IUser;
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(user));
    expect(service.getCurrentUser()).toEqual(user)
  });

  it('should clear session on logout', () => {
    const spySessionStorageClear = spyOn(sessionStorage, 'clear');
    service.logout();
    expect(spySessionStorageClear).toHaveBeenCalled();
  });
  it('should get session token', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('token123');
    expect(service.getSessionToken()).toBe('token123');
  });

  it('should get current user', () => {
    const user = { email: 'test@example.com' } as IUser;
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(user));
    expect(service.getCurrentUser()).toEqual(user);
  });

  it('should clear session on logout', () => {
    const spySessionStorageClear = spyOn(sessionStorage, 'clear');
    service.logout();
    expect(spySessionStorageClear).toHaveBeenCalled();
  });
});