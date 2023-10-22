import { Component } from '@angular/core';
import { HeroModel } from 'src/app/Models/heroModel';
import { HeroService } from 'src/app/Services/hero.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes: HeroModel[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(r => this.heroes = r);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    const newHero : HeroModel = { id:0, name }
    this.heroService.addHero(newHero).subscribe(r => {
      if (r > 1) {
        newHero.id = r;
        this.heroes.push(newHero);
      }
    })
  }

  delete(hero: HeroModel): void {
    this.heroService.deleteHero(hero.id).subscribe(r => {
      if (r) {
        console.log(r);
        this.heroes = this.heroes.filter(h => h !== hero);
      }
    })
  }

}
