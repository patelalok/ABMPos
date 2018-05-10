import { Component, OnInit } from '@angular/core';
import { ProductVariantDetail } from '../product.component';
import { ProductService } from '../product.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {

  variantDto: ProductVariantDetail[] = [];
  variantDetailsDto: ProductVariantDetail[] = [];
  constructor(private productService: ProductService, private toastr: ToastsManager) { }

  ngOnInit() {
    this.getAllVariant();
  }

  getAllVariant(){
    this.productService.getProductVariantDetails()
    .subscribe((variants)=>{
      this.variantDto = variants;
      console.log('dto', this.variantDto);
      console.log('sd', variants);
    })
  }

  getVariantDetails(name: string){

    this.productService.getProductVariantDetailsByName(name)
    .subscribe((variants)=>{
      this.variantDetailsDto = variants;
      console.log('dto', this.variantDto);
      console.log('sd', variants);
    })
  }

  updateVariantValue(event){

    this.productService.addProductVariantDetails(event.data)
    .subscribe((response)=>{
      if(response || response.statusText == 'OK'){
        this.toastr.success('Variant Details Updated Successfully!!');
      }
    },
    error =>{
      this.toastr.error('Opps Something Goes Wrong!!');
    }
  )

    console.log(event);
  }



}
