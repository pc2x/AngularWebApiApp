import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoaderService } from '../Services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private loaderService = inject(LoaderService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //before start request
    this.loaderService.showLoader();

    return next.handle(request).pipe(
      tap(() => {
        this.loaderService.hideLoader();
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hideLoader();
        return throwError(() => error);
      })
    )
  }
}
