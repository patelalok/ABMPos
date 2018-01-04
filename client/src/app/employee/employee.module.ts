import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/primeng';


import {DataTableModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { EmployeeService } from 'app/employee/employee.service';
import { ClockinComponent } from './clockin/clockin.component';
import { SellRoutingModule } from 'app/sell/sell-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DataTableModule,
    SharedModule,
    MessagesModule,
    GrowlModule,
    SellRoutingModule
  ],
  declarations: [EmployeeComponent, ClockinComponent],
  providers: [EmployeeService]
})
export class EmployeeModule { }
