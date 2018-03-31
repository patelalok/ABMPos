import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from 'app/customer/customer.component';
import { TransactionDtoList } from '../../sell/sale/sale.component';
import * as moment from 'moment';


@Component({
  selector: 'app-customer-payment-history',
  templateUrl: './customer-payment-history.component.html',
  styleUrls: ['./customer-payment-history.component.scss']
})
export class CustomerPaymentHistoryComponent implements OnInit {
  customerDto: Customer[];
  transactionList: TransactionDtoList[]= [];
  selectedCustomer: Customer;
  _subscription: any;
  cols: any[];



  customerTransactionDetails: TransactionDtoList[] = [];
  constructor(private customerService: CustomerService) {
    this.getCustomerDetails();

   }

  ngOnInit() {
    this.getCustomerDetails();


    this.cols = [
      { field: 'transactionComId', header: 'Vin' },
      { field: 'onlyDate', header: 'Year' },
      { field: 'time', header: 'Brand' },
      { field: 'totalAmount', header: 'Color' }
  ];
  }

  getCustomerDetails() {
   // this.loadingServie.loading = true;
    this.customerService.getCustomerDetails();
    this._subscription = this.customerService.customerListChange
    .subscribe((cust)=>{
      this.customerDto = cust;
      this.customerDto = this.customerDto.slice();
      //this.loadingServie.loading = false;
    })
  }

  getCustomerTransactionDetails(){

    this.customerService.getCustomerTransactionDetails('2018-01-01 00:00:00', '2018-12-31 23:59:59', this.selectedCustomer.phoneNo)
    .subscribe((transaction)=>{

      transaction.forEach(trans => {
        // This helps to manage date for park sale and other edit sale logic.
        trans.originalDate = trans.date;
        trans.time = moment(trans.originalDate).format('hh:mm A');
        trans.onlyDate = moment(trans.originalDate).format('MM-DD-YYYY');
      })

      this.transactionList = transaction;
      this.transactionList = this.transactionList.slice();
     
    })
  }

  onRowSelectFromCustomer(event){

    this.selectedCustomer = event.data;
    this.getCustomerTransactionDetails()
    console.log('event', event.data);
  }

  onRowSelect(event){


  }
  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscription.unsubscribe(); 
   }


}
