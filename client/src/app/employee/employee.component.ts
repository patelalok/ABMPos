import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/employee/employee.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { SellRoutingModule } from 'app/sell/sell-routing.module';
import { Router } from '@angular/router';
import { DateDto, DateService } from 'app/shared/services/date.service';
import { ClockIn } from './clockin/clockin.component';
import * as moment from 'moment';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employeeDto: PrimeEmployee[];
  displayDialog = false;
  employee: EmployeeInterface = new PrimeEmployee();
  selectedEmployee: Employee;
  selectedEmployeeForDelete: Employee;
  msgs: Message[] = [];
  clockInDto: ClockIn[] = [];
  dateDto = new DateDto();
  employeeDetailsBy: string = 'Month';


  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private router: Router, private dateServie: DateService) { }

  ngOnInit() {

    this.getEmployeeDetails();
    this.employeeForm = this.formBuilder.group(
      {
        'name': [null, Validators.required],
        'phoneNo': ['', [Validators.required, Validators.pattern('^[0-9]+$')]], //TODO - Need to fix this for phono no.
        'username': ['', [Validators.required, Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z0-9.]+$')]], // TODO - Need to fox this too .com is not validating
        'dateOfBirth': [null],
        'taxId': [''],
        'street': [null],
        'role': [''],
        'password': [null],
        'gender': [''],
        'city': [''],
        'state': [''],
        'zipCode': [''],
        'hourlyRate': [''],
        'commissionPercentage': [''],
        'id': ['']
      }
    );
  }

  employeeClockInDetails(event) {
    //this.employeeService.saveData(event.data.username);
    console.log('employeeObjectFrom ui', event);
    this.router.navigate(['/clockIn', event.username]);
  }
  getEmployeeDetails() {
    this.employeeService.getEmployeeDetails()
      .subscribe((emp: Employee[]) => {
        this.employeeDto = emp;
      });
  }
  showDialog() {
    this.displayDialog = !this.displayDialog;
  }
  showDialogToAdd() {
    this.employee = new PrimeEmployee();
    this.displayDialog = true;
  }
  resrtForm() {
    this.employeeForm.reset();
  }
  addEmployee() {
    this.employeeService.addOrUpdateEmployee(this.employeeForm.value);
    this.employeeForm.reset();
    this.displayDialog = false;
  }

  updateEmployee(employee: Employee) {

    this.displayDialog = true;
    //Seeting the value into form for UPDATE TODO WRITE SEPARETE METHOD FOR THIS.
    this.employeeForm.get('name').setValue(employee.name);
    this.employeeForm.get('phoneNo').setValue(employee.phoneNo);
    this.employeeForm.get('username').setValue(employee.username);
    this.employeeForm.get('password').setValue(employee.password);
    this.employeeForm.get('taxId').setValue(employee.taxId);
    this.employeeForm.get('dateOfBirth').setValue(employee.dateOfBirth);
    this.employeeForm.get('role').setValue(employee.role);
    this.employeeForm.get('gender').setValue(employee.gender);
    this.employeeForm.get('street').setValue(employee.street);
    this.employeeForm.get('city').setValue(employee.city);
    this.employeeForm.get('state').setValue(employee.state);
    this.employeeForm.get('zipCode').setValue(employee.zipCode);
    this.employeeForm.get('hourlyRate').setValue(employee.hourlyRate);
    this.employeeForm.get('commissionPercentage').setValue(employee.commissionPercentage);
    this.employeeForm.get('id').setValue(employee.id);
  }
  setEmployyeForDelete(employee: Employee) {
    this.selectedEmployeeForDelete = employee;
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.selectedEmployeeForDelete.id);
    this.getEmployeeDetails();
  }

  onRowSelectFromEmployee(event) {

    this.selectedEmployee = event.data;
    this.getEmployeeDetailBy(this.employeeDetailsBy);
    this.setEmployeeDetailsForUpdate();
  }


  getEmployeeDetailBy(employeeDetailsBy: string) {
    this.employeeDetailsBy = employeeDetailsBy;

    if (employeeDetailsBy == 'Today') {
      this.dateDto = this.dateServie.getCurrentDay();
      this.getEmployeeClockInDetails();
    }
    else if (employeeDetailsBy == 'Week') {
      this.dateDto = this.dateServie.getCurrentWeek();
      this.getEmployeeClockInDetails();
    }
    else if (employeeDetailsBy == 'Month') {
      this.dateDto = this.dateServie.getCurrentMonth();
      this.getEmployeeClockInDetails();

    }
    else if (employeeDetailsBy == 'Year') {
      this.dateDto = this.dateServie.getCurrentYear();
      this.getEmployeeClockInDetails();
    }
  }

  getEmployeeClockInDetails() {

    if (this.selectedEmployee) {
      this.employeeService.getEmployeeClockInDetails(this.selectedEmployee.username, this.dateDto.startDate, this.dateDto.endDate)
        .subscribe((clockIn) => {

          clockIn.forEach((c)=>{
            c.onlyDate = moment(c.date).format('YYYY-MM-DD');

            let clockInHourMoment = moment(c.clockIn, 'HH:mm');
            let clockOutHourMoment = moment(c.clockOut,'HH:mm');

            if(c.clockOut != undefined && c.clockOut != NaN ){
              c.noOfHours = moment.duration(clockOutHourMoment.diff(clockInHourMoment)).asHours().toFixed(2);
              c.totalAmount = c.noOfHours *c.hourlyRate;
            }
          })
          this.clockInDto = clockIn;
          this.clockInDto = this.clockInDto.slice();
        })
      // this.employeeService.getEmployeesFinancialDetails(this.dateDto.startDate, this.dateDto.endDate,this.selectedCustomer.phoneNo)
      // .subscribe((financialDetails)=>{
      //   this.customerFinancialDto = financialDetails;
      // });
    }

  }

  setEmployeeDetailsForUpdate() {

    this.employeeForm.get('name').setValue(this.selectedEmployee.name);
    this.employeeForm.get('phoneNo').setValue(this.selectedEmployee.phoneNo);
    this.employeeForm.get('username').setValue(this.selectedEmployee.username);
    this.employeeForm.get('password').setValue(this.selectedEmployee.password);
    this.employeeForm.get('taxId').setValue(this.selectedEmployee.taxId);
    this.employeeForm.get('dateOfBirth').setValue(this.selectedEmployee.dateOfBirth);
    this.employeeForm.get('role').setValue(this.selectedEmployee.role);
    this.employeeForm.get('gender').setValue(this.selectedEmployee.gender);
    this.employeeForm.get('street').setValue(this.selectedEmployee.street);
    this.employeeForm.get('city').setValue(this.selectedEmployee.city);
    this.employeeForm.get('state').setValue(this.selectedEmployee.state);
    this.employeeForm.get('zipCode').setValue(this.selectedEmployee.zipCode);
    this.employeeForm.get('hourlyRate').setValue(this.selectedEmployee.hourlyRate);
    this.employeeForm.get('commissionPercentage').setValue(this.selectedEmployee.commissionPercentage);
    this.employeeForm.get('id').setValue(this.selectedEmployee.id);
  }

}

export class PrimeEmployee implements EmployeeInterface {
  constructor(public name?, public username?, public phoneNo?, public email?, public taxId?, public dateOfBirth?, public role?, public gender?, public address?, public commissionPercentage?, public storeCredit?, public lastUpdatedStoreCreditDate?, public password?, public hourlyRate?, public createdDate?) { }
}

export class Employee {
  id: number;
  name: string;
  username: string;
  phoneNo: string;
  email: any;
  taxId: any;
  dateOfBirth: any;
  role: any;
  gender: any;
  address: any;
  commissionPercentage: any;
  password: any;
  hourlyRate: any;
  createdDate: any;
  street: string;
  city: string;
  state: string;
  zipCode: number;


}

export interface EmployeeInterface {
  name?;
  username?;
  phoneNo?;
  email?;
  taxId?;
  dateOfBirth?;
  role?;
  gender?;
  address?;
  commissionPercentage?;
  password?;
  hourlyRate?;
  createdDate?;
}

