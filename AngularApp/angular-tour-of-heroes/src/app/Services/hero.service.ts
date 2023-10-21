import { Injectable } from '@angular/core';
import { HeroModel } from '../Models/heroModel';
import { HeroesMock } from '../Mocks/mock-heroes';
import { Observable, of, scheduled } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { 

  }

  getHeroes(): Observable<HeroModel[]> {
    const heroes = of(HeroesMock);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<HeroModel> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HeroesMock.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
