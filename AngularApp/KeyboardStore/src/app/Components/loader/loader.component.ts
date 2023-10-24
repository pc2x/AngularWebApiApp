import { Component, inject, signal } from '@angular/core';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  protected loaderSignal;
  
  constructor() {
    this.loaderSignal = this.loaderService.getSignal();
  }
}
