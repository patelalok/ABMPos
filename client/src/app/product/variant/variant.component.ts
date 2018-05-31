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
    .subscribe((variants:ProductVariantDetail[] )=>{
      this.variantDto = variants;
      console.log('dto', this.variantDto);
      console.log('sd', variants);
    })
  }

  getVariantDetails(event){

    console.log(event.target.selectedIndex);

    if(event.target.selectedIndex == 0){
      $('#addVariant').modal('show');
    }
    else {
      let selectedVariant: ProductVariantDetail = this.variantDto[event.target.selectedIndex - 1];

      console.log(selectedVariant);
      this.productService.getAllProductVariantDetails()
      .subscribe((variants)=>{
        this.variantDetailsDto = variants;
        this.variantDetailsDto = this.variantDetailsDto.slice();
        console.log('dto', this.variantDto);
        console.log('sd', variants);
      })
    }
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

  addVariant(name: string){
    let productVariantDetail = new ProductVariantDetail() ;
    productVariantDetail.name = name;

    this.productService.addProductVariantDetails(productVariantDetail)
    .subscribe((response)=>{
      if(response || response.statusText == 'OK'){
        this.toastr.success('Variant Details Added Successfully!!');
        console.log(response);
        this.variantDto.push(response.json().name)
      }
    },
    error =>{
      this.toastr.error('Opps Something Goes Wrong!!');
    }
  )


  }



}
