import { Component, OnInit } from '@angular/core';
import { StoreSetupService } from 'app/shared/storesetup/storesetup.service';
import { PersistenceService } from 'app/shared/services/persistence.service';
import { Router } from '@angular/router';
import { MenuItem } from 'app/shared/top-navbar/top-navbar.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-storesetup',
  templateUrl: './storesetup.component.html',
  styleUrls: ['./storesetup.component.scss']
})
export class StoresetupComponent implements OnInit {
  storeDetails = new StoreSetupDto();
  items: MenuItem[];
  storeForm: FormGroup;
  

  constructor(private storeSetupService: StoreSetupService, private persit: PersistenceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    if (this.router.url == "/setting") {
      this.items = null;
      this.router.navigate(['/setting']);
      this.items = [
        { name: 'Store Details', icon: 'fa fa-building fa-x', link: '/setting' },
        // { name: 'User Roles', icon: 'fa fa-user-secret fa-x', link: '/product/category' },
        // { name: 'Reciept', icon: 'fa fa-print fa-x', link: '/product/brand' },
        // { name: 'Locations', icon: 'fa fa-map-marker fa-x', link: '/product/vendor' },
        // { name: 'Loyalty', icon: 'fa fa-usd fa-x', link: '/product/model' },
        // { name: 'Custom Fields', icon: 'fa fa-object-group fa-x', link: '/product/productTable' }
      ];
    }

    this.storeForm = this.formBuilder.group(
      {
        'id': [1],
        'name': [null],
        'phoneNo':[null],
        'street': [null],
        'city': [null],
        'state': [null],
        'email': [null],
        'zipcode': [null],
        'tax': [null],
        'loyaltyAmountForDollar': [null]
      }
    );

    // Checking if the data is in local storege or not.
    // if (this.persit.getStoreDetails() == null) {

    //   this.getStoreDetails();
    // }
    // else {
      //this.storeDetails = this.persit.getStoreDetails();
      this.getStoreDetails();
      console.log('storeDetail', this.storeDetails);
      this.storeForm.patchValue(this.storeDetails);

    // }



  }

  getStoreDetails() {
    this.storeSetupService.getStoreDetails()
      .then((storeDetails: StoreSetupDto) => {

        this.storeDetails = storeDetails;
        this.storeForm.patchValue(this.storeDetails);
        this.persit.setStoreDetails(this.storeDetails);
      })

    // Setting the store details into local storage
  }

  saveStoreDetails() {
    this.storeSetupService.saveStoreDetails(this.storeForm.value);
  }

}

export class StoreSetupDto {
  id: number;
  name: string;
  phoneNo: string;
  tax: number;
  stree: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;
  logo: any;
  receiptFooter: string;
  receiptType: number;
}
