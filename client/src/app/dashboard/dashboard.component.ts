import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/report/report.service';
import { SalesDto, SalesSummaryDto } from 'app/report/sales/sales.component';
import { ChartDto } from 'app/report/inventory/inventory.component';
import { MatTableDataSource } from '@angular/material';
import { Product } from 'app/sell/sale/sale.component';
import { DateService, DateDto } from '../shared/services/date.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  salesSummaryDto = new SalesSummaryDto()
  numberCardChartData:  ChartDto[] =[];
  categoryPieChartData: ChartDto[]=[];
  salesDto: SalesDto[] = [];
  showLegend = false;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  productDto:  Product[] = []
  dateDto =  new DateDto();
;
displayedColumns = ['name','cost', 'retail', 'quantity'];
dataSource = new MatTableDataSource<Product>();

view: any[] = [700, 400];

colorScheme = {
  domain: ['#337ab7','#43a047','#e53935', '#fb8c00']
};

  constructor(private reportService: ReportService, private dateServie: DateService) { 

  }

  ngOnInit() {
    
    this.getDashboardDetailBy('Year');
  }

  onSelect(event) {
    console.log(event);
  }

  getSaleSummaryDetails(startDate: string, endDate:string){

    this.reportService.getDashboardSalesSummaryReport('Sales By Year', startDate, endDate)
        .subscribe((sales: SalesSummaryDto) => {
          this.salesSummaryDto = sales;
          this.getNumberCardDetailsForSales();
        });
  }

  getSalesByCategoryDetails(startDate: string, endDate:string){
    this.reportService.getSalesDetails('Sales By Category', startDate, endDate)
    .subscribe((sales: SalesDto[]) => {
      this.salesDto = sales;
      this.getPieChartForCategorySales();
    });
  }
  getTop50SellingProductList(startDate: string, endDate:string){
    this.reportService.getTop50SellingProductList('Top50SellingItem', startDate, endDate)
    .subscribe((product: Product[]) => {
      this.productDto = product;
      this.dataSource.data = this.productDto;
      //this.getPieChartForCategorySales();
    });
  }

  getDashboardDetailBy(dashboardDetailsBy: string){

    if(dashboardDetailsBy == 'Today'){
      this.dateDto = this.dateServie.getCurrentDay();
    }
    else if(dashboardDetailsBy == 'Week'){
      this.dateDto = this.dateServie.getLast7Day();
    }
    else if(dashboardDetailsBy == 'Month'){
      this.dateDto = this.dateServie.getCurrentMonth();
    }
    else if(dashboardDetailsBy == 'Year'){
      this.dateDto = this.dateServie.getCurrentYear();
    }

    else {
      // TODO need to figure this out.
    }

    this.getTop50SellingProductList(this.dateDto.startDate, this.dateDto.endDate);
    this.getSaleSummaryDetails(this.dateDto.startDate, this.dateDto.endDate);
    this.getSalesByCategoryDetails(this.dateDto.startDate, this.dateDto.endDate);
  }

  getNumberCardDetailsForSales(){

    //this.numberCardChartData = null;
    this.numberCardChartData = null;
    this.numberCardChartData = []; 
    this.numberCardChartData.push(
      // {name: 'Cash',value: this.salesSummaryDto.cash} ,
      // {name: 'Credit',value: this.salesSummaryDto.credit},
      // {name: 'Debit',value: this.salesSummaryDto.debit},
      // {name: 'Check',value: this.salesSummaryDto.check},
      {name: 'Tax',value: this.salesSummaryDto.tax},
      {name: 'Discount',value: this.salesSummaryDto.discount},
      {name: 'Return',value: this.salesSummaryDto.returns},
      {name: 'Profit',value: this.salesSummaryDto.profit}
    );
  }

  getPieChartForCategorySales(){
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