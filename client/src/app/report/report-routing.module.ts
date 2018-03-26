import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from 'app/report/report.component';
import { InventoryComponent } from 'app/report/inventory/inventory.component';
import { SalesComponent } from 'app/report/sales/sales.component';
import { ProfitLossComponent } from 'app/report/profit-loss/profit-loss.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';

const routes: Routes = [
    {
      path: 'report',
      component:  ReportComponent,
      children: [
        { path: 'inventory', component:  InventoryComponent },
        { path: 'sales', component:  SalesComponent },
        { path: 'profit-loss', component:  ProfitLossComponent },
        { path: 'customer-report', component:  CustomerReportComponent }

      ]
    },
  
  
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ReportRoutingModule { }