import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { BackendProductDto, Category, Brand, Vendor, Model, ProductVariantDetail } from 'app/product/product.component';
import * as moment from 'moment';
import { ProductService } from 'app/product/product.service';
import { ProductForm } from 'app/product/addProduct.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Product } from 'app/sell/sale/sale.component';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;
  backendProductDto: BackendProductDto[];
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
 

  currentProduct: Product; 
  constructor(private productService: ProductService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastsManager) {
  }

  ngOnInit() {

    //this.generatedProductNo = '123213131';
    let productNo = this.route.snapshot.paramMap.get('productNo');
    if(productNo){
      this.productService.getProductDetailsById(productNo)
      .subscribe((product: Product) =>{
        this.currentProduct=product;

        let currentCategory={}; 
        let currentBrand ={};
        let currentVendor ={}; 
        let currentModel = {}; 

       // this.showDigitalPunchTextBox = this.currentProduct.enableDigitalPunch;
        this.form = this.formBuilder.group(
          {
            'productNo': [this.currentProduct.productNo, [Validators.required, Validators.pattern('^[0-9]+$')]],
            'description': [this.currentProduct.description, Validators.required],
            'category': [null, Validators.required],
            'brand': [null, Validators.required],
            'vendor': [null, Validators.required],
            // 'costPrice': [this.currentProduct.cost, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            'markup': [null, Validators.pattern('^[0-9-.]+$')],
            'retail': [this.currentProduct.retail, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            'quantity': [this.currentProduct.quantity,''],
            'minQuantity': [this.currentProduct.minQuantity,''],
            'tax': [this.currentProduct.tax, null],
            'ecomerce': [this.currentProduct.ecommerce, null],
            //'varaint': [this.currentProduct.variant, null],
            //'enableDigitalPunch':[this.currentProduct.enableDigitalPunch, null],
            'noOfSaleForFreeService': [this.currentProduct.noOfSaleForFreeService, null]
            
          }

          
        );

        this.form.valueChanges
        .subscribe((changes) => {
          console.log('form valurs', this.form.errors);
          console.log('form valurs', this.form.valid);

          console.log('complete form', this.form.value);

        })
   
        this.productService.getCategoryDetails()
        .subscribe((categories: Category[]) => {
          this.categoryDto = categories;
          currentCategory = this.categoryDto.filter((el)=> el.categoryId==this.currentProduct.categoryId)[0]; 
          this.form.get('category').setValue(currentCategory);
          // console.log('CategoryList' + this.categoryDto);
          // console.log(currentCategory);
          // console.log(this.form.value);
        });

      this.productService.getBrandDetails()
        .subscribe((brands: Brand[]) => {
          this.brandDto = brands;
          currentBrand = this.brandDto.filter((el)=> el.brandId==this.currentProduct.brandId)[0]; 
          this.form.get('brand').setValue(currentBrand);
          // console.log('BrandList' + this.brandDto);
        });

      this.productService.getVendorDetails()
        .subscribe((vendors: Vendor[]) => {
          this.vendorDto = vendors;
          currentVendor = this.vendorDto.filter((el)=> el.vendorId==this.currentProduct.vendorId)[0]; 
          this.form.get('vendor').setValue(currentVendor);
          // console.log('VendorList' + this.vendorDto);
        });

      // this.productService.getModelDetails()
      //   .subscribe((models: Model[]) => {
      //     this.modelDto = models;
      //     console.log('ModelList' + this.modelDto);
      //   });


      });
    }



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
  showDigitalPunchOccurenceTextBox() {

    this.showDigitalPunchTextBox = !this.showDigitalPunchTextBox;
  }

  addProduct() {
    {

      let formValues: ProductForm = this.form.value;
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
        varaint: formValues.varaint,
        markup: formValues.markup,
        minQuantity: formValues.minQuantity,
        //productVariantNo: formValues.productVariantNo,
        quantity: formValues.quantity,
        retailWithDiscount: null,
        returnRule: formValues.returnRule,
        status: null,
        taxAmountOnProduct: null,
        totalProductPrice: null,
        transactionComId: null,
        time: null,
        // enableDigitalPunch: formValues.enableDigitalPunch,
        noOfSaleForFreeService: formValues.noOfSaleForFreeService,
        createdTimestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),

          }

      this.productService.editProduct(product)
      .subscribe(data => {
       if(data){
         this.toastr.success('Product Updated Successfully!!', 'Success');
       }
      },
      error => {
        this.toastr.error('Something Goes Wrong!!', 'Error');
      });
      //this.clearProductForm();

      this.router.navigate(['/product/productTable']);
      
    }
  }

  // updateProductInventory(event) {
  //   this.productService.updateProductInventory(event.data);
  // }

  clearProductForm() {
    this.form.get('productNo').setValue(null);
    this.form.get('description').setValue('');
    // this.form.get('cost').setValue(null);
    this.form.get('markup').setValue(null);
    this.form.get('retail').setValue(null);
    this.form.get('quantity').setValue(null);
  }
  showDialog() {

    this.displayDialog = !this.displayDialog;

  }
}
