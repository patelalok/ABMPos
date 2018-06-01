import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { VendorTest } from "app/product/product.component";

@Injectable()
export class VendorService {

    constructor(private http: Http) { }

    addOrUpdateVendor(vendor: VendorTest)
    {
      console.log("Category Added" + vendor.name);
      this.http.post('http://localhost:8080/addVendor', vendor)
      .subscribe(data => {
        alert('Vendor Updated !!');
        console.log(data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

      deleteVendor(vendorId: number): Observable<Response>
    {
      return this.http.delete('http://localhost:8080/deleteVendor?vendorId=' + vendorId);
    }
}