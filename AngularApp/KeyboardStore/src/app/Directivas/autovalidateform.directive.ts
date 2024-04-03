import { Directive, Input, ElementRef, Renderer2, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[validationfor]'
})
export class AutovalidateformDirective implements OnInit, OnChanges {

  private messages: { [key: string]: string } = {
    required: 'Este campo es requerido',
    min: 'El valor mínimo permitido es {min}',
    max: 'El valor máximo permitido es {max}',
    maxlength: 'El tamaño máximo es de {maxlength} caracteres',
    minlength: 'El tamaño mínimo es de {minlength} caracteres',
    email: 'El email tiene un formato inválido',
  };

  @Input() validationfor?: FormControl;
  @Input() errorMessage?: string;
  @Input() defaultMessages: { [key: string]: string } = this.messages;


  private divElement?: string = "";
  private divClass: string = "form-error";

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private setDefaultMessages() {
    //si los mensajes por defecto son diferentes a la variable input
    if(this.defaultMessages != this.messages){
      for (const prop in this.messages) {
        //si el tipo de error no existe
        if (!this.defaultMessages[prop]) {
          //lo asigna a la variable por defecto
          this.defaultMessages[prop] = this.messages[prop];
        }
      }
    }
  }

  ngOnInit() {
    this.setDefaultMessages();
    if (this.validationfor) {
      const autovalidate = this.validationfor;
      this.validationfor.statusChanges.subscribe(status => {
        if (status === 'INVALID') {
          const errors = autovalidate.errors;
          if (errors) {
            const errorKey = Object.keys(errors)[0];
            this.addErrorMessage(errorKey, errors[errorKey]);
          }
        } else {
          this.removeErrorMessage();
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ngautovalidate']) {
      if (this.validationfor) {
        const autovalidate = this.validationfor;
        this.validationfor.statusChanges.subscribe(status => {
          if (status === 'INVALID') {
            const errors = autovalidate.errors;
            if (errors) {
              const errorKey = Object.keys(errors)[0];
              this.addErrorMessage(errorKey, errors[errorKey]);
            }
          } else {
            this.removeErrorMessage();
          }
        });
      } else {
        this.removeErrorMessage();
      }
    }
  }

  private getErorrMessage(errorKey: string, errorValue: any): string {

    let errorValueTxt: string = "";

    switch (errorKey) {
      case "maxlength":
        errorValueTxt = String(errorValue.requiredLength);
        break;
      case "minlength":
        errorValueTxt = String(errorValue.requiredLength);
        break;
      case "min":
        errorValueTxt = String(errorValue.min);
        break;
      case "max":
        errorValueTxt = String(errorValue.max);
        break;
      default:
        errorValueTxt = errorValue;
    }

    return errorValueTxt;
  }

  private addErrorMessage(errorKey: string, errorValue: any) {
    const errorValueTxt = this.getErorrMessage(errorKey, errorValue);
    let message = this.defaultMessages[errorKey] || this.errorMessage || 'Error desconocido [' + errorKey + ']';
    message = message.replace(`{${errorKey}}`, errorValueTxt)

    if (this.divElement) {

      const divElement = this.el.nativeElement.querySelector('.' + this.divClass);
      this.renderer.setProperty(divElement, 'textContent', message);

    } else {
      this.divElement = this.renderer.createElement('div');
      this.renderer.addClass(this.divElement, this.divClass);
      const text = this.renderer.createText(message);
      this.renderer.appendChild(this.divElement, text);
      this.renderer.appendChild(this.el.nativeElement, this.divElement);
    }
  }

  private removeErrorMessage() {
    if (this.divElement) {
      this.renderer.removeChild(this.el.nativeElement, this.divElement);
      this.divElement = undefined;
    }
  }
}
