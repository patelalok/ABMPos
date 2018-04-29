import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from 'app/customer/customer.component';
import { TransactionDtoList } from '../../sell/sale/sale.component';
import * as moment from 'moment';
import { DateDto, DateService } from 'app/shared/services/date.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
  rowSelected:number = -1;
  customerFinancialDto = new CustomerFinancialDto();
  dateDto =  new DateDto();
  customerDetailsBy: string = 'Year';
  customerForm: FormGroup;
  


  customerTransactionDetails: TransactionDtoList[] = [];
  constructor(private customerService: CustomerService,private dateServie: DateService, private formBuilder: FormBuilder) {
    this.getCustomerDetails();

   }

  ngOnInit() {
    this.getCustomerDetails();
    this.getCustomerDetailBy(this.customerDetailsBy);

    this.cols = [
      { field: 'transactionComId', header: 'Receipt No' },
      { field: 'onlyDate', header: 'Date' },
      { field: 'time', header: 'Time' },
      { field: 'totalAmount', header: 'Total Amount' }
  ];

  this.customerForm = this.formBuilder.group(
    {
      'name': [null, Validators.required],
      'phoneNo': ['', [Validators.required, Validators.pattern('^[0-9]+$')]], //TODO - Need to fix this for phono no.
      // 'phoneNo': [''],
      'username': [null],
      'email': [null], // TODO - Need to fox this too .com is not validating
      'taxId': [''],
      'street': [null],
      'zipCode': [''],
      'role': [null],
      // 'gender': [''],
      'city': [''],
      'state': [''],
      'type': [''],
      'companyName': [''],
      'customerNote':['']
    }
  );
  }

  getCustomerDetails() {
   // this.loadingServie.loading = true;
    this.customerService.getCustomerDetails();
    this._subscription = this.customerService.customerListChange
    .subscribe((cust)=>{
      this.customerDto = cust;
      this.customerDto = this.customerDto.slice();
      this.selectedCustomer = this.customerDto[0];
      //this.loadingServie.loading = false;
    })
  }

  getCustomerDetailBy(customerDetailsBy: string){

    this.customerDetailsBy = customerDetailsBy;

    if(customerDetailsBy == 'Today'){
      this.dateDto = this.dateServie.getCurrentDay();
      this.getCustomerTransactionDetails();
    }
    else if(customerDetailsBy == 'Week'){
      this.dateDto = this.dateServie.getLast7Day();
      this.getCustomerTransactionDetails();

    }
    else if(customerDetailsBy == 'Month'){
      this.dateDto = this.dateServie.getCurrentMonth();
      this.getCustomerTransactionDetails();

    }
    else if(customerDetailsBy == 'Year'){
      this.dateDto = this.dateServie.getCurrentYear();
      this.getCustomerTransactionDetails();
    }
  }

  getCustomerTransactionDetails() {
    if(this.selectedCustomer)
    {
    this.customerService.getCustomerTransactionDetails(this.dateDto.startDate, this.dateDto.endDate, this.selectedCustomer.phoneNo)
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

 
    this.customerService.getCustomerFinancialDetails(this.dateDto.startDate, this.dateDto.endDate,this.selectedCustomer.phoneNo)
    .subscribe((financialDetails)=>{
      this.customerFinancialDto = financialDetails;
    });
  }
}

  public openCloseRow(idReserva: number): void {

    if (this.rowSelected === -1) {
      this.rowSelected = idReserva
    }
    else {
      if (this.rowSelected == idReserva) {
        this.rowSelected = -1
      }
      else {
        this.rowSelected = idReserva
      }
    }
  }

  onRowSelectFromCustomer(event){

    this.selectedCustomer = event.data;
    this.getCustomerDetailBy(this.customerDetailsBy);
    //this.getCustomerTransactionDetails();
    console.log('event', event.data);
  }

  onRowSelect(event){
  }
  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscription.unsubscribe(); 
   }
}
export class CustomerFinancialDto {
  dueBalance: number;
  storeCredit: number;
  totalSpending: number;
  totalReturn: number;
  pendingInvoiceCount: number;

}
