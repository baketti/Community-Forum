import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApisHelperService } from '../apis-helper/apis-helper.service';
import { provideHttpClient } from '@angular/common/http';
import { IUser, UserGender, UserStatus } from '@/app/models/User';
import { IPost } from '@/app/models/Post';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  let apisHelperSrv: ApisHelperService;
  let baseUrl = 'https://gorest.co.in/public/v2/users';
  let apisHelperSrvSpy:jasmine.SpyObj<ApisHelperService>;
  beforeEach(() => {
    apisHelperSrvSpy = jasmine.createSpyObj(
      'ApisHelperService', ['addXSpinnerIdHeader']
    );
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApisHelperService
      ]
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
    apisHelperSrv = TestBed.inject(ApisHelperService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post a user', () => {
    const user: IUser = { 
      id: 1, 
      name: 'Test User', 
      email: 'test@example.com', 
      gender: UserGender.MALE, 
      status: UserStatus.ACTIVE
    };
    const mockResponse: IUser = { ...user };

    apisHelperSrvSpy.addXSpinnerIdHeader.and.returnValue({ 
      headers: { 
        'X-Spinner-ID': 'post-user' 
      } 
    });

    service.postUser(user).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);
    expect(req.request.headers.get('X-Spinner-ID')).toBe('post-user');
    req.flush(mockResponse);
  });

  it('should get users', () => {
    const page = 1;
    const per_page = 10;
    const mockUsers: IUser[] = [
      { 
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com', 
        gender: UserGender.MALE, 
        status: UserStatus.ACTIVE
      }
    ];

    apisHelperSrvSpy.addXSpinnerIdHeader.and.returnValue({ 
      headers: { 
        'X-Spinner-ID': 'users' 
      } 
    });

    service.getUsers(page, per_page).subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${baseUrl}?page=${page}&per_page=${per_page}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-Spinner-ID')).toBe('users');
    req.flush(mockUsers);
  });

  it('should find users by email', () => {
    const email = 'test@example.com';
    const mockUsers: IUser[] = [
      { 
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com', 
        gender: UserGender.MALE, 
        status: UserStatus.ACTIVE
      }
    ];

    apisHelperSrvSpy.addXSpinnerIdHeader.and.returnValue({ 
      headers: { 
        'X-Spinner-ID': 'login' 
      } 
    });

    service.findByEmail(email).subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${baseUrl}?email=${email}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-Spinner-ID')).toBe('login');
    req.flush(mockUsers);
  });

  it('should get users by filters', () => {
    const filters = { gender: 'male', status: 'active' };
    const page = 1;
    const per_page = 10;
    const mockUsers: IUser[] = [
      { 
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com', 
        gender: UserGender.MALE, 
        status: UserStatus.ACTIVE 
      }
    ];

    apisHelperSrvSpy.addXSpinnerIdHeader.and.returnValue({ 
      headers: { 
        'X-Spinner-ID': 'users' 
      } 
    });

    service.getUsersByFilters(filters, page, per_page).subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const filterString = Object.entries(filters).map(([key, value]) => `${key}=${value}`).join('&');
    const req = httpMock.expectOne(`${baseUrl}?page=${page}&per_page=${per_page}&${filterString}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-Spinner-ID')).toBe('users');
    req.flush(mockUsers);
  });

  it('should get user details', () => {
    const userId = 1;
    const mockUser: IUser = { 
      id: 1, 
      name: 'Test User', 
      email: 'test@example.com', 
      gender: UserGender.MALE, 
      status: UserStatus.ACTIVE 
    }
    apisHelperSrvSpy.addXSpinnerIdHeader.and.returnValue({ 
      headers: { 
        'X-Spinner-ID': 'user' 
      } 
    });

    service.getUserDetails(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/${userId}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('X-Spinner-ID')).toBe('user');
    req.flush(mockUser);
  });

  it('should get user posts', () => {
    const userId = 1;
    const mockPosts: IPost[] = [
      { 
        id: 1, 
        user_id: 1, 
        title: 'Test Post', 
        body: 'This is a test post.' 
      }
    ];

    service.getUserPosts(userId).subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${baseUrl}/${userId}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should delete user by userId', () => {
    const userId = 1;
    const mockResponse = {};

    apisHelperSrvSpy.addXSpinnerIdHeader.and.returnValue({ 
      headers: { 
        'X-Spinner-ID': 'delete-user' 
      } 
    });

    service.deleteUsersByUserId(userId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('X-Spinner-ID')).toBe('delete-user');
    req.flush(mockResponse);
  });
});
