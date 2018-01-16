import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StoreSetupDto } from 'app/shared/storesetup/storesetup.component';
import { environment } from 'environments/environment';




@Injectable()
export class StoreSetupService{
private url: string;
    storeDetails: StoreSetupDto;

    constructor(private http: Http)
    { 
      this.url = environment.reportUrl;
    }

    async getStoreDetails(): Promise<StoreSetupDto>
    {
      if(this.storeDetails )
      {
        return this.storeDetails;
      }
      else{
        this.storeDetails = await (this.http.get(this.url+'/getStoreSetupDetails')
       .map(this.extractData)
       .map((data) => data)
       
       .catch(this.handleError)).toPromise();
       ;
      }
        return this.storeDetails
    }

    saveStoreDetails(storeSetupDao: any){
      this.http.post(this.url+'/addStoreDetails', storeSetupDao)
      .subscribe(data => {
        console.log("Response From Add Store call" + data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }


    private extractData(res: Response): StoreSetupDto[] {
        let body = res.json();
        console.log(body);
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