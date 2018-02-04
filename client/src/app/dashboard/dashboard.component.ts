import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/report/report.service';
import { SalesDto, SalesSummaryDto } from 'app/report/sales/sales.component';
import { ChartDto } from 'app/report/inventory/inventory.component';
import { MatTableDataSource } from '@angular/material';
import { Product } from 'app/sell/sale/sale.component';

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
;
displayedColumns = ['name','cost', 'retail', 'quantity'];
dataSource = new MatTableDataSource<Product>();

view: any[] = [700, 400];

colorScheme = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};

  constructor(private reportService: ReportService) { 

  }

  ngOnInit() {

    this.getTop50SellingProductList();
    this.getSaleSummaryDetails();
    this.getSalesByCategoryDetails();
  }

  onSelect(event) {
    console.log(event);
  }

  getSaleSummaryDetails(){

    this.reportService.getDashboardSalesSummaryReport('Sales By Year', '2018-01-01 00:00:00', '2018-12-31 23:59:59')
        .subscribe((sales: SalesSummaryDto) => {
          this.salesSummaryDto = sales;
          this.getNumberCardDetailsForSales();
        });
  }

  getSalesByCategoryDetails(){
    this.reportService.getSalesDetails('Sales By Category','2018-01-01 00:00:00', '2018-12-31 23:59:59')
    .subscribe((sales: SalesDto[]) => {
      this.salesDto = sales;
      this.getPieChartForCategorySales();
    });
  }
  getTop50SellingProductList(){
    this.reportService.getTop50SellingProductList('Top50SellingItem','2018-01-01 00:00:00', '2018-12-31 23:59:59')
    .subscribe((product: Product[]) => {
      this.productDto = product;
      this.dataSource.data = this.productDto;
      //this.getPieChartForCategorySales();
    });
  }

  getNumberCardDetailsForSales(){

    //this.numberCardChartData = null;
    this.numberCardChartData = null;
    this.numberCardChartData = []; 
    this.numberCardChartData.push(
      {
      name: 'Cash',value: this.salesSummaryDto.cash} ,
      {name: 'Credit',value: this.salesSummaryDto.credit},
      {name: 'Debit',value: this.salesSummaryDto.debit},
      {name: 'Check',value: this.salesSummaryDto.check},
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