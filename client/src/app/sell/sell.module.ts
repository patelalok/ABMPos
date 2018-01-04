import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MaterialModule } from '@angular/material';
import { DataTableModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here

import { SellRoutingModule } from 'app/sell/sell-routing.module';
import { SellComponent } from 'app/sell/sell.component';
import { SellService } from 'app/sell/sell.service';
import { DropdownModule } from 'primeng/primeng';
import { ProductAutoCompleteComponent } from './product-auto-complete/product-auto-complete.component';
import { SharedModule } from "app/shared/shared.module";
import { ReceiptComponent } from './receipt/receipt.component';
import { CustomerService } from 'app/customer/customer.service';
import { SalesHistoryComponent } from './sales-history/sales-history.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SellCustomerComponent } from './sell-customer/sell-customer.component';
import { ReturnSaleComponent } from './return-sale/return-sale.component';
import { SaleComponent } from './sale/sale.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';




@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    FormsModule,
    SellRoutingModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DropdownModule,
    SharedModule
  ],
  declarations: [SellComponent, ProductAutoCompleteComponent, ReceiptComponent, SalesHistoryComponent, SellCustomerComponent, ReturnSaleComponent, SaleComponent, PurchaseOrderComponent],
  providers: [SellService, CustomerService],
  bootstrap: [SellComponent]
})
export class SellModule { }
