import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  @Input() menu: MenuItem[];
  @Input() isSubMenu = false;
  constructor() { }

  ngOnInit() {
    if (!this.menu) {
      this.menu = [
        // { name: 'Dashboard', link: '/#', icon: 'fa fa-tachometer fa-2x text-blue' },
        { name: 'Dashboard', link: '/dashboard', icon: 'fa fa-tachometer fa-2x text-blue' },
        { name: 'Sell', link: '/sell', icon: 'fa fa-usd fa-2x text-green' },
        // { name: 'Sell', link: '/sell', icon: 'fa fa-usd fa-2x text-green' },
        // { name: 'Sales History', link: '/#', icon: 'fa fa-history fa-2x text-bittersweet ' },
        { name: 'Sales History', link: '/sales-history', icon: 'fa fa-history fa-2x text-bittersweet ' },
        { name: 'Product', link: '/product', icon: 'fa fa-tag fa-2x text-blue' },
        // { name: 'Purchase Order', link: '/purchase-order', icon: 'fa fa-first-order fa-x fa-2x text-green' },
       { name: 'Customer', link: '/#', icon: 'fa fa-user fa-2x text-bittersweet' },
      //  { name: 'Customer', link: '/customer', icon: 'fa fa-user fa-2x text-bittersweet' },
      //  { name: 'Report', link: '/#', icon: 'fa fa-line-chart fa-2x text-orange' },
       { name: 'Report', link: 'report', icon: 'fa fa-line-chart fa-2x text-orange' },
        // {name: 'Repair', link: '/repair', icon: 'fa fa-wrench fa-2x text-violet', show: false},
        { name: 'Employee', link: '/#', icon: 'fa fa-user-circle-o fa-2x text-blue' },
        { name: 'Expense', link: '/#', icon: 'fa fa-money fa-2x text-green' },        
        { name: 'Setting', link: '/#', icon: 'fa fa-cogs fa-2x text-dark-grey', },
       { name: 'Ecomerce', link: '/#', icon: 'fa fa-cart-arrow-down fa-2x text-green' },
        // { name: 'Rewards', link: '/ecommerce', icon: 'fa fa-trophy fa-2x text-green' },
        // { name: 'Promotion', link: '/promotion', icon: 'fa fa-bullhorn fa-2x text-bittersweet' }
      ];
    }
  }
}

export class MenuItem {
  name: string;
  link: string;
  icon: string;
  show?: boolean;
}