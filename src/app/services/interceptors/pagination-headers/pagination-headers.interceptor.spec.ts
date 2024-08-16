import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { paginationHeadersInterceptor } from './pagination-headers.interceptor';
import { setPagination } from '@/app/shared/store/pagination/pagination.actions';

describe('paginationHeadersInterceptor', () => {
  let store: MockStore;
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => paginationHeadersInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore()
      ]
    });

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
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
    const next: HttpHandlerFn = () => of(mockResponse);

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        expect(store.dispatch).toHaveBeenCalledWith(setPagination({
          pagination: {
            totalItems: 50,
            per_page: 10,
            page: 1
          }
        }));
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
    const next: HttpHandlerFn = () => of(mockResponse);

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        expect(store.dispatch).toHaveBeenCalledWith(setPagination({
          pagination: {
            totalItems: 60,
            per_page: 20,
            page: 0
          }
        }));
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
    const next: HttpHandlerFn = () => of(mockResponse);

    interceptor(req, next).subscribe(event => {
      if (event instanceof HttpResponse) {
        expect(store.dispatch).not.toHaveBeenCalled();
      }
    });
  });
});