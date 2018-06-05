import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Category, Brand, Vendor, Model, ProductVariantDetail,ProductInventory, SubCategory } from 'app/product/product.component';
import { environment } from 'environments/environment';
import { Observer, ReplaySubject, Subject } from 'rxjs';
import { Product, TransactionLineItemDaoList, ProductVariant, VariantInventoryDto } from 'app/sell/sale/sale.component';
import { ToastsManager } from 'ng2-toastr';
import { Phone } from './phone/phone.component';


@Injectable()
export class ProductService {
  private url: string; 
  private productList: Product[];
  private productVariantList: ProductVariant[];
  productListChange: Subject<Product[]> = new Subject<Product[]>();
  productVariantListChange: Subject<ProductVariant[]> = new Subject<ProductVariant[]>();

  // private dataObs$ = new ReplaySubject(1);

  constructor(private http: Http, private toastr: ToastsManager) {
    this.url = environment.reportUrl; 
    this.getProductDetails();
    this.getAllProductVariant();
   }

   addProduct(product: Product) {
    this.http.post(this.url+'/addProduct', product)
    .subscribe(data => {
      if(data.status == 200 || data.status == 201){
        this.toastr.success('Product Added Successfully!!', 'Success!');

        if(product.operationType == 'Edit'){
          let index = this.productList.findIndex((el) => el.productId == product.productId);
          console.log('edit index', index);
          console.log('edit product', product);
          this.productList[index] = product;
          this.productList = this.productList.slice();

        }
        else {
          this.productList.push(product);
        }
  
          this.productList = this.productList.slice();
          this.productListChange.next(this.productList);
        }
    },
      error => {
        this.toastr.error('Opps something goes wrong!!', 'Error!');
        console.log(JSON.stringify(error.json()));
  });
  }

