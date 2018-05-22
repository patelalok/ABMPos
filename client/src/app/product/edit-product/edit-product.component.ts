import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import {Category, Brand, Vendor, Model, ProductVariantDetail, ProductInventory } from 'app/product/product.component';
import * as moment from 'moment';
import { ProductService } from 'app/product/product.service';
import { ProductForm } from 'app/product/addProduct.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Product, ProductVariant } from 'app/sell/sale/sale.component';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  form: FormGroup;
  variantForm: FormGroup;
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
  selectedProductInventoryForDelete: ProductInventory;
  _subscriptionProduct: any;
  productList: Product[] = [];
  variantDto: ProductVariantDetail[] = [];
  productVariantDetails: ProductVariantDetail[] = [];
  productVariantDto: ProductVariant[] = [];

 

  currentProduct: Product; 
  constructor(private productService: ProductService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastsManager) {
    this.getProductDetails();

  }

  ngOnInit() {

    //this.generatedProductNo = '123213131';
    let productNo = this.route.snapshot.paramMap.get('productNo');
    if(productNo){
      this.productService.getProductDetailsById(productNo)
      .subscribe((product) =>{
        this.currentProduct=product;

        // TODO HERE I NEED TO ADD LOGIC TO SHOW INVENTORY DETAILS.
        
        // this.currentProduct.productInventoryDaoList.forEach((inventory => {
        //   inventory.time = moment(inventory.date).format('hh:mm A');
        //   inventory.date = moment(inventory.date).format('MM/DD/YYYY');
        //   this.currentProduct.quantity = +this.currentProduct.quantity + inventory.quantity;
        // }));

        let currentCategory={}; 
        let currentBrand ={};
        let currentVendor ={}; 
        let currentModel = {}; 
        this.form = this.formBuilder.group(
          {
            'productNo': [this.currentProduct.productNo, [Validators.required, Validators.pattern('^[0-9]+$')]],
            'description': [this.currentProduct.description, Validators.required],
            'category': [null, Validators.required],
            'brand': [null, Validators.required],
            'vendor': [null, Validators.required],
            'model': [null],
            // 'costPrice': [this.currentProduct.cost, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            'markup': [null, Validators.pattern('^[0-9-.]+$')],
            'retail': [this.currentProduct.retail, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            'quantity': [this.currentProduct.quantity,''],
            'minQuantity': [this.currentProduct.minQuantity,''],
            'tax': [this.currentProduct.tax, null],
            'ecommerce': [this.currentProduct.ecommerce, null],
            'alternetNo':[this.currentProduct.alternetNo, null]
            
          }
        );
        this.variantForm =  this.formBuilder.group({
          
            'productNo': [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
            'cost': [null, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            // 'markup': [null, Validators.pattern('^[0-9-.]+$')],
            'retail': [null, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            'quantity': [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
            'variant1': [null, [Validators.required]],
            //'variant2': [null],
           // 'variant3': [null],
            'value1': [null],
            //'value2': [null],
            //'value3': [null]
            // 'minQuantity': [null, [Validators.pattern('^[0-9]+$')]],
            // 'ecommerce': [false, null],
            // 'alternetNo':[null]
        })

        this.form.valueChanges
        .subscribe((changes) => {
          console.log('form valurs', this.form.errors);
          console.log('form valurs', this.form.valid);

          console.log('complete form', this.form.value);

        })

        this.variantForm.valueChanges
        .subscribe((changes) => {
          console.log('form valurs', this.variantForm.errors);
          console.log('form valurs', this.variantForm.valid);

          console.log('complete form', this.variantForm.value);

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

      this.productService.getModelDetails()
        .subscribe((models: Model[]) => {
          this.modelDto = models;
          currentModel = this.modelDto.filter((el)=> el.modelId==this.currentProduct.modelId)[0];

          //This will help me fix the problem when model is undefined or not added befor.
          if(currentModel == undefined){
            currentModel = new Model();
          }
          //console.log('undfined model', currentModel);
          this.form.get('model').setValue(currentModel);
        });

        this.productService.getProductVariantDetails()
        .subscribe((variants:ProductVariantDetail[] )=>{
          this.variantDto = variants;
          if(this.variantDto != null) {
          this.variantForm.get('variant1').setValue(this.variantDto[0]);
          // this.variantForm.get('variant2').setValue(this.variantDto[0].value);
          // this.variantForm.get('variant3').setValue(this.variantDto[0].value);
          }
        })

        this.getProductVariantById(this.currentProduct.productId);


      });
    }

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
    {
      let isAlternetNoExists: boolean;

      let formValues: ProductForm = this.form.value;

      // TO DO NEED TO CHECK THIS LOGIC.
      // this.productList.forEach((product)=>{
      //   if(product.alternetNo == formValues.alternetNo){
      //     isAlternetNoExists = true;
      //     alert('Duplicate AlternetNo Number, Please Use Different AlternetNo Number!!!')
      //   }
      // });

      // if(!isAlternetNoExists){

      let product: Product = {
        productId: this.currentProduct.productId,
        productNo: formValues.productNo,
        categoryId: formValues.category.categoryId,
        brandId: formValues.brand.brandId,
        vendorId: formValues.vendor.vendorId,
        modelId: formValues.model.modelId,
        cost: formValues.cost,
        retail: formValues.retail,
        description: formValues.description.toUpperCase(),
        active: true,
        ecommerce: formValues.ecommerce,
        relatedProduct: formValues.relatedProduct,
        tax: formValues.tax,
        minQuantity: formValues.minQuantity,
        quantity: formValues.quantity,
        productInventoryDaoList: this.currentProduct.productInventoryDaoList,
        markup: 0.00,
        createdTimestamp: null,
        alternetNo: formValues.alternetNo,
        date: null,
        discount:0,
        imeiNo: null,
        retailWithDiscount: 0,
        returnRule: null,
        status: null,
        taxAmountOnProduct: 0,
        time:null,
        totalProductPrice: 0,
        transactionComId: 0,
        varaint: null,
        operationType: 'Edit',
        saleQuantity:0
          }

      this.productService.addProduct(product);
      //this.router.navigate(['/product/productTable']); 
    }
  //}
  }

  addProductVariant(){

    let formValues: ProductVariant = this.variantForm.value;

    let productVariant: ProductVariant = {
      productId: this.currentProduct.productId,
      productNo: formValues.productNo,
      cost:formValues.cost,
      retail: formValues.retail,
      quantity:formValues.quantity,
      variant1:formValues.variant1,
      value1:formValues.value1,
      variant2:formValues.variant2,
      value2:formValues.value2,
      variant3:formValues.variant3,
      value3:formValues.value3,
    }

    this.productService.addProductVariant(productVariant);

  }
  updateProductVariant(product: ProductVariant){

    this.variantForm.get('productNo').setValue(product.productNo);
    this.variantForm.get('variant1').setValue(product.variant1);
    this.variantForm.get('value1').setValue(product.value1);
    this.variantForm.get('cost').setValue(product.cost);
    this.variantForm.get('retail').setValue(product.retail);
    this.variantForm.get('quantity').setValue(product.quantity);

    console.log('update product', product);
  }

  onVariantSelect(event){
    // console.log(event.target.selectedIndex);
    // let selectedVariant: ProductVariantDetail = this.variantDto[event.target.selectedIndex];

    // this.productService.getProductVariantDetailsByName(selectedVariant)
    // .subscribe((variantDetails: ProductVariantDetail[]) => {
    //   this.productVariantDetails = variantDetails;
    //   this.productVariantDetails = this.productVariantDetails.slice();
    //   this.variantForm.get('value1').setValue(this.productVariantDetails[0].value);
    // })
  }

  getProductVariantById(productId:number){

    this.productService.getProductVariantById(productId)
    .subscribe((product:ProductVariant[])=>{
      this.productVariantDto = product;
    });
  }

  updateProductInventory(event) {
    this.productService.updateProductInventory(event.data);
  }

  setProductInventoryDetailsForDelete(inventory: ProductInventory) {

    this.selectedProductInventoryForDelete = inventory;
  }
  deleteProductInventory() {

    this.productService.deleteProductInventory(this.selectedProductInventoryForDelete);
  }

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
