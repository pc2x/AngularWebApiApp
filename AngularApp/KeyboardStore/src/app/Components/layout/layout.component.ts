import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  protected username:string;
  private authService = inject(AuthService);

  constructor() {
    this.username = this.authService.getUserName();
  }

}
