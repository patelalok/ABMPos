import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/product/product.service';
import { Product } from 'app/sell/sell.component';
// import { FormBuilder } from "@angular/forms/forms";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MenuItem } from 'app/shared/top-navbar/top-navbar.component';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'app/shared/animations/fade-in.animation';
// import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class ProductComponent implements OnInit {


  form: FormGroup;
  backendProductDto: BackendProductDto[];
  displayDialog = false;
  products: Product[];
  categoryDto: Category[];
  brandDto: Brand[];
  vendorDto: Vendor[];
  modelDto: Model[];
  items: MenuItem[];
  // activeItem: MenuItem;
  selectedProductDropdownOption: string;
  listOfProductOption: ProductCommon[] = null;

  constructor(private router: Router, private productService: ProductService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // if (this.router.url == "/product")
    //   this.router.navigate(['/product/productTable']);
      
    this.selectedProductDropdownOption = 'Select All';

    this.items = [
      { name: 'Inventory', icon: 'fa fa-tags fa-x', link: '/product/productTable' },
      { name: 'Category', icon: 'fa fa-list fa-x', link: '/product/category' },
      { name: 'Brand', icon: 'fa fa-bookmark fa-x', link: '/product/brand' },
      { name: 'Vendor', icon: 'fa fa-user fa-x', link: '/product/vendor' },
      { name: 'Model', icon: 'fa fa-mobile fa-x', link: '/product/model' }
    ];
  }

  onProductDropdownChoose(): void {
    if (this.selectedProductDropdownOption === 'Brand') {
      //console.log('inside the if for brand');

      //TODO need to figure out how to reuse this code.
      this.productService.getBrandDetails()
        .subscribe((brands: Brand[]) => {
          this.listOfProductOption = brands;
        });
    }
    else if (this.selectedProductDropdownOption === 'Category') {
      //console.log('inside the if for brand');

      this.productService.getCategoryDetails()
        .subscribe((categories: Category[]) => {
          this.listOfProductOption = categories;
        });
    }
    else if (this.selectedProductDropdownOption === 'Vendor') {
      this.productService.getVendorDetails()
        .subscribe((vendors: Vendor[]) => {
          this.listOfProductOption = vendors;
        });
    }
    else if (this.selectedProductDropdownOption === 'Model') {
      this.productService.getModelDetails()
        .subscribe((models: Model[]) => {
          this.listOfProductOption = models;
        });
    }
    else {
      this.listOfProductOption = null;
    }
  }



}

export class Category implements ProductCommon {
  categoryId: number;
  name: string;
  description: string;
}
export interface CategoryTest {
  categoryId?;
  name?;
  description?;
}
export class Brand implements ProductCommon {
  brandId: number;
  name: string;
  description: string;
}

export interface BrandTest {
  brandId?;
  name?;
  description?;
}

export class Vendor implements ProductCommon {
  vendorId: number;
  name: string;
  phoneNo: string;
  companyName: string;
  companyAddress: string;
  email: string;
}

export interface VendorTest {
  vendorId?;
  name?;
  phoneNo?;
  companyName?;
  companyAddress?;
  email?;

}

export class Model {
  modelId: number;
  name: string;
  description: string;
}

export class ModelTest {
  modelId?;
  name?;
  description?;
}

export class ProductVariantDetail {
  id: number;
  name: string;
  value: string;
}

export class BackendProductDto {
  productNo: string;
  description: string;
  categoryName: string;
  cost: number;
  retail: number;
  markup: number;
  quantity: number;
  minQuantity: number;
  brandId: number;
  categoryId: number;
  vendorId: number;
  modelId: number;
  tax: boolean;
  ecommerce: boolean;
  active: boolean;
  variant: boolean;
  relatedProduct: boolean;
  createdTimestamp: any;
  customLoyaltyAmount: number;

  productInventoryDaoList: ProductInventory[];
}
export interface ProductCommon {
  name: string;
  id?: number;
}
export class ProductCommonTest {
  name: string;
  id: number;
}

export class ProductInventory {
  productNo: string;
  description:string;
  cost: number;
  retail: number;
  markup: number;
  quantity: number;
  createdTimestamp: any;
  vendorId: number;
  date: any;
  time: any;
}


      // markup: '',
      // brandName: '',
    // vendorName: '',
    // modelName: '',
    // alternetNo: '',
    // minQuantity: '',
    // isTax: '',
    // isVariant: '',
    // IsActive: '',
    // IsEcomerce: '',
    // IsRelatedProduct: '',
    // defaultQuantity: '',

    // transactionComId: '',

    // date: '',
    // status: '',
    // discount: '',
    // retailDiscount: '',
    // totalProductPrice: '',
    // totalProductPriceWithTax: '',
    // imeiNo: '',

