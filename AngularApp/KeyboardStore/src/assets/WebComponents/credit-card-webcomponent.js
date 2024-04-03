class CreditCardInput extends HTMLElement {

  brands = {
    'visa': { clase: "fa-cc-visa", digits: [4] },
    'master': { clase: "fa-cc-mastercard", digits: [51, 52, 53, 54, 55, 677189] },
    'amex': { clase: "fa-cc-amex", digits: [34, 37] },
    'carnet': { clase: "fa-credit-card", digits: [506] },
    'elo': { clase: "fa-credit-card", digits: [636368, 438935, 504175, 451416, 636297, 5067, 4576, 4011] },
    'diners': { clase: "fa-cc-diners-club", digits: [300, 301, 302, 303, 304, 305, 309, 2014, 2149, 36, 38, 39] },
    'hipercard': { clase: "fa-credit-card", digits: [60] },
    'aura': { clase: "fa-credit-card", digits: [50] },
    'discover': { clase: "fa-cc-discover", digits: [6011, 622, 64, 65] },
    'jcb': { clase: "fa-cc-jcb", digits: [35] }
  }

  constructor() {
    super();
  }

  getCreditCardBrand(cardNumber) {
    const brands = this.brands;
    for (let brand in brands) {
      if (brands.hasOwnProperty(brand)) {
        var brandObj = brands[brand];
        var compareGroups = brandObj["digits"];
        for (let i = 0; i < compareGroups.length; i++) {
          var digits = compareGroups[i];
          var rgx = new RegExp("^" + digits);
          var match = cardNumber.match(rgx);
          if (match && match.length > 0) {
            return {
              name: brand,
              clase: brandObj.clase
            };
          }
        }
      }
    }
    return {};
  }

  connectedCallback() {
    this.createTemplate();

    console.log(this.value);

    const value = this.getAttribute('value');
    const placeholder = this.getAttribute('placeholder');
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const classList = this.getAttribute('class');

    if (value) {
      this.inputElement.value = value;
    }
    if (placeholder) {
      this.inputElement.placeholder = placeholder;
    }
    this.inputElement.disabled = disabled;
    this.inputElement.readOnly = readonly;

    if (classList) {
      let clases = classList.split(' ');
      this.inputElement.classList.add(...clases);
      this.spanElement.classList.add(...clases);
    }
  }

  createTemplate() {
    this.innerHTML = '<span class="fa fa-credit-card"></span><input type="text"/>'; // Crea el elemento input usando HTML directamente
    this.inputElement = this.querySelector('input'); // Guarda una referencia al elemento input
    this.spanElement = this.querySelector('span');

    //almacena referencias a los elementos para tener acceso desde el manejador del evento
    this.inputElement.spanElement = this.spanElement;
    this.inputElement.getCreditCardBrand = this.getCreditCardBrand;
    this.inputElement.brands = this.brands;
    this.inputElement.padre = this;

    //evento del wrapper
    //formatea de model to view
    this.addEventListener("input", this.formatCard);

    //evento del input
    //formatea view to model
    this.inputElement.addEventListener("input", function (event) {

      //obtiene el valor a formatear
      let formattedValue = event.target.value;
      //solo numeros
      formattedValue = formattedValue.replace(/\D/g, "");
      //remueve espacios
      formattedValue = formattedValue.replace(/\s/g, "")
      //solo 16 digitos
      formattedValue = formattedValue.substring(0, 16)
      //asigna el valor al input
      event.target.value = formattedValue;

    });
  }

  formatCard(event) {

    //obtiene el valor del input recien formateado por el handler anterior
    const inputValue = event.target.value;

    //formatea la cadena para añadirle espacios cada 4 digitos
    let formattedValue = "";
    for (let i = 0; i < inputValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += inputValue[i];
    }

    //si es distinto el valor que tiene el input
    //setea el valor formateado
    if (event.target.value !== formattedValue) {

      //setea la cadena formateada en el input
      event.target.value = formattedValue;
    }

    //obtiene la marca de la tarneta
    let brand = this.getCreditCardBrand(event.target.value);

    //si la encontro la setea en el span
    if (brand && brand.name)
      this.spanElement.classList = "fa " + brand.clase;
    else
      // si no pone un logo por defecto
      this.spanElement.classList = "fa fa-credit-card";
  }

  /* metodos comunes de un elemento input */
  get value() {
    let viewValue = this.inputElement.value;
    if (viewValue) {
      //quita los espacios
      return viewValue.replace(/\s/g, "");
    }
    return viewValue;
  }

  set value(newValue) {
    this.inputElement.value = newValue;
  }

  get disabled() {
    return this.inputElement.disabled;
  }

  set disabled(isDisabled) {
    this.inputElement.disabled = isDisabled;
  }

  get placeholder() {
    return this.inputElement.placeholder;
  }

  set placeholder(newPlaceholder) {
    this.inputElement.placeholder = newPlaceholder;
  }

  focus() {
    this.inputElement.focus();
  }

  blur() {
    this.inputElement.blur();
  }

}
customElements.define('credit-card-input', CreditCardInput);

