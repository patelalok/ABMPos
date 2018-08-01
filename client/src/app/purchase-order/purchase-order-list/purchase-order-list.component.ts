import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PurchaseOrderService } from '../purchase-order.service';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {
  orderDetails: any[];
  purchaseOrderDropdown: string = 'Today';
  customDate: FormGroup; 
  currentDate = new Date(); 
  searchOrderTextbox: string;



  constructor(private purchaseOrderService:PurchaseOrderService, ) { }

  ngOnInit() {
  }

  getPurchaseOrderDetails(orderDetailsBy: string){
  }

}
