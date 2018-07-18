import { Component, ViewChild, ElementRef, OnInit, Pipe, PipeTransform, AfterViewInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LazyLoadEvent } from 'primeng/primeng';
import { SellService } from 'app/sell/sell.service';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { PersistenceService } from "../shared/services/persistence.service";
import { StoreSetupService } from 'app/shared/storesetup/storesetup.service';
import { StoreSetupDto } from 'app/shared/storesetup/storesetup.component';
import { CustomerService } from 'app/customer/customer.service';
import { Customer } from 'app/customer/customer.component';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { fadeInAnimation } from 'app/shared/animations/fade-in.animation';
import { ProductInventory } from 'app/product/product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { empty } from 'rxjs/Observer';
import { MenuItem } from 'app/shared/top-navbar/top-navbar.component';
import { Product, TransactionLineItemDaoList, TransactionDtoList } from 'app/sell/sale/sale.component';
import { ProductService } from 'app/product/product.service';
// import { disconnect } from 'cluster';
declare var $: JQueryStatic;
@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
  animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': '' }
})
export class SellComponent implements OnInit {

  // @HostBinding('@fadeInAnimation') fadeInAnimation;

  
  // myControl = new FormControl();
  // product: Product[];
  // customerDto: Customer[];
  // cust: any;

  // p: any;
  // filteredCustomer: any[];
  // isProductExistsInSellList = false;
  // transactionLineItemDaoList: TransactionLineItemDaoList[];
  // transactionDtoList = new TransactionDtoList();
  // paymentDto = new PaymentDto();
  // a = 'sdfds';
  // // selectedProduct: Product;
  // selectedCustomer: Customer;

  // cols: any[];

  // filteredCountriesSingle: any[];
  // storeDetails: StoreSetupDto;

  // popupHeader: string;
  // popupMessage: string;
  // showCustomerDetails = false;
  // payAmountTextBox: number;
  // discountType: string;
  // discountTexBox: number;
  // // disableCustomerSearchTextbox: boolean = false;

  // // paymentObjectForPaymentSellTable = new Array <PaymentObjectForPaymentSellTable[]>();
  // paymentObjectForPaymentSellTable: PaymentObjectForPaymentSellTable[] = [];

  // dueAmountForTransaction: number;

  // // this variable helps to manage transaction amount and dueamount for transaction.
  // tempTransactionAmountForSale: number;

  // // This help when customer has paid full amount, so now user should not able to click on any payment button.
  // // These both buttons are on payment page pop up.
  // disablePaymentButtons: boolean = false;
  // disablePaymentButtonsWithAmount = false;
  // disableCompleteSaleButton: boolean = true;

//   payLable: string = 'Pay:';
//   amountDueLable: string = 'Amount Due:';
//   paymentDao: PaymentDto[] = [];

//   // This button is on sale page, not on pyament popup page.
//   paymentButtonOnSale: boolean = true;
//   transactionNotes: string = '';

//   disableOnAccountButtons: boolean = true;
//   disableStoreCreditButtons: boolean = true;

//   saleType: string = 'Complete';
//   // This is useful in case of return where user gives store credit, i need oldtransactionId to store in store credit table as reason.
//   previousTransactionId: any;

// printTransactionDto: TransactionDtoList = null;

items: MenuItem[];

  // popoverStyle: any;

  constructor(
    private sellService: SellService, 
    private persit: PersistenceService,
    private productService: ProductService, 
    private storeSetupService: StoreSetupService, 
    private customerService: CustomerService, 
    private sanitizer: DomSanitizer, 
    private route: ActivatedRoute, 
    private router: Router, 
    private toastr: ToastsManager
  ) {
    
  }
  // 
  ngOnInit() {

    // if (this.router.url == "/sell")
    //   this.router.navigate(['/sell/sale']);

    this.items = [
      { name: 'Recive Payment', link: '/sell/payment', icon: 'fa fa-usd fa-x'},
      { name: 'Return', icon: 'fa fa-reply-all fa-x ', link: '/sell/return' },
      { name: 'Close Register', icon: 'fa fa-window-close-o fa-x', link: '/sell/close-register' },
      { name: 'Close Shift', icon: 'fa fa-times fa-x', link: '/sell/close-shift' }
    ];

    // this.toastr.success("Sell component initiated", "Nice!");
    // this.storeSetupService.getStoreDetails().
    //   then((data) => {
    //     this.storeDetails = data;
    //   });

    // let transactionComId = this.route.snapshot.paramMap.get('transactionComId');
    // if (transactionComId) {

    //   this.returnSale(transactionComId);
    // }


    // This call is to get all customer details.
    //this.getCustomerDetails();

    // Here i am checking that customer already selected on sale page or not.
    // this.selectedCustomer = this.persit.getCustomerDetailsForSale();

    // this.cols = [
    //   { field: 'productNo', header: 'ProductNo' },
    //   { field: 'description', header: 'Description' },
    //   { field: 'retail', header: 'Retail' },
    //   { field: 'defaultQuantity', header: 'Quantity' },
    //   { field: 'retailDiscount', header: 'RetailWithDis' },
    //   { field: 'totalProductPrice', header: 'Total' },
    //   { field: 'quantity', header: 'In-Stock' }
    // ];
    // console.log(this.persit.getProducts());
    // this.transactionLineItemDaoList = this.persit.getProducts() || [];

    // this will show transaction data on right side on refresh or on load of the page
    // this.setTransactionDtoList(this.transactionLineItemDaoList);
  }

