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
import { SharedModule } from "app/shared/shared.module";
import { CustomerService } from 'app/customer/customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PromotionRoutingModule } from 'app/promotion/promotion-routing.module';
import { PromotionComponent } from 'app/promotion/promotion.component';
import { SmsComponent } from 'app/promotion/sms/sms.component';
import { EmailComponent } from 'app/promotion/email/email.component';
import { FacebookComponent } from 'app/promotion/facebook/facebook.component';

@NgModule({
  imports: [
    CommonModule,
    PromotionRoutingModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    DropdownModule,
    SharedModule
  ],
  declarations: [
    PromotionComponent,
    SmsComponent, 
    EmailComponent, 
    FacebookComponent
  ],
  bootstrap: [PromotionComponent]
})
export class PromotionModule { }
