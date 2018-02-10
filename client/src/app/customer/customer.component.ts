import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/customer/customer.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Message } from 'primeng/primeng';
import * as moment from 'moment';
import { MenuItem } from 'app/shared/top-navbar/top-navbar.component';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  items: MenuItem[];


  constructor(private router: Router) { }
  ngOnInit() {
    
    if (this.router.url == "/customer")
      this.router.navigate(['/customer/customer']);

    this.items = [
      { name: 'Customer', icon: 'fa fa-user fa-x', link: '/customer/customer' },
      { name: 'Group', icon: 'fa fa-users fa-x', link: '/customer/group' },

    ]
  
}

}
