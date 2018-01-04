import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from 'app/sell/sell.component';
import { FormControl } from '@angular/forms/forms';
import { CategoryTest, BrandTest, Brand } from "app/product/product.component";




@Injectable()
export class BrandService {

    constructor(private http: Http) { }

    addOrUpdateBrand(brand: BrandTest)
    {
      console.log("Brand Added" + brand.name);
      this.http.post('http://localhost:8080/addBrand', brand)
      .subscribe(data => {
        alert('Brand Updated !!');
        console.log(data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

      deleteBrand(brandId: number)
    {
      this.http.delete('http://localhost:8080/deleteBrand?brandId=' + brandId)
      .subscribe(data => {
        alert('Brand Deleted !!');
        console.log(data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }
}