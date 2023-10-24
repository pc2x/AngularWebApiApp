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
import { AuthService } from '../Services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authToken = this.authService.getStoredAuthToken();
    const afToken = this.authService.getAntiforgeryToken();
    let clonetRequest = request;

    //before send request
    if (authToken) {
      clonetRequest = request.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken,
          RequestVerificationToken: afToken
        }
      })
    }

    return next.handle(clonetRequest).pipe(

      tap((response) => {
        if (response instanceof HttpResponse) {

          // Obtener el estado de la respuesta HTTP
          const status = response.status;

          //si es una respuesta exitosa
          if (status === 200) {

            //obtiene el antiforgery token de la cabecera del response
            const aftoken = response.headers.get('RequestVerificationToken');

            //lo seteaa
            this.authService.setAntiforgeryToken(aftoken);
            
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {

        console.log(error);

        if (error.status === 401) {
          // Manejar errores de autorización (código 401)
          // Puedes ejecutar tu función personalizada aquí para manejar la autorización.
          return of(new HttpResponse({
            status: 401, body: {
              success: false,
              error: error.error
            }
          }));

        } else if (error.status === 500) {
          // Manejar otros errores del servidor (código 500)
          // Puedes ejecutar tu función personalizada aquí para manejar errores del servidor.
          return throwError(() => error);
        }
        return throwError(() => error);
      })
    )
  }


}
