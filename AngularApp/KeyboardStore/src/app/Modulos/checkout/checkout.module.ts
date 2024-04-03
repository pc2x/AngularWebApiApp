import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutovalidateformDirective } from '../../Directivas/autovalidateform.directive';

@NgModule({
  declarations: [
    CheckoutComponent,
    AutovalidateformDirective
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
})
export class CheckoutModule { }
