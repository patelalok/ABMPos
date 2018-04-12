import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerService } from 'app/customer/customer.service';
import { SellService } from 'app/sell/sell.service';
import { FormBuilder } from '@angular/forms';
import { LoadingService } from 'app/loading.service';
import { Customer } from 'app/customer/customer.component';
import { DataSource } from '@angular/cdk/table';
import { Http } from '@angular/http';
import { Data } from '@angular/router';
import { TransactionDtoList } from '../../sell/sale/sale.component';
import * as moment from 'moment';
import * as jsPDF from 'jspdf'
import { printBlob, UtilService } from 'app/shared/services/util.service';





@Component({
  selector: 'app-test-customer-ui',
  templateUrl: './test-customer-ui.component.html',
  styleUrls: ['./test-customer-ui.component.scss'],
  providers: [
    { provide: 'Window',  useValue: window }
  ]
})


export class TestCustomerUiComponent implements  OnInit{
  
paymentDetails: Payment[] = [];
  // customerDto: Customer[];
  // displayedColumns = ['id', 'name'];
  // dataSource: MyDataSource;
  transactionDto: TransactionDtoList;

  constructor(private sellService: SellService, @Inject('Window') private window: Window, private utilService: UtilService) {

  }

  // public getData() {

  //     return this.http.get('http://localhost:8080/getCustomer')
  //     .map(response => response.json())
  //     .subscribe((cust)=>{
  //       this.customerDto = cust;
  //       this.dataSource = new MyDataSource(this.customerDto);
  //     });
  // }

  ngOnInit() {

    this.getTransactionDetail();
   
    //this.getData();
    // Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //   .debounceTime(150)
    //   .distinctUntilChanged()
    //   .subscribe(() => {
    //     if (!this.dataSource) { return; }
    //     this.dataSource.filter = this.filter.nativeElement.value;
    //   });

}

getTransactionDetail(){

  this.sellService.getTransactionById(1729)
  .subscribe((trans)=>{
    trans.time = moment(trans.originalDate).format('hh:mm A');
    trans.onlyDate = moment(trans.originalDate).format('MM-DD-YYYY');

    trans.paymentDao.forEach((payment)=>{

      let paymentObject = new Payment();

      if(payment.cash > 0){
        paymentObject.paymentAmount = payment.cash;
        paymentObject.paymentType = 'CASH';
        paymentObject.pymentDate = moment(payment.date).format('MM-DD-YYYY');
        paymentObject.paymentTime =  moment(payment.date).format('hh:mm A');

        this.paymentDetails.push(paymentObject);
      }

      else if(payment.credit > 0){

        paymentObject.paymentAmount = payment.credit;
        paymentObject.paymentType = 'CREDIT';
        paymentObject.pymentDate = moment(payment.date).format('MM-DD-YYYY');
        paymentObject.paymentTime =  moment(payment.date).format('hh:mm A');

        this.paymentDetails.push(paymentObject);
      }
      else if(payment.checkAmount > 0){

        paymentObject.paymentAmount = payment.checkAmount;
        paymentObject.paymentType = 'CHECK';
        paymentObject.pymentDate = moment(payment.date).format('MM-DD-YYYY');
        paymentObject.paymentTime =  moment(payment.date).format('hh:mm A');

        this.paymentDetails.push(paymentObject);
      }
      else if(payment.debit > 0){

        paymentObject.paymentAmount = payment.debit;
        paymentObject.paymentType = 'DEBIT';
        paymentObject.pymentDate = moment(payment.date).format('MM-DD-YYYY');
        paymentObject.paymentTime =  moment(payment.date).format('hh:mm A');

        this.paymentDetails.push(paymentObject);
      }
      else if(payment.storeCredit > 0){

        paymentObject.paymentAmount = payment.storeCredit;
        paymentObject.paymentType = 'STORE CREDIT';
        paymentObject.pymentDate = moment(payment.date).format('MM-DD-YYYY');
        paymentObject.paymentTime =  moment(payment.date).format('hh:mm A');

        this.paymentDetails.push(paymentObject);
      }

    });
    this.transactionDto = trans;
  })

  


}

print(): void {

  const elementToPrint = document.getElementById('print-section'); //The html element to become a pdf

  const doc = new jsPDF('p', 'pt', 'a4');
  // working fine
  doc.addHTML(elementToPrint, () => {
    //pdf.save('web.pdf');
   // window.open(doc.output('bloburl'), '_blank');.
   doc.autoPrint();
   this.utilService.printBlobUrl(doc.output('bloburl'));
  //window.open(doc.output('bloburl'), '_blank');
}
);

  // var printContents = document.getElementById('print-section').innerHTML;
  // var originalContents = document.body.innerHTML;

  // document.body.innerHTML = printContents;
  // window.print();
  // document.body.innerHTML = originalContents;

  // let printContents, popupWin;
  // printContents = document.getElementById('print-section').innerHTML;
  // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  // popupWin.document.open();
  // popupWin.document.write(`
  //   <html>
  //     <head>
  //       <title>Print tab</title>
  //       <style>
  //       //........Customized style.......
  //       .subtotal-tr {
  //         font-size: 16px;
  //     }
      
  //     .invoice-box {
  //         max-width: 800px;
  //         margin: auto;
  //         padding: 30px;
  //         border: 1px solid #eee;
  //         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
  //         font-size: 14px;
  //         line-height: 20px;
  //         font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  //         color: #555;
  //     }
      
  //     .invoice-box table {
  //         width: 100%;
  //         line-height: inherit;
  //         text-align: left;
  //     }
      
  //     .invoice-box table td {
  //         padding: 5px;
  //         vertical-align: top;
  //     }
      
  //     .td-align-right {
  //         text-align: right;
  //     }
      
  //     .td-align-center {
  //         text-align: center;
  //     }
  //       </style>
  //     </head>
  // <body onload="window.print();window.close()">${printContents}</body>
  //   </html>`
  // );
  // popupWin.document.close();
}




}


export class Payment {
  paymentType: string;
  paymentAmount: number;
  pymentDate: any;
  paymentTime: any;
}
// export class MyDataSource extends DataSource < any > {

//   _filterChange = new BehaviorSubject('');
//   get filter(): string { return this._filterChange.value; }
//   set filter(filter: string) { this._filterChange.next(filter); }

//  constructor(private dataBase: Data[]) {
//    super();
//  }
//  /** Connect function called by the table to retrieve one stream containing the data to render. */
//  connect(): Observable < Data[] > {
//    const displayDataChanges = [
//       this._filterChange
//    ];

//   return Observable.merge(...displayDataChanges).map(() => {
//      return this.dataBase.slice().filter((item: Data) => {
//        let searchStr = (item.name).toLowerCase();
//        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
//      });
//    });
//  }

//  disconnect() {}
// }
  

