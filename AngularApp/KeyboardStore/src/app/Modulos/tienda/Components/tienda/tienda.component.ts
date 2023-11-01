import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {

  protected username:string;
  private authService = inject(AuthService);

  constructor() {
    this.username = this.authService.getUserName();
  }

}
