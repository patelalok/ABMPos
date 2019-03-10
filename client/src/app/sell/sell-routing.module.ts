import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellComponent } from 'app/sell/sell.component';
import { ProductComponent } from 'app/product/product.component';
import { CategoryComponent } from 'app/product/category/category.component';
import { VendorComponent } from 'app/product/vendor/vendor.component';
import { BrandComponent } from 'app/product/brand/brand.component';
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
import { AuthGuard } from 'app/auth/auth.guard';
import { ReturnSaleComponent } from 'app/sell/return-sale/return-sale.component';
import { SaleComponent } from 'app/sell/sale/sale.component';
import { PromotionComponent } from 'app/promotion/promotion.component';
import { CloseRegisterComponent } from 'app/sell/close-register/close-register.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { CustomerPaymentHistoryComponent } from 'app/customer/customer-payment-history/customer-payment-history.component';
import { TestCustomerUiComponent } from '../customer/test-customer-ui/test-customer-ui.component';


const routes: Routes = [
  { 
    path: 'sell', 
    component:  SellComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'sale', pathMatch: 'prefix'},
      { path: 'close-shift', component:  CloseRegisterComponent},
      { path: 'return', component:  ReturnSaleComponent},
      { path: 'close-register', component:  CloseRegisterComponent},
      { path: 'sale', component:  SaleComponent}
    ]
  },
  { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard],},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],},
  
  { path: 'clockIn/:username', component: ClockinComponent},
  { path: 'expense', component: ExpenseComponent, canActivate: [AuthGuard],},
  { 
    path: 'sales-history',
    component: SalesHistoryComponent,
  },
  { path: 'setting', component: StoresetupComponent},
  // { path: 'aaaaa', component:  CustomerPaymentHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellRoutingModule { }