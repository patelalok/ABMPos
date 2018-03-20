import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { CustomerComponent } from 'app/customer/customer.component';
import { CustomerPaymentHistoryComponent } from 'app/customer/customer-payment-history/customer-payment-history.component';
import { TestCustomerUiComponent } from './test-customer-ui/test-customer-ui.component';


const routes: Routes = [
  {
    path: 'customer', 
    component: CustomerComponent,
    canActivate: [AuthGuard],
  },
  { path: 'customer-history', component:  CustomerPaymentHistoryComponent},
  { path: 'testCustUi', component: TestCustomerUiComponent},

  // { path: 'test', component:  TestCustomerUiComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }