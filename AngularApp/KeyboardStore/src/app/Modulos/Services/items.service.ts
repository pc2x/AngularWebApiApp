import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ItemModel } from '../Models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private http = inject(HttpClient);
  private url = 'http://localhost:5000/api/items';

  getAll(): any {

    return firstValueFrom(
      this.http.get<ItemModel>(this.url)
    );
  }

}
