import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'app/shared/top-navbar/top-navbar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  items: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit() {
    
    if (this.router.url == "/report")
      this.router.navigate(['/report/sales']);

    this.items = [
      { name: 'Sales', icon: 'fa fa-line-chart fa-x', link: '/report/sales' },
      { name: 'Inventory', icon: 'fa fa-tags fa-x', link: '/report/inventory' },
      { name: 'Customer', icon: 'fa fa-user fa-x', link: '/report/customer-report' }

      // { name: 'Profit & Loss', icon: 'fa fa-pie-chart fa-x', link: '/report/profit-loss' },
      // { name: 'Low Stock', icon: 'fa fa-tag fa-x', link: '/report/profit-loss' },
      // { name: 'Expense', icon: 'fa fa-money fa-x', link: '' },
      // { name: 'Register', icon: 'fa fa-window-close-o fa-x', link: '' },
      // { name: 'Customer', icon: 'fa fa-user fa-x', link: '' },
      // { name: 'Employee', icon: 'fa fa-user-circle fa-x', link: '' },
      // { name: 'Commision', icon: 'fa fa-bar-chart fa-x', link: '' },
      // { name: 'Ecommerce', icon: 'fa fa-cart-arrow-down fa-x', link: '' },
      // { name: 'Loyalty', icon: 'fa fa-area-chart fa-x', link: '' }
    ];

  }

}