  // ngAfterViewInit() {

  //   // This will focus on the autocomplete field
  //   $('#productsearch > span > input').focus();
  // }


  // openSellCustomerView(){
  //   let url =  '/sell-customer'; 
  //   window.open(url, '_blank',  'toolbar=0,location=0,menubar=0');
  // }
  
  // filterProducts(event) {
  //   let query = event.query;
  //   // this.productService.getProductDetails()
  //   //   .subscribe((products) => {
  //   //     // console.log(products);
  //   //     this.product = this.filterProduct(query, products);
  //   //   });
  // }

  // filterCustomers(event) {
  //   let query = event.query;
  //   this.customerService.getCustomerDetails()
  //     // .subscribe((customers) => {
  //     //   // console.log(products);
  //     //   this.filteredCustomer = this.filterCustomer(query, customers);
  //     // });
  // }

  // public getCustomerDetails() {

  //   // this.customerService.getCustomerDetails()
  //   //   .subscribe((customer: Customer[]) => {
  //   //     this.customerDto = customer;
  //   //   });
  // }

  // public addTransactionLineItem(productObj: Product): TransactionLineItemDaoList[] {

  //   return null;
  // }

    // This is fisrt time when user is adding product to sell.
    // if (this.transactionLineItemDaoList.length == 0) {

    //   productObj.totalProductPrice = parseFloat(productObj.retail.toFixed(2));
    //   productObj.taxAmountOnProduct = (productObj.retail * 7) / 100;


    //   console.log("when add product", productObj);
    //   this.transactionLineItemDaoList.push(productObj);
    //   this.product = null;
    //   this.p = null

    //   this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    //   this.setTransactionDtoList(this.transactionLineItemDaoList)
    //   // This will save the data into local storage.
    //   this.persit.setProducts(this.transactionLineItemDaoList);
    // // }
    // else {

    //   // Checking weather user is adding same product agian or not if its true
    //   //  then just update the quantity of that product by 1.
    //   for (let lineItem of this.transactionLineItemDaoList) {

    //     if (productObj.productNo === lineItem.productNo) {
    //       // This flag helps to determin whether to add new product or just update the quantity
    //       this.isProductExistsInSellList = true;

    //       lineItem.defaultQuantity = + lineItem.defaultQuantity + 1;
    //       lineItem.quantityUpdated = true;

    //       // here  i need to get value of lineitem.retail becuase user might have change the retial price so, if i dont do lineitem.retail it will take old retail price.
    //       lineItem.totalProductPrice = parseFloat((lineItem.retail * lineItem.defaultQuantity).toFixed(2));
    //       lineItem.taxAmountOnProduct = (lineItem.retail * 7) / 100;

    //       console.log("when add product", productObj);
    //       this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();

    //       this.product = null;
    //       this.p = null
    //       console.log(this.transactionLineItemDaoList);


    //       this.setTransactionDtoList(this.transactionLineItemDaoList)
    //       this.persit.setProducts(this.transactionLineItemDaoList);
    //       setTimeout(() => {
    //         lineItem.quantityUpdated = false;
    //         this.persit.setProducts(this.transactionLineItemDaoList);
    //         this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    //       }, 3000);
    //       break;
    //     }

    //     else {
    //       // This flag helps to determin whether to add new product or just update the quantity
    //       this.isProductExistsInSellList = false;
    //     }

     // }

      // This flag helps to determin whether to add new product or just update the quantity
      // if (!this.isProductExistsInSellList) {

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
    //}
    // $(`lineitem${productObj.productNo}`).ready(function () {
    //   // $(`lineitem${productObj.productNo}`).sc
    //   document.getElementById(`lineitem${productObj.productNo}`).scrollIntoView();
    // });
   // return this.transactionLineItemDaoList;

  // #productsearch > span > input
  // testFocus() {
  //   // document.querySelector("#productsearch > span > input").focus();
  //   $('#productsearch > span > input').focus();
  // }
  // This method helps when user try to change retial price or quanity from the sell text box.



  // updateProductQuantity(value: any) {
  //   console.log('Quantity change');
  //   this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity = value;
  //   this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity).toFixed(2));
  //   this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
  //   this.setTransactionDtoList(this.transactionLineItemDaoList)
  //   this.persit.setProducts(this.transactionLineItemDaoList);
  //   this.p = null;
  // }

  // updateProductPrice(value: any) {
  //   console.log('Price change');

  //   let oldRetail = this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail;
  //   let discount = 0.00;
  //   this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail = value;
  //   this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
    
  //   console.log("outside if", this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail);
  //   if(value < oldRetail)
  //   {
  //     discount  = oldRetail - value;
  //     console.log("discount", discount);
  //     this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount = discount;
  //     console.log("lineitem discount:", oldRetail - value);
  //   }
  //   console.log("after if if", value);
  //   console.log("discount", discount);
  
