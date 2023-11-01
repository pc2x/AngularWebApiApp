import { Component, WritableSignal, inject } from '@angular/core';
import { CarritoService } from '../../Services/carrito.service';
import { ItemModel } from '../../Models/item.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  private carService = inject(CarritoService);
  protected carSig: WritableSignal<ItemModel[]>;
  protected totalSig: WritableSignal<number>;

  constructor() {
    this.carSig = this.carService.getListSig();
    this.totalSig = this.carService.getTotalSig();
  }

  onRemoveCarItem(item:ItemModel):void{
    this.carService.remove(item);
  }

}
