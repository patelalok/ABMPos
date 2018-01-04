import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ConfigService {
  private _isCustomerView: BehaviorSubject<boolean>; 
  constructor(private router: Router) {
    this._isCustomerView = new BehaviorSubject(false);

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        let url = event.urlAfterRedirects; 
        //  console.log("Ended up here", event.urlAfterRedirects); 
        if(url && url.includes('/sell-customer'))
          this._isCustomerView.next(true);  
        else 
          this._isCustomerView.next(false);
        
      }
    });
   }

  isCustomerView(): Observable<boolean>{
    return this._isCustomerView.asObservable(); 
  }
}
