import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppbarComponent } from './appbar.component';
import { AuthenticationService } from '@/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { IUser, UserGender, UserStatus } from '@/app/models/User';

describe('AppbarComponent', () => {
  let component: AppbarComponent;
  let fixture: ComponentFixture<AppbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const user:IUser = { 
    id: 1, 
    name: 'Test User',
    email: 'test@gmail',
    status: UserStatus.ACTIVE,
    gender: UserGender.MALE
  };

  beforeEach(async () => {
    const authService = jasmine.createSpyObj('AuthenticationService', ['isLogged', 'getCurrentUser', 'logout']);
    const router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AppbarComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: Router, useValue: router },
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppbarComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return isLoggedIn status', () => {
    authServiceSpy.isLogged.and.returnValue(true);
    expect(component.isLoggedIn).toBeTrue();
    authServiceSpy.isLogged.and.returnValue(false);
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should return current user', () => {
    authServiceSpy.getCurrentUser.and.returnValue(user);
    expect(component.currentUser).toEqual(user);
  });

  it('should navigate to login page', () => {
    component.goToLoginPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
  });

  it('should handle logout and navigate to login page', () => {
    component.handleLogout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
  });

  it('should navigate to users page', () => {
    component.goToUsersPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['app/users']);
  });

  it('should navigate to posts page', () => {
    component.goToPostsPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['app/posts']);
  });

  it('should navigate to user profile page', () => {
    authServiceSpy.getCurrentUser.and.returnValue(user);
    component.goToUserProfile();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['app/users', user.id]);
  });

  it('should display correct buttons when logged in', () => {
    authServiceSpy.isLogged.and.returnValue(true);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should display correct buttons when not logged in', () => {
    authServiceSpy.isLogged.and.returnValue(false);
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBeGreaterThan(0);
  });
});