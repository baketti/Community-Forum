import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { networkInterceptor } from './network.interceptor';
import { LoadingService } from '../../loading/loading.service';

describe('networkInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => networkInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingService
      ]
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
