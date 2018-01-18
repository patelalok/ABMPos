import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateService, DateDto } from 'app/shared/services/date.service';
import { SellService } from 'app/sell/sell.service';


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
  totalCloseAmount: number;


 constructor(private sellService: SellService,  private formBuilder: FormBuilder, private dateService: DateService) { }

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
        'totalDiscount': [null],
        'profit': [null],
        'markup': [null],
        'bankDeposit': [null],
        'onAccount': [null],
        'storeCredit': [null],
        'loyalty': [null],
        'inHandCash': [null],
        'note': [null],
        'totalReturn': [null]
      }
    );

    this.closeRegisterForm.valueChanges.subscribe(
      (changes) => {
        let formValues = this.closeRegisterForm.value;
        this.closeRegisterForm.patchValue(<any>{
          differenceCash: (formValues.closeCash - formValues.reportCash).toFixed(2),
          differenceCredit: (formValues.closeCredit - formValues.reportCredit).toFixed(2),
          differenceDebit: (formValues.closeDebit - formValues.reportDebit).toFixed(2),
          differenceCheck: (formValues.closeCheck - formValues.reportCheck).toFixed(2),
          closeTotalAmount: ((formValues.closeCash) + (+formValues.closeCredit) + (+formValues.closeDebit) + (+formValues.closeCheck)).toFixed(2),
          differenceTotal: ((formValues.closeCash) + (+formValues.closeCredit) + (+formValues.closeDebit) + (+formValues.closeCheck) - formValues.reportTotalAmount).toFixed(2),
        },{
          emitEvent: false
        });
      }
    );
  }

  getCloseRegisterDetails(startDate: any, endDate: any) {

    this.sellService.getCloseRegisterDetails(startDate, endDate)
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
      this.closeRegisterForm.get('totalDiscount').setValue(this.closeRegisterDto.totalDiscount);
      this.closeRegisterForm.get('totalReturn').setValue(this.closeRegisterDto.totalReturn);

      let totalWithoutTax = this.closeRegisterDto.reportTotalAmount - this.closeRegisterDto.tax;
      this.closeRegisterForm.get('totalWithoutTax').setValue(totalWithoutTax.toFixed(2));

      this.closeRegisterForm.get('storeCredit').setValue(this.closeRegisterDto.storeCredit);
      this.closeRegisterForm.get('onAccount').setValue(this.closeRegisterDto.onAccount);
      this.closeRegisterForm.get('loyalty').setValue(this.closeRegisterDto.loyalty);

       let closeTotalAmountWithTax = this.closeRegisterForm.get('closeCash').value + this.closeRegisterForm.get('closeCredit').value + this.closeRegisterForm.get('closeDebit').value + this.closeRegisterForm.get('closeCheck').value;
      this.closeRegisterForm.get('closeTotalAmount').setValue(this.totalCloseAmount);
    });


  }

  calculateTotalCloseAmountOnValueChange(){

    this.totalCloseAmount = this.closeRegisterForm.get('closeCash').value + this.closeRegisterForm.get('closeCredit').value + this.closeRegisterForm.get('closeDebit').value + this.closeRegisterForm.get('closeCheck').value;

  }

  saveCloseRegisterDetails() {

    this.closeRegisterDto = this.closeRegisterForm.value;
    this.closeRegisterDto.date =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.closeRegisterDto.id = this.closeRegId;

    // TODO need to handle getting user name.
    this.closeRegisterDto.username = 'ALOK';
    console.log(this.closeRegisterDto);
    this.sellService.saveCloseRegisterDetail(this.closeRegisterDto);
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
  totalDiscount: number;
  totalReturn: number;
  profit: number;
  markup: number;
  bankDeposit: number;
  onAccount: number;
  storeCredit: number;
  loyalty: number;
  inHandCash: number;
  note: string;
}