import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaArticulosComponent } from './Components/lista-articulos/lista-articulos.component';
import { TiendaComponent } from './Components/tienda/tienda.component';

const routes: Routes = [
  {
    path: '',
    component: TiendaComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingModule { }
