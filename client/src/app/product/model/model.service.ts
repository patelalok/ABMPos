import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { ModelTest } from 'app/product/product.component';
import { environment } from 'environments/environment';




@Injectable()
export class ModelService {
  private url: string; 

    constructor(private http: Http) {
      this.url = environment.productUrl;
     }

    addOrUpdateModel(model: ModelTest)
    {
      return this.http.post(this.url+'/addModel', model)
    }
      deleteModel(modelId: number) : Observable<Response> {
      return this.http.delete(this.url+'/deleteModel?modelId=' + modelId);
    }
}