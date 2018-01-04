import { Component, OnInit } from '@angular/core';
import { CloseRegistorService } from 'app/close-register/close-registor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateService, DateDto } from 'app/shared/services/date.service';


@Component({
  selector: 'app-close-register',
  templateUrl: './close-register.component.html',
  styleUrls: ['./close-register.component.scss']
})
export class CloseRegisterComponent implements OnInit {

  closeRegisterForm: FormGroup;
  closeRegisterDto = new CloseRegisterDto();
  dateDto = new DateDto();
  closeRegId: any;
  
  
 constructor(private closeRegisterService: CloseRegistorService,  private formBuilder: FormBuilder, private dateService: DateService) { }

  ngOnInit() {

    this.dateDto = this.dateService.getCurrentDay();
    this.getCloseRegisterDetails(this.dateDto.startDate, this.dateDto.endDate);


    this.closeRegisterForm = this.formBuilder.group(
      {
        'reportCash': [null],
        'reportCredit': [null],
        'reportDebit': [null],
        'reportCheck': [null],
        'reportTotalAmount': [null],
        'closeCash': [null],
        'closeCredit': [null],
        'closeDebit': [null],
        'closeCheck': [null],
        'closeTotalAmount': [null],
        'differenceCash': [null],
        'differenceCredit': [null],
        'differenceDebit': [null],
        'differenceCheck': [null],
        'differenceTotal': [null],
        'totalBusinessAmount': [null],
        'tax': [null],
        'totalWithoutTax': [null],
        'discount': [null],
        'profit': [null],
        'markup': [null],
        'bankDeposit': [null],
        'onAccount': [null],
        'storeCredit': [null],
        'loyalty': [null],
        'inHandCash': [null],
        'note': [null]
      }
    );

 

  }

  getCloseRegisterDetails(startDate: any, endDate: any) {

    this.closeRegisterService.getCloseRegisterDetails(startDate, endDate)
    .subscribe((closeReg: CloseRegisterDto) => {
      this.closeRegisterDto = closeReg;
      this.closeRegId = closeReg.id;
      this.closeRegisterForm.get('reportCash').setValue(this.closeRegisterDto.reportCash);
      this.closeRegisterForm.get('closeCash').setValue(this.closeRegisterDto.closeCash);

      this.closeRegisterForm.get('reportCredit').setValue(this.closeRegisterDto.reportCredit);
      this.closeRegisterForm.get('closeCredit').setValue(this.closeRegisterDto.closeCredit);

      this.closeRegisterForm.get('reportDebit').setValue(this.closeRegisterDto.reportDebit);
      this.closeRegisterForm.get('closeDebit').setValue(this.closeRegisterDto.closeDebit);
      
      this.closeRegisterForm.get('reportCheck').setValue(this.closeRegisterDto.reportCheck);
      this.closeRegisterForm.get('closeCheck').setValue(this.closeRegisterDto.closeCheck);
      
      this.closeRegisterForm.get('reportTotalAmount').setValue(this.closeRegisterDto.reportTotalAmount);
      this.closeRegisterForm.get('tax').setValue(this.closeRegisterDto.tax);
      this.closeRegisterForm.get('discount').setValue(this.closeRegisterDto.discount);
      this.closeRegisterForm.get('totalWithoutTax').setValue(this.closeRegisterDto.reportTotalAmount - this.closeRegisterDto.tax);
      this.closeRegisterForm.get('storeCredit').setValue(this.closeRegisterDto.storeCredit);
      this.closeRegisterForm.get('onAccount').setValue(this.closeRegisterDto.onAccount);
      this.closeRegisterForm.get('loyalty').setValue(this.closeRegisterDto.loyalty);
    });


  }

  saveCloseRegisterDetails() {

    this.closeRegisterDto = this.closeRegisterForm.value;
    this.closeRegisterDto.date =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.closeRegisterDto.id = this.closeRegId;

    // TODO need to handle getting user name.
    this.closeRegisterDto.username = 'ALOK';
    console.log(this.closeRegisterDto);
    this.closeRegisterService.saveCloseRegisterDetail(this.closeRegisterDto);
  }

}

export class CloseRegisterDto {

  id: number;
  date: any;
  username: string;
  reportCash: number;
  reportCredit: number;
  reportDebit: number;
  reportCheck: number;
  reportTotalAmount: number;
  closeCash: number;
  closeCredit: number;
  closeDebit: number;
  closeCheck: number;
  closeTotalAmount: number;
  differenceCash: number;
  differenceCredit: number;
  differenceDebit: number;
  differenceCheck: number;
  differenceTotal: number;
  totalBusinessAmount: number;
  tax: number;
  discount: number;
  profit: number;
  markup: number;
  bankDeposit: number;
  onAccount: number;
  storeCredit: number;
  loyalty: number;
  inHandCash: number;
  note: string;
}