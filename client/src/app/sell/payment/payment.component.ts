import { Component, OnInit } from '@angular/core';
import { Customer } from 'app/customer/customer.component';
import { CustomerService } from '../../customer/customer.service';
import { ReportService } from '../../report/report.service';
import { TransactionDtoList, PaymentDao } from '../sale/sale.component';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaymentDto } from '../sell.component';
import { SellService } from 'app/sell/sell.service';
import { ToastsManager } from 'ng2-toastr';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  selectedCustomer: Customer;
  filteredCustomer: any[];
  customerDto: Customer[];
  totalBalance: number = 0;
  _subscriptionCustomer: any;
  openInvoiceList: TransactionDtoList[] = [];
  paymentForm: FormGroup;
  invoiceTableForm: FormGroup;
  paymentList: PaymentDao[] = [];
  paymentTextBox: any = 0;


  constructor(private customerService: CustomerService, private reportService: ReportService, private formBuilder: FormBuilder, private sellService: SellService, private toastr: ToastsManager) {
    this.getCustomerDetails();
  }

  ngOnInit() {

    this.paymentForm = this.formBuilder.group(
      {
        'paymentType': ['Cash', [Validators.required]],
        'referenceNo': [''],
        'paymentAmount': [0.00, [Validators.required, Validators.pattern('^[0-9-.]+$')]]
      }
    );
    this.invoiceTableForm = this.formBuilder.group(
      {
        'paymentTableAmount': [0.00, [Validators.required, Validators.pattern('^[0-9-.]+$')]]
      }
    );
    this.getCustomerDetails();
  }
  receiveAmount() {

    this.resetPaymentAmount();

    this.paymentTextBox = this.paymentForm.get('paymentAmount').value;
    this.paymentList = [];

    if (this.paymentTextBox > 0) {
      // Now check invoice balance one by one and start filling the invoice table text box.
      for (let i = 0; i < this.openInvoiceList.length; i++) {
        let paymentObj = new PaymentDao();
        if (this.openInvoiceList[i].transactionBalance == this.paymentTextBox) {
          paymentObj.transactionComId = this.openInvoiceList[i].transactionComId;
          paymentObj.type = this.paymentForm.get('paymentType').value;
          paymentObj.amount = this.openInvoiceList[i].transactionBalance;
          paymentObj.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
          paymentObj.status = 'Complete';
          this.openInvoiceList[i].paymentTableAmount = this.openInvoiceList[i].transactionBalance;
          this.openInvoiceList = this.openInvoiceList.slice();

          console.log('test', this.openInvoiceList[i].paymentTableAmount)

          this.paymentList.push(paymentObj);

          //value = value-this.openInvoiceList[i].transactionBalance;

          console.log('Value', this.paymentTextBox);
          console.log('paymentObj', paymentObj);
          break;
        }
        else if (this.openInvoiceList[i].transactionBalance > this.paymentTextBox) {
          paymentObj.transactionComId = this.openInvoiceList[i].transactionComId;
          paymentObj.type = this.paymentForm.get('paymentType').value;
          paymentObj.amount = this.paymentTextBox;
          paymentObj.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
          paymentObj.status = 'Pending';
          this.openInvoiceList[i].paymentTableAmount = this.paymentTextBox
          this.openInvoiceList = this.openInvoiceList.slice();


          this.paymentList.push(paymentObj);

          //value = value-this.openInvoiceList[i].transactionBalance;

          console.log('Value', this.paymentTextBox);
          console.log('paymentObj', paymentObj);
          break;
        }

        else if (this.openInvoiceList[i].transactionBalance < this.paymentTextBox) {
          paymentObj.transactionComId = this.openInvoiceList[i].transactionComId;
          paymentObj.type = this.paymentForm.get('paymentType').value;
          paymentObj.amount = this.openInvoiceList[i].transactionBalance;
          paymentObj.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
          paymentObj.status = 'Complete';
          this.openInvoiceList[i].paymentTableAmount = this.openInvoiceList[i].transactionBalance;
          this.openInvoiceList = this.openInvoiceList.slice();



          this.paymentList.push(paymentObj);

          this.paymentTextBox = (this.paymentTextBox - this.openInvoiceList[i].transactionBalance).toFixed(2);

          console.log('Value', this.paymentTextBox);
          console.log('paymentObj', paymentObj);
        }


      }
      console.log('this means values in range');
    }
    else {
      console.log('this means values is more so need to give store credit');

    }



  }

  resetPaymentAmount() {
    this.openInvoiceList.forEach((pay) => {
      pay.paymentTableAmount = 0.00
    });
  }

  submitPayment() {

    if (parseFloat(this.paymentForm.get('paymentAmount').value) > this.totalBalance) {
      alert('Can not over pay the amount!!!');
    }
    else {
      console.log('Final Payment List', this.paymentList);
      this.sellService.addPaymentDetails(this.paymentList);
      this.clearPage();
    }
  }


  public getCustomerDetails() {

    this.customerService.getCustomerDetails();
    this._subscriptionCustomer = this.customerService.customerListChange
      .subscribe((cust) => {
        this.customerDto = cust;
        this.customerDto = this.customerDto.slice();
      });
  }

  // TODO- NEED TO REMOVE THIS HARD CODED DATE
  getOpenInvoiceByCustomer() {
    this.reportService.getOpneInvoiceDetailsByCustomer('2018-01-01 00:00:00', '2018-12-31 23:59:59', this.selectedCustomer.phoneNo)
      .subscribe((opneInvoice) => {

        opneInvoice.forEach((invoice) => {
          this.totalBalance = +invoice.transactionBalance + this.totalBalance;

          invoice.originalDate = invoice.date;
          invoice.time = moment(invoice.originalDate).format('hh:mm A');
          invoice.onlyDate = moment(invoice.originalDate).format('MM-DD-YYYY');
          invoice.paymentTableAmount = 0.00;
        })

        this.openInvoiceList = opneInvoice;
      })
  }

  submitCustomer() {

    console.log('wow customer seleted', this.selectedCustomer);
    this.getOpenInvoiceByCustomer();
  }
  removeCustomerOnSale() {
    this.selectedCustomer = null;
    this.totalBalance = 0.00;
    this.paymentForm.get('paymentAmount').setValue(0.00);
    this.paymentList = [];
    this.paymentForm.get('referenceNo').setValue('');

  }

  filterCustomers(event) {
    let query = event.query;
    // this.customerService.getCustomerDetailsFromBackEnd()
    //   .subscribe((customers) => {
    // console.log(products);
    this.filteredCustomer = this.filterCustomer(query, this.customerDto);
    // });
  }

  filterCustomer(query, customers: Customer[]): Customer[] {
    let filtered: Customer[] = [];
    for (let i = 0; i < customers.length; i++) {
      let cust = customers[i];
      if (cust != undefined && cust.companyName != null && cust.companyName != undefined)
        if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
          filtered.push(cust);
        }
    }
    return filtered;

  }

  // On Successfull payment submition.
  clearPage() {
    this.selectedCustomer = null;
    this.paymentTextBox = 0;
    this.totalBalance = 0;
    this.openInvoiceList = [];
    this.paymentForm.reset();
    this.paymentForm.get('paymentType').setValue('Cash');
    this.invoiceTableForm.reset();
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this._subscriptionCustomer.unsubscribe();
    //  this._subscriptionProduct.unsubscribe();
  }

}
