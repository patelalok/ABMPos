import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { VendorTest } from "app/product/product.component";
import { environment } from 'environments/environment';

@Injectable()
export class VendorService {
  private url: string; 

    constructor(private http: Http) {
      this.url = environment.reportUrl; 
     }

    addOrUpdateVendor(vendor: VendorTest)
    {
      console.log("Vendor Added" + vendor.name);
      return this.http.post(this.url+'/addVendor', vendor)
    }

      deleteVendor(vendorId: number): Observable<Response>
    {
      return this.http.delete(this.url+'/deleteVendor?vendorId=' + vendorId);
    }
}