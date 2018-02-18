import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairComponent } from './repair.component';
import { SharedModule } from '../shared/shared.module';
import { AddRepairComponent } from './add-repair/add-repair.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SellRoutingModule } from '../sell/sell-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SellRoutingModule
  ],
  declarations: [RepairComponent, AddRepairComponent]
})
export class RepairModule { }
