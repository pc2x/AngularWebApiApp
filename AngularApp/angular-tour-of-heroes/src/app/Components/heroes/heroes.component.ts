import { Component } from '@angular/core';
import { HeroModel } from 'src/app/Models/heroModel';
import { HeroesMock } from 'src/app/Mocks/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  hero:HeroModel = {
    id : 1,
    name :"Juan"
  };
  selectedHero?:HeroModel;
  heroes = HeroesMock;

  onSelect(hero:HeroModel):void{
    this.selectedHero = hero;
  }
}
