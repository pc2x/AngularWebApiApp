import { Component, inject } from '@angular/core';
import { LoginService } from '../../login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginModel } from '../../Models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginService = inject(LoginService);
    formulario:FormGroup;

    constructor() {
      this.formulario = new FormGroup(
        {
          username: new FormControl(),
          password: new FormControl()
        }
      );
    }

    async onLogin(){
      const data = this.formulario.value as LoginModel;
      data.grant_type = "password";
      data.client_id = "pc2x";
      let r = await this.loginService.DoLogin(data);
      console.log(r);
    }
}
