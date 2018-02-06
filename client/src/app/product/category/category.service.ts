import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { CategoryTest } from "app/product/product.component";
import { environment } from 'environments/environment';




@Injectable()
export class CategoryService {

  private url: string;

    constructor(private http: Http) {
      this.url = environment.reportUrl; 
     }

    addOrUpdateCategory(category: CategoryTest)
    {
      return this.http.post(this.url+'/addCategory', category);
    }

    deleteCategory(categoryId: number)
    {
      return this.http.delete(this.url+'/deleteCategory?categoryId=' + categoryId);
    }
}