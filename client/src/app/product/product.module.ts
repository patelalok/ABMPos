import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from 'app/product/product.component';
import { ProductService } from 'app/product/product.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/primeng';
import {TabMenuModule, MenuItem} from 'primeng/primeng';

import { TableModule } from "primeng/table";
import {DataTableModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { CategoryComponent } from 'app/product/category/category.component';
import { VendorComponent } from 'app/product/vendor/vendor.component';
import { VendorService } from 'app/product/vendor/vendor.service';
import { CategoryService } from 'app/product/category/category.service';
import { BrandComponent } from './brand/brand.component';
import { BrandService } from 'app/product/brand/brand.service';
import { ModelComponent } from './model/model.component';
import { ModelService } from 'app/product/model/model.service';
import { AddProductComponent } from 'app/product/addProduct.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductRoutingModule } from 'app/product/product-routing.module';
import {InputSwitchModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { SharedModule } from 'app/shared/shared.module';
import { EditProductComponent } from './edit-product/edit-product.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PhoneComponent } from './phone/phone.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DataTableModule,
    SharedModule,
    MessagesModule,
    GrowlModule,
    TabMenuModule,
    ProductRoutingModule,
    InputSwitchModule,
    AutoCompleteModule,
    TableModule
  ],
   declarations: [
    ProductComponent,
    AddProductComponent,
    CategoryComponent,
    VendorComponent,
    BrandComponent,
    ModelComponent,
    ProductTableComponent,
    AddInventoryComponent,
    EditProductComponent,
    PhoneComponent],
  providers: [ProductService, VendorService, CategoryService, BrandService, ModelService],
  bootstrap: [ProductComponent, AddProductComponent, AddInventoryComponent]
})
export class ProductModule { }
