import { Component, OnInit } from '@angular/core';
import { ProductVariantDetail } from '../product.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {

  variantDto: ProductVariantDetail[] = [];
  variantDetailsDto: ProductVariantDetail[] = [];
  constructor(private productService: ProductService) { }

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

  }



}
