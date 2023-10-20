import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationModel } from '../housing-location-model';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingInput!:HousingLocationModel;
}
