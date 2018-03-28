import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from 'app/customer/customer.component';
import { TransactionDtoList } from '../../sell/sale/sale.component';

@Component({
  selector: 'app-customer-payment-history',
  templateUrl: './customer-payment-history.component.html',
  styleUrls: ['./customer-payment-history.component.scss']
})
export class CustomerPaymentHistoryComponent implements OnInit {
  customerDto: Customer[];
  _subscription: any;

  customerTransactionDetails: TransactionDtoList[] = [];
  constructor(private customerService: CustomerService) {
    this.getCustomerDetails();

   }

  ngOnInit() {
    this.getCustomerDetails();
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
  onRowSelect(event){
    
    console.log('event', event.data);
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscription.unsubscribe(); 
   }


}
