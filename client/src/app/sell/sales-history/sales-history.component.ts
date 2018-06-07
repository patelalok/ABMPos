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


declare var $: JQueryStatic;

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {
  currentDate = new Date(); 
  transactionDetails: TransactionDtoList[] = [];
  paymentHistoryDetails: PaymentHistoryDto[] = [];
  transactionDetailsOriginal: TransactionDtoList[] = [];
  transactionLineItemDetails: TransactionLineItemDaoList[];
  salesHistoryDropdown: any = 'Today';
  dateDto = new DateDto();
  transactionDto: TransactionDtoList;
  test: boolean;

  
  // searchByCustomerInputBox: string;
  searchByCustomerInputBox = new FormControl();
  searchByReceiptNoInputBox = new FormControl();
  searchByTransactionType: string = 'All Transaction Status';
  transactionToVoid: TransactionDtoList;

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


    this.getTransactionDetails(this.salesHistoryDropdown);

    
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
        this.sellService.getTransactionDetails(
          moment(customDateValues.fromDate).hour(0).format('YYYY-MM-DD HH:mm:ss'),
          moment(customDateValues.toDate).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss')
        )
        .subscribe(transaction => {
  
          transaction.forEach(trans => {
            // This helps to manage date for park sale and other edit sale logic.
            trans.originalDate = trans.date;
            trans.time = moment(trans.originalDate).format('hh:mm A');
            trans.onlyDate = moment(trans.originalDate).format('MM-DD-YYYY');
          })
          this.transactionDetails = transaction;
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

  getTransactionDetails(inputDate: any) {

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

    this.sellService.getTransactionDetails(this.dateDto.startDate, this.dateDto.endDate)
      .subscribe(transaction => {
       
        transaction.forEach(trans => {
          trans.originalDate = trans.date;
            trans.time = moment(trans.originalDate).format('hh:mm A');
            trans.onlyDate = moment(trans.originalDate).format('MM-DD-YYYY');
        })
        this.transactionDetailsOriginal = transaction;
        this.transactionDetails = this.transactionDetailsOriginal;
        this.loadingServie.loading = false;
      });
  }

  filterTransactionDetails(input: string, searchType: string) {
    // console.log('Transaction details Object', this.transactionDetails)
    if (input.length > 0)

      this.transactionDetails = this.nowFilterTransaction(input, this.transactionDetailsOriginal,searchType);
    else
      this.getTransactionDetails(this.salesHistoryDropdown);
  }

  nowFilterTransaction(query: any, transactionDetailsList: TransactionDtoList[], searchType: string): TransactionDtoList[] {

    let filtered: TransactionDtoList[] = [];
    for (let i = 0; i < transactionDetailsList.length; i++) {
      let trans = transactionDetailsList[i];

      if(searchType == 'Customer')
      {
        if(null != trans.customerFirstLastName && null != trans.customerPhoneno) {
          
                  if (trans.customerFirstLastName.toLowerCase().includes(query.toLowerCase()) || trans.customerPhoneno.includes(query)) {
                    filtered.push(trans);
                  }
                }
      }
      if(searchType == 'Recipt-No') {

        if(trans.transactionComId.toString().includes(query)) {
          filtered.push(trans);
        }
      }

      if(searchType == 'Transaction-Type') {

        if(trans.status.includes(query)) {
          filtered.push(trans);
        }
        else if(query == 'All Transaction Status') {
          this.getTransactionDetails(this.salesHistoryDropdown);
        }
      }
      
    }
    return filtered;

  }

  setTransactoinToVoid(transaction: TransactionDtoList) {

    // Since i change the logic to, show only transaction deatils on sales history, now i need to get complete transaction details,
    // And set to the transactionTovoid object.

    // Here I am changing the logic, to fixed network delay issue, cause with this some times, i am geting transaction detals before, i am trying ot delete the transaction
    this.transactionToVoid = transaction;

  }


  // Here i am setting status to void for transaction and transaction lineitem
  voidTransaction() {

    // TODO need to figure out this timing issue. i can not send current time, because user may want to see when this transactoin is created.
    //this.transactionToVoid.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    if(this.transactionToVoid){

      // First I am getting transaction detials to void
      this.sellService.getTransactionById(this.transactionToVoid.transactionComId)
      .subscribe((transaction: TransactionDtoList)=>{
        this.transactionToVoid = transaction;
        
        // Now setting status to void.
        this.transactionToVoid.status = 'Void';

        this.transactionToVoid.transactionLineItemDaoList.forEach((lineItem) =>{
        lineItem.status = 'Void';
      });

      this.transactionToVoid.paymentDao.forEach((payment)=> {
        payment.status = 'Void';
      });

      // Now doing service call to update transaction status.
      this.sellService.addTransactionDetails(this.transactionToVoid)
      .subscribe(
        (data) => {
          this.toastr.success('Transaction Voided Successfully !!!', 'Success!');
          console.log(data);
        },
        (error) => {
          this.toastr.error(error, 'Error!');
          console.log(JSON.stringify(error.json()));
      });
    });
    }
    
  }

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





