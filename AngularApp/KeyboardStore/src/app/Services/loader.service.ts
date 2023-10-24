import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

   private loaderFlag = signal<boolean>(false);

  showLoader(){
    this.loaderFlag.set(true);
  }

  hideLoader(){
    this.loaderFlag.set(false);
  }

  getSignal(): WritableSignal<boolean>{
    return this.loaderFlag;
  }

}
