import { Component, OnInit, inject, Signal } from '@angular/core';
import { MensajeService } from '../../Services/mensaje.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent {

  private msjService = inject(MensajeService);
  protected msjSig: Signal<string>;
  protected tipoSig: Signal<string>;

  constructor() {
    const m = this.msjService.getSignalObj();
    this.msjSig = m.Mensaje;
    this.tipoSig = m.Tipo;
  }
}
