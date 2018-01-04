import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from 'app/sell/sell.component';
import { FormControl } from '@angular/forms/forms';
import { CategoryTest } from "app/product/product.component";




@Injectable()
export class CategoryService {

    constructor(private http: Http) { }

    addOrUpdateCategory(category: CategoryTest)
    {
      console.log("Category Added" + category.name);
      this.http.post('http://localhost:8080/addCategory', category)
      .subscribe(data => {
        alert('Category Updated !!');
        console.log(data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

      deleteCategory(categoryId: number)
    {
      this.http.delete('http://localhost:8080/deleteCategory?categoryId=' + categoryId)
      .subscribe(data => {
        alert('Category Deleted !!');
        console.log(data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }
}