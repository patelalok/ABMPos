import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import {AppRoutingModule} from 'app/app-routing.module';
import {ContextMenuModule} from 'primeng/primeng';
import { HttpModule } from '@angular/http';
import { SellModule } from 'app/sell/sell.module';
import {TabMenuModule} from 'primeng/primeng';


import { AppComponent } from './app.component';
import 'hammerjs';
import { ProductModule } from 'app/product/product.module';
import { SharedModule } from 'app/shared/shared.module';
import { CustomerModule } from 'app/customer/customer.module';
import { ExpenseModule } from 'app/expense/expense.module';
import { EmployeeComponent } from 'app/employee/employee.component';
import { EmployeeModule } from 'app/employee/employee.module';
import { CloseRegisterModule } from 'app/close-register/close-register.module';
import { StoreSetupService } from 'app/shared/storesetup/storesetup.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportModule } from 'app/report/report.module';
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment';
import { ConfigService } from 'app/shared/config.service';
import { RouterModule } from '@angular/router';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { AuthModule } from 'app/auth/auth.module';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    AuthModule.forRoot(),
    // MaterialModule,
    ContextMenuModule,
    HttpModule,
    SellModule,
    TabMenuModule,
    ProductModule,
    SharedModule,
    CustomerModule,
    ExpenseModule,
    EmployeeModule,
    CloseRegisterModule,
    ReportModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    ToastModule.forRoot()
    
  ],
  declarations: [
    AppComponent
    ],
  providers: [StoreSetupService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
