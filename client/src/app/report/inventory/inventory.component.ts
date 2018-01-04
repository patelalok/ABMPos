import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { ReportService } from 'app/report/report.service';
import { environment } from 'environments/environment';
import { printBlob } from 'app/shared/services/util.service';

// import * as printJS from "print-js"; 

// declare var printJS: any; 

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  inventoryDto: InventoryDto[] = [];
  inventoryDropdown: string = 'Category';
  chartDto = new ChartDto();

  pieChartData: ChartDto[];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#337ab7', '#28a745', '#ff6666', '#fd7e14', '#495057', '#A059B5', '#56BAD6']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  onSelect(event) {
    console.log(event);
  }
  constructor(private reportService: ReportService) { }

  ngOnInit() {

    this.getInventoryReport(this.inventoryDropdown);
    // this.printInventoryReportBy('category');

  }

  getInventoryReport(inventoryReportBy: string) {

    this.reportService.getInventoryDetails(inventoryReportBy)
      .subscribe((inventory: InventoryDto[]) => {
        this.inventoryDto = inventory;
        this.getPieChartDetails();
      })
  }

  getPieChartDetails() {

    console.log('inventoryDto', this.inventoryDto);
    this.pieChartData = null;
    this.pieChartData = [];
    this.inventoryDto.forEach((inventory) => {
      this.pieChartData.push({
        name: inventory.name,
        value: inventory.quantity
      });
    });

  }

  printInventoryReportBy(inventoryReportBy: string) {    
    this.reportService.printInventoryReportPDF({ inventoryReportBy: inventoryReportBy })
      .subscribe((data) => {
        printBlob(data._body);
        
      });


  }
}

export class InventoryDto {
  name: string;
  cost: number;
  retail: number;
  markup: number;
  quantity: number;
}

export class ChartDto {
  name: string;
  value: any;
}