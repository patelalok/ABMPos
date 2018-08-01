import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PurchaseOrderService } from '../purchase-order.service';
import { PurchaseOrderDao } from '../purchase-order.component';
import { DateDto, DateService } from '../../shared/services/date.service';
import { LoadingService } from '../../loading.service';
import * as moment from 'moment';


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
  purchaseOrderDaoList: PurchaseOrderDao[] = [];
  dateDto = new DateDto();




  constructor(private purchaseOrderService:PurchaseOrderService,
    private dateService:DateService, 
    private loadingServie: LoadingService,
    private fb: FormBuilder
   ) { }

  ngOnInit() {

    this.customDate = this.fb.group({
      'fromDate' : new Date(),
      'toDate': new Date()
    });

    this.customDate.valueChanges
    .subscribe((change) => {
      console.log('Custom Date', change);
      this.loadingServie.loading = true;
      
      let customDateValues: {toDate: Date, fromDate: Date} = change; 
      this.purchaseOrderService.getPurchaseOrderDetailsByDate(
        moment(customDateValues.fromDate).hour(0).format('YYYY-MM-DD HH:mm:ss'),
        moment(customDateValues.toDate).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss')
      )
      .subscribe(order => {

        order.forEach(po => {
          // This helps to manage date for park sale and other edit sale logic.
          po.originalDate = po.date;
          po.time = moment(po.originalDate).format('hh:mm A');
          po.onlyDate = moment(po.originalDate).format('MM-DD-YYYY');
        })
        this.purchaseOrderDaoList = order;
        this.loadingServie.loading = false;
      });
    });

    this.getPurchaseOrderDetails(this.purchaseOrderDropdown);
  }

  getPurchaseOrderDetails(orderDetailsBy: string){

    this.loadingServie.loading = true;
    
    if(orderDetailsBy == 'Today'){
      this.dateDto = this.dateService.getCurrentDay();
    }
    else if(orderDetailsBy == 'Yesterday'){
      this.dateDto = this.dateService.getPreviousDay();

    }
    else if(orderDetailsBy == 'This Week'){
      this.dateDto = this.dateService.getCurrentWeek();
      
    }
    else if(orderDetailsBy == 'Last Week'){
      this.dateDto = this.dateService.getLastWeek();
      
    }
    else if(orderDetailsBy == 'This Month'){
      this.dateDto = this.dateService.getCurrentMonth();
      
    }
    else if(orderDetailsBy == 'Last Month'){
      this.dateDto = this.dateService.getLastMonth();
      
    }
    else if(orderDetailsBy == 'Last 3 Months'){
      this.dateDto = this.dateService.getLast3Months();
      
    } else if(orderDetailsBy == 'Last 6 Months'){
      this.dateDto = this.dateService.getLast6Months();
      
    }
    else if(orderDetailsBy == 'This Year'){
      this.dateDto = this.dateService.getCurrentYear();
      
    }
    else if(orderDetailsBy == 'Last Year'){
      this.dateDto = this.dateService.getLastYear();
    }

    this.purchaseOrderService.getPurchaseOrderDetailsByDate(this.dateDto.startDate, this.dateDto.endDate)
    .subscribe((order)=>{
      order.forEach(po => {
        // This helps to manage date for park sale and other edit sale logic.
        po.originalDate = po.date;
        po.time = moment(po.originalDate).format('hh:mm A');
        po.onlyDate = moment(po.originalDate).format('MM-DD-YYYY');
      })
      this.purchaseOrderDaoList = order;
      this.loadingServie.loading = false;
    });
  }


}