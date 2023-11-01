import { Component, OnInit, inject } from '@angular/core';
import { ItemsService } from '../../Services/items.service';
import { ItemModel } from '../../Models/item.model'
import { CarritoService } from '../../Services/carrito.service';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit {

  private itemService = inject(ItemsService);
  private carService = inject(CarritoService);

  protected items:ItemModel[] = [];

  ngOnInit() {
    this.itemService.getAll().subscribe(r => {
      this.items = r;
    });
  }

  onAddToCar(item: ItemModel): void{
    this.carService.add(item);
  }
}
