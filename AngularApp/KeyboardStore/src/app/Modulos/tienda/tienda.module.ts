import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaRoutingModule } from './tienda-routing.module';
import { ListaArticulosComponent } from './Components/lista-articulos/lista-articulos.component';
import { TiendaComponent } from './Components/tienda/tienda.component';
import { CarritoComponent } from './Components/carrito/carrito.component';



@NgModule({
  declarations: [
    ListaArticulosComponent,
    TiendaComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule
  ]
})
export class TiendaModule { }
