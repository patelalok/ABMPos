import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { BrandTest, Brand } from "app/product/product.component";
import { environment } from 'environments/environment';




@Injectable()
export class BrandService {
  private url: string; 

    constructor(private http: Http) {
      this.url = environment.reportUrl; 

     }

    addOrUpdateBrand(brand: BrandTest)
    {
     return this.http.post(this.url+'/addBrand', brand);
    }

      deleteBrand(brandId: number) : Observable<Response>
    {
      return this.http.delete(this.url+'/deleteBrand?brandId=' + brandId)
    }
}