import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/customer/customer.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Message } from 'primeng/primeng';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customerDto: PrimeCustomer[];

  // Its redudanct Need to fix when you work in delete part..TODO
  selectedCustomerForDelete: Customer;
  selectedCustomerForStoreCredit: Customer;
  displayDialog = false;
  newCustomer: boolean;
  customer: CustomerInterface = new PrimeCustomer();
  msgs: Message[] = [];
  showDeleteButton = true;
  storeCreditAmount: number;
  storeCreditReason: string;
  storeCreditDto: StoreCreditDto[] = [];
  addStoreCreditObject = new StoreCreditDto();
  addCustomerFlag: boolean = false;
  customerIndexForupdate: number = 0;
  selectedCustomerForUpdate =  new Customer();

  constructor(private customerService: CustomerService, private formBuilder: FormBuilder, private toastr: ToastsManager,) { }

  ngOnInit() {

    this.getCustomerDetails();
    this.customerForm = this.formBuilder.group(
      {
        'name': [null, Validators.required],
        'phoneNo': ['', [Validators.required, Validators.pattern('^[0-9]+$')]], //TODO - Need to fix this for phono no.
        // 'phoneNo': [''],
        'username': [null],
        'email': [''], // TODO - Need to fox this too .com is not validating
        'dateOfBirth': [null],
        'taxId': [''],
        'street': [null],
        'zipCode': [''],
        'role': [null],
        'gender': [''],
        'city': [''],
        'state': [''],
        'type': [''],
        'companyName': ['']

      }
    );
  }

  getCustomerDetails() {
    this.customerService.getCustomerDetails()
      .subscribe((cust: Customer[]) => {
        this.customerDto = cust;
        console.log('Customer Detail', this.customerDto);
      });
  }

  showDialog() {
    this.displayDialog = !this.displayDialog;
  }

  resrtForm() {

    this.customerForm.reset();
  }

  addCustomer() {

    let newCustomer = this.customerForm.value;
    this.customerService.addOrUpdateCustomer(this.customerForm.value)
    .subscribe(data => {
      if(data!= null){

        this.customerDto.push(newCustomer);
        this.customerDto = this.customerDto.slice();
        this.toastr.success('Customer Added Successfully!!', 'Success!!');
        console.log('cusotmer data back', data);
      }
    },
      error => {

    console.log(JSON.stringify(error.json()));
    this.toastr.error('Opps Something Goes Wrong!!', 'Error!!');
  });
   this.customerForm.reset();
    this.displayDialog = false;
  }

  updateCustomer()
  {
    let updateItem = this.customerDto.find(this.findIndexToUpdate, this.selectedCustomerForUpdate.phoneNo);
    let index = this.customerDto.indexOf(updateItem);

    //Seeting the value into form for UPDATE TODO WRITE SEPARETE METHOD FOR THIS.
    // this.customerForm.get('name').setValue(this.selectedCustomerForUpdate.name);
    // this.customerForm.get('phoneNo').setValue(this.selectedCustomerForUpdate.phoneNo);
    // this.customerForm.get('companyName').setValue(this.selectedCustomerForUpdate.companyName);
    // this.customerForm.get('email').setValue(this.selectedCustomerForUpdate.email);
    // this.customerForm.get('taxId').setValue(this.selectedCustomerForUpdate.taxId);
    // this.customerForm.get('dateOfBirth').setValue(this.selectedCustomerForUpdate.dateOfBirth);
    // this.customerForm.get('type').setValue(this.selectedCustomerForUpdate.type);
    // this.customerForm.get('gender').setValue(this.selectedCustomerForUpdate.gender);
    // this.customerForm.get('street').setValue(this.selectedCustomerForUpdate.street);
    // this.customerForm.get('city').setValue(this.selectedCustomerForUpdate.city);
    // this.customerForm.get('state').setValue(this.selectedCustomerForUpdate.state);
    // this.customerForm.get('zipCode').setValue(this.selectedCustomerForUpdate.zipCode);

    let newCustomer = this.customerForm.value;
    this.customerService.addOrUpdateCustomer(this.customerForm.value)
    .subscribe(data => {
      if(data!= null){
        this.toastr.success('Customer Added Successfully!!', 'Success!!');
        console.log('cusotmer data back', data);
      }
    },
      error => {
    console.log(JSON.stringify(error.json()));
    this.toastr.error('Opps Something Goes Wrong!!', 'Error!!');

  });

    this.customerDto[index] = this.selectedCustomerForUpdate;
    this.customerForm.reset();
    this.displayDialog = false;


  }

  setCustomerForDelete(cust: Customer) {

    

    this.selectedCustomerForDelete = cust;
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.selectedCustomerForDelete.phoneNo);
    this.getCustomerDetails();

    this.displayDialog = false;
  }


  showDialogToAdd() {
    this.addCustomerFlag = true;
    this.newCustomer = true;
    this.customer = new PrimeCustomer();
    this.showDeleteButton = false;
    this.displayDialog = true;

  }

  setDetailForUpdateCusotmer(customer: Customer) {

    this.selectedCustomerForUpdate = customer;
    this.displayDialog = true;
    this.addCustomerFlag = false;

    this.customerForm.get('name').setValue(this.selectedCustomerForUpdate.name);
    this.customerForm.get('phoneNo').setValue(this.selectedCustomerForUpdate.phoneNo);
    this.customerForm.get('companyName').setValue(this.selectedCustomerForUpdate.companyName);
    this.customerForm.get('email').setValue(this.selectedCustomerForUpdate.email);
    this.customerForm.get('taxId').setValue(this.selectedCustomerForUpdate.taxId);
    this.customerForm.get('dateOfBirth').setValue(this.selectedCustomerForUpdate.dateOfBirth);
    this.customerForm.get('type').setValue(this.selectedCustomerForUpdate.type);
    this.customerForm.get('gender').setValue(this.selectedCustomerForUpdate.gender);
    this.customerForm.get('street').setValue(this.selectedCustomerForUpdate.street);
    this.customerForm.get('city').setValue(this.selectedCustomerForUpdate.city);
    this.customerForm.get('state').setValue(this.selectedCustomerForUpdate.state);
    this.customerForm.get('zipCode').setValue(this.selectedCustomerForUpdate.zipCode);

    

  
  }

  findIndexToUpdate(newItem) { 
    return newItem.id === this;
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

}

export class PrimeCustomer implements CustomerInterface {

  constructor(public phoneNo?, public name?, public companyName?, public email?, public taxId?, public dateOfBirth?, public type?, public gender?, public street?, public city?, public state?, public country?, public zipCode?, public storeCredit?, public balance?, public lastUpdatedStoreCreditDate?, public password?, public createdDate?) { }
}

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
}

export interface CustomerInterface {
  phoneNo?;
  name?;
  companyName?;
  email?;
  taxId?;
  dateOfBirth?;
  type?;
  gender?;
  street?;
  city?;
  state?;
  country?;
  zipCode?;
  storeCredit?;
  balance?;
  lastUpdatedStoreCreditDate?;
  password?;
  createdDate?;
}

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
