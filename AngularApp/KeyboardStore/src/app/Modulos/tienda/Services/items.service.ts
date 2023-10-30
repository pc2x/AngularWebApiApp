import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ItemModel } from '../../Models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private http = inject(HttpClient);
  private url = 'https://localhost:32768/api/items';
  
  getAll( ): any {
    return firstValueFrom(
      this.http.get<ItemModel>(this.url)
    );
  }
  
}
