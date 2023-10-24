import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaRoutingModule } from './tienda-routing.module';
import { ListaArticulosComponent } from './Components/lista-articulos/lista-articulos.component';



@NgModule({
  declarations: [
    ListaArticulosComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule
  ]
})
export class TiendaModule { }
