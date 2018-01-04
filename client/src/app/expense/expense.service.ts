import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from 'app/sell/sell.component';
import { FormControl } from '@angular/forms/forms';
import { ExpenseInterface, ExpenseNameDto } from "app/expense/expense.component";
import { ClockInInterface } from "app/employee/clockin/clockin.component";
import { EmployeeInterface } from "app/employee/employee.component";




@Injectable()
export class ExpenseService {

    constructor(private http: Http) { }

    getExpenseDetails(startDate: string, endDate: string): Observable<ExpenseInterface[]> {
      return this.http.get('http://localhost:8080/getExpense?startDate='+startDate+'&endDate='+endDate)
      .map(this.extractData)
      .catch(this.handleError);
    }

    //This call to get expnese name for dropwodn on add expense page

      getExpenseNameDetails(): Observable<ExpenseNameDto[]> {
      return this.http.get('http://localhost:8080/getExpenseNames')
      .map(this.extractData)
      .catch(this.handleError);
    }

    getEmployeeDetails(): Observable<EmployeeInterface[]> {
      return this.http.get('http://localhost:8080/getEmployee')
      .map(this.extractData)
      .catch(this.handleError);
    }

    addOrUpdateExpense(expense: ExpenseInterface) {
      console.log('Expense Added' + expense.expenseName);
      this.http.post('http://localhost:8080/addExpense', expense)
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
      this.http.delete('http://localhost:8080/deleteExpense?expenseId=' + expenseId)
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