import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/customer/customer.service';
import { Customer, PrimeCustomer } from 'app/customer/customer.component';
import { PromotionService } from 'app/promotion/promotion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
declare var $: JQueryStatic;


@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  customerDto: Customer[] = [];
  filteredCustomer: any[];
  smsTemplateObject = new SmsTemplate();
  smsTemplateList: SmsTemplate[] = [];
  smsForm: FormGroup;
  smsTemplateForm: FormGroup;
  smsTemplateForUpdate: SmsTemplate;
  smsTemplateForDelete: SmsTemplate;

  customerListToSendSms: Customer[] = [];

  constructor(private customerService: CustomerService, private promotionService: PromotionService, private formBuilder: FormBuilder, private toastr: ToastsManager) { }

  ngOnInit() {

 this.smsForm = this.formBuilder.group(
      {
        'phoneNo': [''],
        'messageBody': ['', Validators.required],
      });

    this.smsTemplateForm = this.formBuilder.group(
      {
        'id': [''],
        'name': ['', Validators.required],
        'description': ['', Validators.required],
      });

    this.getCustomerDetails();
    this.getAllSmsTemplate();
  }

  getCustomerDetails() {
    this.customerService.getCustomerDetails()
      .subscribe((cust: Customer[]) => {
        this.customerDto = cust;
      });
  }

  filterCustomers(event) {
    let query = event.query;
    this.customerService.getCustomerDetails()
      .subscribe((customers) => {
        // console.log(products);
        this.filteredCustomer = this.filterCustomer(query, customers);
      });
  }
  filterCustomer(query, customers: PrimeCustomer[]): PrimeCustomer[] {
    let filtered: PrimeCustomer[] = [];
    for (let i = 0; i < customers.length; i++) {
      let cust = customers[i];
      if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
        filtered.push(cust);
      }
    }
    return filtered;

  }
  sendMarketingSms(){
    // To do here need to write logic to send customer list, first i need to create a list and push the customer object one by or, need to figure out something else.
    this.customerService.sendMarketingSms(this.customerListToSendSms, 'just testing')
    .subscribe((data) =>{

    });
  }

  addOrUpdateSmsTemplate(){
    this.promotionService.addOrUpdateSmsTemplate(this.smsTemplateForm.value)
    .subscribe((data:SmsTemplate) => {
      if(data){
          this.smsTemplateList.push(data);
         this.smsTemplateList =  this.smsTemplateList.slice();
          this.toastr.success('Sms Template Added Successfully!!');
          $('#smsTemplateModel').modal('hide');
          console.log('addd date', data);
      }
      else{
          this.toastr.error('Opps Something Goes Wrong!!');
          this.smsTemplateForm = null;
      }
    },
      error => {
    console.log(JSON.stringify(error.json()));
    this.toastr.error('Opps Something Goes Wrong!!');
    this.smsTemplateForm = null;

  });
  }

  getAllSmsTemplate(){
    this.promotionService.getAllSmsTemplate()
    .subscribe((smsTemplate: SmsTemplate[]) =>{
      this.smsTemplateList =smsTemplate;
    });
  }

  updateTemplate(template: SmsTemplate){

    this.smsTemplateForUpdate = template;

    this.smsTemplateForm.get('id').setValue(this.smsTemplateForUpdate.id);
    this.smsTemplateForm.get('name').setValue(this.smsTemplateForUpdate.name);
    this.smsTemplateForm.get('description').setValue(this.smsTemplateForUpdate.description);

    console.log('sms temp index');
  }
  setDeleteSmsTemplate(template: SmsTemplate){
    this.smsTemplateForDelete = template;
  }

  deleteSmsTemplate(){
    this.promotionService.deleteSmsTemplate(this.smsTemplateForDelete)
    .subscribe((data)=> {
      if(data.status == 200)
      {
        this.toastr.success('Template Deleted Successfully!!');
        this.smsTemplateList.splice(this.smsTemplateList.indexOf(this.smsTemplateForDelete, 0));
        this.smsTemplateList = this.smsTemplateList.slice();
      }
      else{
        this.toastr.error('Opps Something Goes Wrong!!');
    }
  },
    error => {
  console.log(JSON.stringify(error.json()));
  this.toastr.error('Opps Something Goes Wrong!!');
});
  }

  applyTemplateFromTemplateList(template: SmsTemplate){
    this.smsForm.get('messageBody').setValue(template.description);
  }
}

export class SmsTemplate{
  id?:number;
  name?:string;
  description?:string;

}