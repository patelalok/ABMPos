import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/product/product.service';

import { Category, CategoryTest, VendorTest, Vendor } from 'app/product/product.component';
import { Message } from 'primeng/primeng';
import { VendorService } from 'app/product/vendor/vendor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';


@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

    vendorForm: FormGroup;
    selectedVendorForDelete: Vendor;
    vendorDto: PrimeVendor[];
    selectedVendor: Vendor;
    newVendor: boolean;
    displayDialog: boolean;

    msgs: Message[] = [];

    vendor: VendorTest = new PrimeVendor();

    constructor(private vendorService: VendorService, private productService: ProductService, private formBuilder: FormBuilder, private toastr: ToastsManager) { }

    ngOnInit() {

        this.vendorForm = this.formBuilder.group(
            {
                'name': [null, Validators.required],
                'phoneNo': ['', Validators.pattern('^[0-9]+$')],
                'companyAddress': [''],
                'companyName': [''],
                'email': ['', Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z0-9.]+$')]

            }
        );

        this.getVendorDetails();
    }

    showSuccess(severity: string, summary: string, detail: string) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    }


    getVendorDetails(): void {
        this.productService.getVendorDetails()
            .subscribe((vendors: Vendor[]) => {
                this.vendorDto = vendors;
                console.log('VendorList' + this.vendorDto);
            });
    }
// REady to Delete
    // save() {
    //     let newVendorDto = [...this.vendorDto];

    //     if (this.newVendor) {
    //         newVendorDto.push(this.vendor);

    //         this.vendorService.addOrUpdateVendor(this.vendor)
    //         .subscribe(data => {
    //             if(data){
    //                 this.toastr.success('Vendor Added Successfully!!');
    //             }
    //             else{
    //                 this.toastr.error('Opps Something Goes Wrong!!');
    //             }
    //           },
    //             error => {
    //           console.log(JSON.stringify(error.json()));
    //           this.toastr.error('Opps Something Goes Wrong!!');
    //         });
    //         this.getVendorDetails();
    //         this.displayDialog = false;
    //     } 
    // }

    addVendor() {

        let newVendor = this.vendorForm.value;
       
        this.vendorService.addOrUpdateVendor(this.vendorForm.value)
        .subscribe(data => {
            if(data){
                this.toastr.success('Vendor Added Successfully!!');
            }
            else{
                this.toastr.error('Opps Something Goes Wrong!!');
            }
          },
            error => {
          console.log(JSON.stringify(error.json()));
          this.toastr.error('Opps Something Goes Wrong!!');
        });
        this.vendorDto.push(newVendor);
        this.vendorDto = this.vendorDto.slice();

        this.displayDialog = false;

    }
    updateVendor(event) {

        this.vendorService.addOrUpdateVendor(event.data)
        .subscribe(data => {
            if(data){
                this.toastr.success('Vendor Updated Successfully!!');
            }
            else{
                this.toastr.error('Opps Something Goes Wrong!!');
            }
          },
            error => {
          console.log(JSON.stringify(error.json()));
          this.toastr.error('Opps Something Goes Wrong!!');
        });

    }

    setVendorForDelete(vendor: Vendor) {

        this.selectedVendorForDelete = vendor;
    }
    deleteVendor() {

        this.vendorService.deleteVendor(this.selectedVendorForDelete.vendorId)
        .subscribe(data => {
            if(data){
                let index = this.vendorDto.findIndex((el) => el.name == this.selectedVendorForDelete.name);
                this.vendorDto = this.vendorDto.splice(0, index).concat(this.vendorDto.splice(index));
                this.toastr.success('Vendor Deleted Successfully!!');
            }
            else{
                this.toastr.error('Opps Something Goes Wrong!!');
            }
          },
            error => {
          console.log(JSON.stringify(error.json()));
          this.toastr.error('Opps Something Goes Wrong!!');
        });
    }

    showDialogToAdd() {
        this.newVendor = true;
        this.vendor = new PrimeVendor();
        this.displayDialog = true;
    }
    onRowSelect(event) {
        this.newVendor = false;
        this.vendor = this.cloneCar(event.data);
        console.log(event.data);
        console.log(this.selectedVendor);

        this.displayDialog = true;
    }
    //Why??
    cloneCar(c: Vendor): VendorTest {
        let vendor = new PrimeVendor();
        for (let prop in c) {
            vendor[prop] = c[prop];
        }
        return vendor;
    }

    findSelectedCarIndex(): number {
        return this.vendorDto.indexOf(this.selectedVendor);
    }
}

class PrimeVendor implements VendorTest {
    constructor(public name?, public description?) { }
}

