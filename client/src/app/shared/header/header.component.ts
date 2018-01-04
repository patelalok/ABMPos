import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/employee/employee.service';
import { Employee } from 'app/employee/employee.component';
import { DateService, DateDto } from 'app/shared/services/date.service';
import { ClockIn } from 'app/employee/clockin/clockin.component';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from 'app/auth/user/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  employeeDto: Employee[] = [];
  clockInForm: FormGroup;
  dateDto =  new DateDto();
  clockInDto: ClockIn[] = [];
  clockInObj = new ClockIn();
  //testClockInObj: ClockIn;
  noOfHours: number;
  noOfMinute: number;
  isClockIn: boolean = false;
  te: number;
  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private dateService: DateService, private userService: UserService) { }

  ngOnInit() {

    this.getEmployeeDetails();

    this.clockInForm = this.formBuilder.group(
      {
        'username': ['',Validators.required],
        'password': ['', Validators.required]
      }
    );

    // this.clockInForm.get('username').setValue(this.employeeDto[0].username);
  }

  getEmployeeDetails() {
    this.employeeService.getEmployeeDetails()
      .subscribe((emp: Employee[]) => {
        this.employeeDto = emp;
      });
  }

  getClockInDetails() {

    this.clockInObj.username = this.clockInForm.get('username').value;
    this.dateDto = this.dateService.getCurrentDay();

    // Need to do this becuase when user chnage the username from dropdown, if the one user is clocked in it is showing for clock out for all users which is wrond, so this helps to fix this problem.
    this.isClockIn = false;

    this.employeeService.getEmployeeClockInDetails(this.clockInForm.get('username').value, this.dateDto.startDate, this.dateDto.endDate)
    .subscribe((alok) => {
      this.clockInObj = alok;

      // this mean user has alredy clocked in
      if(this.clockInObj)
      {
        let currentHour = moment(Date.now()).format('HH');
        let currentMinute = moment(Date.now()).format('mm');

        let clockInHour = moment(this.clockInObj.clockIn).format('HH');
        let clockInMinute =  moment(this.clockInObj.clockIn).format('mm');

        this.noOfHours = (+currentHour - +clockInHour);

        this.noOfMinute = (+currentMinute - +clockInMinute);

        this.clockInObj.noOfHours = this.noOfHours;
        this.clockInObj.noOfMinute =  this.noOfMinute;
      
        console.log('no of hours', this.noOfHours);


        let now  =  moment(Date.now());
      
        let dateMoment = moment(now,'YYYY-MM-DD HH:mm:ss');

        let duration = moment.duration(dateMoment.diff(this.clockInObj.clockIn)).asHours().toFixed(2);
        //let hours = duration.asHours().toFixed(2);

        console.log('hours', duration);

        this.isClockIn = true;
      }
    });
     

  }
  validateAndAddClockInDetails() {

    this.employeeService.validateEmployee(this.clockInForm.get('username').value, this.clockInForm.get('password').value)
    .subscribe((valid) => {

      if(valid && !this.isClockIn) {
        this.clockInObj.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.clockInObj.clockIn = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.employeeService.addClockInDetails(this.clockInObj);
      }

      else if(valid && this.isClockIn) {

        this.clockInObj.clockOut = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.clockInObj.noOfHours = this.noOfHours;
        this.clockInObj.noOfMinute = this.noOfMinute;
        this.employeeService.addClockInDetails(this.clockInObj);
      }

    });

    this.clockInForm.reset();

  }

  logout(){
    this.userService.userLogout();
  }
 
}
