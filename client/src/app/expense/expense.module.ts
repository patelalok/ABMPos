import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/primeng';


import {DataTableModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { EmployeeService } from 'app/employee/employee.service';
import { SellRoutingModule } from 'app/sell/sell-routing.module';
import { ExpenseService } from 'app/expense/expense.service';
import {CalendarModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
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
    SellRoutingModule,
    CalendarModule,
    InputTextareaModule,
    FileUploadModule
  ],
  declarations: [ExpenseComponent],
    providers: [ExpenseService]

})
export class ExpenseModule { }
