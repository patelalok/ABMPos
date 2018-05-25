import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/customer/customer.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Message } from 'primeng/primeng';
import * as moment from 'moment';
import { SellService } from '../sell/sell.service';
import { TransactionDtoList } from '../sell/sale/sale.component';
import { LoadingService } from 'app/loading.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customerDto: Customer[];
  _subscription: any;


  // Its redudanct Need to fix when you work in delete part..TODO
  selectedCustomerForDelete: Customer;
  selectedCustomerForStoreCredit: Customer;
  displayDialog = false;
  newCustomer: boolean;
  customer: Customer = new Customer();
  msgs: Message[] = [];
  showDeleteButton = true;
  storeCreditAmount: number;
  storeCreditReason: string;
  storeCreditDto: StoreCreditDto[] = [];
  addStoreCreditObject = new StoreCreditDto();
  transactionDetails: TransactionDtoList[] = [];
  isAdd: boolean;


  constructor(private customerService: CustomerService, private sellService: SellService ,private formBuilder: FormBuilder, private loadingServie: LoadingService) { 
    this.getCustomerDetails();
  }

  ngOnInit() {

    this.getCustomerDetails();
    this.customerForm = this.formBuilder.group(
      {
        'name': [null, Validators.required],
        'phoneNo': ['', [Validators.required, Validators.pattern('^[0-9]+$')]], //TODO - Need to fix this for phono no.
        // 'phoneNo': [''],
        'username': [null],
        'email': [null], // TODO - Need to fox this too .com is not validating
        'dateOfBirth': [null],
        'taxId': [''],
        'street': [null],
        'zipCode': [''],
        'role': [null],
        'tier': ['1'],
        'city': [''],
        'state': [''],
        'type': ['Business'],
        'companyName': [''],
        'customerNote':['']
      }
    );
  }

  getCustomerDetails() {
    
    this.loadingServie.loading = true;
    this.customerService.getCustomerDetails();
    this._subscription = this.customerService.customerListChange
    .subscribe((cust)=>{
      this.customerDto = cust;
      this.customerDto = this.customerDto.slice();
      this.loadingServie.loading = false;
    })

  }

  showDialog() {
    this.displayDialog = !this.displayDialog;
  }

  resrtForm() {
    this.customerForm.reset();
  }

  addCustomer() {
    // let customerExists = false;
    // let BreakException = {};


    // I need to remove current element and then check for unique phone number other wise it will alwas find one match.

    // if(!this.isAdd)
    // {
    //   let index = this.customerDto.findIndex((el) => el.phoneNo == this.customerForm.value.phoneNo);
    //   if (index > -1) {
    //   this.customerDto = this.customerDto.splice(index,1).concat(this.customerDto.slice(index));
    //   }
    // }

  //   this.customerDto.forEach((customer)=>{

  //     if(customer.phoneNo == this.customerForm.get('phoneNo').value){
  //       customerExists = true;
  //       alert('Duplicate Customer, Please Use Different PhoneNo!!!')
  //     }


  //     let formCustomerEmail: string = this.customerForm.get('email').value;
  //     let custObjEmail: string = customer.email;
  //     if(customer.email && formCustomerEmail.toUpperCase() === custObjEmail.toUpperCase()){
  //         customerExists = true;
  //         alert('Duplicate Customer, Please Use Different Email Address!!!');
  //         throw BreakException;
  //       }
  //   }
   
  // );
  // if(!customerExists){
    this.customerService.addOrUpdateCustomer(this.customerForm.value, this.isAdd);
    this.customerForm.reset();
    this.displayDialog = false;
    // throw BreakException;

  // }
  }

  setCustomerForDelete(cust: Customer) {
    this.selectedCustomerForDelete = cust;
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.selectedCustomerForDelete);
    this.getCustomerDetails();

    this.displayDialog = false;
  }
  showDialogToAdd() {
    this.isAdd = true;
    this.newCustomer = true;
    this.customer = new Customer();
    this.showDeleteButton = false;
    this.displayDialog = true;

  }

  updateCusotmer(customer: Customer) {

    this.isAdd = false;
    this.displayDialog = true;
    //Seeting the value into form for UPDATE TODO WRITE SEPARETE METHOD FOR THIS.
    this.customerForm.get('name').setValue(customer.name);
    this.customerForm.get('phoneNo').setValue(customer.phoneNo);
    this.customerForm.get('companyName').setValue(customer.companyName);
    this.customerForm.get('email').setValue(customer.email);
    this.customerForm.get('taxId').setValue(customer.taxId);
    this.customerForm.get('dateOfBirth').setValue(customer.dateOfBirth);
    this.customerForm.get('type').setValue(customer.type);
    this.customerForm.get('tier').setValue(customer.tier);
    this.customerForm.get('street').setValue(customer.street);
    this.customerForm.get('city').setValue(customer.city);
    this.customerForm.get('state').setValue(customer.state);
    this.customerForm.get('zipCode').setValue(customer.zipCode);
    this.customerForm.get('customerNote').setValue(customer.customerNote);

  }
  showSuccess(severity: string, summary: string, detail: string) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
  }


  selectCustomerForStoreCredit(customer: Customer) {

    this.selectedCustomerForStoreCredit = customer;

    this.customerService.getCustomerStoreCreditHistory(customer.phoneNo)
      .subscribe((history: StoreCreditDto[]) => {

        history.forEach(trans => {
          trans.time = moment(trans.date).format('hh:mm A');
          trans.date = moment(trans.date).format('MM/DD/YYYY');
        })
        this.storeCreditDto = history;
      })
  }
  addStoreCredit() {

    this.addStoreCreditObject.amount = this.storeCreditAmount;
    this.addStoreCreditObject.reason = this.storeCreditReason;
    this.addStoreCreditObject.createdTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.addStoreCreditObject.customerPhoneno = this.selectedCustomerForStoreCredit.phoneNo;
    // TODO - need to fix this when work on user module.
    this.addStoreCreditObject.employeeName = 'alok@alok.com';

    this.customerService.addStoreCredit(this.addStoreCreditObject);
  }

  openPendingInvoice(customer: Customer){
    this.sellService.getPendingInvoiceByCustomer(customer.phoneNo)
    .subscribe(transaction => {
      transaction.forEach(trans => {
        trans.time = moment(trans.date).format('hh:mm A');
        trans.date = moment(trans.date).format('MM-DD-YYYY');
      })
      this.transactionDetails = transaction;
    });
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscription.unsubscribe(); 
   }

}

