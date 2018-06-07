import { Component, OnInit } from '@angular/core';
import { TransactionDtoList } from '../../sell/sale/sale.component';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ReportService } from '../report.service';
import * as moment from 'moment';
import * as jspdf from "jspdf";
import { DateDto, DateService } from 'app/shared/services/date.service';
import { printBlob } from 'app/shared/services/util.service';



@Component({
  selector: 'app-open-invoice',
  templateUrl: './open-invoice.component.html',
  styleUrls: ['./open-invoice.component.scss']
})
export class OpenInvoiceComponent implements OnInit {
  salesHistoryDropdown: any = 'Today';
  currentDate = new Date(); 
  customDate: FormGroup;
  openInvoiceDto: OpenInvoice[] = [];
  dateDto = new DateDto();
  openInvoiceDtoOriginal: OpenInvoice[] = [];
  finalInvoiceBalance: number = 0;



  constructor(private fb: FormBuilder, private reportService: ReportService, private dateService: DateService) { }

  ngOnInit() {

    this.customDate = this.fb.group({
      'fromDate' : new Date(),
      'toDate': new Date()
    });

    this.getOpenInvoiceDetails(this.salesHistoryDropdown);
    
    this.customDate.valueChanges
    .subscribe((change) => {
      console.log('Custom Date', change);
      //this.loadingServie.loading = true;
      
      let customDateValues: {toDate: Date, fromDate: Date} = change; 
      this.reportService.getOpneInvoiceDetails(
        moment(customDateValues.fromDate).hour(0).format('YYYY-MM-DD HH:mm:ss'),
        moment(customDateValues.toDate).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss')
      )
      // .subscribe(transaction => {
      //   transaction.forEach((invoice)=>{
      //     invoice.transactionDtoList.forEach((trans)=>{
      //       trans.originalDate = trans.date;
      //       trans.time = moment(trans.originalDate).format('hh:mm A');
      //       trans.onlyDate = moment(trans.originalDate).format('MM-DD-YYYY');
      //     })

      //   })
      //   this.openInvoiceDto = transaction;
      //   console.log('open invoice', this.openInvoiceDto);
      // });
    });
  }

  printOpenInvoiceDetails(){

    this.reportService.printOpenInvoiceDetails(this.dateDto.startDate, this.dateDto.endDate)
    .subscribe((data) => {
      printBlob(data._body);
      
    });
    
  }

  getOpenInvoiceDetails(inputDate: any) {

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

    this.reportService.getOpneInvoiceDetails(this.dateDto.startDate, this.dateDto.endDate)
      .subscribe(transaction => {
        this.openInvoiceDto = transaction;
        this.finalInvoiceBalance = parseFloat(this.openInvoiceDto[0].totalBalance.toFixed(2));
        console.log('main obj', this.openInvoiceDto);  
  })

}
}

export class  OpenInvoice {
  customerSum :CustomerSum;
  // transactionDtoList: Array<TransactionDtoList[]>;
  transactionDaoList: TransactionDtoList[];
  totalBalance: number;

}

export class CustomerSum {
  phoneNo: string
  companyName: string
  totalBalance: number;
}
