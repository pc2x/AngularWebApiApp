import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './Components/login/login.component';
import { authGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    //redirectTo: '/Login',
    //pathMatch: 'full',
    loadChildren: () => import('./Modulos/tienda/tienda.module').then(m => m.TiendaModule),
    canActivate: [authGuard]
  },
  {
    path: 'tienda',
    //redirectTo: '/Login',
    //pathMatch: 'full',
    loadChildren: () => import('./Modulos/tienda/tienda.module').then(m => m.TiendaModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
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
