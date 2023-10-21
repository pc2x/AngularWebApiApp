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
  heroes :HeroModel[] = [];

  constructor(private heroService : HeroService, private messageService: MessageService) {
    
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(r => this.heroes = r);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
