import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product/product.service";
import { Product, TransactionLineItemDaoList } from 'app/sell/sell.component';
// import { FormBuilder } from "@angular/forms/forms";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MenuItem, LazyLoadEvent } from 'primeng/primeng';
import { BackendProductDto, Category, Brand, Model, Vendor, ProductCommon, ProductInventory } from "app/product/product.component";
import * as moment from 'moment';
import { ViewChild } from '@angular/core/src/metadata/di';
import { Element } from '@angular/compiler';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { LoadingService } from 'app/loading.service';
import { ToastsManager } from 'ng2-toastr';
declare var $: JQueryStatic;

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.sass']
})
export class ProductTableComponent implements OnInit {
  form: FormGroup;
  productFilterBox: any;
  backendProductDto: BackendProductDto[];
  productViewList: BackendProductDto[] = [];
  productFullList: BackendProductDto[] = [];
  rowsToShow: number = 100;
  totalNumberProducts: number = 0;
  displayDialog = false;
  products: Product[];
  categoryDto: Category[];
  brandDto: Brand[];
  vendorDto: Vendor[];
  modelDto: Model[];
  items: MenuItem[];
  activeItem: MenuItem;
  selectedProductDropdownOption: any = "Select All";
  listOfProductOption: ProductCommon[] = null;
  pipeFilter: string;
  pipeFilterData: BackendProductDto[] = [];
  checked2: boolean = true;
  searchProductTextBox = new FormControl();
  productHistoryDto: TransactionLineItemDaoList[] = [];
  selectedProductForDelete: Product;
  selectedProductForHistory: Product;
  productHistoryDropDown: any = 'Today';
  updateProductObject: Product;
  productInventoryList: ProductInventory[] = [];

  dropdownOptionValue: number;

  loading: boolean = false;
  constructor(private productService: ProductService, private loadingService: LoadingService, private toastr: ToastsManager) { }

  ngOnInit() {

    this.getProductDetails();

    this.searchProductTextBox.valueChanges
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe((change) => {
        this.filterProducts(change)
      });
  }

