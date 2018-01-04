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
      this.router.navigate(['/report/inventory']);

    this.items = [
      { name: 'Inventory', icon: 'fa fa-tags fa-x', link: '/report/inventory' },
      { name: 'Sales', icon: 'fa fa-line-chart fa-x', link: '/report/sales' },
      { name: 'Profit & Loss', icon: 'fa fa-pie-chart fa-x', link: '/report/profit-loss' },
      { name: 'Expense', icon: 'fa fa-money fa-x', link: '/product/vendor' },
      { name: 'Register', icon: 'fa fa-window-close-o fa-x', link: '/product/model' },
      { name: 'Customer', icon: 'fa fa-user fa-x', link: '/product/productTable' },
      { name: 'Employee', icon: 'fa fa-user-circle fa-x', link: '/product/category' },
      { name: 'Commision', icon: 'fa fa-bar-chart fa-x', link: '/product/brand' },
      { name: 'Ecommerce', icon: 'fa fa-cart-arrow-down fa-x', link: '/product/vendor' },
      { name: 'Loyalty', icon: 'fa fa-area-chart fa-x', link: '/product/model' }
    ];

  }

}
