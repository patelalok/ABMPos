import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from 'app/sell/sell.component';
import { FormControl } from '@angular/forms/forms';
import { Category, Brand, Vendor, Model, ProductVariantDetail, CategoryTest, BackendProductDto } from 'app/product/product.component';
import { CustomerInterface, StoreCreditDto, Customer } from 'app/customer/customer.component';


@Injectable()
export class CustomerService {

constructor(private http: Http) { }

    getCustomerDetails(): Observable<CustomerInterface[]> {
      return this.http.get('http://localhost:8080/getCustomer')
      .map(this.extractData)
      .catch(this.handleError);
    }

    getCustomerDetailsByPhoneNo(phoneNo: any): Observable<Customer> {
      return this.http.get('http://localhost:8080/getCustomerByPhoneNo?phoneNo='+phoneNo)
      .map(this.extractData)
      .catch(this.handleError);
    }

    getCustomerStoreCreditHistory(phoneNo: any): Observable<StoreCreditDto[]> {
      return this.http.get('http://localhost:8080/getCustomerStoreCreditHistory?phoneNo='+phoneNo)
      .map(this.extractData)
      .catch(this.handleError);
    }

    addOrUpdateCustomer(customer: CustomerInterface)
    {
     console.log("Customer to be Added" + customer.name);
      this.http.post('http://localhost:8080/addCustomer', customer)
      .subscribe(data => {
        console.log("Response From Add Customer call" + data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

    addStoreCredit(storeCredit: StoreCreditDto) {
      this.http.post('http://localhost:8080/addCustomerStoreCredit', storeCredit)
      .subscribe(data => {
        console.log("Response From Add Customer Store Credit Call" + data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

    deleteCustomer(phoneNo: string)
    {
      this.http.delete('http://localhost:8080/deleteCustomer?phoneNo=' + phoneNo)
       .subscribe(data => {
        console.log('Customer Deleted With this !!' + phoneNo);
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