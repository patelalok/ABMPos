import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/employee/employee.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-clockin',
  templateUrl: './clockin.component.html',
  styleUrls: ['./clockin.component.css']
})
export class ClockinComponent implements OnInit {

  // clockInForm: FormGroup;
  clockInDto: PrimeClockIn[];
  displayDialog = false;
  newClockIn: boolean;
  clockIn: ClockInInterface = new  PrimeClockIn();
  showDeleteButton = true;
  selectedEmployee: ClockIn;
  msgs: Message[] = [];
  username: string;

  constructor(private employeeService: EmployeeService, private router: Router,  private route: ActivatedRoute) { }



  ngOnInit() {

    this.route.paramMap
    .switchMap((params: ParamMap) =>
  this.employeeService.getEmployeeAllClockInDetails(params.get('username'), null, null))
    .subscribe((emp: ClockIn[]) => {
    this.clockInDto = emp;
   
   });
  }

  //this.getClockInDetails();
    // this.clockInForm = this.formBuilder.group(
    //     {
          // 'name': [null, Validators.required],
          // 'phoneNo': ['', [Validators.required, Validators.pattern('^[0-9]+$')]], //TODO - Need to fix this for phono no.
          // 'username': ['',[Validators.required, Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z0-9.]+$')]], // TODO - Need to fox this too .com is not validating
          // 'dateOfBirth': [null],
          // 'taxId': [''],
          // 'street': [null],
          // 'role': [''],
          // 'password': [null],
          // 'gender': [''],
          // 'city': [''],
          // 'state': [''],
          // 'zipCode':  [''],
          // 'hourlyRate': [''],
          // 'commissionPercentage': ['']

      //   }
      // );

updateClockInDetails()
{

}
deleteClockInDetails()
{

}
  // getClockInDetails() {
  //   this.employeeService.getEmployeeClockInDetails()
  //   .subscribe((emp: ClockIn[]) => {
  //   this.clockInDto = emp;

  //   //This set the defualt value for dropdown
  //   // this.employeeForm.get('role').setValue('Admin');
  //   // this.employeeForm.get('city').setValue('Atlanta');
  //   // this.employeeForm.get('state').setValue('AB');
  //   // this.employeeForm.get('gender').setValue('Male');

  //     console.log('Employee Detail' + this.clockInDto);
  //     });
  // }

      showDialog() {
        this.displayDialog = !this.displayDialog;
  }

  resrtForm()
  {
   // this.clockInForm.reset();
  }

  save()
  {
     let newClockInDto = [...this.clockInDto];

        if (this.newClockIn) {
            newClockInDto.push(this.clockIn);
            //this.employeeService.addOrUpdateEmployee(this.clockIn.value);
             this.showSuccess('success', 'Insert', 'Customer Added Successfully!!');
             //this.getClockInDetails();

             //this.clockInForm.reset();
            this.displayDialog = false;
          }
          else {
              // newEmployeeDto[this.findSelectedCustomerIndex()] = this.employee;
              // this.employeeDto = newEmployeeDto;
              // this.employeeService.addOrUpdateEmployee(this.employeeForm.value);
              // this.employee = null;
              // this.getEmployeeDetails();
              // this.showSuccess('success', 'Update', 'Employee Updated Successfully!!');
              // this.displayDialog = false;
            }
    }
          delete()
          {
            // this.employeeService.deleteEmployee(this.employeeForm.value.phoneNo);
            //               this.getEmployeeDetails();

            // this.displayDialog = false;
          }
        showDialogToAdd() {
        this.newClockIn = true;
        this.clockIn = new PrimeClockIn();
        this.showDeleteButton = false;
        this.displayDialog = true;

    }

        onRowSelect(event) {
        this.newClockIn = false;
        this.clockIn = this.cloneCar(event.data);
        this.showDeleteButton = true;

        //Seeting the value into form for UPDATE TODO WRITE SEPARETE METHOD FOR THIS.
        // this.employeeForm.get('name').setValue(event.data.name);
        // this.employeeForm.get('phoneNo').setValue(event.data.phoneNo);
        // this.employeeForm.get('username').setValue(event.data.username);
        // this.employeeForm.get('password').setValue(event.data.password);
        // this.employeeForm.get('taxId').setValue(event.data.taxId);
        // this.employeeForm.get('dateOfBirth').setValue(event.data.dateOfBirth);
        // this.employeeForm.get('role').setValue(event.data.role);
        // this.employeeForm.get('gender').setValue(event.data.gender);
        // this.employeeForm.get('street').setValue(event.data.street);
        // this.employeeForm.get('city').setValue(event.data.city);
        // this.employeeForm.get('state').setValue(event.data.state);
        // this.employeeForm.get('zipCode').setValue(event.data.zipCode);
        // this.employeeForm.get('hourlyRate').setValue(event.data.hourlyRate);
        // this.employeeForm.get('commissionPercentage').setValue(event.data.commissionPercentage);



        console.log('Customer Even', event);
        console.log(event.data);
        console.log(this.selectedEmployee);

        this.displayDialog = true;
    }
           showSuccess(severity: string, summary: string, detail: string) {
        this.msgs = [];
        this.msgs.push({severity: severity, summary: summary, detail: detail});
    }
    //Why??
    cloneCar(c: ClockIn): ClockInInterface {
        let emp = new PrimeClockIn();
        for(let prop in c) {
            emp[prop] = c[prop]; }
        return emp;
    }
      findSelectedCustomerIndex(): number {
      return this.clockInDto.indexOf(this.selectedEmployee);
}

}

class PrimeClockIn implements ClockInInterface
{

  constructor(public date?, public userClockInId? ,public username?, public clockIn?, public clockOut?, public noOfHours?, public hourlyRate?, public totalAmount?, public commissionAmount?) {}
}

export class ClockIn {
  userClockInId: number;
  date: string;
  username: string;
  clockIn: any;
  clockOut: any;
  noOfHours: any;
  hourlyRate: any;
  totalAmount: any;
  commissionAmount: any;
  noOfMinute: any;
  onlyDate: any;
}

export interface ClockInInterface {
  userClockInId?;
  date?;
  username?;
  clockIn?;
  clockOut?;
  noOfHours?;
  hourlyRate?;
  totalAmount?;
  commissionAmount?;
}


