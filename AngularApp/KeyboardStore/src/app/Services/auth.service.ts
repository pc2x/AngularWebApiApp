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

  private url = 'http://localhost:5000/oauth/token';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  requestToken(data :LoginModel ): any {

    const body = new HttpParams()
    .set('username', data.username)
    .set('password', data.password)
    .set('grant_type', "password")
    .set('client_id', "pc2x")
    .set('client_secret', "pc2x");

    return firstValueFrom(
      this.http.post<TokenModel>(this.url, body, this.httpOptions)
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

  setAuthToken(token: string){
    if(token)
      localStorage.setItem("Autorization", token);
  }

  getStoredAuthToken():string {
    const jtwToken = localStorage.getItem("Autorization");
    return jtwToken ?? "";
  }

  signIn(token: string){
    if(token)
      localStorage.setItem("Autorization", token);
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
