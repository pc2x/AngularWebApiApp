import { Injectable, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginModel } from '../Models/login.model';
import { TokenModel } from '../Models/token.model'
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private url = 'https://localhost:32768/oauth/token';
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    withCredentials: true, // Importante para permitir cookies en la solicitud
  };  

  requestToken(data :LoginModel ): any {
    const body = new HttpParams()
    .set('username', data.username)
    .set('password', data.password)
    .set('grant_type', "password")
    .set('client_id', "pc2x")
    .set('client_secret', "pc2x");

    return firstValueFrom(
      this.http.post<TokenModel>(this.url, body, this.options)
    );
  }

  geTokenUrl():string {
    return this.url;
  }

  getAntiforgeryToken(): string {
    const aftoken = localStorage.getItem("RequestVerificationToken");
    return aftoken ?? "";
  }

  setAntiforgeryToken(token: string | undefined | null): void {
    if(token)
      localStorage.setItem("RequestVerificationToken", token);
  }

  getUserName():string {
    const jtwToken = localStorage.getItem("username");
    return jtwToken ?? "";
  }

  getStoredAuthToken():string {
    const jtwToken = localStorage.getItem("Autorization");
    return jtwToken ?? "";
  }

  signIn(token: string, username: string){
    if(token){
      localStorage.setItem("Autorization", token);
      localStorage.setItem("username", username);
    }
  }

  signOut(){
    localStorage.removeItem("Autorization");
    localStorage.removeItem("RequestVerificationToken");
  }

  isAuthenticated():boolean {
    const token = this.getStoredAuthToken();
    return token? true: false;
  }
}
