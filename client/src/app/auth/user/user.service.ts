import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { environment } from "../../../environments/environment";
import { Login } from '../interfaces/login';
import { RouterStateSnapshot, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { PersistenceService } from 'app/shared/services/persistence.service';

import * as Moment from "moment" ; 

@Injectable()
export class UserService {
  private url: string;
  private _isAuthenticated: BehaviorSubject<boolean>;
  private _loginErrors: BehaviorSubject<{ value: boolean, error?: any }>;
  private user: any;
  private fetching: Subject<boolean>;
  session: User;
  constructor(private http: Http, private router: Router) {
    this.url = environment.userUrl;
    this._isAuthenticated = new BehaviorSubject(false);
    this._loginErrors = new BehaviorSubject({ value: false, error: null });
    this.checkUserSession(); 
  }

  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }
  loginErrors(): Observable<{ value: boolean, error?: any }> {
    return this._loginErrors.asObservable();
  }
  //For sync calls 
  async authNStatus() {
    let authState = false;
    if (this.session) {
      // console.log("Session present.");
      authState = true;
    }
    // else {
    //   if (!this.fetching) {
    //     // console.log("Not fetching..", this.fetching, this.session);
    //     authState = false;
    //   }
    //   else
    //     authState =
    //       await this.fetching.asObservable()
    //         .map((data) => {
    //           // console.log("Fetching, just finished with", data);
    //           if (this.session)
    //             return true;
    //           else
    //             return false;
    //         })
    //         .toPromise();
    // }
    return authState;
  }
  checkUserSession() {
    console.log('+++++++++++++caling checkUserSession');
    this.fetching = new Subject();
    this.session = null;
    console.log("Checking user session...")
    this.checkSessionHttpRequest()
      // .switchMap((session) => {
      //   return 
      //     // .switch
      // })
      .subscribe(
      (session) => {

        // this.electionService.getAllElections()
        // .subscribe((list) => {
          
          console.log("Checking if session valid...",session);
          if(session){
            this.session = session;

            console.log("Checking if session valid session...", this.session);
            if(this.session.name && this.session.name.length > 1) {
              this._isAuthenticated.next(true);
            }
            else {
              this._isAuthenticated.next(false);
            }
            
          }
          else{
            this._isAuthenticated.next(false);
          }
          
        // })
      },
      (err) => {
        // this._userDetails.next(undefined);
        console.error(err);
        this._isAuthenticated.next(false);
      },
      () => {
        this.fetching.next(false);
        this.fetching.complete();
        this.fetching = null;
              }
      );
  }
  userLogin(login: Login): void {
    this.fetching = new Subject();
    this.session = null;
    this.loginHttpRequest(login)
      .subscribe(
      (session: User) => {
        if(session){
          this.session = session;
          if(this.session.name && this.session.name.length > 1) {
            this._isAuthenticated.next(true);
          }
          else {
            this._isAuthenticated.next(false);
          }
          this.storeUserCredentials(session);
        }
        else{
          this._isAuthenticated.next(false);
        }
      },
      (err) => {
        // this._userDetails.next(undefined);
        console.log(err);
        console.log("In Error");
        this._loginErrors.next({ value: true, error: err });
        this._isAuthenticated.next(false);
      },
      () => {
        this.fetching.next(false);
        this.fetching.complete();
        this.fetching = null;
      }
      );

  }
  userLogout() {
    // this.fetching = new Subject();
    this.session = null;   
    this.removeStoredUserCredentials();

    // location.reload();
    this.router.navigate(['/login']);    // console.log("Authentication user...")
    // this.logoutHttpRequest()
    //   .subscribe(
    //   (session) => {
    //     // this.session = null;
    //     console.log("Here is the session ", this.session);
    //     this._isAuthenticated.next(false);
    //   },
    //   (err) => {
    //     // this._userDetails.next(undefined);
    //     this._isAuthenticated.next(false);
    //   },
    //   () => {
    //     this.fetching.next(false);
    //     this.fetching.complete();
    //     this.fetching = null;
    //   });
  }
  getLoggedInUserDetails(): Observable<User>{
    let url = this.url + '/user';
    return this.http.get(url, {withCredentials: true})
    .map(this.extractData)
    .catch(this.handleError)
    .map((dto) => new User(dto));
  }
  private loginHttpRequest(login: Login): Observable<User> {
    let url = this.url + `/validateEmployeeForClockIn?username=${login.username}&password=${login.password}`;
    // let body = new FormData();
    // body.append('emailAddress', login.username);
    // body.append('password', login.password);
    return this.http.get(url)
      .map(this.extractData)
      .map(dto => new User(dto))
      // .map((response) => {
      //   this.checkUserSession();
      //   return new Session(response);
      // })
      // .catch(this.handleError);
  }
  private logoutHttpRequest(): Observable<Session> {
    let url = this.url + '/signOut';
    let body = new FormData();
    return this.http.get(url, { withCredentials: true })
      .map(this.extractData)
      .map((response) => new Session(response))
      .catch(this.handleError);
  }

  private checkSessionHttpRequest(): Observable<User> {
    let login: Login = this.getStoredUserCerdentials() || {username: null, password: null, role: ''};
    let url = this.url + `/validateEmployeeForClockIn?username=${login.username}&password=${login.password}`;
    // let body = new FormData();
    // body.append('emailAddress', login.username);
    // body.append('password', login.password);
    return this.http.get(url)
      .map(this.extractData)
      .map((dto: UserDTO) => {

        if(dto && dto.username)
        {
          return new User(dto);
        }

        else 
          return null; 
      })
      .catch(this.handleError)
      // .map((response) => new Session(response))
  }

  storeUserCredentials(login: any){
    login = {
      ...login,
      createdAt : (new Date()).toISOString(),
      role: this.session.role,
    };

    localStorage.setItem('poslogin', JSON.stringify(login));
  }
  getStoredUserCerdentials(): Login{
    let loginStr = localStorage.getItem('poslogin'); 
    
    // console.log(loginStr); 
    
    if(loginStr){
      let login: Login = JSON.parse(loginStr);
      return login;

      // const minutesAgo30 = Moment().subtract(environment.loginExpireWithinMinutes, 'minutes'); 
      // console.log('30 mintues ago', minutesAgo30.toDate()); 
      // console.log('Timenow', Moment().toDate())
      // const isTimeWithin30Minutes = Moment(login.createdAt).isBetween(minutesAgo30, Moment()); 

      // console.log('Login time', Moment(login.createdAt).toDate()); 
      // if(isTimeWithin30Minutes){
        // console.log('Last Logged within 30 minutes'); 
        // return login;
      // }
      // console.log('Removing login.. ', loginStr); 
      // localStorage.removeItem('poslogin');
    }
      return {username: null, password: null, role: ''}
  }
  removeStoredUserCredentials(){
    localStorage.removeItem('poslogin');
  }
  private extractData(res: Response): any {
    
    let body; 
    try{
      body = res.json();
    }
    catch(error){
      console.log('Cannot parsee the recived reponse to JSON');
    }
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

interface LoginDTO {
  emailAddress: string,
  password: string
}

interface SessionDTO {
  userType: string,
  campaignId: string,
  host: string,
  accountId: string,
  userId: string,
  sessionId: string,
  campaignName: string,
  jurisdictionState: string,
  nextElectionYear: string,
  
}

class Session {
  role: "admin" | "candidate" | "unknown";
  accountId: string;
  userId: string;
  
  jurisdictionState: string;
  nextElectionYear: number;
  electionType: string;

  constructor(dto?: SessionDTO) {
    if(dto){
      switch (dto.userType) {
        case "Admin":
          this.role = "admin";
          break;
        case "Candidate":
          this.role = "candidate";
          break;
        default:
          this.role = "unknown";
          break;
      }
      this.accountId = dto.accountId;
      this.userId = dto.userId;
      
      // let state = stateList.find((el) => el.stateCode == dto.jurisdictionState); 
      // if(state)
      //   this.jurisdictionState = state.stateCode; 
      // else 
      //   this.jurisdictionState = null; 

      this.nextElectionYear = Number.parseInt(dto.nextElectionYear); 
    }
  }
}
export class User{
  name: string; 
  phoneNumber: string; 
  emailAddress: string;
  role: string;


  constructor(dto: UserDTO){
    this.name = dto.name;
    this.phoneNumber = dto.phoneNo; 
    this.emailAddress = dto.email; 
    this.role = dto.role;
  }
}
interface UserDTO{
  name: string; 
  username: string;
  email: string;
  password: string;
  phoneNo: string;
  role: string;
  commissionPercentage: string;
  hourlyRate: string;
  createdDate: string;
  taxId: string;
  street: string;
  state: string;
  city: string;
  zipCode: string;
  gender: string;
  updatedTimestamp: string;
}