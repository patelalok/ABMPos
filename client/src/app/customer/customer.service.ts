import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Category, Brand, Vendor, Model, ProductVariantDetail, CategoryTest, BackendProductDto } from 'app/product/product.component';
import { CustomerInterface, StoreCreditDto, Customer } from 'app/customer/customer.component';
import { environment } from 'environments/environment';
import { Product } from 'app/sell/sale/sale.component';


@Injectable()
export class CustomerService {
private url: string; 
constructor(private http: Http) { 
  this.url = environment.reportUrl; 
}

    getCustomerDetails(): Observable<CustomerInterface[]> {
      return this.http.get(this.url+'/getCustomer')
      .map(this.extractData)
      .catch(this.handleError);
    }

    getCustomerDetailsByPhoneNo(phoneNo: any): Observable<Customer> {
      return this.http.get(this.url+'/getCustomerByPhoneNo?phoneNo='+phoneNo)
      .map(this.extractData)
      .catch(this.handleError);
    }

    getCustomerStoreCreditHistory(phoneNo: any): Observable<StoreCreditDto[]> {
      return this.http.get(this.url+'/getCustomerStoreCreditHistory?phoneNo='+phoneNo)
      .map(this.extractData)
      .catch(this.handleError);
    }

    addOrUpdateCustomer(customer: CustomerInterface)
    {
      return this.http.post(this.url+'/addCustomer', customer);
    }

    addStoreCredit(storeCredit: StoreCreditDto) {
      this.http.post(this.url+'/addCustomerStoreCredit', storeCredit)
      .subscribe(data => {
        console.log("Response From Add Customer Store Credit Call" + data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

    deleteCustomer(phoneNo: string)
    {
      return this.http.delete(this.url+'/deleteCustomer?phoneNo=' + phoneNo);
    }

    sendMarketingSms(customerDaoList: Customer[], messageBody: string){
      return this.http.post(this.url+'/sendPromotionBySms?messageBody='+messageBody, customerDaoList, messageBody);
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