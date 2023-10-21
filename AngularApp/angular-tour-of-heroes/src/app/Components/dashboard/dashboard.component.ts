import { Component } from '@angular/core';
import { HeroModel } from 'src/app/Models/heroModel';
import { HeroService } from 'src/app/Services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  heroes:HeroModel[] = [];
  constructor(private heroService : HeroService) {

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(r => this.heroes = r.slice(1, 5));
  }

  ngOnInit(): void{
    this.getHeroes();
  }

}
