import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { catchError, Observable, tap } from 'rxjs'
import { ServiceError } from './components/common/errors/service.error'

export function globalErrorHandler(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap(),
    catchError(err => {
      if (err.error.error && err.error.message && err.error.status) {
        throw new ServiceError(err.error.message, err.error.status, err.error.error)
      }

      throw new ServiceError("Something went wrong", 500, "Internal Server Error")
    })
  );
}