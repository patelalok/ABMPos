import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { CustomerComponent } from 'app/customer/customer.component';
import { SubcustomerComponent } from './subcustomer/subcustomer.component';
import { GroupComponent } from './group/group.component';




const routes: Routes = [
  
  { 
    path: 'customer', 
    component: CustomerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'customer', component:  SubcustomerComponent },
      { path: 'group', component:  GroupComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }