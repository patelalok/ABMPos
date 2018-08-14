import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { environment } from 'environments/environment';
import { Category, SubCategory } from '../product.component';

@Injectable()
export class CategoryService {
  private url: string; 

  constructor(private http: Http) {
    this.url = environment.reportUrl; 
  }

  addOrUpdateCategory(category: Category) {
    return this.http.post(this.url+'/addCategory', category);
  }

  addOrUpdateSubCategory(subCategoryDao: SubCategory) {
    return this.http.post(this.url+'/addSubCategory', subCategoryDao);
  }

  deleteCategory(categoryId: number): Observable<Response> {
    return this.http.delete(this.url+'/deleteCategory?categoryId=' + categoryId)
  }

  deleteSubCategory(subCategoryId: number) {
    return this.http.delete(this.url+'/deleteSubCategory?subCategoryId=' + subCategoryId)
  }
}