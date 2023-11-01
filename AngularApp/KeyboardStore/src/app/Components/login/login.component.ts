import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from '../../Models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginService = inject(AuthService);
  router = inject(Router);

  formulario: FormGroup;

  username = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);
  loginError: boolean;
  errorMsg: string;

  constructor() {
    this.loginError = false;
    this.errorMsg = "";
    this.formulario = new FormGroup(
      {
        username: this.username,
        password: this.password
      }
    );
    this.loginService.signOut();
  }

  async onLogin() {

    if (this.formulario.valid) {
      const data = this.formulario.value as LoginModel;
      var r = await this.loginService.requestToken(data);
      if (r && r.token) {
        //setea el token de autenticación si es la url del token
        this.loginService.signIn(r.token, data.username);
        this.router.navigate([""]);
      } else {
        this.loginError = true;
        this.errorMsg = r.error;
      }
    }
  }
}