  //   console.log("discount");
    
  //   this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
  //   this.setTransactionDtoList(this.transactionLineItemDaoList)

  //   this.persit.setProducts(this.transactionLineItemDaoList);
  //   this.p = null;
  // }


  // updateProductPrice(value: any) {
  //   console.log('Price change');
  //   this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail = value;
  //   this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
  //   this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
  //   this.setTransactionDtoList(this.transactionLineItemDaoList)

  //   this.persit.setProducts(this.transactionLineItemDaoList);
  //   this.p = null;
  // }

  // this method helps to update lineItem Detail when user change the quatity or change the retail from editable box
  // updateLineItemDetails(event) {
  //   this.transactionLineItemDaoList[event.index].defaultQuantity = event.data.defaultQuantity;
  //   this.transactionLineItemDaoList[event.index].retail = event.data.retail;
  //   this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.defaultQuantity * event.data.retail);
  //   this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.defaultQuantity * event.data.retail) * 7) / 100
  //   this.setTransactionDtoList(this.transactionLineItemDaoList)

  //   this.persit.setProducts(this.transactionLineItemDaoList);
  // }


  // setDiscountType(discountType: any) {

  //   console.log("inside set discount type", discountType)
  //   if (discountType == 'By Amount') {

  //     this.discountType = discountType;
  //   }
  //   else if (discountType == 'By Percentage') {
  //     this.discountType = discountType;
  //   }
  // }

//   calculateDiscount(value: any) {

//     console.log("inside calculate discount", value)

//     if (this.discountType == 'By Amount') {

//       this.transactionDtoList.totalDiscount = value;

//       // Here need to calculate tax because, now we have to apply tax on the amount which come after discount
//       this.transactionDtoList.tax = ((this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount)*7)/100;
//       // Here i have to subtract the subtotal from the discount, if i do from total then it will be wrong cause it has alredy calculted tax on it.
//       this.transactionDtoList.totalAmount = (this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) + this.transactionDtoList.tax;


// // Need to do this here, cause then only it will show same amount on payment popup.    this.payAmountTextBox = this.transactionDtoList.totalAmount;
//     this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
//     }
//     else if(this.discountType == 'By Percentage'){

//       this.transactionDtoList.totalDiscount = parseFloat(((this.transactionDtoList.totalAmount * value) / 100).toFixed(2));

//       // Here need to calculate tax because, now we have to apply tax on the amount which come after discount
//       this.transactionDtoList.tax = ((this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount)*7)/100;
      
//       this.transactionDtoList.totalAmount = (this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) + this.transactionDtoList.tax;

//          // Need to do this here, cause then only it will show same amount on payment popup.
//     this.payAmountTextBox = this.transactionDtoList.totalAmount;
//     this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
//     }

//   }


  // setTransactionDtoList(lineItem: TransactionLineItemDaoList[]) {
  //   let totalQuantity = 0;
  //   let totalPrice = 0.00;
  //   let tax: number = 0.00;

  //   if (this.selectedCustomer && this.saleType == 'Complete') {
  //     this.transactionDtoList.totalAmount = this.selectedCustomer.balance
  //   }
  //   else {
  //     this.transactionDtoList.totalAmount = 0.00;
  //   }


  //   for (let i = 0; i < lineItem.length; i++) {
  //    // totalQuantity = + lineItem[i].defaultQuantity + totalQuantity;
  //     totalPrice = + lineItem[i].totalProductPrice + totalPrice;

  //     // Here totalProductPriceWithTax mean, only amount of the tax on that product dont get confuse with naming
  //     tax = + (lineItem[i].totalProductPrice * 7) / 100 + tax;
  //     console.log("totalQuantity", totalQuantity);
  //     console.log("totalPrice", totalPrice);
  //     console.log("totalTax", tax);
  //   }


  //   this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
  //   this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
  //   this.transactionDtoList.tax = parseFloat(tax.toFixed(2));
  //   this.transactionDtoList.totalAmount = this.transactionDtoList.totalAmount + parseFloat(((totalPrice) + tax).toFixed(2));

    

  //   // This logic helps to manage main payment button enable or diable.
  //   if (this.transactionDtoList.totalAmount == 0) {
  //     this.paymentButtonOnSale = true;
  //   }
  //   else {
  //     this.paymentButtonOnSale = false;
  //   }

  //   // These for sale page pop -- First row.
  //   this.payAmountTextBox = this.transactionDtoList.totalAmount;
  //   this.dueAmountForTransaction = this.transactionDtoList.totalAmount;

  // }


  // filterProduct(query, products: Product[]): Product[] {
  //   let filtered: Product[] = [];
  //   for (let i = 0; i < products.length; i++) {
  //     let p = products[i];
  //     if (p.description.toLowerCase().includes(query.toLowerCase()) || p.productNo.includes(query)) {
  //       filtered.push(p);
  //     }
  //   }
  //   return filtered;
  // }

