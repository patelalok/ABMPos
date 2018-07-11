import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PaymentDto } from 'app/sell/sell.component';
import { FormControl } from '@angular/forms/forms';
import { Observer } from 'rxjs';
import { PersistenceService } from 'app/shared/services/persistence.service';
import { Customer } from 'app/customer/customer.component';
import { printBlob } from 'app/shared/services/util.service';
import { environment } from 'environments/environment';
import { CloseRegisterDto } from 'app/sell/close-register/close-register.component';
import { Product, TransactionLineItemDaoList, CustomerProductPrice, TransactionDtoList, PaymentDao, PaymentHistoryDto } from 'app/sell/sale/sale.component';
import * as moment from 'moment';





@Injectable()
export class SellService {
private url: string;
paymentDetialsToVoid: PaymentHistoryDto;

  constructor(private http: Http, private persit: PersistenceService) { 
    this.url = environment.reportUrl;
  }

  // getProductDetails(): Observable<Product[]> {
  //   return this.http.get(this.url+'/getProduct')
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  getTransactionDetails(startDate: any, endDate: any): Observable<TransactionDtoList[]> {
    return this.http.get(this.url+'/getTransactionByDate?startDate=' + startDate+'&endDate='+endDate)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getPaymentHistoryDetails(startDate: any, endDate: any): Observable<PaymentHistoryDto[]> {
    return this.http.get(this.url+'/getPaymentHistory?startDate=' + startDate+'&endDate='+endDate)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPendingInvoiceByCustomer(phoneNo: string) : Observable<TransactionDtoList[]> {

    return this.http.get(this.url+'/getPendingInvoiceByCustomer?phoneNo='+phoneNo)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getTransactionById(transactionId: any) :Observable<TransactionDtoList> {
    return this.http.get(this.url+'/getTransactionById?transactionCompId=' + transactionId)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getTransactionLineItemDetailsByTransactionId(tranactionId: number): Observable<TransactionLineItemDaoList[]> {
    return this.http.get(this.url+'/getTransactionLineItemById?transactionCompId=' + 1)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCurrentSaleTransactions(){
    let details$: Observable<TransactionLineItemDaoList[]>; 

    details$ = Observable.create((observer: Observer<TransactionLineItemDaoList[]>) => {
      setInterval(() => {
        let details: TransactionLineItemDaoList[] = this.persit.getProducts() || [];

        observer.next(details); 
      }, 300);
    }); 
    return details$; 
  }

  
  getCurrentSaleCustomer(){
    let details$: Observable<Customer>; 

    details$ = Observable.create((observer: Observer<any>) => {
      setInterval(() => {
        let details: Customer = this.persit.getCustomerDetailsForSale() || [];

        observer.next(details); 
      }, 300);
    }); 
    return details$; 
  }

  addTransactionDetails(transactionDto: TransactionDtoList) {
    console.log("Transaction Amount" + transactionDto.totalAmount);
    return this.http.post(this.url+'/addTransaction', transactionDto);

  }

  addTransactionLineItemDetails(transactionLineItemDtoList: TransactionLineItemDaoList[]) {
    console.log("Transaction Amount" + transactionLineItemDtoList);
    this.http.post(this.url+'/addTransactionLineItem', transactionLineItemDtoList)
      .subscribe(data => {
        alert('ok');
        console.log(data);
      },
      error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  addPaymentDetails(paymentDaoList: PaymentDao[]){
    this.http.post(this.url+'/addPayment',paymentDaoList,{responseType: ResponseContentType.Blob})
    .subscribe((data: any) => {
      printBlob(data._body)
    })
  }

  voidTransaction(transactionToVoid: TransactionDtoList) {
    return this.http.post(this.url+'/voidTransaction', transactionToVoid);
  }
  deleteParkedTransaction(transactionComId: number){
    return this.http.delete(this.url+'/deleteParkedTransaction?transactionCompId='+transactionComId);
  }

  setPaymentToVoid(paymentDetails: PaymentHistoryDto) {

    // Since i change the logic to, show only transaction deatils on sales history, now i need to get complete transaction details,
    // And set to the transactionTovoid object.

    // Here I am changing the logic, to fixed network delay issue, cause with this some times, i am geting transaction detals before, i am trying ot delete the transaction
    this.paymentDetialsToVoid = paymentDetails;
    this.paymentDetialsToVoid.paymentDao.updatedTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  }
  voidPayment()
  {
    this.http.post(this.url+'/voidPayment', this.paymentDetialsToVoid)
    .subscribe(data => {
      alert('ok');
      console.log(data);
    },
    error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  printReceipt(transaction: TransactionDtoList) {
       // this.document.
       this.http.get(this.url+`/getA4Receipt?receiptNo=${transaction.transactionComId}` , {responseType: ResponseContentType.Blob})
       .subscribe((data: any) => {
         printBlob(data._body)
       })
  }

  sendEmail(transactionCompId: number) {
    return this.http.get(this.url+'/sendEmail?transactionCompId='+transactionCompId);
  }


  // This is specific to close register
  getCloseRegisterDetails(startDate: any, endDate: any): Observable<CloseRegisterDto> {
    return this.http.get(this.url+'/getCloseRegisterDetailsByDate?startDate='+startDate+'&endDate='+endDate)
    .map(this.extractData)
    .catch(this.handleError);
  }

  saveCloseRegisterDetail(closeRegisterObj: CloseRegisterDto) {

    return this.http.post(this.url+'/addCloseRegisterDetails', closeRegisterObj);
  }

  printClosingDetails(startDate:string, endDate:string){

    this.http.get(this.url+'/printClosingDetails?startDate='+startDate+'&endDate='+endDate, {responseType: ResponseContentType.Blob})
    .subscribe((data: any) => {
      printBlob(data._body)
    })
  }

  getProductPriceByCustomer(phoneNo: string): Observable<any[]>{
    return this.http.get(this.url+'/getProductPriceByCustomer?phoneNo='+phoneNo)
    .map(this.extractData)
    .catch(this.handleError);
  }
  
  private extractData(res: Response): Product[] {
    let body = res.json();
    console.log(body);
    return body || {};
  }


  private extractDataLineItem(res: Response): TransactionLineItemDaoList[] {
    let body = res.json();
    console.log('lineItemBody', body);
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