import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product/product.service";
// import { FormBuilder } from "@angular/forms/forms";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Category, Brand, Vendor, ProductInventory } from "app/product/product.component";
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
  displayDialog = false;
  productNo: any;
  generatedProductNo: string;

  products: Product[];
  formProduct = new Product();
  finalProductTosend: Product;
  productInventory = new ProductInventory();
  productInventoryList: ProductInventory[] = [];
  _subscriptionProduct: any;
  productList: Product[] = [];



  constructor(private productService: ProductService, private formBuilder: FormBuilder, private toastr: ToastsManager) {
    this.getProductDetails();

  }

  ngOnInit() {

    //this.generatedProductNo = '123213131';

    this.form = this.formBuilder.group(
      {
        'productNo': [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
        'description': ['', Validators.required],
        'category': [null, Validators.required],
        // 'brand': [null, Validators.required],
        'vendor': [null],
        'cost': [null, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
        'markup': [null, Validators.pattern('^[0-9-.]+$')],
        'retail': [null, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
        'quantity': [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
        'minQuantity': [null, [Validators.pattern('^[0-9]+$')]],
        'tax': [true, null],
        'ecommerce': [false, null],
        'alternetNo':[null]
      }
    );

    this.form.valueChanges
    .debounceTime(600)
    .distinctUntilChanged()
    .subscribe((change)=>{
      if(this.form.get('retail').value > 0){
        let retail:number = this.form.get('retail').value;
        let cost: number = this.form.get('cost').value;

        let markup = ((retail - cost)/retail) * 100;
        let finalMarkup = markup.toFixed(2);
        this.form.get('markup').setValue(finalMarkup);
      }
    });

    this.productService.getCategoryDetails()
      .subscribe((categories: Category[]) => {
        this.categoryDto = categories;
        this.form.get('category').setValue(this.categoryDto[0]);
        console.log('CategoryList' + this.categoryDto);
      });

    // this.productService.getBrandDetails()
    //   .subscribe((brands: Brand[]) => {
    //     this.brandDto = brands;
    //     this.form.get('brand').setValue(this.brandDto[0]);
    //     console.log('BrandList' + this.brandDto);
    //   });

    this.productService.getVendorDetails()
      .subscribe((vendors: Vendor[]) => {
        this.vendorDto = vendors;
        this.form.get('vendor').setValue(this.vendorDto[0]);
        console.log('VendorList' + this.vendorDto);
      });

      this.getProductDetails();



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

    let isProductExists: boolean;
    let isAlternateNoExists: boolean;

      this.productInventoryList.push(this.productInventory);

      let formValues: ProductForm = this.form.value;

      this.productList.forEach((product)=>{

        if(product.productNo == formValues.productNo){
          isProductExists = true;
          alert('Duplicate Product Number, Please Use Different Product Number!!!')
        }
        if(product.alternetNo && product.alternetNo == formValues.alternetNo){
          isAlternateNoExists = true;
          alert('Duplicate AlternetNo Number, Please Use Different AlternetNo Number!!!')
        }
      });

      if(!isProductExists && !isAlternateNoExists)
      {
      // Here i need to add product inventory details to the product inventory table 
      this.productInventory.productNo = formValues.productNo;
      this.productInventory.cost = formValues.cost;
      this.productInventory.retail = formValues.retail;
      this.productInventory.quantity = formValues.quantity;
      this.productInventory.createdTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');


      let product: Product = {
        productNo: formValues.productNo,
        categoryId: formValues.category.categoryId,
        // brandId: formValues.brand.brandId,
        vendorId: formValues.vendor.vendorId,
        alternetNo: formValues.alternetNo,
        cost: formValues.cost,
        retail: formValues.retail,
        description: formValues.description.toUpperCase(),
        imeiNo: null,
        active: true,
        ecommerce: formValues.ecommerce,
        relatedProduct: formValues.relatedProduct,
        tax: formValues.tax,
        varaint: formValues.varaint,
        markup: formValues.markup,
        minQuantity: formValues.minQuantity,
        quantity: formValues.quantity,
        returnRule: formValues.returnRule,
        createdTimestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        productInventoryDaoList: this.productInventoryList,
        operationType: 'Add'
      }
      this.productService.addProduct(product);
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
      // brand: this.brandDto[0],
      vendor: this.vendorDto[0],
    }); 
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

  getProductDetails() {

    this.productService.getProductDetails();
   this._subscriptionProduct =  this.productService.productListChange.subscribe((product)=>{
      this.productList = product;
    })
    // this.productService.getProductDetails()
    // .subscribe((products) => {
      // console.log(products);
    //   this.productList = products;
    // });
  }
  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscriptionProduct.unsubscribe();
   }


}

export interface ProductForm {

  productId?: number;
  productNo: string;
  productVariantNo?: number;
  description: string;
  category?: Category;
  brand?: Brand
  vendor?: Vendor;
  alternetNo?: string;
  cost?: number;
  retail?: number;
  markup?: number;
  quantity?: number;
  minQuantity?: number;
  tax?: boolean;
  varaint?: boolean;
  active?: boolean;
  relatedProduct?: boolean;
  returnRule?: any;
  brandId?: number;
  categoryId: number;
  vendorId?: number;
  modelId?: number;
  ecommerce?: boolean;
  variant?: boolean;
  customLoyaltyAmount?: number;
  productInventoryDaoList?: ProductInventory[];
  // isSold?:boolean;

}
