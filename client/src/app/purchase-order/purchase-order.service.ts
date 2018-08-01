import { Injectable } from '@angular/core';
import { PersistenceService } from '../shared/services/persistence.service';
import { environment } from 'environments/environment';
import { PurchaseOrderDao } from './purchase-order.component';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PurchaseOrderService {
  private url: string;

    constructor(private http: Http, private persit: PersistenceService) { 
      this.url = environment.reportUrl;
    }

    createPurchaseOrder(purchaseOrderDao: PurchaseOrderDao){
      return this.http.post(this.url+"/addPurchaseOrder", purchaseOrderDao)
      // .map(this.extractData) // this is not setting status code so not useful here.
      .catch(this.handleError);
    }

    getPurchaseOrderDetailsByDate(startDate:string, endDate: string): Observable<PurchaseOrderDao>{
      return this.http.get(this.url+"/getPurchaseOrder?startDate="+startDate+"&endDate="+endDate)
      .map(this.extractData)
      .catch(this.handleError);

    }

    private extractData(res: Response): any {
      let body = res.json();
      console.log(body);
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
