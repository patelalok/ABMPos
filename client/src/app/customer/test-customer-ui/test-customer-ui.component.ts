import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

@Component({
  selector: 'app-test-customer-ui',
  templateUrl: './test-customer-ui.component.html',
  styleUrls: ['./test-customer-ui.component.scss']
})


export class TestCustomerUiComponent implements  OnInit{

  // customerDto: Customer[];
  // displayedColumns = ['id', 'name'];
  // dataSource: MyDataSource;
  transactionDto: TransactionDtoList;

  constructor(private sellService: SellService) {}

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

  this.sellService.getTransactionById(1000)
  .subscribe((tran)=>{
  this.transactionDto = tran;
  })
}

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
  

