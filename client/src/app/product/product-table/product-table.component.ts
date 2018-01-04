import { Component, OnInit } from '@angular/core';
import { ProductService } from "app/product/product.service";
import { Product, TransactionLineItemDaoList } from 'app/sell/sell.component';
// import { FormBuilder } from "@angular/forms/forms";
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/primeng';
import { BackendProductDto, Category, Brand, Model, Vendor, ProductCommon, ProductInventory } from "app/product/product.component";
import * as moment from 'moment';
import { ViewChild } from '@angular/core/src/metadata/di';
import { Element } from '@angular/compiler';
import { ElementRef } from '@angular/core/src/linker/element_ref';
declare var $: JQueryStatic
; 

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.sass']
})
export class ProductTableComponent implements OnInit {
  form: FormGroup;
  productFilterBox: any;
  backendProductDto: BackendProductDto[];
  productViewList: BackendProductDto[];
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
  constructor(private productService: ProductService) { }

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

    // Here passing All and ) because i have backend logic with these parameter like for all product = "All" and for Brand pass "Brand" and "brandId" for which you need data...
    this.productService.getProductDetails('All', 0)
      .subscribe((pro: BackendProductDto[]) => {
        this.backendProductDto = pro;
        // console.log('ProductList' + this.backendProductDto);
        this.productViewList = this.backendProductDto;
      });

  }


  filterProducts(input: string) {
    if (input.length > 0)
      this.productViewList = this.nowFilterProduct(input, this.productViewList)
    else{
      this.getProductDetails();
      if(this.dropdownOptionValue)
        this.fiterProductByDropdown(this.dropdownOptionValue);

    }
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
    if(obj)
      this.dropdownOptionValue = obj;
    console.log(obj);
    if (obj == -1) {
      this.productViewList = this.backendProductDto;
      return;
    }
    if (this.selectedProductDropdownOption === 'Brand') {
      this.productViewList = this.backendProductDto.filter((el) => el.brandId == obj)
    }
    else if (this.selectedProductDropdownOption === 'Category') {
      this.productViewList = this.backendProductDto.filter((cat) => cat.categoryId == obj)
    }
    else if (this.selectedProductDropdownOption === 'Vendor') {
      this.productViewList = this.backendProductDto.filter((ven) => ven.vendorId == obj)
    }
    else if (this.selectedProductDropdownOption === 'Model') {
      this.productViewList = this.backendProductDto.filter((mod) => mod.modelId == obj)
    }


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
      this.productViewList = this.backendProductDto;
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
    let  product:BackendProductDto = event.data; 
    console.log('Updating product inventory', product);
    this.productService.updateProductInventory(event.data);

    let index = this.productViewList.findIndex((el) => el.productNo == product.productNo); 

    this.productViewList[index] = {
      ...this.productViewList[index],
      ...product
    } ; 

    this.productViewList = this.productViewList.slice();

  }

  hideProductModal(){
    console.log('Hiding modal');
    $('#productInventory').modal('hide');
  }

}
