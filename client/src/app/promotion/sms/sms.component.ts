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
  smsTemplateForm: FormGroup;

  constructor(private customerService: CustomerService, private promotionService: PromotionService, private formBuilder: FormBuilder, private toastr: ToastsManager) { }

  ngOnInit() {

    this.smsTemplateForm = this.formBuilder.group(
      {
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
    this.customerService.sendMarketingSms(this.customerDto, 'just testing')
    .subscribe((data) =>{

    });
  }

  addOrUpdateSmsTemplate(){
    this.promotionService.addOrUpdateSmsTemplate(this.smsTemplateForm.value)
    .subscribe(data => {
      if(data){
          this.toastr.success('Sms Template Added Successfully!!');
          $('#smsTemplateModel').modal('hide');
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

  getAllSmsTemplate(){
    this.promotionService.getAllSmsTemplate()
    .subscribe((smsTemplate: SmsTemplate[]) =>{
      this.smsTemplateList =smsTemplate;
    });
  }
}

export class SmsTemplate{
  id?:number;
  name?:string;
  description?:string;

}