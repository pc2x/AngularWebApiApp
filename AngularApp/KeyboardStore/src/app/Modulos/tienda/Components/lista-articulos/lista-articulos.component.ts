import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ItemsService } from '../../Services/items.service';
import { ItemModel } from '../../Models/item.model'
import { CarritoService } from '../../Services/carrito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit, OnDestroy {

  private itemService = inject(ItemsService);
  private carService = inject(CarritoService);

  protected items:ItemModel[] = [];
  private sub?: Subscription;
  ngOnInit() {
    this.sub = this.itemService.getAll().subscribe(r => {
      this.items = r;
    });
  }

  onAddToCar(item: ItemModel): void{
    this.carService.add(item);
  }

  trackByFn(index:number, item: ItemModel) {
    return item.id;
  }

  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe();
  }
}
