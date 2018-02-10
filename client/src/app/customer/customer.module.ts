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
import { CustomerService } from 'app/customer/customer.service';
import { SharedModule } from 'app/shared/shared.module';
import { CustomerRoutingModule } from 'app/customer/customer-routing.module';
import { GroupComponent } from './group/group.component';
import { SubcustomerComponent } from './subcustomer/subcustomer.component';
import { CustomerComponent } from 'app/customer/customer.component';

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
  declarations: [GroupComponent, SubcustomerComponent, CustomerComponent],
   providers: [CustomerService],

})
export class CustomerModule { }
