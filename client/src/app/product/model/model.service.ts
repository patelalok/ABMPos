import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { ModelTest } from 'app/product/product.component';




@Injectable()
export class ModelService {
  private url: string; 

    constructor(private http: Http) { }

    addOrUpdateModel(model: ModelTest)
    {
      
      return this.http.post('http://localhost:8080/addModel', model)
    }

      deleteModel(modelId: number)
    {
      this.http.delete('http://localhost:8080/deleteModel?modelId=' + modelId)
      .subscribe(data => {
        alert('Model Deleted !!');
        console.log(data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }
}