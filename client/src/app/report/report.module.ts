import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { ReportRoutingModule } from 'app/report/report-routing.module';
import { ReportComponent } from 'app/report/report.component';
import { InventoryComponent } from 'app/report/inventory/inventory.component';
import {DataTableModule} from 'primeng/primeng';
import { ReportService } from 'app/report/report.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SalesComponent } from './sales/sales.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';


@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    SharedModule,
    ReportRoutingModule,
    DataTableModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
   // ChartsModule
  ],
  providers: [ReportService ],
  declarations: [ReportComponent, InventoryComponent, SalesComponent, ProfitLossComponent, CustomerReportComponent],
  bootstrap: [ReportComponent, InventoryComponent]
  
})
export class ReportModule { }