  addProductVariant(productVariant: ProductVariant) : Observable<ProductVariant>{
    return this.http.post(this.url+'/addProductVariant', productVariant)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getProductDetails()  {

    // if(this.productList && this.productList.length <= 0){
      this.getProductDetailsFromBackEnd()
      .subscribe((product)=>{
        this.productList = product;
        this.productListChange.next(this.productList);
        return this.productList;
      })
    // }
    // else {
    //   console.log('Product List alredy exists', this.productList)
    //   this.productListChange.next(this.productList);
    //   return this.productList;
    // }
  }

  getProductDetailsFromBackEnd(): Observable<Product[]>{
    return this.http.get(this.url+'/getProductForProductTable')
    .map(this.extractData)
    .catch(this.handleError);
  }

  getAllProductVariant(){
    this.getAllProductVariantFromBackEnd()
    .subscribe((variant)=>{
      this.productVariantList = variant;
      this.productVariantListChange.next(this.productVariantList);
      return this.productVariantList;
    })
  }
  getAllProductVariantFromBackEnd(): Observable<ProductVariant[]>{
    return this.http.get(this.url+'/getAllProductVariant')
    .map(this.extractData)
    .catch(this.handleError);
  }

  getProductVariantById(productId:number): Observable<ProductVariant[]>{
    return this.http.get(this.url+'/getProductVariantById?productId='+productId)
    .map(this.extractData)
    .catch(this.handleError);
  }

  addIMEIForPhone(phone: Phone){
    return this.http.post(this.url+'/imei', phone);
  }

  getIMEIDetailByPhone(productNo: string): Observable<Phone[]> {
    return this.http.get(this.url+'/imei?productNo='+productNo)
    .map(this.extractData)
    .catch(this.handleError); 
   }

   deleteImeiForPhone(imei: Phone){
     return this.http.delete(this.url+'/imei?imei='+imei);
     
   }
   
  getPhoneDetailsFromBackEnd(): Observable<Product[]>{
    return this.http.get(this.url+'/phone')
    .map(this.extractData)
    .catch(this.handleError);
  }

  getProductInventoryByProduct(productId: number, productNo: string) : Observable<ProductInventory[]>{
   return this.http.get(this.url+'/getProductInventory?productId='+productId+'&productNo='+productNo)
   .map(this.extractData)
   .catch(this.handleError);
  }

  getCategoryDetails(): Observable<Category[]> {
    return this.http.get(this.url+'/getCategory')
      .map(this.extractData)
      .catch(this.handleError);
  }
  getSubCategoryDetailsByCategoryId(categoryId:number): Observable<SubCategory[]>{
    return this.http.get(this.url+'/getSubCategoryByCategoryId?categoryId='+categoryId)
  .map(this.extractData)
  .catch(this.handleError);
  }
  getProductDetailsById(productId: string): Observable<Product> {
    let url = this.url+`/getProductById?productId=${productId}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBrandDetails(): Observable<Brand[]> {
    return this.http.get(this.url+'/getBrand')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getVendorDetails(): Observable<Vendor[]> {
    return this.http.get(this.url+'/getVendor')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getModelDetails(): Observable<Model[]> {
    return this.http.get(this.url+'/getModel')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getProductVariantDetails(): Observable<ProductVariantDetail[]> {
    return this.http.get(this.url+'/getProductVariantDetails')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllProductVariantDetails(): Observable<ProductVariantDetail[]> {
    return this.http.get(this.url+'/getAllProductVariantDetails')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAutoGeneratedBarcode(): Observable<string> {
    return this.http.get(this.url+'/getAutoGeneratedProductNo')
      .map(res => res.text())
      .catch(this.handleError);
  }

  getProductHistory(productNo: string, startDate: string, endDate: string): Observable<TransactionLineItemDaoList[]> {
    return this.http.get(this.url+'/getProductHistory?productNo='+productNo+'&startDate='+startDate+'&endDate='+endDate)
      .map(this.extractData)
      .catch(this.handleError);
  }


        // TODO:  This is redudant, but need to do it cause i have two obejct for backend dto and product, i need to fix this.
        // editProduct(product: Product) {
        //   console.log("Product Added", product.description);
        //   return this.http.post(this.url+'/addProduct', product);
            
        //     // .map((updatedProduct: any) => {
        //     //   let index = this.fullProductList.findIndex((product) => {
        //     //     return product.productNo === (<Product>updatedProduct).productNo; 
        //     //   })
        //     //   if(index)
        //     //     this.fullProductList[index] = updatedProduct; 
              
        //     //   this.fullProductList = this.fullProductList.slice(); 
      
        //     //   return this.fullProductList; 
        //     // })
        // }

  addProductInventory(productInventory: ProductInventory) {
    console.log("Product Added", productInventory);
    return this.http.post(this.url+'/addProductInventory', productInventory);
  }

  addProductVariantDetails(productVariantDetailDao: ProductVariantDetail){
    return this.http.post(this.url+'/addProductVariantDetails',productVariantDetailDao);
  }

  updateProductRetailPrice(product: Product) {
    // Need to do this because of backend logic.
    product.operationType = 'Edit';
    return this.http.post(this.url+'/addProduct', product);
  }
  updateRetailTierPrice(productVariant: ProductVariant) {
    // Need to do this because of backend logic.
    productVariant.operationType = 'retailTierEdit';
    return this.http.post(this.url+'/addProductVariant', productVariant);
  }

  updateProductInventory(productInventory: ProductInventory) {
    return this.http.post(this.url+'/addProductInventory', productInventory);
  }

  deleteProduct(deletedProduct: Product) {
    return this.http.put(this.url+'/deleteProduct', deletedProduct);
  }

  deleteProductInventory(deletedInvetory: ProductInventory) {
    this.http.post(this.url+'/deleteProductInventory', deletedInvetory)
      .subscribe(data => {
        alert('deleted');
        console.log(data);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  private extractData(res: Response): Product[] {
    let body = res.json();
    // console.log(body);
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}