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
  customerTransactionDetails: TransactionDtoList[] = [];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    // this.customerService.getCustomerDetails()
    //   .subscribe((cust: Customer[]) => {
    //     this.customerDto = cust;
    //     console.log('Customer Detail', this.customerDto);
    //   });
  }
  onRowSelect(event){
    
    console.log('event', event);
  }

}
