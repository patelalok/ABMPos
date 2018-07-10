import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/report/report.service';
import { SalesDto, SalesSummaryDto, PaymentSummaryDto } from 'app/report/sales/sales.component';
import { ChartDto } from 'app/report/inventory/inventory.component';
import { MatTableDataSource } from '@angular/material';
import { Product } from 'app/sell/sale/sale.component';
import { DateService, DateDto } from '../shared/services/date.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  salesSummaryDto = new SalesSummaryDto();
  paymentSummaryDto = new PaymentSummaryDto();
  numberCardChartData: ChartDto[] = [];
  categoryPieChartData: ChartDto[] = [];
  salesDto: SalesDto[] = [];
  showLegend = false;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  productDto: Product[] = []
  dateDto = new DateDto();
  isCustomDate: boolean = false;
  customDate: FormGroup;
  currentDate = new Date();
  testForm: FormGroup;


  displayedColumns = ['name', 'cost', 'retail', 'quantity'];
  dataSource = new MatTableDataSource<Product>();

  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#337ab7', '#43a047', '#e53935', '#fb8c00']
  };

  constructor(private reportService: ReportService, private dateServie: DateService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.getDashboardDetailBy('Year');

    // this.testForm = this.formBuilder.group(
    //   {
    //   }
    // );

    this.customDate = this.formBuilder.group({
      'fromDate': new Date(),
      'toDate': new Date()
    });

    this.customDate.valueChanges
      .subscribe((change) => {
        console.log('Custom Date', change);
        //this.loadingServie.loading = true;
        let customDateValues: { toDate: Date, fromDate: Date } = change;
        this.dateDto.startDate = moment(customDateValues.fromDate).hour(0).format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(customDateValues.toDate).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss');
        this.getDashboardDetailBy('Custom');
      });
  }

  onSelect(event) {
    console.log(event);
  }

  getSaleSummaryDetails(startDate: string, endDate: string) {
    this.reportService.getDashboardSalesSummaryReport('Sales By Year', startDate, endDate)
      .subscribe((sales: SalesSummaryDto) => {
        this.salesSummaryDto = sales;
        this.getNumberCardDetailsForSales();
      });
  }
  getPaymentSummaryDetails(startDate: string, endDate: string) {
    this.reportService.getDashboardPaymentSummaryReport('Sales By Year', startDate, endDate)
      .subscribe((payment: PaymentSummaryDto) => {
        this.paymentSummaryDto = payment;
        this.getNumberCardDetailsForSales();
      });
  }

  getSalesByCategoryDetails(startDate: string, endDate: string) {
    this.reportService.getSalesDetails('Sales By Category', startDate, endDate)
      .subscribe((sales: SalesDto[]) => {
        this.salesDto = sales;
        this.getPieChartForCategorySales();
      });
  }
  getTop50SellingProductList(startDate: string, endDate: string) {
    this.reportService.getTop50SellingProductList('Top50SellingItem', startDate, endDate)
      .subscribe((product: Product[]) => {
        this.productDto = product;
        this.dataSource.data = this.productDto;
        //this.getPieChartForCategorySales();
      });
  }

  getDashboardDetailBy(dashboardDetailsBy: string) {

    if (dashboardDetailsBy == 'Today') {
      this.dateDto = this.dateServie.getCurrentDay();
      this.isCustomDate = false;

    }
    else if (dashboardDetailsBy == 'Week') {
      this.dateDto = this.dateServie.getCurrentWeek();
      this.isCustomDate = false;

    }
    else if (dashboardDetailsBy == 'Month') {
      this.dateDto = this.dateServie.getCurrentMonth();
      this.isCustomDate = false;

    }
    else if (dashboardDetailsBy == 'Year') {
      this.dateDto = this.dateServie.getCurrentYear();
      this.isCustomDate = false;

    }
    else if (dashboardDetailsBy == 'Custom') {
      this.isCustomDate = true;
    }

    this.getTop50SellingProductList(this.dateDto.startDate, this.dateDto.endDate);
    this.getSaleSummaryDetails(this.dateDto.startDate, this.dateDto.endDate);
    this.getPaymentSummaryDetails(this.dateDto.startDate, this.dateDto.endDate)
    this.getSalesByCategoryDetails(this.dateDto.startDate, this.dateDto.endDate);
  }

  getNumberCardDetailsForSales() {

    //this.numberCardChartData = null;
    this.numberCardChartData = null;
    this.numberCardChartData = [];
    this.numberCardChartData.push(
      { name: 'Cash', value: this.paymentSummaryDto.cash },
      { name: 'Credit', value: this.paymentSummaryDto.credit },
      { name: 'Check', value: this.paymentSummaryDto.check },
      { name: 'Store Credit', value: this.paymentSummaryDto.storeCredit },
      { name: 'Tax', value: this.salesSummaryDto.tax },
      { name: 'Discount', value: this.salesSummaryDto.discount },
      { name: 'Return', value: this.salesSummaryDto.returns },
      { name: 'Profit', value: this.salesSummaryDto.profit }
    );
  }

  getPieChartForCategorySales() {
    this.categoryPieChartData = null;
    this.categoryPieChartData = [];

    this.salesDto.forEach((sales) => {
      this.categoryPieChartData.push({
        name: sales.name,
        value: sales.retail
      });
    });
  }

}

export var single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  }
];