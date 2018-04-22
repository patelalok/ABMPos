import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/employee/employee.service';
import { Employee } from 'app/employee/employee.component';
import { DateService, DateDto } from 'app/shared/services/date.service';
import { ClockIn } from 'app/employee/clockin/clockin.component';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from 'app/auth/user/user.service';
import { ToastsManager } from 'ng2-toastr';
declare var $: JQueryStatic;



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
  clockInList: ClockIn[] = [];  //testClockInObj: ClockIn;
  noOfHours: number;
  noOfMinute: number;
  isClockIn: boolean = false;
  te: number;
  lastClockInId: number;
  lastClockInDate: any;
  lastDate: any;
  clockInViewList: ClockIn[] = [];
  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder, private dateService: DateService, private userService: UserService, private toastr: ToastsManager) { }

  ngOnInit() {

    this.getEmployeeDetails();

    this.clockInForm = this.formBuilder.group(
      {
        'username': ['',Validators.required],
        'password': ['', Validators.required]
      }
    );

    this.clockInForm.get('username').valueChanges
    .subscribe((change) => {
      this.getClockInDetails();
    })
  }



  getEmployeeDetails() {
    this.employeeService.getEmployeeDetails()
      .subscribe((emp: Employee[]) => {
        this.employeeDto = emp;
        this.clockInForm.get('username').setValue(this.employeeDto[0].username);
        this.clockInObj.username = this.employeeDto[0].username;

        console.log('ClokcIn value', this.isClockIn);
      });
  }

  getClockInDetails() {

    let username: string;

    this.clockInObj.username = this.clockInForm.get('username').value;
    this.dateDto = this.dateService.getCurrentDay();

    // Need to do this becuase when user chnage the username from dropdown, if the one user is clocked in it is showing for clock out for all users which is wrond, so this helps to fix this problem.
    this.isClockIn = false;

    if(this.clockInForm.get('username').value == null)
    {
      username = this.employeeDto[0].username;
    }
    else {
      username = this.clockInForm.get('username').value;
    }
    this.employeeService.getEmployeeClockInDetails(username, this.dateDto.startDate, this.dateDto.endDate)
    .subscribe((clockInList: ClockIn[]) => {
      this.clockInList = clockInList;
      this.setClockInListForView();

      console.log('clockInList', this.clockInList)

      // This mean user has some clock in history for the current day, so now i need to he is clocked in or clock out and, on behalf of that, i need to set up clock in flag.
      if(null != this.clockInList && this.clockInList.length > 0)
      {
        this.clockInList.forEach((clockIn) => {
          if(null != clockIn.clockOut)
          {
            this.isClockIn = false;
          }
          else {
            this.isClockIn = true;
            this.lastClockInId = clockIn.userClockInId;
          }
        })
      }


      // this mean user has alredy clocked in
      if(this.isClockIn)
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

       // this.isClockIn = true;
      }

      else {
        this.isClockIn = false;
      }
    });
     

  }
  validateAndAddClockInDetails() {

    // Need to do this because some stupid reason, i dont know why.
    let username = this.clockInForm.get('username').value;

    this.employeeService.validateEmployee(this.clockInForm.get('username').value, this.clockInForm.get('password').value)
    .subscribe((valid) => {

      console.log('after valid', valid);

      if(valid)
      {
        if(null != this.clockInList && this.clockInList.length > 0)
        {
          this.clockInList.forEach((clockIn) => {
            if(null != clockIn.clockOut )
            {
              this.isClockIn = false;
            }
            else {
              this.isClockIn = true;
              this.lastClockInId = clockIn.userClockInId;
              this.lastClockInDate = clockIn.clockIn;
              this.lastDate = clockIn.date;
            }
          })
        }
        console.log('clock in List', this.clockInList);
      }

      else {
        this.toastr.error("Wrong Credintails, Please Try Again!!", 'Error');
      }

      if(valid && this.isClockIn == false) {

        this.clockInObj = new ClockIn();
        this.clockInObj.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.clockInObj.clockIn = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.clockInObj.username = username;

        console.log('clok in object', this.clockInObj)
        this.employeeService.addClockInDetails(this.clockInObj)
        .subscribe(data => {

          if(data.username != null){
            this.toastr.success("ClockIn Successfully!!", 'Success');
          }
          else{
            this.toastr.error("Oops Something goes wrong!!", 'Error');
          }
          console.log('Response From Add Clockin call' + data);
        },
        error => {
          this.toastr.error("Oops Something goes wrong!!", 'Error');
      console.log(JSON.stringify(error.json()));
    });

      }

      else if(valid && this.isClockIn) {

        this.clockInObj = new ClockIn();

        this.clockInObj.username = this.clockInForm.get('username').value;
        this.clockInObj.clockIn = this.lastClockInDate;
        this.clockInObj.clockOut = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.clockInObj.noOfHours = this.noOfHours;
        this.clockInObj.noOfMinute = this.noOfMinute;
        this.clockInObj.username = username;
        this.clockInObj.userClockInId = this.lastClockInId;
        this.clockInObj.date = this.lastDate;


        this.employeeService.addClockInDetails(this.clockInObj)
        .subscribe(data => {

          if(data.username != null){
            this.toastr.success("Clockout Successfully!!", 'Success');
          }
          else{
            this.toastr.error("Oops Something goes wrong!!", 'Error');
          }
          console.log('Response From Add Clockin call' + data);
        },
          error => {
            this.toastr.error("Oops Something goes wrong!!", 'Error');
        console.log(JSON.stringify(error.json()));
      });
      }

    });
    
    $('#clockIn').modal('hide');
    this.clockInForm.reset();

  }

  setClockInListForView() {

    this.clockInViewList = [];
    
    this.clockInList.forEach((clockIn) => {

      let clockInViewList = new ClockIn();

      clockInViewList.clockIn = moment(clockIn.clockIn).format('hh:mm A')
      if(clockIn.clockOut != null){

        clockInViewList.clockOut = moment(clockIn.clockOut).format('hh:mm A')
      }

      if(clockIn.clockIn != null && clockIn.clockOut != null) {

        let totalClockInHour = moment(clockIn.clockIn).format('HH');
        let totalClockInMinute = moment(clockIn.clockIn).format('mm');

        let totalClockOutHour = moment(clockIn.clockOut).format('HH');
        let totalClockOutMinute = moment(clockIn.clockOut).format('mm');

        clockInViewList.noOfHours = (+totalClockOutHour - +totalClockInHour);
        clockInViewList.noOfMinute = (+totalClockOutMinute - +totalClockInMinute);
      }

      this.clockInViewList.push(clockInViewList);

    }
  
  );

   
  }


  logout(){
    this.userService.userLogout();
  }
 
}