  // filterCustomer(query, customers: Customer[]): Customer[] {
  //   let filtered: Customer[] = [];
  //   for (let i = 0; i < customers.length; i++) {
  //     let cust = customers[i];
  //     if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
  //       filtered.push(cust);
  //     }
  //   }
  //   return filtered;

  // }

  // submitCustomer() {
  //   // this.selectedCustomer = value;
  //   // this.cust = null;
  //   // this.disableCustomerSearchTextbox = true;


  //   // Storing customer detials into local storage.
  //   this.persit.setCustomerDetailsForSale(this.selectedCustomer);

  //   // Need to do this to add balance into transaction details
  //   this.setTransactionDtoList(this.transactionLineItemDaoList);

  //   console.log('customer', this.selectedCustomer);
  // }

  // This will remove the customer from local storage.
  // removeCustomerOnSale() {

  //   this.persit.clearCustomer();
  //   this.selectedCustomer = null;
  //   this.cust = null;
  //   // this.disableCustomerSearchTextbox = false;
  //   this.setTransactionDtoList(this.transactionLineItemDaoList);

  // }

  // showPopover(discount) {
  //   let { x, y } = <DOMRectInit>discount.getBoundingClientRect();
  //   if (this.popoverStyle)
  //     this.popoverStyle = null;
  //   else
  //     this.popoverStyle = this.sanitizer.bypassSecurityTrustStyle(`position: absolute; transform: translate3d(${x - 271.86 - 10}px, ${y - 74.5}px, 0px); top: 0px; left: 0px; will-change: transform;`)

  //   // console.log();
  // }


  // print(obj) {
  //   console.log("Coming form print", obj);
  // }

  // deleteProduct() {
  //   console.log("inside delete");
  //   let index = this.transactionLineItemDaoList.indexOf(this.selectedProduct, 0);
  //   console.log("index", index);
  //   if (index > -1) {
  //     this.transactionLineItemDaoList.splice(index, 1);
  //     this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
  //     this.setTransactionDtoList(this.transactionLineItemDaoList);
  //     this.persit.setProducts(this.transactionLineItemDaoList);
  //   }
  // }
  // test(a: number) {
  //   this.calculateDiscountByAmount(a);
  //   alert("hi");
  //   console.log("insod test", event);
  // }

  // setProductForDelete(product: Product) {
  //   this.selectedProduct = product;
  //   this.popupHeader = 'Delete Product';
  //   this.popupMessage = 'Are You Sure You Want To Delete Product?';
  // }

  //This methode will completly remove the all transaction line item and transaction details.
  // disgardCompleteSale() {

  //   this.persit.clearProducts();
  //   this.persit.clearCustomer();

  //   this.transactionLineItemDaoList = [];

  //   // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
  //   this.selectedCustomer = null;

  //   this.setTransactionDtoList([]);
  //   // this.disableCustomerSearchTextbox = false;    
  //   this.saleType = 'Complete';

  //   this.router.navigate(['/sell']);
  // }

  // setHeaderAndMessageForDisgardPopup() {
  //   this.popupHeader = 'Discard Sale';
  //   this.popupMessage = 'Are You Sure You Want To Delete Complete Sale?';
  // }

  // setPaymentDto(paymentType: any, paymentAmount: any) {

  //   if (this.saleType == 'Return') {

  //     this.setPaymentDtoForRetun(paymentType, this.payAmountTextBox);
  //   }
  //   else {

  //     if (paymentType == 'Cash') {
  //       // This is very rare scenario and it happens only if user is stupid but still i need to handle this,
  //       // Cause user can pay in cash two time by click on cash button by seletecting different buttons.
  //       if (null != this.paymentDto && this.paymentDto.cash > 0) {
  //         this.paymentDto.cash = +this.paymentDto.cash + paymentAmount;
  //       }
  //       else {
  //         // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
  //         if (paymentAmount > this.dueAmountForTransaction) {
  //           this.paymentDto.cash = this.dueAmountForTransaction;
  //         }
  //         else {
  //           this.paymentDto.cash = paymentAmount;
  //         }

