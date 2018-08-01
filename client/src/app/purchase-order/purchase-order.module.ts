import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderRoutingModule } from 'app/purchase-order/purchase-order-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule, AutoCompleteModule, DropdownModule, DialogModule } from 'primeng/primeng';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseOrderService } from './purchase-order.service';

@NgModule({
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule,
    SharedModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DropdownModule,
    DialogModule
  ],
  declarations: [PurchaseOrderComponent, PurchaseOrderListComponent],
  providers: [PurchaseOrderService]
})
export class PurchaseOrderModule { }
