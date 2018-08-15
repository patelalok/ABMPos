import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product/product.service";
// import { FormBuilder } from "@angular/forms/forms";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Category, Brand, Vendor, ProductVariantDetail, Model } from "app/product/product.component";
import * as moment from 'moment';
import { slideInOutAnimation } from 'app/shared/animations/slide-in-out.animation';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Product } from 'app/sell/sale/sale.component';




@Component({
  selector: 'app-product',
  templateUrl: './addProduct.component.html',
  styleUrls: ['./product.component.scss'],
  // animations: [slideInOutAnimation],
  // host: { '[@slideInOutAnimation]': '' }
})
export class AddProductComponent implements OnInit {


  form: FormGroup;
  backendProductDto: Product[];
  categoryDto: Category[];
  brandDto: Brand[];
  vendorDto: Vendor[];
  modelDto: Model[];
  productVariantDetailsDto: ProductVariantDetail[];
  productVariantDetailsByNameDto: ProductVariantDetail[];
  displayDialog = false;
  productNo: any;
  generatedProductNo: string;

  products: Product[];
  formProduct = new Product();
  finalProductTosend: Product;
  showDigitalPunchTextBox = false;


  constructor(private productService: ProductService, private formBuilder: FormBuilder, private toastr: ToastsManager) {
  }

  ngOnInit() {

    //this.generatedProductNo = '123213131';

    this.form = this.formBuilder.group(
      {
        'productNo': [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
        'description': ['', Validators.required],
        'category': [null, Validators.required],
        'brand': [null, Validators.required],
        'vendor': [null, Validators.required],
        'cost': [null, [Validators.pattern('^[0-9-.]+$')]],
        'markup': [null, Validators.pattern('^[0-9-.]+$')],
        'retail': [null, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
        'quantity': [null, [Validators.pattern('^[0-9]+$')]],
        'minQuantity': [null, [Validators.pattern('^[0-9]+$')]],
        'tax': [true, null],
        'ecommerce': [false, null],
        'varaint': [false, null],
        'enableDigitalPunch':[false, null],
        'noOfSaleForFreeService': [null],
        'favorite': [false, null]
      }
    );

    this.productService.getCategoryDetails()
      .subscribe((categories: Category[]) => {
        this.categoryDto = categories;
        this.form.get('category').setValue(this.categoryDto[0]);
        console.log('CategoryList' + this.categoryDto);
      });

    this.productService.getBrandDetails()
      .subscribe((brands: Brand[]) => {
        this.brandDto = brands;
        this.form.get('brand').setValue(this.brandDto[0]);
        console.log('BrandList' + this.brandDto);
      });

    this.productService.getVendorDetails()
      .subscribe((vendors: Vendor[]) => {
        this.vendorDto = vendors;
        this.form.get('vendor').setValue(this.vendorDto[0]);
        console.log('VendorList' + this.vendorDto);
      });

    // this.productService.getModelDetails()
    //   .subscribe((models: Model[]) => {
    //     this.modelDto = models;
    //     console.log('ModelList' + this.modelDto);
    //   });


    // DO NOT DELETE THIS NEED WHEN YOU HANDLE PRODUCT VARIENT
    // this.productService.getProductVariantDetails()
    // .subscribe((a: ProductVariantDetail[]) => {
    // this.productVariantDetailsDto = a;
    // console.log('ProductVariantDetails' + this.productVariantDetailsDto);
    //     });

    // this.productService.getProductVariantDetailsByName('color')
    // .subscribe((a: ProductVariantDetail[]) => {
    // this.productVariantDetailsByNameDto = a;
    // console.log('productVariantDetailsByNameDto' + this.productVariantDetailsByNameDto);
    //     });
  }

  addProduct() {
    {

   

     // this.productInventoryList.push(this.productInventory);

      let formValues: ProductForm = this.form.value;

      // Here i need to add product inventory details to the product inventory table 
     // this.productInventory.productNo = formValues.productNo;
     // this.productInventory.cost = formValues.cost;
     // this.productInventory.retail = formValues.retail;
     // this.productInventory.quantity = formValues.quantity;
    //  this.productInventory.createdTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');


      let product: Product = {
        productNo: formValues.productNo,
        categoryId: formValues.category.categoryId,
        brandId: formValues.brand.brandId,
        vendorId: formValues.vendor.vendorId,
        alternetNo: formValues.alternetNo,
        cost: formValues.cost,
        retail: formValues.retail,
        date: null,
        saleQuantity: null,
        description: formValues.description.toUpperCase(),
        discount: null,
        imeiNo: null,
        active: true,
        ecommerce: formValues.ecommerce,
        relatedProduct: formValues.relatedProduct,
        tax: formValues.tax,
        // varaint: formValues.varaint,
        markup: formValues.markup,
        minQuantity: formValues.minQuantity,
        // productVariantNo: formValues.productVariantNo,
        quantity: formValues.quantity,
        retailWithDiscount: null,
        returnRule: formValues.returnRule,
        status: null,
        taxAmountOnProduct: null,
        totalProductPrice: null,
        transactionComId: null,
        time: null,
        createdTimestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        //enableDigitalPunch: formValues.enableDigitalPunch,
        noOfSaleForFreeService: formValues.noOfSaleForFreeService,
        favorite: formValues.favorite

       // productInventoryDaoList: this.productInventoryList

      }
      this.productService.addProduct(product)
      .subscribe(
        (data) => {
          this.toastr.success('Product Successfully added', 'Success!');
          console.log(data);
        },
        (error) => {
          this.toastr.error(error, 'Error!');
          console.log(JSON.stringify(error.json()));
      });

      this.clearProductForm();
    }
  }

  clearProductForm() {
    // this.form.get('productNo').setValue(null);
    // this.form.get('description').setValue(null);
    // this.form.get('cost').setValue(null);
    // this.form.get('markup').setValue(null);
    // this.form.get('retail').setValue(null);
    // this.form.get('quantity').setValue(null);
    this.form.reset(<ProductForm>{
      category: this.categoryDto[0],
      brand: this.brandDto[0],
      vendor: this.vendorDto[0]
    }); 

    this.form.get('tax').setValue(true);
  }

    getAutoGeneratedProductNo(event): any {

      if(event.clientX > 0){
      this.productService.getAutoGeneratedBarcode()
        .subscribe((a: string) => {
          this.form.get('productNo').setValue(a);
        });
      }
        console.log(event);
    }

  showDialog() {

    this.displayDialog = !this.displayDialog;

  }

  showDigitalPunchOccurenceTextBox() {

    this.showDigitalPunchTextBox = !this.showDigitalPunchTextBox;
  }
}
export interface ProductForm {

  productNo: string;
  productVariantNo: number;
  description: string;
  category: Category;
  brand: Brand
  vendor: Vendor;
  // model: Model;
  alternetNo: string;
  cost: number;
  retail: number;
  markup: number;
  quantity: number;
  minQuantity: number;
  tax: boolean;
  varaint?: boolean;
  active: boolean;
  relatedProduct: boolean;
  favorite: boolean;
  returnRule: any;
  brandId: number;
  categoryId: number;
  vendorId: number;
  modelId: number;
  ecommerce: boolean;
  variant: boolean;
  customLoyaltyAmount: number;
  enableDigitalPunch?: boolean;
  noOfSaleForFreeService?:any;

}
