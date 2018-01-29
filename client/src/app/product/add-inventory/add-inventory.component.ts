import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/product/product.service';
import { ProductInventory, Vendor } from 'app/product/product.component';
import { SellService } from 'app/sell/sell.service';
import { PersistenceService } from 'app/shared/services/persistence.service';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr';
import { Product } from 'app/sell/sale/sale.component';


@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {

  p: any;  
  productDto: Product[];
  product: Product[];
  productInventotyList: ProductInventory[];
  productInventoryObject=  new ProductInventory();
  selectedProduct: Product;
  selectedVendor: any;
  vendorDto: Vendor[] = [];
  filteredProductByVendor: Product[] = [];
  popupHeader: string;
  popupMessage: string;

  constructor(private saleService: SellService, private productService: ProductService, private persit: PersistenceService, private toastr: ToastsManager) { }

  ngOnInit() {
    
    this.getProductDetails();
    this.getVendorDetails();

    this.productInventotyList = this.persit.getProductInventoryForAdd() || [];
  }
  getProductDetails() {
            this.productService.getProductDetails()
          .subscribe((pro: Product[]) => {
            this.productDto = pro;
            this.filteredProductByVendor = this.productDto;
            console.log('ProductList' + this.productDto);
          });
    
      }
getVendorDetails() {
      this.productService.getVendorDetails()
      .subscribe((vendors: Vendor[]) => {
        this.vendorDto = vendors;
        
        // this.form.get('vendor').setValue(this.vendorDto[0]);
      });
    }
// TODO NEED TO make it common so i can use other places too.
      filterProducts(event) {
        let query = event.query;
        this.productService.getProductDetails()
          .subscribe((products) => {
            // console.log(products);
            this.product = this.filterProduct(query, products);
          });
      }

      filterProduct(query, products: Product[]): Product[] {
        let filtered: Product[] = [];
        for (let i = 0; i < products.length; i++) {
          let p = products[i];
          if (p.description.toLowerCase().includes(query.toLowerCase())) {
            filtered.push(p);
          }
        }
        return filtered;
      }

         // This method helps when user try to change retial price or quanity from the sell text box.
  submitProduct(value: any) {

       console.log('This is value: ', value);
    
        if (typeof value === 'string') {
    
          console.log('This is value: ', value);
    
          // this is the senario where user is adding new product to Add into Inventory
          if (this.product != null && this.product.length > 0) {
            console.log("coming here");
            this.addProductInventory(this.product[0]);
          }
    
          // Dont understabd this
          else if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
    
            if (value.match(/[a-z]/i))
              console.log('contains only charcters');
    
            // this mean this is decimal value so it will change the retail price of the product
            if (value.match(/[0-9]/i) && value.indexOf('.') > 0)
              this.updateCostPrice(value);
            // this mean this is integer value so it will change the quantity of the product
            else if (value.match(/[0-9]/i))
              this.updateProductQuantityToAddInventory(value);
          }

        }
        else if (value != null) {
          this.addProductInventory(value);
        }
    }

      addProductInventory(productObj: Product): ProductInventory[] {

        // This mean user is adding first product into grid.
        // if(this.productInventotyList.length == 0) {
          this.productInventotyList = this.productInventotyList.slice();

          this.productInventoryObject = new ProductInventory();

          this.productInventoryObject.productNo = productObj.productNo;
          this.productInventoryObject.description = productObj.description;
          this.productInventoryObject.cost = productObj.cost;
          this.productInventoryObject.retail = productObj.retail;
          this.productInventoryObject.quantity = productObj.quantity
          this.productInventoryObject.markup = 0.00;

          this.productInventotyList.push(this.productInventoryObject);

          this.persit.setProductInventoryForAdd(this.productInventotyList);
          this.product = null;
          this.p = null
        // }

        return this.productInventotyList;
      }

      // I HAVE KEEP IT CASUE MAY BE I NEED TO HANDLE THIS LOGIC WHEN EVER USER ADD SAME PRODCUT INTO TABLE.
      // else {
        
              // Checking weather user is adding same product agian or not if its true
              //  then just update the quantity of that product by 1.
              // for (let lineItem of this.transactionLineItemDaoList) {
        
              //   if (productObj.productNo === lineItem.productNo) {
              //     // This flag helps to determin whether to add new product or just update the quantity
              //     this.isProductExistsInSellList = true;
        
              //     lineItem.defaultQuantity = + lineItem.defaultQuantity + 1;
        
              //     this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
              //     productObj.totalProductPrice = parseFloat((productObj.retail * lineItem.defaultQuantity).toFixed(2));
              //     productObj.taxAmountOnProduct = (productObj.retail * 7) / 100;
              //     console.log("when add product", productObj);
        
              //     this.product = null;
              //     this.p = null
              //     console.log(this.transactionLineItemDaoList);
        
        
              //     this.setTransactionDtoList(this.transactionLineItemDaoList)
              //     this.persit.setProducts(this.transactionLineItemDaoList);
              //     break;
              //   }
        
              //   else {
              //     // This flag helps to determin whether to add new product or just update the quantity
              //     this.isProductExistsInSellList = false;
              //   }
        
              // }
        
              // This flag helps to determin whether to add new product or just update the quantity
              // else (!this.isProductExistsInSellList) {
        
              //   this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
              //   productObj.totalProductPrice = productObj.retail * productObj.defaultQuantity;
              //   productObj.taxAmountOnProduct = parseFloat(((productObj.retail * 7) / 100).toFixed(2));
              //   console.log("when add product", productObj);
              //   this.transactionLineItemDaoList.push(productObj);
              //   this.product = null;
              //   this.p = null
              //   console.log(this.transactionLineItemDaoList);
        
              //   this.setTransactionDtoList(this.transactionLineItemDaoList)
              //   this.persit.setProducts(this.transactionLineItemDaoList);
              // }

      updateCostPrice(value: any) {
        
        console.log('Price change');
        this.productInventotyList[this.productInventotyList.length - 1].cost = value;
        // this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
        this.productInventotyList = this.productInventotyList.slice();
        //this.setTransactionDtoList(this.transactionLineItemDaoList)
    
        this.persit.setProductInventoryForAdd(this.productInventotyList);
        this.p = null;
      }

      updateProductQuantityToAddInventory(value: any) {
        console.log('Quantity change');
        this.productInventotyList[this.productInventotyList.length - 1].quantity = value;
        // this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity).toFixed(2));
        this.productInventotyList = this.productInventotyList.slice();
        // this.setTransactionDtoList(this.transactionLineItemDaoList)
        this.persit.setProductInventoryForAdd(this.productInventotyList);
        this.p = null;
      }

      updateInventoryDetails(event) {
        this.productInventotyList[event.index].quantity = event.data.quantity;
        this.productInventotyList[event.index].cost = event.data.cost;
        // this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.defaultQuantity * event.data.retail);
        // this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.defaultQuantity * event.data.retail) * 7) / 100
        // this.setTransactionDtoList(this.transactionLineItemDaoList)
    
        this.persit.setProductInventoryForAdd(this.productInventotyList);
      }

      setProductForDelete(product: Product)
      {
        this.selectedProduct = product;
        this.popupHeader = 'Remove Product Inventory';
        this.popupMessage = 'Are You Sure Remove Product Inventory ?';
      }

      deleteProduct() {
        console.log("inside delete");
        let index = this.productInventotyList.indexOf(this.selectedProduct, 0);
        console.log("index", index);
        if (index > -1) {
          this.productInventotyList.splice(index, 1);
          this.productInventotyList = this.productInventotyList.slice();
          this.persit.setProductInventoryForAdd(this.productInventotyList);
          
        }
      }

      setHeaderForRemoveAllInventoryProduct() 
      {
        this.popupHeader = 'Remove All Products Inventory';
        this.popupMessage = 'Are Sure You Want To Remove All Product Inventory ?';
      }
      removeAllProductInventory() {

        this.persit.clearProductInventory();
        this.productInventotyList = [];
      }
  

      // TO DO NEED TO FIGURE OUT FILTERTING HERE
      onVendorChoose() {
        this.productDto.filter((product) => {
          // return product.vendorId = thi

        })
      }

      setHeaderForAddProductInventory() {
        this.popupHeader = 'Add All Product Inventory';
        this.popupMessage = 'This Will Add All Products Into Inventory';
      }
      addProductInventoryToBackEnd() {

        this.productInventotyList.forEach((inventory) =>
        {
          inventory.createdTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        });

        this.productService.addProductInventory(this.productInventotyList)
        .subscribe(data => {

          if(data){
            this.toastr.success('Inventory Added Successfully !!', 'Success!');
          }
        },
        error => {
          this.toastr.error('Opps Something goes wrong !!', 'Error!!');
          console.log(JSON.stringify(error.json()));
        });

      }

   

      }

    
