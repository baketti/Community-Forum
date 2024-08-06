import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { PaginationService } from '../../pagination/pagination.service';
import { inject } from '@angular/core';

export const paginationHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const paginationSrv = inject(PaginationService);

  function handlePaginationHeaders(response: HttpResponse<any>) {
    const paginationHeaders = {
      limit: response.headers.get('x-pagination-limit'),
      page: response.headers.get('x-pagination-page'),
      pages: response.headers.get('x-pagination-pages'),
      total: response.headers.get('x-pagination-total')
    };
    let per_page = Number(paginationHeaders.limit)
    let page = Number(paginationHeaders.page);
    let pages = Number(paginationHeaders.pages);
    let total = Number(paginationHeaders.total);
    if(total <= per_page || page > pages) {
      page = 0;
    }
    paginationSrv.setPagination(total, per_page, page-1);
  }
  if(req.method === 'GET'){
    return next(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (req.url.includes('/users')) {
            handlePaginationHeaders(event);
          } else if (req.url.includes('/posts') && !req.url.includes('/comments')) {
            handlePaginationHeaders(event);
          }
        }
      }, error => {
        console.error('Error response intercepted:', error);
      })
    );
  }else{
    return next(req)
  }
};
