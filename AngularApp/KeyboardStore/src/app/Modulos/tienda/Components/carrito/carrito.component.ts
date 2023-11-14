import { Component, WritableSignal, inject } from '@angular/core';
import { CarritoService } from '../../Services/carrito.service';
import { ItemModel } from '../../Models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  private carService = inject(CarritoService);
  private router = inject(Router);
  protected carSig: WritableSignal<ItemModel[]>;
  protected totalSig: WritableSignal<number>;
  

  constructor() {
    this.carSig = this.carService.getListSig();
    this.totalSig = this.carService.getTotalSig();
  }

  onRemoveCarItem(item:ItemModel):void{
    this.carService.remove(item);
  }

  onGoToCheckOut() : void{
    this.router.navigate(["checkout"]);
  }

}
