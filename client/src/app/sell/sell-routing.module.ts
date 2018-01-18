import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellComponent } from 'app/sell/sell.component';
import { ProductComponent } from 'app/product/product.component';
import { CategoryComponent } from 'app/product/category/category.component';
import { VendorComponent } from 'app/product/vendor/vendor.component';
import { BrandComponent } from 'app/product/brand/brand.component';
import { ModelComponent } from 'app/product/model/model.component';
import { AddProductComponent } from 'app/product/addProduct.component';
import { CustomerComponent } from 'app/customer/customer.component';
import { EmployeeComponent } from 'app/employee/employee.component';
import { ClockinComponent } from 'app/employee/clockin/clockin.component';
import { ExpenseComponent } from 'app/expense/expense.component';
import { ProductTableComponent } from 'app/product/product-table/product-table.component';
import { SalesHistoryComponent } from 'app/sell/sales-history/sales-history.component';
import { ReportComponent } from 'app/report/report.component';
import { StoresetupComponent } from 'app/shared/storesetup/storesetup.component';
import { InventoryComponent } from 'app/report/inventory/inventory.component';
import { SellCustomerComponent } from 'app/sell/sell-customer/sell-customer.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { ReturnSaleComponent } from 'app/sell/return-sale/return-sale.component';
import { SaleComponent } from 'app/sell/sale/sale.component';
import { PurchaseOrderComponent } from 'app/sell/purchase-order/purchase-order.component';
import { PromotionComponent } from 'app/promotion/promotion.component';
import { CloseRegisterComponent } from 'app/sell/close-register/close-register.component';


const routes: Routes = [
  { 
    path: 'sell', 
    component:  SellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'sale', pathMatch: 'prefix'},
      { path: 'purchaseOrder', component:  PurchaseOrderComponent},
      { path: 'return', component:  ReturnSaleComponent},
      { path: 'closeRegister', component:  CloseRegisterComponent},
      { path: 'sale', component:  SaleComponent}
    ]
  },
  { path: 'employee', component: EmployeeComponent},
  { path: 'clockIn/:username', component: ClockinComponent},
  { path: 'expense', component: ExpenseComponent},
  { 
    path: 'sales-history', 
    component: SalesHistoryComponent, 
    canActivate: [AuthGuard],
  },
  { path: 'setting', component: StoresetupComponent},
  { path: 'sell-customer', component: SellCustomerComponent},
  {
    path:  'promotion', 
    component: PromotionComponent,
    canActivate: [AuthGuard],
    children: [  
      { path: '', redirectTo: 'sms', pathMatch: 'prefix'},
      { path: 'sms', component:  PromotionComponent},
      { path: 'email', component:  PromotionComponent},
      { path: 'facebook', component:  PromotionComponent}
    ]
}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellRoutingModule { }