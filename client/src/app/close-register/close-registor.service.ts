import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';import { Observable } from 'rxjs/Observable';
import { CloseRegisterDto } from 'app/close-register/close-register.component';
import { environment } from 'environments/environment';

@Injectable()
export class CloseRegistorService {
  private url: string; 
  constructor(private http: Http) {
    this.url = environment.reportUrl; 
   }

  getCloseRegisterDetails(startDate: any, endDate: any): Observable<CloseRegisterDto> {
    return this.http.get(this.url+'/getCloseRegisterDetailsByDate?startDate='+startDate+'&endDate='+endDate)
    .map(this.extractData)
    .catch(this.handleError);
  }

  saveCloseRegisterDetail(closeRegisterObj: CloseRegisterDto) {
    this.http.post(this.url+'/addCloseRegisterDetails', closeRegisterObj)
    .subscribe(data => {
      console.log("Response From Add Close Register call" + data);
    },
      error => {
    console.log(JSON.stringify(error.json()));
  });
  }

  private extractData(res: Response): CloseRegisterDto {
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
