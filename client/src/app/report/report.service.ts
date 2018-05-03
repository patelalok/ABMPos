import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InventoryDto } from 'app/report/inventory/inventory.component';
import { SalesDto, SalesSummaryDto } from 'app/report/sales/sales.component';
import { environment } from 'environments/environment';
import { ResponseContentType } from '@angular/http';
import { Product, TransactionDtoList } from 'app/sell/sale/sale.component';
import { OpenInvoice } from './open-invoice/open-invoice.component';

@Injectable()
export class ReportService {
    private url: string; 
    constructor(private http: Http) { 
      this.url = environment.reportUrl; 
    }

    getInventoryDetails(inventoryReportBy: string): Observable<InventoryDto[]> {
        return this.http.get(this.url+'/getReportByInventory?inventoryReportBy=' + inventoryReportBy)
        .map(this.extractData)
        .catch(this.handleError);
      }

      getSalesDetails(salesReportBy: string, startDate: string, endDate: string): Observable<SalesDto[]> {

        return this.http.get(this.url+'/getReportBySales?salesReportBy=' + salesReportBy+'&startDate='+startDate+'&endDate='+endDate)
        .map(this.extractData)
        .catch(this.handleError);
      }
      getSalesSummaryReport(salesSummaryReportBy: string, startDate: string, endDate: string): Observable<SalesSummaryDto[]> {
        return this.http.get(this.url+'/getReportBySalesSummary?salesSummaryReportBy=' + salesSummaryReportBy+'&startDate='+startDate+'&endDate='+endDate)
        .map(this.extractData)
        .catch(this.handleError);
      }
      getDashboardSalesSummaryReport(salesSummaryReportBy: string, startDate: string, endDate: string): Observable<SalesSummaryDto> {
        return this.http.get(this.url+'/getDashboardReportBySalesSummary?salesSummaryReportBy=' + salesSummaryReportBy+'&startDate='+startDate+'&endDate='+endDate)
        .map(this.extractData)
        .catch(this.handleError);
      }
      getTop50SellingProductList(productReportType:string, startDate:string, endDate:string): Observable<Product[]> {
        return this.http.get(this.url+'/getTop50SellingItem?productReportType=' + productReportType+'&startDate='+startDate+'&endDate='+endDate)
        .map(this.extractData)
        .catch(this.handleError);
      }
      getOpneInvoiceDetails(startDate:string, endDate:string) : Observable<OpenInvoice[]>{
       return this.http.get(this.url+'/getOpenInvoice?startDate='+startDate+'&endDate='+endDate)
        .map(this.extractData)
        .catch(this.handleError);
      }
      getOpneInvoiceDetailsByCustomer(startDate:string, endDate:string, phoneNo: string) : Observable<TransactionDtoList[]>{
        return this.http.get(this.url+'/getAllPendingInvoiceByCustomer?startDate='+startDate+'&endDate='+endDate+'&phoneNo='+phoneNo)
         .map(this.extractData)
         .catch(this.handleError);
       }

      printInventoryReportPDF(options: ReportOptions): Observable<any> {
        let {inventoryReportBy} = options; 
        let url = this.url + `/printReportByInventory?inventoryReportBy=${inventoryReportBy}`;
        return this.http.get(
          url, 
          {responseType: ResponseContentType.Blob }
        )
        // .map(this.extractData)
        .catch(this.handleError);
      }
      printSalesReportPDF(salesReportBy: string, startDate: string, endDate: string): Observable<any> {
        let url = this.url + '/printReportBySalesSummary?salesSummaryReportBy='+salesReportBy+'&startDate='+ startDate+'&endDate='+endDate;
        return this.http.get(
          url, 
          {responseType: ResponseContentType.Blob }
        )
        // .map(this.extractData)
        .catch(this.handleError);
      }

      printOpenInvoiceDetails(startDate: string, endDate: string): Observable<any>{
        let url = this.url + '/printOpenInvoice?startDate='+ startDate+'&endDate='+endDate;
        return this.http.get(
          url, 
          {responseType: ResponseContentType.Blob }
        )
        // .map(this.extractData)
        .catch(this.handleError);
      }

      private extractData(res: Response): InventoryDto[] {
        let body = res.json();
        // console.log(body);
        return body || {};
      }
    
        private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
      }
}

interface ReportOptions {
  inventoryReportBy?: 'category' | 'brand' | 'vendor' | 'model' | 'product' | 'employee' | 'customer' | string; 
}

// http://localhost:8080/printReportByInventory?inventoryReportBy=category
