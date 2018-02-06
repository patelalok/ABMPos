import { Component, OnInit } from '@angular/core';
import { Brand, BrandTest } from "app/product/product.component";
import { ProductService } from "app/product/product.service";
import { Message } from "primeng/primeng";
import { BrandService } from "app/product/brand/brand.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
    brandForm: FormGroup;
    brandDto: PrimeBrand[];
    selectedBrandForDelete: Brand;
    displayDialog: boolean;

    msgs: Message[] = [];

    brand: BrandTest = new PrimeBrand();

    constructor(private brandService: BrandService, private productService: ProductService, private formBuilder: FormBuilder, private toastr: ToastsManager) { }

    ngOnInit() {

        this.brandForm = this.formBuilder.group(
            {
                'name': [null, Validators.required],
                'description': ['']
            }
        );

        this.getBrandDetails();
    }

    showSuccess(severity: string, summary: string, detail: string) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    }


    getBrandDetails(): void {
        this.productService.getBrandDetails()
            .subscribe((brand: Brand[]) => {
                this.brandDto = brand;
                console.log('BrandList' + this.brandDto);
            });
    }

    addBrand() {
        let newBrand = this.brandForm.value; 
        this.brandService.addOrUpdateBrand(this.brandForm.value)
        .subscribe(data => {
            if(data){
                this.toastr.success('Brand Added Successfully!!');
            }
            else{
                this.toastr.error('Opps Something Goes Wrong!!');
            }
          },
            error => {
          console.log(JSON.stringify(error.json()));
          this.toastr.error('Opps Something Goes Wrong!!');
        });
        this.brandDto.push(newBrand);

        this.brandDto = this.brandDto.slice();
        this.displayDialog = false;
    }

    updateBrand(event) {
        this.brandService.addOrUpdateBrand(event.data)
        .subscribe(data => {
            if(data){
                this.toastr.success('Brand Updated Successfully!!');
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

    setBrandForDetete(brand: Brand) {

        this.selectedBrandForDelete = brand;
    }
    deleteBrand() {
        let index = this.brandDto.findIndex((el) => el.name == this.selectedBrandForDelete.name); 

        this.brandDto = this.brandDto.splice(0, index).concat(this.brandDto.splice(index)); 
        this.brandService.deleteBrand(this.selectedBrandForDelete.brandId);

    }

    showDialogToAdd() {
        this.displayDialog = true;
    }

}

class PrimeBrand implements BrandTest {
    constructor(public name?, public description?) { }
}


