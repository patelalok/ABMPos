import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Product } from '../sell/sale/sale.component';

@Injectable()
export class GobalProdcutService {

    globalProductObj: Product[] = [];
    
    getProduct(){
        return this.globalProductObj;
    }
    setProduct(product: Product[]){
        this.globalProductObj =product;
    }
}