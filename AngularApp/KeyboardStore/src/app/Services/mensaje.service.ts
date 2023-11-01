import { Injectable, signal, WritableSignal } from '@angular/core';
import { MensajeModel } from '../Models/mensaje.model';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private mensajeSignal = signal<string>("");
  private mensajeTipo = signal<string>("");
  //tipo mensaje
  //1: informacion, 2: warning, 3: error

  showError(msj:string) : void {
    this.mensajeSignal.set(msj);
    this.mensajeTipo.set("error");
  }

  hide(){
    this.mensajeSignal.set("");
    this.mensajeTipo.set("");
  }

  getSignalObj (): MensajeModel {
    return  {
      Mensaje: this.mensajeSignal,
      Tipo: this.mensajeTipo
    }
  }

}
