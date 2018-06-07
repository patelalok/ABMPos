import { Component, OnInit } from '@angular/core';
import { SellService } from 'app/sell/sell.service';
import * as moment from 'moment';
import * as jspdf from "jspdf";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DateDto, DateService } from 'app/shared/services/date.service';
import { Http } from '@angular/http';
import { ResponseType, ResponseContentType } from '@angular/http';
import { printBlob, UtilService } from 'app/shared/services/util.service';
import { ToastsManager } from 'ng2-toastr';
import { LoadingService } from 'app/loading.service';
import { TransactionLineItemDaoList, TransactionDtoList, PaymentHistoryDto } from 'app/sell/sale/sale.component';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {

  currentDate = new Date(); 
  paymentHistoryDetails: PaymentHistoryDto[] = [];
  paymentHistoryDetailsOriginal: PaymentHistoryDto[] = [];
  salesHistoryDropdown: any = 'Today';
  dateDto = new DateDto();
  transactionDto: TransactionDtoList;
  test: boolean;

  
  // searchByCustomerInputBox: string;
  searchByCustomerInputBox = new FormControl();
  searchByReceiptNoInputBox = new FormControl();
  searchByTransactionType: string = 'All Transaction Status';
  paymentDetialsToVoid: PaymentHistoryDto;

  document: jspdf; 
  customDate: FormGroup; 
  
  constructor(private sellService: SellService, private fb: FormBuilder, private dateService: DateService, private http: Http, private toastr: ToastsManager, private loadingServie: LoadingService, private utilService: UtilService) { }

  ngOnInit() {

    this.searchByCustomerInputBox.valueChanges
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe((change) => {
        this.filterTransactionDetails(change, 'Customer');
      });

      this.searchByReceiptNoInputBox.valueChanges
      .distinctUntilChanged()
      .subscribe((change) => {
        this.filterTransactionDetails(change, 'Recipt-No');
      });


    this.getPaymentHistoryDetails(this.salesHistoryDropdown);

    
    // this.customDate = this.fb.group({
    //   'fromDate' : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    //   'toDate': moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    // });

    
    this.customDate = this.fb.group({
      'fromDate' : new Date(),
      'toDate': new Date()
    });
    this.customDate.valueChanges
      .subscribe((change) => {
        console.log('Custom Date', change);
        this.loadingServie.loading = true;
        
        let customDateValues: {toDate: Date, fromDate: Date} = change; 
        this.sellService.getPaymentHistoryDetails(
          moment(customDateValues.fromDate).hour(0).format('YYYY-MM-DD HH:mm:ss'),
          moment(customDateValues.toDate).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss')
        )
        .subscribe(paymentHistory => {
  
          paymentHistory.forEach(trans => {
            // This helps to manage date for park sale and other edit sale logic.
            trans.originalDate = trans.paymentDao.date;
            trans.time = moment(trans.originalDate).format('hh:mm A');
            trans.onlyDate = moment(trans.originalDate).format('MM-DD-YYYY');
          })
          this.paymentHistoryDetails = paymentHistory;
          this.loadingServie.loading = false;
        });
      });
  }

  printReceipt(transaction: TransactionDtoList){
    this.sellService.printReceipt(transaction);  
}

  onTransactionTypeDropdownChoose(){
    this.filterTransactionDetails(this.searchByTransactionType, 'Transaction-Type');
  }

  getPaymentHistoryDetails(inputDate: any) {

    this.loadingServie.loading = true;
    
    if(inputDate == 'Today'){
      this.dateDto = this.dateService.getCurrentDay();
    }
    else if(inputDate == 'Yesterday'){
      this.dateDto = this.dateService.getPreviousDay();

    }
    else if(inputDate == 'This Week'){
      this.dateDto = this.dateService.getCurrentWeek();
      
    }
    else if(inputDate == 'Last Week'){
      this.dateDto = this.dateService.getLastWeek();
      
    }
    else if(inputDate == 'This Month'){
      this.dateDto = this.dateService.getCurrentMonth();
      
    }
    else if(inputDate == 'Last Month'){
      this.dateDto = this.dateService.getLastMonth();
      
    }
    else if(inputDate == 'Last 3 Months'){
      this.dateDto = this.dateService.getLast3Months();
      
    } else if(inputDate == 'Last 6 Months'){
      this.dateDto = this.dateService.getLast6Months();
      
    }
    else if(inputDate == 'This Year'){
      this.dateDto = this.dateService.getCurrentYear();
      
    }
    else if(inputDate == 'Last Year'){
      this.dateDto = this.dateService.getLastYear();
    }
    // else if(inputDate == 'Custom') {
    //   this.dateDto.startDate = this.customDate.get('fromDate').value;
    //   this.dateDto.endDate = this.customDate.get('toDate').value;
    // }

    this.sellService.getPaymentHistoryDetails(this.dateDto.startDate, this.dateDto.endDate)
      .subscribe(paymentHistory => {
       
        paymentHistory.forEach(trans => {
          trans.originalDate = trans.paymentDao.date;
            trans.time = moment(trans.originalDate).format('hh:mm A');
            trans.onlyDate = moment(trans.originalDate).format('MM-DD-YYYY');
        })
        this.paymentHistoryDetailsOriginal = paymentHistory;
        this.paymentHistoryDetails = this.paymentHistoryDetailsOriginal;
        this.loadingServie.loading = false;
      });
  }

  filterTransactionDetails(input: string, searchType: string) {
    // console.log('Transaction details Object', this.transactionDetails)
    if (input.length > 0)

      this.paymentHistoryDetails = this.nowFilterTransaction(input, this.paymentHistoryDetailsOriginal,searchType);
    else
      this.getPaymentHistoryDetails(this.salesHistoryDropdown);
  }

  nowFilterTransaction(query: any, paymentHistoryDetails: PaymentHistoryDto[], searchType: string): PaymentHistoryDto[] {

    let filtered: PaymentHistoryDto[] = [];
    for (let i = 0; i < paymentHistoryDetails.length; i++) {
      let trans = paymentHistoryDetails[i];

      if(searchType == 'Customer')
      {
        if(null != trans.customerFirstLastName && null != trans.customerPhoneno) {
          
                  if (trans.customerFirstLastName.toLowerCase().includes(query.toLowerCase()) || trans.customerPhoneno.includes(query)) {
                    filtered.push(trans);
                  }
                }
      }
      if(searchType == 'Recipt-No') {

        if(trans.paymentDao.transactionComId.toString().includes(query)) {
          filtered.push(trans);
        }
      }

      if(searchType == 'Transaction-Type') {

        if(trans.paymentDao.status.includes(query)) {
          filtered.push(trans);
        }
        else if(query == 'All Transaction Status') {
          this.getPaymentHistoryDetails(this.salesHistoryDropdown);
        }
      }
      
    }
    return filtered;

  }

  setTransactoinToVoid(paymentDetails: PaymentHistoryDto) {
    console.log('payment history', paymentDetails)
    this.sellService.setPaymentToVoid(paymentDetails);
  }


  // Here i am setting status to void for transaction and transaction lineitem
  // voidPayment() {

  //   this.sellService.voidPayment(this.paymentDetialsToVoid)
  //   .subscribe((voidedPayment)=>{
  //     alert('Voided');
  //   })
  // }

  sendEmail(transaction: TransactionDtoList){

    if(null != transaction && null != transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {

      // Todo need to add sppiner for this so user can wait that email is sending, cuase its taking littel bit more time to send an email.
      this.sellService.sendEmail(transaction.transactionComId)
      .subscribe((data) =>
    {
      this.loadingServie.loading = true;
      if(data.text())
      {
        this.loadingServie.loading = false;
        this.toastr.success('Email Send Sucessfully !!', 'Success!');
      }
      console.log('send email response', data.text());
    },
    (error) => {
      this.loadingServie.loading = false;
      this.toastr.error('Something goes wrong, not able to send an email now !!', 'Error!');
      console.log(JSON.stringify(error.json()));
  });
    }

    else{
      this.toastr.error('Can not find email address for transaction !!', 'Error!');
    }
  }

}
