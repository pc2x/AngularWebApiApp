import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './Models/login.model';
import { TokenModel } from './Models/token.model'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'https://localhost:32774/oauth/token';
  http = inject(HttpClient);

  DoLogin(data :LoginModel ): Observable<TokenModel> {
    return this.http.post<TokenModel>(this.url, data).pipe(
      tap(x => console.log(JSON.stringify(x)))
    );
  }
}
