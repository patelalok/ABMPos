import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PromotionComponent } from 'app/promotion/promotion.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { SmsComponent } from 'app/promotion/sms/sms.component';
import { EmailComponent } from 'app/promotion/email/email.component';
import { FacebookComponent } from 'app/promotion/facebook/facebook.component';

const routes: Routes = [
  { 
    path: 'promotion', 
    component:  PromotionComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'sms', pathMatch: 'prefix'},
      { path: 'sms', component:  SmsComponent},
      { path: 'email', component:  EmailComponent},
      { path: 'facebook', component:  FacebookComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule { }
