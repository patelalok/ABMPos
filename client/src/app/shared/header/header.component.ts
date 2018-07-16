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
      if(null != this.clockInForm.get('username').value){
        this.getClockInDetails();
      }
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

    this.clockInObj = new ClockIn();
    this.clockInObj.username = this.clockInForm.get('username').value;
    this.dateDto = this.dateService.getCurrentDay();

    // Need to do this becuase when user chnage the username from dropdown, if the one user is clocked in it is showing for clock out for all users which is wrong, so this helps to fix this problem.
    this.isClockIn = false;

    this.employeeService.getEmployeeClockInDetails(this.clockInObj.username, this.dateDto.startDate, this.dateDto.endDate)
    .subscribe((clockInList: ClockIn[]) => {
      this.clockInList = clockInList;
      this.setClockInListForView();

      // This mean user has some clock in history for the current day, so now i need to he is clocked in or clock out and, on behalf of that, i need to set up clock in flag.
      if(this.clockInList && this.clockInList.length > 0)
      {
        this.clockInList.forEach((clockIn) => {
          if(null != clockIn.clockOut){
            this.isClockIn = false;
          }
          else {
            this.isClockIn = true;
            this.lastClockInId = clockIn.userClockInId;
          }
        })
      }
    });
  }
  validateAndAddClockInDetails() {

    // Need to do this because some stupid reason, i dont know why.
    let username = this.clockInForm.get('username').value;

    this.employeeService.validateEmployee(this.clockInForm.get('username').value, this.clockInForm.get('password').value)
    .subscribe((valid) => {
      if(valid)
      {
        if(this.clockInList && this.clockInList.length > 0){
          this.clockInList.forEach((clockIn) => {
            if(null != clockIn.clockOut ){
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
      }
      else {
        this.toastr.error("Wrong Credintails, Please Try Again!!", 'Error');
      }

      if(valid && !this.isClockIn) {

        this.clockInObj = new ClockIn();
        this.clockInObj.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.clockInObj.clockIn = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.clockInObj.username = username;

        let index = this.employeeDto.findIndex((el)=> el.username == username);
        if(index > -1){
          this.clockInObj.hourlyRate = this.employeeDto[index].hourlyRate;
        }

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
        // this.clockInObj.noOfHours = this.noOfHours;
        // this.clockInObj.noOfMinute = this.noOfMinute;
        this.clockInObj.username = username;
        this.clockInObj.userClockInId = this.lastClockInId;
        this.clockInObj.date = this.lastDate;

        let index = this.employeeDto.findIndex((el)=> el.username == username);
        if(index > -1){
          this.clockInObj.hourlyRate = this.employeeDto[index].hourlyRate;
        }

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
      clockInViewList.clockIn = moment(clockIn.clockIn).format('HH:mm A')
      if(clockIn.clockOut != null){
        clockInViewList.clockOut = moment(clockIn.clockOut).format('HH:mm A')
      }

      if(clockIn.clockIn != null && clockIn.clockOut != null) {

        let start = moment.utc(clockIn.clockIn,  "YYYY-MM-DD HH:mm:ss");
        let end = moment.utc(clockIn.clockOut, "YYYY-MM-DD HH:mm:ss");

        let duration = moment.duration(end.diff(start));
        let totalHours = moment.utc(+duration).format('HH:mm');
        
          clockInViewList.noOfHours = totalHours;
      }
      this.clockInViewList.push(clockInViewList);
      this.clockInViewList = this.clockInViewList.slice();
    });
  }
  logout(){
    this.userService.userLogout();
  }
 
}