import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersistenceService } from './services/persistence.service';
import { StoresetupComponent } from './storesetup/storesetup.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { HeaderComponent } from './header/header.component';
import {
  MatCardModule, 
  MatButtonModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatChipsModule,
  MatTabsModule,
  MatTableModule,
} from "@angular/material";
import { Routes, RouterModule } from '@angular/router';
import { SellRoutingModule } from 'app/sell/sell-routing.module';
import { FooterComponent } from './footer/footer.component';
import { DateService } from 'app/shared/services/date.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TopSubNavbarComponent } from 'app/shared/top-sub-navbar/top-sub-navbar.component';
import { UtilService } from './services/util.service';
import { GobalProdcutService } from 'app/shared/global-product.service';

@NgModule({
  imports: [
    CommonModule, MatCardModule, MatButtonModule, SellRoutingModule,ReactiveFormsModule,FormsModule
  ],
  declarations: [StoresetupComponent, TopNavbarComponent, TopSubNavbarComponent, HeaderComponent, FooterComponent],
  exports: [
    MatInputModule,
    MatCardModule, 
    MatButtonModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatFormFieldModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    TopNavbarComponent, 
    TopSubNavbarComponent, 
    HeaderComponent, 
    FooterComponent,
    MatChipsModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [PersistenceService, DateService, UtilService,GobalProdcutService]
})
export class SharedModule { }
