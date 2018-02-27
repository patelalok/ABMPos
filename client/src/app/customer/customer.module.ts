import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from 'app/product/product.component';
import { ProductService } from 'app/product/product.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/primeng';


import {DataTableModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { CustomerComponent } from 'app/customer/customer.component';
import { CustomerService } from 'app/customer/customer.service';
import { SharedModule } from 'app/shared/shared.module';
import { CustomerRoutingModule } from 'app/customer/customer-routing.module';
import { CustomerPaymentHistoryComponent } from './customer-payment-history/customer-payment-history.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    CustomerRoutingModule,
    DataTableModule,
    SharedModule,
    MessagesModule,
    GrowlModule

  ],
  declarations: [CustomerComponent, CustomerPaymentHistoryComponent],
   providers: [CustomerService],
   bootstrap:[CustomerComponent,CustomerPaymentHistoryComponent]

})
export class CustomerModule { }
