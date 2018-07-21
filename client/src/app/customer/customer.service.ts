import {Injectable } from '@angular/core';
import {Http, Response, Headers, ResponseContentType} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Category, Brand, Vendor, ProductVariantDetail } from 'app/product/product.component';
import { StoreCreditDto, Customer } from 'app/customer/customer.component';
import { environment } from 'environments/environment';
import { Product, TransactionDtoList } from 'app/sell/sale/sale.component';
import { Subject } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';
import { CustomerFinancialDto } from './customer-payment-history/customer-payment-history.component';
import { printBlob } from 'app/shared/services/util.service';


@Injectable()
export class CustomerService {
private url: string; 
customerList: Customer[] = [];
customerListChange: Subject<Customer[]> = new Subject<Customer[]>();
 

constructor(private http: Http, private toastr: ToastsManager) { 
  this.url = environment.reportUrl;
  this.getCustomerDetails();
}

getCustomerDetails(): Customer[]
{
  if(this.customerList && this.customerList.length <= 0){
    this.getCustomerDetailsFromBackEnd()
    .subscribe((cust)=>{
      this.customerList = cust;
      this.customerListChange.next(this.customerList);
      return this.customerList;
    })
  }
  else {
    console.log('Customer List alredy exists', this.customerList)
    this.customerListChange.next(this.customerList);
    return this.customerList;
  }
}

    getCustomerDetailsFromBackEnd(): Observable<Customer[]> {
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

    getCustomerTransactionDetails(startDate: string, endDate:string,phoneNo:string) : Observable<TransactionDtoList[]>
    {
      return this.http.get(this.url+'/getAllInvoiceByCustomer?startDate='+startDate+'&endDate='+endDate+'&phoneNo='+phoneNo)
      .map(this.extractData)
      .catch(this.handleError);
    }
    getCustomerFinancialDetails(startDate: string, endDate:string,phoneNo:string) : Observable<CustomerFinancialDto> {

      return this.http.get(this.url+'/getCustomerFinancialDetails?startDate='+startDate+'&endDate='+endDate+'&phoneNo='+phoneNo)
      .map(this.extractData)
      .catch(this.handleError);
    }

    printPaymentStatement(startDate:string, endDate:string, phoneNo:string){
      this.http.get(this.url+'/printCustomerStatement?startDate='+startDate+'&endDate='+endDate+'&phoneNo='+phoneNo , {responseType: ResponseContentType.Blob})
      .subscribe((data: any) => {
        printBlob(data._body)
      })
    }

    emailCustomerStatement(startDate:string, endDate:string, phoneNo:string) {
      return this.http.get(this.url+'/emailCustomerStatement?startDate='+startDate+'&endDate='+endDate+'&phoneNo='+phoneNo);
    }

    addOrUpdateCustomer(customer: Customer, add: boolean)
    {
      this.http.post(this.url+'/addCustomer', customer)
      .subscribe(data => {
        if(data.status == 200 || data.status == 201){

          if(add){
            this.customerList.push(customer);
            this.toastr.success('Customer Added Successfully!!', 'Success!');

          }
          else {
            let index = this.customerList.findIndex((el) => el.phoneNo == customer.phoneNo);
            this.customerList[index] = customer;
            this.toastr.success('Customer Updated Successfully!!', 'Success!');

          }
          this.customerList = this.customerList.slice();
          this.customerListChange.next(this.customerList);
        }
      },
        error => {
          this.toastr.error('Opps something goes wrong!!', 'Error!');
          console.log(JSON.stringify(error.json()));
    });
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

    deleteCustomer(customerForDelete: Customer)
    {
      this.http.delete(this.url+'/deleteCustomer?phoneNo=' + customerForDelete.phoneNo)
       .subscribe(data => {
         if(data.status == 200){
           let index = this.customerList.indexOf(customerForDelete, 0);
           this.customerList = this.customerList.splice(0,index).concat(this.customerList.slice(index));
           this.customerListChange.next(this.customerList);
           this.toastr.success('Customer Deleted Successfully!!', 'Success!');

           console.log('customer index', index)
         }
         else if(data.status == 409){
          this.toastr.error('Can not Deleted Customer,Because this customer has transactin history!!', 'Error!');
         }
        console.log('Customer Deleted With this !!' + customerForDelete);
      },
        error => {
          this.toastr.error('Opps something goes wrong!!', 'Error!');

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