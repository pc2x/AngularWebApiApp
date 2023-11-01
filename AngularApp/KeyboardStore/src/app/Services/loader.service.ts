import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderFlag = signal<boolean>(false);
  private call: number = 0;

  showLoader() {
    this.call++;
    this.loaderFlag.set(true);
  }

  hideLoader() {
    this.call--;
    if (this.call <= 0){
      this.call = 0;
      this.loaderFlag.set(false);
    }
  }

  getSignal(): WritableSignal<boolean> {
    return this.loaderFlag;
  }
}
