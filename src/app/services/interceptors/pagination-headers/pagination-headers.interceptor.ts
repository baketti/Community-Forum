import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setPagination } from '@/app/shared/store/pagination/pagination.actions';

export const paginationHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const  store = inject(Store);
  
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
    const pagination = {
      totalItems: total, 
      per_page, 
      page: page-1
    }
    store.dispatch(setPagination({pagination}))
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
