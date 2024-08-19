import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';
import { ApisHelperService } from '../apis-helper/apis-helper.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { IComment } from '@/app/models/Comment';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;
  let apisHelperSrv: jasmine.SpyObj<ApisHelperService>;
  const baseUrl = 'https://gorest.co.in/public/v2/posts'

  beforeEach(() => {
    const apisHelperSrvSpy = jasmine.createSpyObj('ApisHelperService', ['addXSpinnerIdHeader']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CommentsService,
        { provide: ApisHelperService, useValue: apisHelperSrvSpy }
      ]
    });

    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
    apisHelperSrv = TestBed.inject(ApisHelperService) as jasmine.SpyObj<ApisHelperService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post a comment', () => {
    const postId = 1;
    const comment: Omit<IComment, 'id'> = { 
      name: 'Test', 
      email: 'test@example.com', 
      body: 'Test comment',
      post_id: postId
     };
    const mockResponse: IComment = { id: 1, ...comment };

    apisHelperSrv.addXSpinnerIdHeader.and.returnValue({ 
      headers: { 
        'X-Spinner-ID': 'post-comment' 
      } 
    });

    service.postComment(comment).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/${postId}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(comment);
    expect(req.request.headers.get('X-Spinner-Id')).toBe('post-comment');
    req.flush(mockResponse);
  });

  it('should get comments', () => {
    const postId = 1;
    const mockComments: IComment[] = [
      { 
        id: 1, 
        name: 'Test', 
        email: 'test@example.com', 
        body: 'Test comment',
        post_id: postId
      }
    ];

    service.getComments(postId).subscribe((comments) => {
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(`${baseUrl}/${postId}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });
});