/********* WEB COMPONENT CARD EXPIRATION ********************************/

class CreditCardExpiration extends HTMLElement {
  constructor() {
    super();

  }

  connectedCallback() {
    this.createTemplate();
    const value = this.getAttribute('value');
    const placeholder = this.getAttribute('placeholder');
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const classList = this.getAttribute('class');

    if (value) {
      this.inputElement.value = value;
    }
    if (placeholder) {
      this.inputElement.placeholder = placeholder;
    }
    this.inputElement.disabled = disabled;
    this.inputElement.readOnly = readonly;

    if (classList) {
      let clases = classList.split(' ');
      this.inputElement.classList.add(...clases);
      this.spanElement.classList.add(...clases);
    }
  }

  createTemplate() {
    // Crea el elemento input usando HTML directamente
    this.innerHTML = '<span class="fa fa-calendar"></span><input type="text"/>';
    // Guarda una referencia al elemento input
    this.inputElement = this.querySelector('input');
    // Guarda una referencia del span
    this.spanElement = this.querySelector('span');

    //almacena referencias a los elementos para tener acceso desde el manejador del evento
    this.inputElement.spanElement = this.spanElement;

    //almacena los metodos
    this.inputElement.formatearNumeros = this.formatearNumeros;

    //evento del wrapper
    //formatea de model to view & view to model
    this.inputElement.addEventListener("input", this.formatExpiration);
  }

  get value() {
    let ovalue = this.inputElement.value;
    if (ovalue) {
      return ovalue.replace(/\s/g, "");
    }
    return ovalue;
  }

  set value(newValue) {
    this.inputElement.value = newValue;
  }

  get disabled() {
    return this.inputElement.disabled;
  }

  set disabled(isDisabled) {
    this.inputElement.disabled = isDisabled;
  }

  get placeholder() {
    return this.inputElement.placeholder;
  }

  set placeholder(newPlaceholder) {
    this.inputElement.placeholder = newPlaceholder;
  }

  focus() {
    this.inputElement.focus();
  }

  blur() {
    this.inputElement.blur();
  }

  formatExpiration(event) {
    const formattedValue = this.formatearNumeros(this.value);
    if(this.value !== formattedValue){
      this.value = formattedValue;
    }
  }

  
  formatearNumeros(texto) {
    
    // Eliminar cualquier carácter que no sea un número
    let numeros = texto.replace(/[^0-9]/g, '');

    if (parseInt(numeros[0]) >= 2) {
      numeros = "0" + parseInt(numeros);
    }
    else if (parseInt(numeros.substring(0, 2)) > 12) {
      numeros = "0" + parseInt(numeros);
    }

    // Verificar si hay suficientes números para formatear
    if (numeros.length < 3) {
      return numeros;
    }

    // Tomar los primeros 2 dígitos como xx y los siguientes 2 como zz
    const xx = numeros.slice(0, 2);
    const zz = numeros.slice(2, 4);

    // Formatear como "xx/zz"
    const formato = `${xx}/${zz}`;

    return formato;
  }
}

customElements.define('credit-card-expiration', CreditCardExpiration);