// export class PrimeCustomer implements CustomerInterface {

//   constructor(public phoneNo?, public name?, public companyName?, public email?, public taxId?, public dateOfBirth?, public type?, public gender?, public street?, public city?, public state?, public country?, public zipCode?, public storeCredit?, public balance?, public lastUpdatedStoreCreditDate?, public password?, public createdDate?) { }
// }

export class Customer {
  phoneNo: string;
  name: string;
  companyName: string;
  email: any;
  taxId: any;
  dateOfBirth: any;
  type: any;
  gender: any;
  street: any;
  city: string;
  state: string;
  country: string;
  zipCode: number;
  storeCredit: any;
  balance: number;
  lastUpdatedStoreCreditDate: any;
  password: any;
  createdDate: any;
  customerNote: any;
  tier: number;
}

// export interface CustomerInterface {
//   phoneNo?;
//   name?;
//   companyName?;
//   email?;
//   taxId?;
//   dateOfBirth?;
//   type?;
//   gender?;
//   street?;
//   city?;
//   state?;
//   country?;
//   zipCode?;
//   storeCredit?;
//   balance?;
//   lastUpdatedStoreCreditDate?;
//   password?;
//   createdDate?;
// }

export class StoreCreditDto {

  id: number;
  customerPhoneno: string;
  amount: number;
  reason: string;
  createdTimestamp: any;
  employeeName: string;
  date: any;
  time: any;

}
