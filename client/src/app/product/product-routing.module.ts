import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from 'app/product/product.component';
import { CategoryComponent } from 'app/product/category/category.component';
import { VendorComponent } from 'app/product/vendor/vendor.component';
import { BrandComponent } from 'app/product/brand/brand.component';
import { ModelComponent } from 'app/product/model/model.component';
import { AddProductComponent } from 'app/product/addProduct.component';
import { ProductTableComponent } from 'app/product/product-table/product-table.component';
import { AddInventoryComponent } from 'app/product/add-inventory/add-inventory.component';
import { EditProductComponent } from 'app/product/edit-product/edit-product.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { AuthModule } from 'app/auth/auth.module';


const routes: Routes = [
  {
    path: 'product',
    component:  ProductComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'productTable', pathMatch: 'prefix' },
      { path: 'add', component:  AddProductComponent},
      { path: 'edit', component:  EditProductComponent},
      { path: 'productTable', component:  ProductTableComponent},
      { path: 'vendor', component: VendorComponent},
      { path: 'brand', component: BrandComponent},
      { path: 'model', component: ModelComponent},
      { path: 'addInventory', component: AddInventoryComponent},
      { path: 'category', component: CategoryComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }