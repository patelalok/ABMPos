import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-invoice',
  templateUrl: './open-invoice.component.html',
  styleUrls: ['./open-invoice.component.scss']
})
export class OpenInvoiceComponent implements OnInit {
  salesHistoryDropdown: any = 'Today';

  constructor() { }

  ngOnInit() {
  }

}
