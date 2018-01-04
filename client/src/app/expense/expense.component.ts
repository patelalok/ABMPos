import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'app/expense/expense.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { SellRoutingModule } from 'app/sell/sell-routing.module';
import { Router } from '@angular/router';
import { PrimeEmployee, Employee } from "app/employee/employee.component";
import * as moment from 'moment';
import { DateService, DateDto } from 'app/shared/services/date.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseForm: FormGroup;
  expenseDto: PrimeExpense[];
  expenseNameDto: ExpenseNameDto[];
  expense: ExpenseInterface = new PrimeExpense();
  selectedExpense: Expense;
  msgs: Message[] = [];
  expenseDate: Date;
  employeeDto: PrimeEmployee[];
  selectedExpenseForDelete = new Expense();
  expenseDropDown: string = 'Today';
  dateDto = new DateDto();




  constructor(private expenseService: ExpenseService, private formBuilder: FormBuilder, private router: Router, private dateService: DateService) { }

  ngOnInit() {
    this.getExpenseDetails();
    this.getExpenseNameList();
    this.getEmployeeDetails();

    this.expenseForm = this.formBuilder.group(
      {
        'expenseName': [null, Validators.required],
        'date': [null],
        'amount': [null, Validators.required],
        'expenseOwner': [null],
        'expenseNotes': [null],
        'expenseId': [null],
        'expenseDocument': [null]
      }
    );
  }

  getExpenseHistory(event) {
    //this.employeeService.saveData(event.data.username);
    console.log('employeeObjectFrom ui', event);
    this.router.navigate(['/clockIn', event.username]);
  }
  getExpenseDetails() {

    this.dateDto = this.dateService.getDateByInput(this.expenseDropDown);

    this.expenseService.getExpenseDetails(this.dateDto.startDate, this.dateDto.endDate)
      .subscribe((emp: Expense[]) => {

        emp.forEach(emp => {
          emp.time = moment(emp.date).format('hh:mm A');
          emp.date = moment(emp.date).format('MM-DD-YYYY');
        })
        this.expenseDto = emp;

        console.log('Expense Detail', this.expenseDto);
      });
  }

  getExpenseNameList() {
    this.expenseService.getExpenseNameDetails()
      .subscribe((pro: ExpenseNameDto[]) => {
        this.expenseNameDto = pro;

        //This set the defualt value for dropdown
        this.expenseForm.get('expenseName').setValue(this.expenseNameDto[0].expenseName);
        console.log('Expense List', this.expenseNameDto);

      });
  }

  //This is for drop down menu to choose the employee for.
  getEmployeeDetails() {
    this.expenseService.getEmployeeDetails()
      .subscribe((pro: Employee[]) => {
        this.employeeDto = pro;

        //This set the defualt value for dropdown
        this.expenseForm.get('expenseOwner').setValue(this.employeeDto[0].name);
        console.log('Employee List', this.employeeDto);

      });
  }

  addExpense() {

    this.expenseService.addOrUpdateExpense(this.expenseForm.value);
    this.resrtForm();

  }

  updateExpense(expense: Expense) {

    this.expenseForm.get('expenseName').setValue(expense.expenseName);
    this.expenseForm.get('date').setValue(expense.date);
    this.expenseForm.get('amount').setValue(expense.amount);
    this.expenseForm.get('expenseOwner').setValue(expense.expenseOwner);
    this.expenseForm.get('expenseId').setValue(expense.expenseId);
    this.expenseForm.get('expenseDocument').setValue(expense.expenseDocument);
    this.expenseForm.get('expenseNotes').setValue(expense.expenseNotes);

  }

  setExpenseForDelete(expense: Expense) {

    this.selectedExpenseForDelete = expense;

  }

  deleteExpense() {
    this.expenseService.deleteExpense(this.selectedExpenseForDelete.expenseId);
  }

  resrtForm() {
    //Need to do this because when you close the popup its not showing value into dropdow list.
    this.expenseForm.reset(); this.expenseForm.reset();
    this.expenseForm.get('expenseName').setValue(this.expenseNameDto[0].expenseName);
    this.expenseForm.get('expenseOwner').setValue(this.employeeDto[0].name);

  }
}

class PrimeExpense implements ExpenseInterface {
  constructor(public expenseId?, public expenseName?, public date?, public amount?, public expenseOwner?, public expenseDocument?, public expenseNotes?) { }
}

export class Expense {
  expenseId: number;
  expenseName: string;
  date: any;
  amount: any;
  expenseOwner: any;
  expenseDocument: any;
  expenseNotes: any;
  time: any;
}

export interface ExpenseInterface {
  expenseId?;
  expenseName?;
  date?;
  amount?;
  expenseOwner?;
  expenseDocument?;
  expenseNotes?;
}

export class ExpenseNameDto {
  expenseNameId: number;
  expenseName: string;
}




