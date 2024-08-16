import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders, HttpHandlerFn } from '@angular/common/http';
import { of } from 'rxjs';
import { paginationHeadersInterceptor } from './pagination-headers.interceptor';

describe('paginationHeadersInterceptor', () => {
  //let paginationServiceSpy: jasmine.SpyObj<PaginationService>;
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => paginationHeadersInterceptor(req, next));

  beforeEach(() => {
    //const spy = jasmine.createSpyObj('PaginationService', ['setPagination']);

    TestBed.configureTestingModule({
      providers: [
       // { provide: , useValue: spy }
      ]
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle pagination headers for /users endpoint', () => {
    const mockResponse = new HttpResponse({
      body: {},
      headers: new HttpHeaders({
        'x-pagination-limit': '10',
        'x-pagination-page': '2',
        'x-pagination-pages': '5',
        'x-pagination-total': '50'
      })
    });

    const req = new HttpRequest('GET', '/users');
    const next: HttpHandlerFn = () => of(mockResponse)

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        //expect(paginationServiceSpy.setPagination).toHaveBeenCalledWith(50, 10, 1);
      }
    });
  });

  it('should handle pagination headers for /posts endpoint', () => {
    const mockResponse = new HttpResponse({
      body: {},
      headers: new HttpHeaders({
        'x-pagination-limit': '20',
        'x-pagination-page': '1',
        'x-pagination-pages': '3',
        'x-pagination-total': '60'
      })
    });

    const req = new HttpRequest('GET', '/posts');
    const next: HttpHandlerFn = () => of(mockResponse)

    interceptor(req,next).subscribe(event => {
      if (event instanceof HttpResponse) {
        //expect(paginationServiceSpy.setPagination).toHaveBeenCalledWith(60, 20, 0);
      }
    });
  });

  it('should not handle pagination headers for other endpoints', () => {
    const mockResponse = new HttpResponse({
      body: {},
      headers: new HttpHeaders({
        'x-pagination-limit': '10',
        'x-pagination-page': '2',
        'x-pagination-pages': '5',
        'x-pagination-total': '50'
      })
    });

    const req = new HttpRequest('GET', '/other');
    const next: HttpHandlerFn = () => of(mockResponse)

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        //expect(paginationServiceSpy.setPagination).not.toHaveBeenCalled();
      }
    });
  });
});