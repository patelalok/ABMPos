import { Injectable } from '@angular/core';

@Injectable()
export class PersistenceService {
  private products: any;
  private storeDetails: any;
  private customerDetails: any;
  private productInventory: any;
  private customerProductPrice: any;
  constructor() { }

  print(obj){
    console.log(obj);
  }
  setProducts(obj: any): void{
    this.products = obj;
    localStorage.setItem('product', JSON.stringify(obj));
  }
  getProducts(): any{
    this.products = JSON.parse(localStorage.getItem('product'));
    return this.products
  }
  clearProducts(): void{
    localStorage.removeItem('product');
  }

  setStoreDetails(obj: any): void {
    this.storeDetails = obj;
    localStorage.setItem('storeDetails', JSON.stringify(obj));
  }

  getStoreDetails(): any{
    let storeDetails = localStorage.getItem('storeDetails') || null; 
    if(storeDetails && !storeDetails.includes('undefined')){
      this.storeDetails = JSON.parse(storeDetails);
      return this.storeDetails;
    }
  return null;
  }

  setCustomerDetailsForSale(obj: any): void {
    this.customerDetails = obj;
    localStorage.setItem('customerDetails', JSON.stringify(obj));
  }

  getCustomerDetailsForSale(): any {
    this.customerDetails = JSON.parse(localStorage.getItem('customerDetails'));
    return this.customerDetails;
  }
  
  clearCustomer(): void {
    localStorage.removeItem('customerDetails');
  }

  setProductInventoryForAdd(obj: any) {
    localStorage.setItem('productInventoryDetails', JSON.stringify(obj));
 }

  getProductInventoryForAdd(): any {
    this.productInventory = JSON.parse(localStorage.getItem('productInventoryDetails'));
    return this.productInventory;
  }

  clearProductInventory() {
    localStorage.removeItem('productInventoryDetails');
  }

  setCustomerProductPriceForSale(obj: any){
    localStorage.setItem('customerProductPrice', JSON.stringify(obj));
  }

  getCustomerProductPriceForSale(): any{
    this.customerProductPrice = JSON.parse(localStorage.getItem('customerProductPrice'));
    return this.clearProductInventory;
  }

  clearCustomerPriceForSale(){
    localStorage.removeItem('customerProductPrice');
  }
  setShippingAmount(obj: number){
    localStorage.setItem('shippingAmount', JSON.stringify(obj));
  }
  getShippingAmount(): number{
    let shippingAmount = JSON.parse(localStorage.getItem('shippingAmount'));
    return shippingAmount;
  }
  clearShippingAmount(){
    localStorage.removeItem('shippingAmount');
  }



}
