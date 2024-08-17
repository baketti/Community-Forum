import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts.service';
import { 
  HttpTestingController, 
  provideHttpClientTesting 
} from '@angular/common/http/testing';
import { ApisHelperService } from '../apis-helper/apis-helper.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { provideHttpClient } from '@angular/common/http';
import { IPost, Post } from '@/app/models/Post';
import { IUser, UserGender, UserStatus } from '@/app/models/User';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;
  let authService: AuthenticationService;
  let apisHelperService: ApisHelperService;
  let authSpy: jasmine.SpyObj<AuthenticationService>;
  let apisHelperSpy: jasmine.SpyObj<ApisHelperService>;
  const baseUrl = 'https://gorest.co.in/public/v2/';

  beforeEach(() => {
    authSpy = jasmine.createSpyObj(
      'AuthenticationService', 
      ['getCurrentUser']
    );
    apisHelperSpy = jasmine.createSpyObj(
      'ApisHelperService', 
      ['addXSpinnerIdHeader']
    );

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ApisHelperService,
        AuthenticationService
      ]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthenticationService) 
    apisHelperService = TestBed.inject(ApisHelperService)
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should get posts', () => {
    const mockPosts: IPost[] = [{ 
      id: 1, 
      title: 'Test Post', 
      body: 'This is a test post',
      user_id: 1
    }];
    apisHelperSpy.addXSpinnerIdHeader.and.returnValue({ headers: { 
        'X-Spinner-ID': 'get-posts' 
      } 
    });

    service.getPosts(1, 10).subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${baseUrl}posts?page=1&per_page=10`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should get posts by title', () => {
    const mockPosts: IPost[] = [{ 
      id: 1, 
      title: 'Test Post', 
      body: 'This is a test post',
      user_id: 1
    }];
    apisHelperSpy.addXSpinnerIdHeader.and.returnValue({ 
      headers: { 
        'X-Spinner-ID': 'get-posts' 
      } 
    });

    service.getPostsByTitle('Test', 1, 10).subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${baseUrl}posts?page=1&per_page=10&title=Test`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
});
