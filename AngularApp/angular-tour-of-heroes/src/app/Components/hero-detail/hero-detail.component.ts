import { Component, Input } from '@angular/core';
import { HeroModel } from 'src/app/Models/heroModel';
import { HeroService } from 'src/app/Services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
    @Input() hero?:HeroModel

    constructor( 
      private route: ActivatedRoute,
      private heroService: HeroService,
      private location: Location ) {


    }

    ngOnInit(): void {
      this.getHero();
    }
    
    getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    }

    goBack(): void {
      this.location.back();
    }
}
