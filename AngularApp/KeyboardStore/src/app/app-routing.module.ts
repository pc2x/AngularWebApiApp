import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './Components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full'
    //loadChildren: () => import('./Modulos/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'Login',
    component: LoginComponent,

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
