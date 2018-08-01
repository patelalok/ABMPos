import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { PurchaseOrderComponent } from 'app/purchase-order/purchase-order.component';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';


const routes: Routes = [
  
  { path: 'purchase-order', component: PurchaseOrderComponent,canActivate: [AuthGuard]},
  { path: 'purchase-order-list', component: PurchaseOrderListComponent,canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }


