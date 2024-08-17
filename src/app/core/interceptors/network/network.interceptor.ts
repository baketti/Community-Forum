import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../../services/loading/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const networkInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingSrv = inject(LoadingService);
  const spinnerId = req.headers.get("X-Spinner-ID");

  if (spinnerId) {
    loadingSrv.addQueue(spinnerId);
  }
  
  return next(req).pipe(
    finalize(() => {
      if (spinnerId) {
        loadingSrv.removeQueue(spinnerId);
      }
    })
  );
};