  //       }

  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount })

  //       this.validatePaymentButtons(paymentAmount);
  //     }
  //     else if (paymentType == 'Credit') {
  //       if (null != this.paymentDto && this.paymentDto.credit > 0) {
  //         this.paymentDto.credit = +this.paymentDto.credit + paymentAmount;
  //       }
  //       else {
  //         // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
  //         if (paymentAmount > this.dueAmountForTransaction) {
  //           this.paymentDto.credit = this.dueAmountForTransaction;
  //         }
  //         else {
  //           this.paymentDto.credit = paymentAmount;
  //         }
  //       }
  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount })

  //       this.validatePaymentButtons(paymentAmount);

  //     }
  //     else if (paymentType == 'Debit') {
  //       if (null != this.paymentDto && this.paymentDto.debit > 0) {
  //         this.paymentDto.debit = +this.paymentDto.debit + paymentAmount;
  //       }
  //       else {
  //         // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
  //         if (paymentAmount > this.dueAmountForTransaction) {
  //           this.paymentDto.debit = this.dueAmountForTransaction;
  //         }
  //         else {
  //           this.paymentDto.debit = paymentAmount;
  //         }
  //       }
  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount })

  //       this.validatePaymentButtons(paymentAmount);

  //     }
  //     else if (paymentType == 'Check') {
  //       if (null != this.paymentDto && this.paymentDto.checkAmount > 0) {
  //         this.paymentDto.checkAmount = +this.paymentDto.checkAmount + paymentAmount;
  //       }
  //       else {
  //         // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
  //         if (paymentAmount > this.dueAmountForTransaction) {
  //           this.paymentDto.checkAmount = this.dueAmountForTransaction;
  //         }
  //         else {
  //           this.paymentDto.checkAmount = paymentAmount;
  //         }
  //       }
  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount })

  //       this.validatePaymentButtons(paymentAmount);
  //     }
  //     else if (paymentType == 'StoreCredit') {

  //       // First need to check store credit already there added in payment dao or not, 
  //       if (null != this.paymentDto && this.paymentDto.storeCredit > 0) {
  //         if (paymentAmount > this.dueAmountForTransaction) {
  //           // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

  //           this.paymentDto.storeCredit = +this.paymentDto.storeCredit + this.dueAmountForTransaction;

  //           this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });

  //           this.validatePaymentButtons(this.paymentDto.storeCredit);
  //         }
  //         // Here i am using complete store credit of the customer
  //         else {

  //           this.paymentDto.storeCredit = paymentAmount;
  //           this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
  //           this.validatePaymentButtons(this.paymentDto.storeCredit);
  //         }
  //       }
  //       else {
  //         if (paymentAmount > this.dueAmountForTransaction) {
  //           // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

  //           this.paymentDto.storeCredit = this.dueAmountForTransaction;

  //           this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });

  //           this.validatePaymentButtons(this.paymentDto.storeCredit);
  //         }
  //         // Here i am using complete store credit of the customer
  //         else {

  //           this.paymentDto.storeCredit = paymentAmount;
  //           this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
  //           this.validatePaymentButtons(this.paymentDto.storeCredit);
  //         }
  //       }

  //       // Now I have to handle two scenario
  //       // Case 1. Store credit can greater then equal to payment amount
  //       // Case 2. Store credit can less then equal to payment amount

  //       // Case 1: where payment amount is customers store credit because that what i am sending from ui


  //     }
  //     else if (paymentType == 'OnAccount') {
  //       this.paymentDto.onAccount = paymentAmount;
  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'OnAccount', 'paymentAmount': paymentAmount })

  //       // In this flow customer is not paying anythig or paying some amount and other amoun he is just putting on his account and will pay later
  //       // So here i need to complete the transaction, thats why calling this method.
  //       //this.completeSale();

  //       //this.validatePaymentButtons(paymentAmount);


  //       this.disablePaymentButtons = true;
  //       this.disablePaymentButtonsWithAmount = true;
  //       // This mean customer has provide sufficient balance.
  //       this.disableCompleteSaleButton = false;
  //     }
  //     else if (paymentType == 'Loyalty') {
  //       this.paymentDto.loyalty = paymentAmount;
  //     }

  //     console.log('payment type and amount', paymentAmount);

  //   }
  // }

  // setPaymentDtoForRetun(paymentType: any, paymentAmount: any) {
  //   this.payLable = 'Return';
  //   this.amountDueLable = 'Return Amount:';


  //   if (paymentType == 'Cash') {

  //     this.paymentDto.cash = paymentAmount;
  //     this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount })
  //     this.validatePaymentForReturn();
  //   }
  //   else if (paymentType == 'Credit') {

  //     this.paymentDto.credit = paymentAmount;
  //     this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount })
  //     this.validatePaymentForReturn();
  //   }
  //   else if (paymentType == 'Debit') {

  //     this.paymentDto.debit = paymentAmount;
  //     this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount })
  //     this.validatePaymentForReturn();
  //   }
  //   else if (paymentType == 'Check') {

  //     this.paymentDto.checkAmount = paymentAmount;
  //     this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount })
  //     this.validatePaymentForReturn();
  //   }

  //   else if(paymentType == 'StoreCredit')
  //   {
  //     // Converting negative amount to positive so i can add this amount in backend.
  //     this.paymentDto.storeCredit = Math.abs(paymentAmount);
  //     this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': paymentAmount })
  //     this.disableStoreCreditButtons = true;
  //     this.validatePaymentForReturn();
  //   }


  // }

  // validatePaymentForReturn() {

  //   this.disablePaymentButtons = true;
  //   this.disableCompleteSaleButton = false;


  // }

  // validatePaymentButtons(paymentAmount: number) {

  //   let totalPaidAmout = 0.00;

  //   // This means cutomer has paid full amount.
  //   if (this.dueAmountForTransaction - paymentAmount <= 0) {
  //     this.dueAmountForTransaction = this.dueAmountForTransaction - paymentAmount;
  //     this.disablePaymentButtons = true;
  //     this.disablePaymentButtonsWithAmount = true

  //     this.payLable = 'Paid Amount:';
  //     this.amountDueLable = 'Change Amount:';


  //     // This mean customer has provide sufficient balance.
  //     this.disableCompleteSaleButton = false;

  //     // This logic helps to show the data in paid amount tax box when user exact amount or more.
  //     for (let a of this.paymentObjectForPaymentSellTable) {
  //       totalPaidAmout = totalPaidAmout + a.paymentAmount;
  //     }
  //     this.payAmountTextBox = totalPaidAmout;
  //   }
  //   else {
  //     // this.dueAmountForTransaction = Number.parseFloat((this.dueAmountForTransaction - paymentAmount).toFixed(2));
  //     this.dueAmountForTransaction = this.dueAmountForTransaction - paymentAmount;
  //     this.payAmountTextBox = this.dueAmountForTransaction;

  //   }

  // }

  // This methode calls when user click on the payment button.
  // setDataForPaymentModel() {



  //   // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
  //   this.payAmountTextBox = this.dueAmountForTransaction;
  //   this.disablePaymentButtons = false;
  //   this.disablePaymentButtonsWithAmount = false;
  //   this.disableCompleteSaleButton = true;

  //   this.disableOnAccountButtons = this.selectedCustomer == null;

  //   // This mean this customer has some store credit to use so i need to enable store credit button.
  //   if (this.selectedCustomer && this.selectedCustomer.storeCredit > 0) {
  //     this.disableStoreCreditButtons = false;
  //   }
  //   else {
  //     this.disableStoreCreditButtons = true;
  //   }
  //   console.log("selected customer", this.selectedCustomer);

  //   console.log("inside the set data");
  // }

  // setDataForPaymentModelForReturnSale() {

  //   this.payAmountTextBox = this.dueAmountForTransaction;
  //   this.disablePaymentButtonsWithAmount = true;
  //   this.disableCompleteSaleButton = true;
  //   this.disableOnAccountButtons = true;

  //   if (this.selectedCustomer) {
  //     this.disableStoreCreditButtons = false;
  //   }
  // }

  // This method helps to delete payment type and recaculate all other parameters.
  // deletePaymentFromPaymentModel(payment: PaymentObjectForPaymentSellTable) {



  //   if (this.saleType == 'Return') {

  //     let index = this.paymentObjectForPaymentSellTable.indexOf(payment);
  //     if (index > -1) {
  //       this.paymentObjectForPaymentSellTable.splice(index, 1);

  //       this.dueAmountForTransaction = payment.paymentAmount;
  //       this.payAmountTextBox = this.dueAmountForTransaction;

  //       this.disablePaymentButtons = false;
  //       this.disableCompleteSaleButton = true;

  //     }
  //   }

  //   else {

  //     let index = this.paymentObjectForPaymentSellTable.indexOf(payment);
  //     if (index > -1) {
  //       this.paymentObjectForPaymentSellTable.splice(index, 1);

  //       // Need to handle this, because i am adding payment type when user click on add payment,
  //       // So now when user delete the payment type, i need to change the payment object too, and remove the or subtract the payment amount.
  //       if (payment.paymentType == 'Cash' && payment.paymentAmount > 0) {
  //         this.paymentDto.cash = this.paymentDto.cash - payment.paymentAmount;
  //       }
  //       if (payment.paymentType == 'Credit' && payment.paymentAmount > 0) {
  //         this.paymentDto.credit = this.paymentDto.credit - payment.paymentAmount;
  //       }
  //       if (payment.paymentType == 'Debit' && payment.paymentAmount > 0) {
  //         this.paymentDto.debit = this.paymentDto.debit - payment.paymentAmount;
  //       }
  //       if (payment.paymentType == 'Check' && payment.paymentAmount > 0) {
  //         this.paymentDto.checkAmount = this.paymentDto.checkAmount - payment.paymentAmount;
  //       }
  //       if (payment.paymentType == 'StoreCredit' && payment.paymentAmount > 0) {
  //         this.paymentDto.storeCredit = this.paymentDto.storeCredit - payment.paymentAmount;
  //       }
  //     }


  //     // This is because of stupid type script,  + it concatting the two variables.  DO NOT FORGET THIS. 
  //     this.dueAmountForTransaction = +payment.paymentAmount + this.dueAmountForTransaction;
  //     this.payAmountTextBox = this.dueAmountForTransaction;


  //     console.log('payment', payment.paymentAmount);
  //     console.log('Value of duw amout tran', this.dueAmountForTransaction);
  //     console.log('Value of paymenttexbox', this.payAmountTextBox);
  //   }
  //   if (this.dueAmountForTransaction > 0) {
  //     this.disableCompleteSaleButton = true;
  //     this.disablePaymentButtons = false;
  //     this.disablePaymentButtonsWithAmount = false;
  //   }
  // }


  // // This is the method which handle completing the transaction and reset the all flag and other data.
  // completeSale() {

  //   // setting customer details
  //   if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
  //     this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
  //     this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
  //     this.transactionDtoList.previousBalance = this.selectedCustomer.balance;

  //   }
  //   else{
      
  //   }

  //   this.transactionDtoList.status = this.saleType;

  //   // This help only when user do return transaction where user gives store credit to the customer.
  //   this.transactionDtoList.previousTransactionId = this.previousTransactionId;

  //   // THIS means customer has over paid, this happens mostly in cash of when customer pay by cash.
  //   // So i am setting it as chnage amount.
  //   if (this.dueAmountForTransaction < 0) {
  //     this.paymentDto.changeForCash = Math.abs(this.dueAmountForTransaction);
  //   }
  //   // This mean customer has add money on Account or paid perfect price but in both case i need to set transaction balance cause thats how i am handling balance logic in backend.
  //   else {
  //     this.transactionDtoList.transactionBalance = this.dueAmountForTransaction;
  //   }


  //   // seeting current date and time using momemt.
  //   this.transactionDtoList.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');


  //   // Setting payment dto into transaction dto, because can not send both as @request body mfrom angular..
  //   this.paymentDto.date = this.transactionDtoList.date;
  //   this.paymentDao.push(this.paymentDto);
  //   //this.transactionDtoList.paymentDao = this.paymentDao;

  //   // Setting TransactionLineItemDetails
  //   // for (let lineItem of this.transactionLineItemDaoList) {

  //   //   lineItem.status = this.saleType;
  //   //   lineItem.date = this.transactionDtoList.date;
  //   //   // I need to do this casue in backend i am using quantity and here i have to use defult quanity to show 1 as user insert product.
  //   //   lineItem.quantity = lineItem.defaultQuantity;
  //   // }

  //   // this.transactionNotes is bind with the ng model on ui.
  //   this.transactionDtoList.note = this.transactionNotes

  //   // To do need to fix this hardcoded value for username
  //   this.transactionDtoList.username = 'alok@alok.com';
  //   this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;



  //   // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
  //   this.sellService.addTransactionDetails(this.transactionDtoList)
  //   .subscribe(
  //     data => {
  //     // alert('ok');
  //     this.disableCompleteSaleButton = true;
  //     this.printTransactionDto = data.json();
  //      console.log('addTransaction response',data);
  //      console.log('printTransaction dao',this.printTransactionDto);

       

  //    },
  //    error => {
  //      console.log(JSON.stringify(error.json()));
  //    },
  //   () => {

  //   }
  //   );
  //   //this.disableCompleteSaleButton = true;
  //   console.log('Transaction Details', this.transactionDtoList);
  //   console.log('TransactionLineItem Details', this.transactionLineItemDaoList);
  //   console.log('Payment Dto', this.paymentDto);
  //   //this.disablePaymentButtons = true;

  //   console.log("done with sales");


  //   // This will focus on the autocomplete field
  //   $('#productsearch > span > input').focus();
  // }

  // // This method helps to add transaction as park, so user can use this transaction later
  // parkSale() {

  //   this.saleType = 'Parked';
  //   this.completeSale();

  //   this.saleType = 'Complete'; // Need to set for next transaction

  // }

  // clearAllDateAfterTransactionComplete() {


  //   // This is important to handle when user clock on Close button from payment popup, we need to clear data only when transaction is completed ottherwise just need to close the popup.
  //   if(null != this.printTransactionDto)
  //   {
  //     this.persit.clearProducts();
  //     this.persit.clearCustomer();
  
  //     // Very importa can not assign to null
  //     this.paymentDto = new PaymentDto();
  
  //     this.selectedCustomer = null;
  //     // this.disableCustomerSearchTextbox = false;
  
  //     this.paymentObjectForPaymentSellTable = [];
  //     // This is payment button on the sale page, i need to do this because there is not data in sale table,
  //     this.paymentButtonOnSale = true;
  
  
  //     this.transactionLineItemDaoList = this.persit.getProducts() || [];
  //     this.setTransactionDtoList(this.transactionLineItemDaoList);
  //     this.paymentDao = [];
  
  //     // Need set it null cause its showing in next transaction also.
  //     this.transactionNotes = '';
  
  //     // very important cause this will give problem after doing return transaction so, after any transactoin i need to do this.
  //    this.saleType = 'Complete';
  //    this.disableStoreCreditButtons = true;
  
  //    this.printTransactionDto = null;
  //   }

  //   else {
  //     console.log('just close the model.')
  //   }



  // }


  // returnSale(transactionComId: any) {


  //   // This is temp code for handling parked and online transactions
  //   this.sellService.getTransactionById(transactionComId)
  //     .subscribe((transaction: TransactionDtoList) => {

  //       if(transaction.status == 'Parked'){

  //         transaction.transactionLineItemDaoList.forEach((lineItem) => {
  //         //  lineItem.defaultQuantity = lineItem.quantity;
  //          // lineItem.quantity = 0;
  //         });
  //             // Setting transactoin id here so i can send this in case of return and when user gives store credit to the customer.
  //             this.previousTransactionId = transaction.transactionComId;
              
  //                     this.persit.setProducts(transaction.transactionLineItemDaoList);
              
  //                     this.transactionLineItemDaoList = this.persit.getProducts() || [];
                      
  //                     this.setTransactionDtoList(this.transactionLineItemDaoList);
              
  //                     // Setting customer details to manage store credit and onAccount/ Loylty functionality
  //                     if (transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {
  //                       this.selectedCustomer = new Customer();
  //                       this.customerService.getCustomerDetailsByPhoneNo(transaction.customerPhoneno)
  //                         .subscribe((customer) => {
  //                           this.selectedCustomer = customer;
  //                         })
  //                       this.persit.setCustomerDetailsForSale(this.selectedCustomer);
  //                       this.selectedCustomer = this.persit.getCustomerDetailsForSale();
  //                       }
          
  //       }
  //       else {

  //         this.saleType = 'Return';
          
  //                 transaction.transactionLineItemDaoList.forEach((lineItem) => {
  //                  // lineItem.defaultQuantity = lineItem.quantity;
  //                  // lineItem.quantity = 0;
  //                   lineItem.cost = - lineItem.cost;
  //                   lineItem.retail = - lineItem.retail;
  //                   lineItem.totalProductPrice = - lineItem.totalProductPrice;
  //                 })
          
  //                 // Setting transactoin id here so i can send this in case of return and when user gives store credit to the customer.
  //                 this.previousTransactionId = transaction.transactionComId;
          
  //                 this.persit.setProducts(transaction.transactionLineItemDaoList);
          
  //                 this.transactionLineItemDaoList = this.persit.getProducts() || [];
                  
  //                 this.setTransactionDtoList(this.transactionLineItemDaoList);
          
  //                 // Setting customer details to manage store credit and onAccount/ Loylty functionality
  //                 if (transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {
  //                   this.selectedCustomer = new Customer();
  //                   this.customerService.getCustomerDetailsByPhoneNo(transaction.customerPhoneno)
  //                     .subscribe((customer) => {
  //                       this.selectedCustomer = customer;
  //                     })
  //                   this.persit.setCustomerDetailsForSale(this.selectedCustomer);
  //                   this.selectedCustomer = this.persit.getCustomerDetailsForSale();
  //                   }
  //       }
  //     })
  // }

  // printReciept(){

  //   this.sellService.printReceipt(this.printTransactionDto);
  //   this.clearAllDateAfterTransactionComplete();
  //   $('#paymentModel').modal('toggle');
  // }

}




