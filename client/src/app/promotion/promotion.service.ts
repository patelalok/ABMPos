import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { SmsTemplate } from 'app/promotion/sms/sms.component';

@Injectable()
export class PromotionService {
  private url: string; 

  constructor(private http: Http) {
    this.url = environment.reportUrl; 
   }


   addOrUpdateSmsTemplate(template: SmsTemplate){
    return this.http.post(this.url+'/addSmsPromotionTemplate',template);
   }

   getAllSmsTemplate(): Observable<SmsTemplate[]>{
     return this.http.get(this.url+'/getAllSmsPromotionTemplate') 
     .map(this.extractData)
     .catch(this.handleError);
   }

   private extractData(res: Response): any[] {
    let body = res.json();
    // console.log(body);
    return body || {};
  }

    private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
