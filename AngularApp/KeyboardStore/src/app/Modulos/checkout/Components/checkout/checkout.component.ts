import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../../custom.validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  

  protected formulario: FormGroup;

  //form controls
  protected name = new FormControl("", [Validators.required, Validators.maxLength(50), noWhitespaceValidator]);
  protected card = new FormControl("", [Validators.required, Validators.minLength(16)]);
  protected exp = new FormControl("", [ Validators.required, Validators.minLength(5) ]);
  protected cvv = new FormControl("", [ Validators.required, Validators.minLength(3) ]);


  constructor() {
    this.formulario = new FormGroup(
      {
        name: this.name,
        card: this.card,
        exp: this.exp,
        cvv: this.cvv
      }
    );
  }
  ngOnInit(): void {

  }

}
