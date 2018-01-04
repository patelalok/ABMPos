import { Component, OnInit } from '@angular/core';
import { Product } from "app/sell/sell.component";

@Component({
  selector: 'app-product-auto-complete',
  templateUrl: './product-auto-complete.component.html',
  styleUrls: ['./product-auto-complete.component.css']
})
export class ProductAutoCompleteComponent implements OnInit {

  product: Product[];
  selectedCar2;
  constructor() { }

  ngOnInit() {
  }

}
