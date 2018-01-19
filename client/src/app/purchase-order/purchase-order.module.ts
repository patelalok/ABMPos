import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderRoutingModule } from 'app/purchase-order/purchase-order-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    SharedModule
  ],
  declarations: [PurchaseOrderComponent]
})
export class PurchaseOrderModule { }