  getProductDetails() {
    this.loadingService.loading = true;
    this.productService.getProductDetails()
      .subscribe((pro: BackendProductDto[]) => {
        // console.log(pro); 
        // this.productViewList = pro.slice(0,500);

        // this.productViewList = pro;
        this.productFullList = pro;
        this.backendProductDto = pro;

        if (this.dropdownOptionValue)
          this.fiterProductByDropdown(this.dropdownOptionValue);

        this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });

        this.loadingService.loading = false;
      });

  }
  loadProductsLazy(event: LazyLoadEvent) {
    this.loadingService.loading = true;
    if (this.productFullList) {
      this.totalNumberProducts = this.productFullList.length;
      this.productViewList = this.productFullList.slice(event.first, event.first + event.rows - 1);
    }

    this.loadingService.loading = false;
  }


  filterProducts(input: string) {
    this.loadingService.loading = true;
    if (input.length > 0)
      this.productFullList = this.nowFilterProduct(input, this.productFullList)
    else {
      this.getProductDetails();
      if (this.dropdownOptionValue)
        this.fiterProductByDropdown(this.dropdownOptionValue);
    }

    this.loadingService.loading = false;
    this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });
  }

  nowFilterProduct(input: string, backendProductDto: BackendProductDto[]): BackendProductDto[] {

    let filtered: BackendProductDto[] = [];
    for (let i = 0; i < backendProductDto.length; i++) {
      let p = backendProductDto[i];
      if (p.description.toLowerCase().includes(input.toLowerCase()) || p.productNo.includes(input)) {
        filtered.push(p);
      }
    }
    return filtered;
  }
  fiterProductByDropdown(obj: number) {
    if (obj)
      this.dropdownOptionValue = obj;
    console.log(obj);
    if (obj == -1) {
      this.productFullList = this.backendProductDto;
      this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });
      return;
    }
    if (this.selectedProductDropdownOption === 'Brand') {
      this.productFullList = this.backendProductDto.filter((el) => el.brandId == obj); 

    }
    else if (this.selectedProductDropdownOption === 'Category') {
      this.productFullList = this.backendProductDto.filter((cat) => cat.categoryId == obj)

    }
    else if (this.selectedProductDropdownOption === 'Vendor') {
      this.productFullList = this.backendProductDto.filter((ven) => ven.vendorId == obj)
    }
    else if (this.selectedProductDropdownOption === 'Model') {
      this.productFullList = this.backendProductDto.filter((mod) => mod.modelId == obj)
    }

    // console.log('Product full list here', this.productFullList);
    this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });
  }
  onProductDropdownChoose(): void {
    console.log(this.selectedProductDropdownOption);
    if (this.selectedProductDropdownOption === 'Brand') {
      //console.log('inside the if for brand');

      //TODO need to figure out how to reuse this code.
      this.productService.getBrandDetails()
        .subscribe((brands: Brand[]) => {
          this.listOfProductOption = [];
          brands.forEach((el) => this.listOfProductOption.push({
            id: el.brandId,
            name: el.name
          }));
        });

    }
    else if (this.selectedProductDropdownOption === 'Category') {
      //console.log('inside the if for brand');

      this.productService.getCategoryDetails()
        .subscribe((categories: Category[]) => {
          this.listOfProductOption = [];
          categories.forEach((el) => this.listOfProductOption.push({
            id: el.categoryId,
            name: el.name
          }));
        });
    }
    else if (this.selectedProductDropdownOption === 'Vendor') {
      this.productService.getVendorDetails()
        .subscribe((vendors: Vendor[]) => {
          this.listOfProductOption = [];
          vendors.forEach((el) => this.listOfProductOption.push({
            id: el.vendorId,
            name: el.name
          }));
        });
    }
    else if (this.selectedProductDropdownOption === 'Model') {
      this.productService.getModelDetails()
        .subscribe((models: Model[]) => {
          this.listOfProductOption = [];
          models.forEach((el) => this.listOfProductOption.push({
            id: el.modelId,
            name: el.name
          }));
        });
    }
    else {
      this.listOfProductOption = null;
      this.productFullList = this.backendProductDto;
      this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });
    }
  }

  editProduct(editProduct: Product) {

  }

  // I need to do this because i am opning popup then once user conform the delete then only i am calling delete method from model.
  setProductToDelete(product: Product) {

    this.selectedProductForDelete = product;
  }

  deleteProduct() {

    this.productService.deleteProduct(this.selectedProductForDelete);
    let index = this.backendProductDto.findIndex((el) => el.productNo == this.selectedProductForDelete.productNo);
    // console.log('Index', index);
    // console.log('Before delete', this.backendProductDto.length);
    this.backendProductDto.splice(index, 1);
    // TODO need to fix this, why new prodcut is not loading after delete.
    // console.log("After deletion", this.backendProductDto.length)
    this.productViewList = this.backendProductDto.slice();
    // this.getProductDetails();
  }

  setProductForHistory(product: Product) {
    this.selectedProductForHistory = product;

    // I need to do this becuase after, after setting product, its opens the model and if i dont call this method user wont see anything on popup.
    this.getProductHistory();
  }

  getProductHistory(): void {
    //TODO NEED TO write service call to get the product history!!

    this.productService.getProductHistory(this.selectedProductForHistory.productNo, this.productHistoryDropDown)
      .subscribe((productHistory: TransactionLineItemDaoList[]) => {
        productHistory.forEach((history => {
          history.time = moment(history.date).format('hh:mm A');
          history.date = moment(history.date).format('MM/DD/YYYY');
        }))

        this.productHistoryDto = productHistory;

      });
    console.log("Product data from UI for History", this.selectedProductForHistory);
    console.log(this.productHistoryDto)
  }

  updateRetailPrice(event) {

    this.updateProductObject = event.data;
    this.productService.updateProductRetailPrice(this.updateProductObject);

    console.log(event);

  }

  // This method helps to set the perticualr product inventory details to show on popup when user click on the cost price.
  setProductInventoryForSelectedProduct(productInventoryList1: ProductInventory[]) {

    console.log('inventory', productInventoryList1);
    productInventoryList1.forEach((inventory) => {
      inventory.time = moment(inventory.createdTimestamp).format('hh:mm A');
      inventory.date = moment(inventory.createdTimestamp).format('MM/DD/YYYY');
    })
    this.productInventoryList = productInventoryList1;
  }

  updateProductInventory(event) {

    let product: BackendProductDto = event.data;
    console.log('Updating product inventory', product);

    console.log('event on inventoty', event.date);
    let productInventory: ProductInventory[] = []; 
    
    productInventory.push(event.data);

    console.log('product invetrory object', productInventory);

    this.productService.updateProductInventory(productInventory)
    .subscribe(data => {

      if(data){
        this.toastr.success('Inventory Updated Successfully !!', 'Success!');
      }
    },
    error => {
      this.toastr.error('Opps Something goes wrong !!', 'Error!!');
      console.log(JSON.stringify(error.json()));
    });
    
    let index = this.productViewList.findIndex((el) => el.productNo == product.productNo);

    this.productViewList[index] = {
      ...this.productViewList[index],
      ...product
    };

    this.productViewList = this.productViewList.slice();

    this.hideProductModal();

  }

  hideProductModal() {
    console.log('Hiding modal');
    $('#productInventory').modal('hide');
  }

}
