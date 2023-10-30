import { Component, OnInit, inject } from '@angular/core';
import { ItemsService } from '../../Services/items.service';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit {

  private itemService = inject(ItemsService);

  async ngOnInit() {
    const r = await this.itemService.getAll();
    console.log(r);
  }

}
