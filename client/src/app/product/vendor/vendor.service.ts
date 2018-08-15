import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { VendorTest, Vendor } from "app/product/product.component";
import { environment } from 'environments/environment';

@Injectable()
export class VendorService {
  private url: string;

    constructor(private http: Http) { 
      this.url = environment.productUrl;
    }

    addOrUpdateVendor(vendor: VendorTest){
      return this.http.post(this.url+'/addVendor', vendor);
    }

    getVendorById(vendorId: number): Observable<Vendor> {
      return this.http.get(this.url+'/getVendorById?vendorId='+vendorId)
      .map(this.extractData)
      .catch(this.handleError);
    }

      deleteVendor(vendorId: number): Observable<Response>
    {
      return this.http.delete(this.url+'/deleteVendor?vendorId=' + vendorId);
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