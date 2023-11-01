import { Injectable, WritableSignal, signal } from '@angular/core';
import { ItemModel } from '../Models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carSig = signal<ItemModel[]>([]);
  private totalSig = signal<number>(0);

  constructor() {
    const storedCar = this.getStoreCar();
    this.setCar(storedCar);
  }

  

  private setCar(lista: ItemModel []): void {
    this.carSig.set(lista);
    this.totalSig.set(this.calcTotal());
  }

  add(item: ItemModel): void {
    this.carSig.mutate(arr => arr.push(item));
    this.totalSig.set(this.calcTotal());
  }

  getListSig(): WritableSignal<ItemModel[]>{
    return this.carSig;
  }

  getTotalSig(): WritableSignal<number> {
    return this.totalSig;
  }

  remove(item: ItemModel): void{
    this.carSig.mutate(arr => {
      let io = arr.indexOf(item);
      arr.splice(io, 1);
    });
    this.totalSig.set(this.calcTotal());
  }

  private calcTotal(): number {
    let lista = this.carSig();
    let total = 0;
    for (let i = 0; i < lista.length; i++) {
      const ele = lista[i];
      total+= ele.price;
    }

    this.storeCar(lista);
    return total;
  }

  private storeCar(lista :ItemModel []):void {
    let listaJson = JSON.stringify(lista);
    localStorage.setItem("carlist", listaJson);
  }

  private getStoreCar() : ItemModel[] {
    const lista = localStorage.getItem("carlist");
    if(lista){
      const listaArr = JSON.parse(lista) as ItemModel [];
      return listaArr;
    }
    return [];
  }
}
