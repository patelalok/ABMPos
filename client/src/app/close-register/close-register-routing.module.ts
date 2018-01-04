import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { CustomerComponent } from 'app/customer/customer.component';
import { CloseRegisterComponent } from 'app/close-register/close-register.component';


const routes: Routes = [
  { 
    path: 'close-register', 
    component: CloseRegisterComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloseRegisterRoutingModule { }