import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from 'app/sell/sell.component';
import { FormControl } from '@angular/forms/forms';
import { Category, Brand, Vendor, Model, ProductVariantDetail, CategoryTest, BackendProductDto } from 'app/product/product.component';
import { CustomerInterface } from 'app/customer/customer.component';
import { EmployeeInterface, Employee } from 'app/employee/employee.component';
import { ClockInInterface, ClockIn } from "app/employee/clockin/clockin.component";

export interface myData {
    name: string;
  }
@Injectable()
export class EmployeeService {


  sharingData: myData = {name: 'test'};

  saveData(str)
  {
    console.log('save data function called' + str + 'sharing data name' + this.sharingData.name);
    this.sharingData.name = str;

    console.log('sharing data now'+ this.sharingData.name);
  }

  getData(): string
  {
    console.log('get data function called'+ this.sharingData.name + 'sdfdsfdsfsd');
    return this.sharingData.name;
  }


constructor(private http: Http) { }

    getEmployeeDetails(): Observable<EmployeeInterface[]> {
      return this.http.get('http://localhost:8080/getEmployee')
      .map(this.extractData)
      .catch(this.handleError);
    }

    validateEmployee(username: any, password: any): Observable<boolean>{

      return this.http.get('http://localhost:8080/validateEmployeeForClockIn?username='+username+'&password='+password)
      .map(this.extractDataForLogin)
      .catch(this.handleError);
    }

    getEmployeeClockInDetails(username: string, startDate: any, endDate: any): Observable<ClockIn>
    {
      console.log('Username coming from the clock In component'+ username);
      return this.http.get('http://localhost:8080/getClockIn?username='+username+'&startDate='+startDate+'&endDate='+endDate)
      .map(this.extractData)
      .catch(this.handleError);
}
getEmployeeAllClockInDetails(username: string, startDate: any, endDate: any): Observable<ClockIn[]>
{
  console.log('Username coming from the clock In component'+ username);
  return this.http.get('http://localhost:8080/getAllClockIn?username='+username+'&startDate='+startDate+'&endDate='+endDate)
  .map(this.extractData)
  .catch(this.handleError);
}

    addOrUpdateEmployee(employee: Employee)
    {
     console.log('Employee to be Added' + employee.name);
      this.http.post('http://localhost:8080/addEmployee', employee)
      .subscribe(data => {
        console.log('Response From Add Employee call' + data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

    addClockInDetails(clockIn: ClockIn)
    {
      this.http.post('http://localhost:8080/addClockIn', clockIn)
      .subscribe(data => {
        console.log('Response From Add Clockin call' + data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

    deleteEmployee(id: number)
    {
      this.http.delete('http://localhost:8080/deleteEmployee?id=' + id)
       .subscribe(data => {
        console.log('Customer Deleted With this !!' + id);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });

    }

    private extractData(res: Response): Employee[] {
    let body = res.json();
    // console.log(body);
    return body || {};
  }
  private extractDataForLogin(res: Response): any {
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

  