// export class Product {
//   productNo: string;
//   // productVariantNo: number;
//   description: string;
//   categoryId: number;
//   brandId: number
//   vendorId: number;
//   modelId: number;
//   alternetNo: string;
//   cost: number;
//   retail: number;
//   markup: number;
//   quantity: number;
//   minQuantity: number;
//   tax: boolean;
//   variant: boolean;
//   active: boolean;
//   ecommerce: boolean;
//   relatedProduct: boolean;
//   defaultQuantity = 1;
//   returnRule: any;
//   createdTimestamp: any;

//   transactionComId: number;
//   date: any;
//   time: any;
//   status: string;
//   discount: number;
//   retailDiscount: number;
//   totalProductPrice: number;
//   taxAmountOnProduct: number;
//   imeiNo: any;
//   customLoyaltyAmount: number;
//   productInventoryDaoList: ProductInventory[];
// }
// export class TransactionLineItemDaoList {

//   productNo: string;
//   productVariantNo: number;
//   cost: number;
//   retail: number;
//   quantity: number;
//   defaultQuantity: number;
//   transactionComId: number;
//   date: any;
//   time: any;
//   status: string;
//   discount: number;
//   retailDiscount: number;
//   totalProductPrice: number;
//   taxAmountOnProduct: number;
//   imeiNo: any;
//   quantityUpdated?: boolean;
//   description: string;
  // minQuantity: number;
  // isTax: number;
  // IsVariant: number;
  // IsActive: number;
  // IsEcomerce: number;
  // IsRelatedProduct: number;
  // categoryName: string;
  // brandName: string;
  // vendorName: string;
  // modelName: string;
  // alternetNo: string;
  // markup: number;

