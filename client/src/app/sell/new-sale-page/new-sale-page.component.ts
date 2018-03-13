import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Category } from 'app/product/product.component';
import { Product, TransactionLineItemDaoList } from '../sale/sale.component';

@Component({
  selector: 'app-new-sale-page',
  templateUrl: './new-sale-page.component.html',
  styleUrls: ['./new-sale-page.component.scss']
})
export class NewSalePageComponent implements OnInit {
  @Input() category: { categoryId: number, name: string, description: string };
  categoryDto: Category[] = [];
  productList: Product[] = [];
  productListByCategory: Product[] = [];
  transactionLineItemDaoList: TransactionLineItemDaoList[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.getCategoryDetails();
    this.getProduct();
  }

  getCategoryDetails(): void {
    this.productService.getCategoryDetails()
    .subscribe((categories: Category[]) => {
    this.categoryDto = categories;
    console.log('CategoryList' + this.categoryDto);
      });
  }

  getProduct(){
    this.productService.getProductDetails()
    .subscribe((product: Product[]) =>{
      this.productList = product;
    });
  }

  getProductByCategory(test: any){
    console.log("category event",test);
    this.productListByCategory = [];

    let no: number = this.categoryDto[test].categoryId;
    console.log("category event",no);

    this.productList.forEach((product)=>{
      if(product.categoryId == no){
        this.productListByCategory.push(product);
      }
    })
    this.productListByCategory = this.productListByCategory.slice();

    console.log('category prodcut', this.productListByCategory)
  }

  addProductForSale(productIndex: number){

    let productObj:Product = this.productListByCategory[productIndex];

    productObj.saleQuantity = 1;
    productObj.totalProductPrice = productObj.saleQuantity *productObj.retail;
    this.transactionLineItemDaoList.push(productObj);
    this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
  }

  updateLineItemDetails(event){
    console.log('event line item', event);
    this.transactionLineItemDaoList[event.index].saleQuantity = event.data.saleQuantity;
    //this.transactionLineItemDaoList[event.index].totalProductPrice = event.data.retail *event.data.saleQuantity;
    // this will convert numern into numer to show in 2 digits. cause i can not use .toFix here.
    this.transactionLineItemDaoList[event.index].totalProductPrice = Math.round((event.data.saleQuantity * event.data.retail) * 1e2) / 1e2;
  }

}
