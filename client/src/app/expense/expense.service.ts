import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { ExpenseInterface, ExpenseNameDto } from "app/expense/expense.component";
import { ClockInInterface } from "app/employee/clockin/clockin.component";
import { EmployeeInterface } from "app/employee/employee.component";
import { environment } from 'environments/environment';
import { Product } from 'app/sell/sale/sale.component';




@Injectable()
export class ExpenseService {
  private url: string; 

    constructor(private http: Http) { 

      this.url = environment.reportUrl; 
    }

    getExpenseDetails(startDate: string, endDate: string): Observable<ExpenseInterface[]> {
      return this.http.get(this.url+'/getExpense?startDate='+startDate+'&endDate='+endDate)
      .map(this.extractData)
      .catch(this.handleError);
    }

    //This call to get expnese name for dropwodn on add expense page

      getExpenseNameDetails(): Observable<ExpenseNameDto[]> {
      return this.http.get(this.url+'/getExpenseNames')
      .map(this.extractData)
      .catch(this.handleError);
    }

    getEmployeeDetails(): Observable<EmployeeInterface[]> {
      return this.http.get(this.url+'/getEmployee')
      .map(this.extractData)
      .catch(this.handleError);
    }

    addOrUpdateExpense(expense: ExpenseInterface) {
      console.log('Expense Added' + expense.expenseName);
      this.http.post(this.url+'/addExpense', expense)
      .subscribe(data => {
        console.log(data);
        // this.getExpenseNameDetails();
        console.log("getExpnese call is done !!");
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

      deleteExpense(expenseId: number) {
      this.http.delete(this.url+'/deleteExpense?expenseId=' + expenseId)
      .subscribe(data => {
        alert('Expense Deleted !!');
        console.log(data);
      },
        error => {
      console.log(JSON.stringify(error.json()));
    });
    }

    private extractData(res: Response): Product[] {
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