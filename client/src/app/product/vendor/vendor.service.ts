import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from 'app/sell/sell.component';
import { FormControl } from '@angular/forms/forms';
import { CategoryTest, VendorTest } from "app/product/product.component";




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

      deleteVendor(vendorId: number)
    {
      this.http.delete('http://localhost:8080/deleteVendor?vendorId=' + vendorId)
      .subscribe(data => {
        alert('Vendor Deleted !!');
        console.log(data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }
}