import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product, TransactionLineItemDaoList } from 'app/sell/sell.component';
import { FormControl } from '@angular/forms/forms';
import { Category, Brand, Vendor, Model, ProductVariantDetail, CategoryTest, BackendProductDto, ProductInventory } from 'app/product/product.component';


@Injectable()
export class ProductService {

  testData: string;

  constructor(private http: Http) { }

  getProductDetails(getProductBy: string, searchValue: number): Observable<BackendProductDto[]> {
    return this.http.get('http://localhost:8080/getProductTest?getProductBy=' + getProductBy + '&searchValue=' + searchValue)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCategoryDetails(): Observable<Category[]> {
    return this.http.get('http://localhost:8080/getCategory')
      .map(this.extractData)
      .catch(this.handleError);
  }
  getProductDetailsById(productNo: string): Observable<BackendProductDto> {
    let url = `http://localhost:8080/getProductById?productNo=${productNo}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBrandDetails(): Observable<Brand[]> {
    return this.http.get('http://localhost:8080/getBrand')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getVendorDetails(): Observable<Vendor[]> {
    return this.http.get('http://localhost:8080/getVendor')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getModelDetails(): Observable<Model[]> {
    return this.http.get('http://localhost:8080/getModel')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getProductVariantDetails(): Observable<ProductVariantDetail[]> {
    return this.http.get('http://localhost:8080/getProductVariantDetails')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getProductVariantDetailsByName(name: string): Observable<ProductVariantDetail[]> {
    return this.http.get('http://localhost:8080/getProductVariantDetailsByName?variantName=' + name)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAutoGeneratedBarcode(): Observable<string> {
    return this.http.get('http://localhost:8080/getAutoGeneratedProductNo')
      .map(res => res.text())
      .catch(this.handleError);
  }

  getProductHistory(productNo: string, timeDuration: string): Observable<TransactionLineItemDaoList[]> {
    return this.http.get('http://localhost:8080/getProductHistory?productNo=' + productNo + '&timeDuration=' + timeDuration)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addProduct(product: Product) {
    console.log("Product Added", product.description);
    return this.http.post('http://localhost:8080/addProduct', product);
  }

  // TODO:  This is redudant, but need to do it cause i have two obejct for backend dto and product, i need to fix this.
  editProduct(product: BackendProductDto) {
    console.log("Product Added", product.description);
    this.http.post('http://localhost:8080/addProduct', product)
      .subscribe(data => {
        alert('ok');
        console.log(data);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  addProductInventory(productInventory: ProductInventory[]) {
    console.log("Product Added", productInventory);
    this.http.post('http://localhost:8080/addProductInventory', productInventory)
      .subscribe(data => {
        alert('ok');
        console.log(data);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  updateProductRetailPrice(product: Product) {

    this.http.post('http://localhost:8080/addProduct', product)
      .subscribe(data => {
        alert('ok');
        console.log(data);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  updateProductInventory(productInventory: ProductInventory) {
    this.http.post('http://localhost:8080/addProductInventory', productInventory)
      .subscribe(data => {
        alert('ok');
        console.log(data);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });
  }



  deleteProduct(deletedProduct: Product) {
    this.http.put('http://localhost:8080/deleteProduct', deletedProduct)
      .subscribe(data => {
        alert('deleted');
        console.log(data);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });

  }

  deleteProductInventory(deletedInvetory: ProductInventory) {
    this.http.post('http://localhost:8080/deleteProductInventory', deletedInvetory)
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