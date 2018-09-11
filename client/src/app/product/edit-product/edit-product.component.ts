import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { Category, Brand, Vendor, Model, ProductVariantDetail, ProductInventory, SubCategory } from 'app/product/product.component';
import * as moment from 'moment';
import { ProductService } from 'app/product/product.service';
import { ProductForm } from 'app/product/addProduct.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Product, ProductVariant, VariantInventoryDto, ProductVariantForm, TransactionLineItemDaoList } from 'app/sell/sale/sale.component';
import { DateDto, DateService } from '../../shared/services/date.service';



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
  subCategoryDto: SubCategory[] = [];
  brandDto: Brand[];
  vendorDto: Vendor[];
  modelDto: Model[];
  productVariantDetailsDto: ProductVariantDetail[];
  productVariantDto: ProductVariant[] = [];
  variantOperation: string = 'Add';
  productVariantDetailsByNameDto: ProductVariantDetail[];
  selectedVariantForDetete: ProductVariant;
  displayDialog = false;
  productNo: any;

  selectedProductForHistory: Product;
  productHistoryDropDown: any = 'Today';
  dateDto = new DateDto();
  totalSaleQuantity: number = 0;
  productHistoryDto: TransactionLineItemDaoList[] = [];


  generatedProductNo: string;
  products: Product[];
  formProduct = new Product();
  finalProductTosend: Product;
  selectedProductInventoryForDelete: ProductInventory;
  _subscriptionProduct: any;
  productList: Product[] = [];
  // variantDto: ProductVariantDetail[] = [];
  productVariantDetails: ProductVariantDetail[] = [];
  productInventoryList: ProductInventory[] = [];
  cost: number;
  quantity: number;
  disableCostQtyForEdit: boolean = true;




  currentProduct: Product;
  constructor(private productService: ProductService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastsManager, private dateService: DateService) {
    this.getProductDetails();

  }

  ngOnInit() {

    //this.generatedProductNo = '123213131';
    let productNo = this.route.snapshot.paramMap.get('productNo');
    if (productNo) {
      this.productService.getProductDetailsById(productNo)
        .subscribe((product) => {
          this.currentProduct = product;

          // TODO HERE I NEED TO ADD LOGIC TO SHOW INVENTORY DETAILS.

          // this.currentProduct.productInventoryDaoList.forEach((inventory => {
          //   inventory.time = moment(inventory.date).format('hh:mm A');
          //   inventory.date = moment(inventory.date).format('MM/DD/YYYY');
          //   this.currentProduct.quantity = +this.currentProduct.quantity + inventory.quantity;
          // }));

          let currentCategory = {};
          let currentSubCategory = {};
          let currentBrand = {};
          let currentVendor = {};
          let currentModel = {};
          this.form = this.formBuilder.group(
            {
              'productNo': [this.currentProduct.productNo, [Validators.required, Validators.pattern('^[0-9]+$')]],
              'description': [this.currentProduct.description, Validators.required],
              'category': [null, Validators.required],
              'subCategory': [null],
              'brand': [null, Validators.required],
              'vendor': [null, Validators.required],
              'model': [null],
              // 'costPrice': [this.currentProduct.cost, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
              'markup': [null, Validators.pattern('^[0-9-.]+$')],
              'retail': [this.currentProduct.retail, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
              'tier1': [this.currentProduct.tier1, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
              'tier2': [this.currentProduct.tier2, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
              'tier3': [this.currentProduct.tier3, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
              'quantity': [this.currentProduct.quantity, ''],
              'minQuantity': [this.currentProduct.minQuantity, ''],
              'variant': [this.currentProduct.variant, ''],
              'tax': [this.currentProduct.tax, null],
              'ecommerce': [this.currentProduct.ecommerce, null],
              'alternetNo': [this.currentProduct.alternetNo, null],
              'newProduct': [this.currentProduct.newProduct, null],
              'onSale': [this.currentProduct.onSale, null],
              'featured': [this.currentProduct.featured, null]


            }
          );
          this.variantForm = this.formBuilder.group({

            'productVariantId': [null],
            'productNo': [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
            'oldProductNo': [null],
            'cost': [null, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            // 'markup': [null, Validators.pattern('^[0-9-.]+$')],
            // 'retail': [null, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            'tier1': [this.currentProduct.tier1, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            'tier2': [this.currentProduct.tier2, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
            'tier3': [this.currentProduct.tier3, [Validators.required, Validators.pattern('^[0-9-.]+$')]],

            'quantity': [null, [Validators.pattern('^[0-9]+$')]],
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

          // this.variantForm.valueChanges
          // .subscribe((changes) => {
          //   console.log('form valurs', this.variantForm.errors);
          //   console.log('form valurs', this.variantForm.valid);

          //   console.log('complete form', this.variantForm.value);

          // })

          this.productService.getCategoryDetails()
            .subscribe((categories: Category[]) => {
              this.categoryDto = categories;
              currentCategory = this.categoryDto.filter((el) => el.categoryId == this.currentProduct.categoryId)[0];
              this.form.get('category').setValue(currentCategory);
              // console.log('CategoryList' + this.categoryDto);
              // console.log(currentCategory);
              // console.log(this.form.value);
            });


          // Here I am sending 0, cause i need all subcatgories
          this.productService.getSubCategoryDetailsByCategoryId(0)
            .subscribe((subCategory: SubCategory[]) => {
              this.subCategoryDto = subCategory;

              currentSubCategory = this.subCategoryDto.filter((el) => el.id == this.currentProduct.subCategoryId)[0];
              //This will help me fix the problem when model is undefined or not added befor.
              if (currentSubCategory == undefined) {
                currentSubCategory = new SubCategory();
              }
              this.form.get('subCategory').setValue(currentSubCategory);
            });

          this.productService.getBrandDetails()
            .subscribe((brands: Brand[]) => {
              this.brandDto = brands;
              currentBrand = this.brandDto.filter((el) => el.brandId == this.currentProduct.brandId)[0];
              this.form.get('brand').setValue(currentBrand);
              // console.log('BrandList' + this.brandDto);
            });

          this.productService.getVendorDetails()
            .subscribe((vendors: Vendor[]) => {
              this.vendorDto = vendors;
              currentVendor = this.vendorDto.filter((el) => el.vendorId == this.currentProduct.vendorId)[0];
              this.form.get('vendor').setValue(currentVendor);
              // console.log('VendorList' + this.vendorDto);
            });

          this.productService.getModelDetails()
            .subscribe((models: Model[]) => {
              this.modelDto = models;
              currentModel = this.modelDto.filter((el) => el.modelId == this.currentProduct.modelId)[0];

              //This will help me fix the problem when model is undefined or not added befor.
              if (currentModel == undefined) {
                currentModel = new Model();
              }
              //console.log('undfined model', currentModel);
              this.form.get('model').setValue(currentModel);
            });

          this.productService.getProductVariantDetails()
            .subscribe((variants: ProductVariantDetail[]) => {
              this.productVariantDetailsDto = variants;
              if (this.productVariantDetailsDto != null) {
                this.variantForm.get('variant1').setValue(this.productVariantDetailsDto[0]);
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

      if (null == formValues.subCategory) {
        formValues.subCategory = new SubCategory();
      }
      if (null == formValues.model) {
        formValues.model = new Model();
      }

      let product: Product = {
        productId: this.currentProduct.productId,
        productNo: formValues.productNo,
        categoryId: formValues.category.categoryId,
        subCategoryId: formValues.subCategory.id,
        brandId: formValues.brand.brandId,
        vendorId: formValues.vendor.vendorId,
        modelId: formValues.model.modelId,
        cost: formValues.cost,
        retail: formValues.retail,
        tier1: formValues.tier1,
        tier2: formValues.tier2,
        tier3: formValues.tier3,
        description: formValues.description,
        active: true,
        ecommerce: formValues.ecommerce,
        relatedProduct: formValues.relatedProduct,
        newProduct: formValues.newProduct,
        onSale: formValues.onSale,
        featured: formValues.featured,
        tax: formValues.tax,
        minQuantity: formValues.minQuantity,
        quantity: formValues.quantity,
        productInventoryDaoList: this.currentProduct.productInventoryDaoList,
        markup: 0.00,
        createdTimestamp: null,
        alternetNo: formValues.alternetNo,
        date: null,
        discount: 0,
        imeiNo: null,
        retailWithDiscount: 0,
        returnRule: null,
        status: null,
        taxAmountOnProduct: 0,
        time: null,
        totalProductPrice: 0,
        transactionComId: 0,
        variant: formValues.variant,
        operationType: 'Edit',
        saleQuantity: 0
      }

      this.productService.addProduct(product);
      //this.router.navigate(['/product/productTable']); 
    }
    //}
  }

  addProductVariant(isClone: boolean) {
    let formValues: ProductVariantForm = this.variantForm.value;

    console.log('formValues at all', formValues.operationType);

    let productVariant: ProductVariant = {
      productVariantId: formValues.productVariantId,
      oldProductNo: formValues.oldProductNo,
      productId: this.currentProduct.productId,
      productNo: formValues.productNo,
      cost: formValues.cost,
      // retail: formValues.retail,
      tier1: formValues.tier1,
      tier2: formValues.tier2,
      tier3: formValues.tier3,
      quantity: formValues.quantity,
      variant1: formValues.variant1.name,
      value1: formValues.value1,
      // variant2:formValues.variant2,
      // value2:formValues.value2,
      // variant3:formValues.variant3,
      value3: formValues.value3,
      createdTimestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      operationType: this.variantOperation,
      active: true
    }
    this.productService.addProductVariant(productVariant)
      .subscribe((variant: ProductVariant) => {
        if (variant) {
          console.log('response', variant);
          if (variant.operationType == 'Edit') {
            let index = this.productVariantDto.findIndex((el) => el.productNo == productVariant.productNo);
            console.log('index', index);
            if (index > -1) {
              this.toastr.success('Product Edited Successfully!!', 'Success!');
              this.productVariantDto[index] = variant;
              this.productVariantDto = this.productVariantDto.slice();
            }
          }
          else {
            console.log('This is add', variant);
            this.toastr.success('Product Added Successfully!!', 'Success!');
            this.productVariantDto.push(variant);
            this.productVariantDto = this.productVariantDto.slice();

            if (isClone) {
              this.variantForm.get('productNo').setValue('');
            }
          }
        }
        this.variantOperation = 'Add';
      }
      );
  }



  updateProductVariant(selectedVariant: ProductVariant) {


    this.variantOperation = 'Edit';
    this.variantForm.get('productVariantId').setValue(selectedVariant.productVariantId);
    this.variantForm.get('oldProductNo').setValue(selectedVariant.productNo);
    this.disableCostQtyForEdit = true;
    this.variantForm.get('productNo').setValue(selectedVariant.productNo);
    this.variantForm.get('cost').setValue(selectedVariant.cost);
    this.variantForm.get('quantity').setValue(selectedVariant.quantity);

    this.variantForm.get('tier1').setValue(selectedVariant.tier1);
    this.variantForm.get('tier2').setValue(selectedVariant.tier2);
    this.variantForm.get('tier3').setValue(selectedVariant.tier3);
    this.variantForm.get('value1').setValue(selectedVariant.value1);

  }

  setVariantForDelete(productVariant: ProductVariant) {
    this.selectedVariantForDetete = productVariant;
  }

  deleteVariant() {

    this.productService.deleteVariant(this.selectedVariantForDetete)
      .subscribe((variant) => {

        if (variant && variant.status === 200) {
          this.toastr.success('Product Variant Deleted Successfully !!', 'Success!');
          let index = this.productVariantDto.findIndex((el) => el.productNo == this.selectedVariantForDetete.productNo);
          this.productVariantDto.splice(index, 1);
          this.productVariantDto = this.productVariantDto.slice();
        }
      },
        error => {
          console.log('data', error);
          if (error.status == 409) {
            this.toastr.warning('Can not delete this product, cause it has inventory in it !!', 'Warning!');
          }
          else {
            this.toastr.error('Opps Something goes wrong !!', 'Error!!');
            console.log(JSON.stringify(error.json()));
          }
        });
  }

  onVariantSelect(event) {
    // console.log(event.target.selectedIndex);
    // let selectedVariant: ProductVariantDetail = this.variantDto[event.target.selectedIndex]
    // this.productService.getProductVariantDetailsByName(selectedVariant)
    // .subscribe((variantDetails: ProductVariantDetail[]) => {
    //   this.productVariantDetails = variantDetails;
    //   this.productVariantDetails = this.productVariantDetails.slice();
    //   this.variantForm.get('value1').setValue(this.productVariantDetails[0].value);
    // })
  }

  getProductVariantById(productId: number) {

    this.productService.getProductVariantById(productId)
      .subscribe((product: ProductVariant[]) => {
        this.productVariantDto = product;
        console.log('variant Inventory', this.productVariantDto);
      });
  }

  setProductInventoryForSelectedProduct(productVariant: ProductVariant, isCost: boolean) {
    // console.log('product no', productVariant.productNo);
    // console.log('inventory dto', this.productVariantInventoryDto);

    // First need to get real inventory details from the db, cause when you add inventory and if you dont do this call, it wont show you,
    // Newly added inventory details.
    // I NEED TO DO THIS CALL IN BOTH IF USER CLICK ON COST OR RETAIL DOES NOT MATTER.
    this.productService.getProductInventoryByProduct(productVariant.productId, productVariant.productNo)
      .subscribe((inventory: ProductInventory[]) => {
        this.productInventoryList = inventory;

        this.productInventoryList.forEach((inventory) => {
          inventory.time = moment(inventory.createdTimestamp).format('hh:mm A');
          inventory.date = moment(inventory.createdTimestamp).format('MM-DD-YYYY');
          inventory.productNo = productVariant.productNo;
          this.productInventoryList = this.productInventoryList.slice();

        })
      });

    if (isCost) {
      // this logic helps when there is no data in inventory table.
      if (this.productInventoryList.length == 0 || this.productInventoryList == undefined || null == this.productInventoryList) {
        let inventoryObj = new ProductInventory();

        inventoryObj.productNo = productVariant.productNo;
        inventoryObj.productId = productVariant.productId;
        this.productInventoryList.push(inventoryObj)
      }

    }
    // THIS MEANS USEER HAS CLICK ON THE RETAIL.
    else {
      // $('#retailTier').modal('show');
      this.productInventoryList = this.productInventoryList.slice();
    }

  }

  setProductRetailPriceTierForSelectedVariant(productNo: any) {

  }
  addProductInventory() {
    let productInventoryObj: ProductInventory = new ProductInventory();

    productInventoryObj.productId = this.currentProduct.productId;
    productInventoryObj.productNo = this.productInventoryList[0].productNo;
    productInventoryObj.cost = this.cost;
    productInventoryObj.tier1 = this.productInventoryList[0].tier1;
    productInventoryObj.tier2 = this.productInventoryList[0].tier2;
    productInventoryObj.tier3 = this.productInventoryList[0].tier3;

    //productInventoryObj.retail = this.productInventoryList[0].retail;
    productInventoryObj.quantity = this.quantity;
    productInventoryObj.createdTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    //this.productInventoryList.push(productInventoryObj);

    this.productService.addProductInventory(productInventoryObj)
      .subscribe((data) => {
        if (null != data) {
          let response = data.json();
          let backendResponse: ProductInventory = response;

          let index = this.productVariantDto.findIndex((el) => el.productNo == productInventoryObj.productNo);
          if (index > -1) {
            this.productVariantDto[index].quantity = backendResponse.totalQuantity;
            this.productVariantDto[index].cost = backendResponse.cost;

            this.productVariantDto = this.productVariantDto.slice();
            this.toastr.success('Inventory Updated Successfully !!', 'Success!');
          }
        }
        else {
          this.toastr.error('Opps Something Goes Wrong !!', 'Error!');
        }
      },
        error => {
          this.toastr.error('Opps Something goes wrong !!', 'Error!!');
          console.log(JSON.stringify(error.json()));
        });

    this.cost = null;
    this.quantity = null;

  }

  updateProductInventory(event) {
    
    let product: ProductInventory = event.data;
    let quantity: number = Number(product.quantity);
    product.lastUpdatedTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    console.log('event on inventoty', product);
    //let productInventory: ProductInventory[] = []; 

    //productInventory.push(event.data);

    //console.log('product invetrory object', productInventory);

    this.productService.updateProductInventory(product)
      .subscribe(data => {

        if (data) {
          let response = data.json();
          let backendResponse: ProductInventory = response;

          let index = this.productVariantDto.findIndex((el) => el.productNo == product.productNo);
          if (index > -1) {
            this.productVariantDto[index].quantity = backendResponse.totalQuantity;
            this.productVariantDto[index].cost = backendResponse.cost;
            this.productVariantDto = this.productVariantDto.slice();
            this.toastr.success('Inventory Updated Successfully !!', 'Success!');
          }
        }
      },
        error => {
          this.toastr.error('Opps Something goes wrong !!', 'Error!!');
          console.log(JSON.stringify(error.json()));
        });
    // let index = this.productViewList.findIndex((el) => el.productNo == product.productNo);


    // this.productViewList[index] = {
    //   ...this.productViewList[index],
    //   ...product
    // };

    // this.productViewList = this.productViewList.slice();

    this.hideProductModal();

  }

  updateProductVariantRetailTierPrice(event) {

    this.productService.updateRetailTierPrice(event.data)
      .subscribe((data) => {
        if (data) {
          this.toastr.success('Retail Tier Price Updated Successfully !!', 'Success!');
        }
      },
        error => {
          this.toastr.error('Opps Something goes wrong !!', 'Error!!');
          console.log(JSON.stringify(error.json()));
        });
    console.log('retail tier update', event.data);
  }

  hideProductModal() {
    console.log('Hiding modal');
    $('#productInventory').modal('hide');
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

  clearVariantForm() {
    this.variantForm.get('productNo').setValue(null);
    this.variantForm.get('value1').setValue(null);
    this.variantForm.get('cost').setValue(null);
    this.variantForm.get('tier1').setValue(null);
    this.variantForm.get('tier2').setValue(null);
    this.variantForm.get('tier3').setValue(null);
    this.variantForm.get('quantity').setValue(null);

  }
  showDialog() {
    this.displayDialog = !this.displayDialog;
  }
  getProductDetails() {
    this.productService.getProductDetails();
    this._subscriptionProduct = this.productService.productListChange.subscribe((product) => {
      this.productList = product;
    })
    // this.productService.getProductDetails()
    // .subscribe((products) => {
    // console.log(products);
    //   this.productList = products;
    // });
  }

  getAutoGeneratedProductNo(event): any {

    if (event.clientX > 0) {
      this.productService.getAutoGeneratedBarcode()
        .subscribe((a: string) => {
          this.variantForm.get('productNo').setValue(a);
        });
    }
    console.log(event);
  }
  onCategorySelect(event) {

    console.log(event.target.selectedIndex);

    let selectedCategory: Category = this.categoryDto[event.target.selectedIndex];

    this.productService.getSubCategoryDetailsByCategoryId(selectedCategory.categoryId)
      .subscribe((subCategory: SubCategory[]) => {
        this.subCategoryDto = subCategory;
        this.subCategoryDto = this.subCategoryDto.slice();
        this.form.get('subCategory').setValue(this.subCategoryDto[0]);
        console.log('sub CategoryId', this.subCategoryDto);
      })
  }

  setProductForHistory(product: Product) {
    this.selectedProductForHistory = product;

    // I need to do this becuase after, after setting product, its opens the model and if i dont call this method user wont see anything on popup.
    this.getProductHistory();
  }

  getProductHistory(): void {

    if (this.productHistoryDropDown == 'Today') {
      this.dateDto = this.dateService.getCurrentDay();
    }
    else if (this.productHistoryDropDown == 'Yesterday') {
      this.dateDto = this.dateService.getPreviousDay();

    }
    else if (this.productHistoryDropDown == 'This Week') {
      this.dateDto = this.dateService.getCurrentWeek();

    }
    else if (this.productHistoryDropDown == 'Last Week') {
      this.dateDto = this.dateService.getLastWeek();

    }
    else if (this.productHistoryDropDown == 'This Month') {
      this.dateDto = this.dateService.getCurrentMonth();

    }
    else if (this.productHistoryDropDown == 'Last Month') {
      this.dateDto = this.dateService.getLastMonth();

    }
    else if (this.productHistoryDropDown == 'Last 3 Months') {
      this.dateDto = this.dateService.getLast3Months();

    } else if (this.productHistoryDropDown == 'Last 6 Months') {
      this.dateDto = this.dateService.getLast6Months();

    }
    else if (this.productHistoryDropDown == 'This Year') {
      this.dateDto = this.dateService.getCurrentYear();

    }
    else if (this.productHistoryDropDown == 'Last Year') {
      this.dateDto = this.dateService.getLastYear();
    }

    this.totalSaleQuantity = 0;
    this.productService.getProductHistory(this.selectedProductForHistory.productNo, this.selectedProductForHistory.productId, this.dateDto.startDate, this.dateDto.endDate)
      .subscribe((productHistory: TransactionLineItemDaoList[]) => {
        productHistory.forEach((history => {
          history.time = moment(history.date).format('hh:mm A');
          history.date = moment(history.date).format('MM/DD/YYYY');
          this.totalSaleQuantity = +this.totalSaleQuantity + history.saleQuantity;
        }))

        this.productHistoryDto = productHistory;

      });
    console.log("Product data from UI for History", this.selectedProductForHistory);
    console.log(this.productHistoryDto)
  }

  //   converDescriptionToSentanceForm(str) {
  //     return str.replace(/\w\S*/g, function(txt){
  //         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //     });
  // }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this._subscriptionProduct.unsubscribe();
  }
}
