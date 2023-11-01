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
import { MensajeService } from '../Services/mensaje.service';
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);
  private msjService = inject(MensajeService);
  private router = inject(Router);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authToken = this.authService.getStoredAuthToken();
    const afToken = this.authService.getAntiforgeryToken();
   
    let  clonetRequest = request.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken,
          RequestVerificationToken: afToken,
        },
        withCredentials : true
      })

    return next.handle(clonetRequest).pipe(

      tap((response) => {
        if (response instanceof HttpResponse) {

          // Obtener el estado de la respuesta HTTP
          const status = response.status;

          //si es una respuesta exitosa
          if (status === 200) {

            //obtiene el antiforgery token de la cabecera del response
            const aftoken = response.headers.get('RequestVerificationToken');
            //lo almacena
            this.authService.setAntiforgeryToken(aftoken);
            
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
      
        if (error.status === 401) {
          // Manejar errores de autorización (código 401)
          // Puedes ejecutar tu función personalizada aquí para manejar la autorización.
          this.router.navigate(["login"])
          return of(new HttpResponse({
            status: 401, body: {
              success: false,
              error: error.error
            }
          }));
        }

        this.msjService.showError(error.message);
        return throwError(() => error);
      })
    )
  }


}
