import { Component, OnInit } from '@angular/core';
import { TransactionLineItemDaoList } from 'app/sell/sell.component';
import { SellService } from 'app/sell/sell.service';
import { Customer } from 'app/customer/customer.component';

@Component({
  selector: 'app-sell-customer',
  templateUrl: './sell-customer.component.html',
  styleUrls: ['./sell-customer.component.scss']
})
export class SellCustomerComponent implements OnInit {
  
  transactionLineItemDaoList: TransactionLineItemDaoList[];
  selectedCustomer: Customer;
  
  constructor(private sellService: SellService) {
   }

  ngOnInit() {
    this.sellService.getCurrentSaleTransactions()
      .subscribe((list) => {
          this.transactionLineItemDaoList = list; 
      }); 

    this.sellService.getCurrentSaleCustomer()
      .subscribe((customer) => this.selectedCustomer = customer)
  }

}