import { Signal, signal } from "@angular/core";
export interface MensajeModel {
    Mensaje : Signal<string>;
    Tipo: Signal<string>
}