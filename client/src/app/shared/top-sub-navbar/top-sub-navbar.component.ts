import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-sub-navbar',
  templateUrl: './top-sub-navbar.component.html',
  styleUrls: ['./top-sub-navbar.component.scss']
})
export class TopSubNavbarComponent implements OnInit {
  @Input() menu: MenuItem[];
  isSubMenu = true;
  constructor() { }

  ngOnInit() {
    console.log('Sub Menu Options', this.menu);
  }

}
export class MenuItem {
  name: string;
  link: string;
  icon: string;
  show?: boolean;
}
