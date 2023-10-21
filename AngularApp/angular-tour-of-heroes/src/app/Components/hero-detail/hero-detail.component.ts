import { Component, Input } from '@angular/core';
import { HeroModel } from 'src/app/Models/heroModel';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
    @Input() hero?:HeroModel
}