// }

// export class TransactionDtoList {

//   date: any;
//   time: any;
//   totalAmount: number;
//   tax: number;
//   totalDiscount: number;
//   subtotal: number;
//   quantity: number;
//   transactionComId: number;
//   customerPhoneno: string;
//   status: any;
//   previousBalance: any;
//   transactionBalance: any;
//   lineItemDiscount: any;
//   username: any;
//   customerFirstLastName: string;
//   paymentDao: PaymentDto[];
//   transactionLineItemDaoList: TransactionLineItemDaoList[];
//   note: string;
//   previousTransactionId: any;


// }

export class PaymentDto {

  // constructor(cash: number, credit: number, debit: number, checkAmount:number){
  //   this.cash = cash;
  //   this.credit = credit;
  //   this.debit = debit;
  //   this.checkAmount = checkAmount;

  // }
  transactionComIdFk: number;
  transactionComId: number;
  date: any;
  cash: number;
  credit: number;
  debit: number;
  checkAmount: number;
  storeCredit: number;
  onAccount: number;
  loyalty: number;
  layby: number;
  changeForCash: number;
  creditCardLast4: string;
  receiptNote: string;
  transactionNote: string;
  status: string;
}

export class PaymentObjectForPaymentSellTable {

  // constructor(paymentType: string, paymentAmount: number) {
  //   this.paymentType = paymentType;
  //   this.paymentAmount = paymentAmount;
  // }
  paymentType: string;
  paymentAmount: number;
}
