import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/report/report.service';
import * as moment from 'moment';
import { DateDto, DateService } from 'app/shared/services/date.service';
import { ChartDto } from 'app/report/inventory/inventory.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { printBlob } from 'app/shared/services/util.service';



@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  salesDto: SalesDto[] = [];
  salesSummaryDto: SalesSummaryDto[] = [];
  paymentSummaryDto: PaymentSummaryDto[] = [];
  salesDropdown: string = 'Payment Summary';
  salesSummaryDropdown: string = 'Sales By Year';
  salesSummaryMonthDropdown: string = 'January';
  salesSummaryWeekDropdown: string = 'This Week';
  salesSummaryHourDropdown: string = 'Today';
  salesDateDropdown: string = 'Today';
  salesByYearDropdown: string = 'This Year';
  dateTest: string;
  dateDto = new DateDto();
  pieChartData: ChartDto[];
  customDate: FormGroup;
  currentDate = new Date();



  colorScheme = {
    domain: ['#337ab7', '#28a745', '#ff6666', '#fd7e14', '#495057', '#A059B5', '#56BAD6']
  };

  constructor(private reportService: ReportService, private dateService: DateService, private fb: FormBuilder) { }

  ngOnInit() {

    this.getReportDetails();

    this.customDate = this.fb.group({
      'fromDate': new Date(),
      'toDate': new Date()
    });

    this.customDate.valueChanges
      .subscribe((change) => {
        console.log('Custom Date', change);
        //this.loadingServie.loading = true;
        let customDateValues: { toDate: Date, fromDate: Date } = change;
        this.getSalesDetailsFromCustomDate(moment(customDateValues.fromDate).hour(0).format('YYYY-MM-DD HH:mm:ss'), moment(customDateValues.toDate).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss'));
      });

  }

  getReportDetails() {

    if (this.salesDropdown == 'Payment Summary') {
      this.getPaymentSummaryDetails();
    }
    else if (this.salesDropdown == 'Sales Summary') {
      this.getSalesSummaryDetails();
    }
    else if (this.salesDropdown == 'Sales By Category') {
      this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown)
    }
    else if (this.salesDropdown == 'Sales By Vendor') {
      this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown)
    }
    else if (this.salesDropdown == 'Sales By Brand') {
      this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown)
    }
    else if (this.salesDropdown == 'Sales By Model') {
      this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown)
    }
    else if (this.salesDropdown == 'Sales By Product') {
      this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown)
    }
    else if (this.salesDropdown == 'Sales By Employee') {
      this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown)
    }
    else if (this.salesDropdown == 'Sales By Customer') {
      this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown)
    }

    this.reportService.getSalesDetails(this.salesDropdown, this.dateDto.startDate, this.dateDto.endDate)
      .subscribe((sales: SalesDto[]) => {
        this.salesDto = sales;
        // this.getPieChartDetailsForSales();
      });
  }

  // This will show Sales summary detials
  getSalesSummaryDetails() {
    if (this.salesSummaryDropdown === 'Sales By Year') {
      this.salesByYearOptions();
    }
    else if (this.salesSummaryDropdown === 'Sales By Month') {
      this.dateDto = this.dateService.getMonthDate(this.salesSummaryMonthDropdown);
    }
    else if (this.salesSummaryDropdown === 'Sales By Week') {
      this.salesByWeekOptions();
    }
    else if (this.salesSummaryDropdown === 'Sales By Day') {
      this.dateDto = this.dateService.getCurrentDay();
    }
    else if (this.salesSummaryDropdown === 'Sales By Hour') {
      this.dateDto = this.dateService.getDateByInput(this.salesSummaryHourDropdown)
    }

    this.reportService.getSalesSummaryReport(this.salesSummaryDropdown, this.dateDto.startDate, this.dateDto.endDate)
      .subscribe((summary: SalesSummaryDto[]) => {
        this.salesSummaryDto = summary;
      });
  }

  getPaymentSummaryDetails() {

    if (this.salesSummaryDropdown == 'Sales By Year') {
      this.salesByYearOptions();
    }
    else if (this.salesSummaryDropdown == 'Sales By Month') {
      this.dateDto = this.dateService.getMonthDate(this.salesSummaryMonthDropdown);
    }
    else if (this.salesSummaryDropdown == 'Sales By Week') {
      this.salesByWeekOptions();
    }
    else if (this.salesSummaryDropdown === 'Sales By Day') {
      this.dateDto = this.dateService.getCurrentDay();
    }
    else if (this.salesSummaryDropdown === 'Sales By Hour') {
      this.dateDto = this.dateService.getDateByInput(this.salesSummaryHourDropdown)
    }
    this.reportService.getPaymentSummaryReport(this.salesSummaryDropdown, this.dateDto.startDate, this.dateDto.endDate)
      .subscribe((summary: PaymentSummaryDto[]) => {
        this.paymentSummaryDto = summary;
      });
  }

  getSalesDetailsFromCustomDate(startDate: string, endDate: string) {

    this.reportService.getSalesDetails(this.salesDropdown, startDate, endDate)
      .subscribe((sales: SalesDto[]) => {
        this.salesDto = sales;
      });
  }

  salesByYearOptions(){

    if (this.salesByYearDropdown == 'This Year') {
      this.dateDto = this.dateService.getCurrentYear();
    }
    else if (this.salesByYearDropdown === 'Last Year') {
      this.dateDto = this.dateService.getLastYear();
    }
    else if (this.salesByYearDropdown === 'Last 5 Years') {
      this.dateDto = this.dateService.getLast5Years();
    }
    else if (this.salesByYearDropdown === 'Last 10 Years') {
      this.dateDto = this.dateService.getLast10Years();
    }
  }
  salesByWeekOptions(){

    if (this.salesSummaryWeekDropdown == 'This Week') {
      this.dateDto = this.dateService.getCurrentWeek();
    }
    else if (this.salesSummaryWeekDropdown == 'Last Week') {
      this.dateDto = this.dateService.getLastWeek();
    }
    else if (this.salesSummaryWeekDropdown == 'Last 2 Weeks') {
      this.dateDto = this.dateService.getLast2Weeks();
    }
    else if (this.salesSummaryWeekDropdown == 'Last 4 Weeks') {
      this.dateDto = this.dateService.getLast4Weeks();
    }
  }

  // getPieChartDetailsForSalesSummary() {
  //   console.log('Sales Summary', this.salesSummaryDto);
  //   this.pieChartData = null;
  //   this.pieChartData = [];
  //   this.salesSummaryDto.forEach((salesSummary) => {
  //     this.pieChartData.push({
  //       name: salesSummary.name,
  //       value: salesSummary.profit
  //     });
  //   });
  // }

  // getPieChartDetailsForSales() {
  //   console.log('Sales Summary', this.salesDto);
  //   this.pieChartData = null;
  //   this.pieChartData = [];
  //   this.salesDto.forEach((sales) => {
  //     this.pieChartData.push({
  //       name: sales.name,
  //       value: sales.profit
  //     });
  //   });
  // }

  printSalesReportBy() {
    this.reportService.printSalesReportPDF(this.salesDropdown,this.salesSummaryDropdown, this.dateDto.startDate, this.dateDto.endDate)
      .subscribe((data) => {
        printBlob(data._body);

      });


  }

  // For D3 chart
  onSelect(event) {
    console.log(event);
  }
}

export class SalesDto {
  name: string;
  productNo: string;
  quantity: number;
  cost: number;
  retail: number;
  profit: number;
  discount: number;
  markup: number;
  perOfTotal: number;
}

export class SalesSummaryDto {
  name: string;
  // cash: number;
  // credit: number;
  // debit: number;
  // check: number;
  // storeCredit:number;
  totalAmount: number;
  tax: number;
  discount: number;
  subtotal: number;
  quantity: number;
  profit: number;
  returns: number;
  transactionBalance: number;
}

export class PaymentSummaryDto {

  name: string;
  cash: number;
  credit: number;
  debit: number;
  check: number;
  storeCredit: number;

}


