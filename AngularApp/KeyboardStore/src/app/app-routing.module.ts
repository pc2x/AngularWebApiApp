import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './Components/login/login.component';
import { authGuard } from './Guards/auth.guard';
import {LayoutComponent} from './Components/layout/layout.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./Modulos/tienda/tienda.module').then(m => m.TiendaModule) },
      { path: 'checkout', loadChildren: () => import('./Modulos/checkout/checkout.module').then(m => m.CheckoutModule) },
    ]
  },
  {
    path: "**",
    redirectTo: ''

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
