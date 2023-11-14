import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaRoutingModule } from './tienda-routing.module';
import { ListaArticulosComponent } from './Components/lista-articulos/lista-articulos.component';
import { TiendaComponent } from './Components/tienda/tienda.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
import { NgOptimizedImage } from '@angular/common'


@NgModule({
  declarations: [
    ListaArticulosComponent,
    TiendaComponent,
    CarritoComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    NgOptimizedImage
  ]
})
export class TiendaModule { }
