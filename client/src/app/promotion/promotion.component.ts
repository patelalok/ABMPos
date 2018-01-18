import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'app/shared/top-navbar/top-navbar.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {
  items: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit() {

    // if (this.router.url == "/promotion")
    // this.router.navigate(['/promotion/sms']);

    this.items = [
      { name: 'Message', icon: 'fa fa-commenting-o fa-x', link: '/promotion/sms'},
      { name: 'Email',   icon: 'fa fa-envelope-o fa-x', link: '/promotion/email'},
      { name: 'Facebook',icon: 'fa fa-facebook fa-x', link: '/promotion/facebook'}
    ];
  }

}
