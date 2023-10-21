import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocationModel } from '../housing-location-model';
import { HousingService } from '../services/housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList:HousingLocationModel[] = [];
  housingService:HousingService = inject(HousingService);
  filteredLocationList: HousingLocationModel[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then(lista =>{
      this.housingLocationList = lista;
      this.filteredLocationList = lista;
    });
  }


  filterLocations (text: string): HousingLocationModel[] {
    if (!text) {
      return this.housingLocationList;
    }
  
    return this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }


  filterResults(text: string) {
    this.filteredLocationList = this.filterLocations(text);
  }


}