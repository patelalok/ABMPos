import { Component, ViewChild, ElementRef, OnInit, Pipe, PipeTransform, AfterViewInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LazyLoadEvent } from 'primeng/primeng';
import { SellService } from 'app/sell/sell.service';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
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
import { PersistenceService } from 'app/shared/services/persistence.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ProductService } from 'app/product/product.service';
import { LoadingService } from '../../loading.service';
declare var $: JQueryStatic;
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  animations: [fadeInAnimation],
  // host: { '[@fadeInAnimation]': '' }
})
export class SaleComponent implements OnInit, AfterViewInit {
  @HostBinding('@fadeInAnimation') fadeInAnimation;

  product: Product[] = [];
  productList: Product[] = []
  productForSearchBox: any;
  selectedProduct: Product;
  isProductExistsInSellList = false;
  productPriceArryByCustomer: Array<any[]>;

  customerDto: Customer[];
  selectedCustomer: Customer;
  cust: any;
  filteredCustomer: any[];

  transactionLineItemDaoList: TransactionLineItemDaoList[];
  transactionDtoList = new TransactionDtoList();
  transactionDetails: TransactionDtoList[] = [];
  printTransactionDto: TransactionDtoList = null;
  pendingInvoiceTransactionList: TransactionDtoList[] = [];
  paymentDto = new PaymentDto();
  discountType: string;
  discountTexBox: number;
  discountValue: number = 0;
  totalTransactionDiscount: number = 0;
  popoverStyle: any;
  saleType: string = 'Complete';
  storeDetails: StoreSetupDto;
  taxPercent: number = 0.00;
  shippingAmount: number = 0.00;

  // This help when customer has paid full amount, so now user should not able to click on any payment button.
  // These both buttons are on payment page pop up.
  disablePaymentButtons: boolean = false;
  disablePaymentButtonsWithAmount = false;
  disableCompleteSaleButton: boolean = true;
  paymentDao: PaymentDto[] = [];
  disablePaymentButtonOnSale: boolean = true;
  transactionNotes: string = '';
  disableOnAccountButtons: boolean = true;
  disableStoreCreditButtons: boolean = true;
  payAmountTextBox: number;
  paymentObjectForPaymentSellTable: PaymentObjectForPaymentSellTable[] = [];
  dueAmountForTransaction: number;

  popupHeader: string;
  popupMessage: string;
  items: MenuItem[];

  _subscriptionCustomer: any;
  _subscriptionProduct: any;
  parkDate: any;


  constructor(
    private sellService: SellService, private persit: PersistenceService, private productService: ProductService, private storeSetupService: StoreSetupService, private customerService: CustomerService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private toastr: ToastsManager, private loadingService: LoadingService) { 
      this.getCustomerDetails();
      this.getProductDetails();

    }
  ngOnInit() {
    this.items = [
      { name: 'Return', icon: 'fa fa-reply-all fa-x', link: '/return' },
      { name: 'Purchase Order', icon: 'fa fa-bookmark fa-x', link: '/sell/purchaseOrder' }
    ];

    this.storeSetupService.getStoreDetails().
      then((data) => {
        this.storeDetails = data;
        if (this.selectedCustomer != null && this.selectedCustomer.type == 'Business') {
          this.taxPercent = 0.00;
        }
        else {
          this.taxPercent = this.storeDetails.tax;
        }
      });

    this.getCustomerDetails();
    this.getProductDetails();
    this.selectedCustomer = this.persit.getCustomerDetailsForSale();

    // This will help to get customer product price, cause its cusotmer is selected then definetly the price is stored in local storage.
    if (this.selectedCustomer) {
      this.productPriceArryByCustomer = this.persit.getCustomerProductPriceForSale();
    }

    this.transactionLineItemDaoList = this.persit.getProducts() || [];
    // this will show transaction data on right side on refresh or on load of the page
    this.shippingAmount = this.persit.getShippingAmount() || 0;

    let transactionComId = this.route.snapshot.paramMap.get('transactionComId');
    if (transactionComId) {
      this.handleParkedTransactionFromSalesHistory(transactionComId);
    }

   this.setTransactionDtoList();
  }

  ngAfterViewInit() {
    // This will focus on the autocomplete field
    $('#productsearch > span > input').focus();
  }

  openSellCustomerView() {
    let url = '/sell-customer';
    window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
  }


  public addTransactionLineItem(productObj: Product): TransactionLineItemDaoList[] {

    // Price by customer logic.
    if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
      if (this.productPriceArryByCustomer && null != this.productPriceArryByCustomer && this.productPriceArryByCustomer.length > 0) {

        this.productPriceArryByCustomer.forEach((product) => {
          // here product[1] is the product no coming from back end, i am sending only 2 values prodcut no and retail.  like this--->["23424234234", 12.99]
          if (product[0] == productObj.productNo) {
            productObj.retailWithDiscount = product[1];
          }
        })
      }
    }
    // This will help to add retailWithDiscount first time when user add the first line item
    if (productObj.retailWithDiscount <= 0) {
      productObj.retailWithDiscount = productObj.retail;
    }
    // this will help me to set default quantity by for each product.
    if (productObj.saleQuantity <= 0) {
      productObj.saleQuantity = 1;
    }
    // This is fisrt time when user is adding product to sell.
    if (this.transactionLineItemDaoList.length == 0) {

      productObj.totalProductPrice = parseFloat(productObj.retailWithDiscount.toFixed(2));
      productObj.taxAmountOnProduct = (productObj.retailWithDiscount * this.taxPercent) / 100;

      this.transactionLineItemDaoList.push(productObj);
      this.product = null;
      this.productForSearchBox = null;
      this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount = productObj.retailWithDiscount;
      this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
      this.setTransactionDtoList()
      this.persit.setProducts(this.transactionLineItemDaoList);
    }
    else {
      // Checking weather user is adding same product agian or not if its true, :::: ---> then just add the quantity of that product by 1.
      for (let lineItem of this.transactionLineItemDaoList) {

        if (productObj.productNo === lineItem.productNo) {
          // This flag helps to determin whether to add new product or just update the quantity
          this.isProductExistsInSellList = true;
          lineItem.saleQuantity = +lineItem.saleQuantity + 1;
          lineItem.quantityUpdated = true;

          lineItem.totalProductPrice = parseFloat((lineItem.retailWithDiscount * lineItem.saleQuantity).toFixed(2));
          lineItem.taxAmountOnProduct = (lineItem.retailWithDiscount * this.taxPercent) / 100;
          this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
          this.product = null;
          this.productForSearchBox = null;
          this.setTransactionDtoList()
          this.persit.setProducts(this.transactionLineItemDaoList);

          setTimeout(() => {
            lineItem.quantityUpdated = false;
            this.persit.setProducts(this.transactionLineItemDaoList);
            this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
          }, 3000);
          break;
        }
        // Do not try to be smart please keep this logic, Never touch here
        else {
          // This flag helps to determin whether to add new product or just update the quantity
          this.isProductExistsInSellList = false;
        }
      }
      if (!this.isProductExistsInSellList) {
        productObj.totalProductPrice = productObj.retailWithDiscount * productObj.saleQuantity;
        productObj.taxAmountOnProduct = parseFloat(((productObj.retailWithDiscount * this.taxPercent) / 100).toFixed(2));
        this.transactionLineItemDaoList.push(productObj);
        this.product = null;
        this.productForSearchBox = null
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount = productObj.retailWithDiscount;
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList()
        this.persit.setProducts(this.transactionLineItemDaoList);
      }
    }
    $(`lineitem${productObj.productNo}`).ready(function () {
      // $(`lineitem${productObj.productNo}`).sc
      document.getElementById(`lineitem${productObj.productNo}`).scrollIntoView();
    });
    return this.transactionLineItemDaoList;
  }
  // #productsearch > span > input
  testFocus() {
    // document.querySelector("#productsearch > span > input").focus();
    $('#productsearch > span > input').focus();
  }


  scanProduct($event){
    // if(event.length > 10)
    // {
      console.log('event', $event);
      // this.productList.forEach((scanProduct)=>{
      //   if(event == scanProduct.productNo){
      //     this.addTransactionLineItem(scanProduct);
      //     this.product = null;
      //   }
      // });


    // }
  }

  submitProduct(value: any) {

    let productFound: boolean;
    if(value.length > 10){
      console.log('from submit product', value);
      this.productList.forEach((product)=>{
        if(value == product.productNo){
          productFound = true;
          this.addTransactionLineItem(product);
        }
      })

      if(!productFound){
        alert("Sorry Can Not Find The Product!!!");
        this.productForSearchBox = null;
      }
    }
   
    if (typeof value === 'string') {
      if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
        if (value.match(/[a-z]/i)) {
          // Not sure wt it is doing
        }
        if (value.match(/[0-9]/i) && value.indexOf('.') > 0)
          this.updateProductPrice(value);

        // So here i am assuming quantity is not gonna be more then 5, so anything more then 5 just add to product grid.
        else if (value.match(/[0-9]/i) && value.length < 5)
          this.updateProductQuantity(value);
      }
    }
    else if (value != null) {
      this.addTransactionLineItem(value);
    }
  }

  setProductForDelete(product: Product) {
    this.selectedProduct = product;
    this.popupHeader = 'Delete Product';
    this.popupMessage = 'Are You Sure You Want To Delete Product?';
  }

  deleteProduct() {
    console.log("inside delete");
    let index = this.transactionLineItemDaoList.indexOf(this.selectedProduct, 0);
    console.log("index", index);
    if (index > -1) {
      this.transactionLineItemDaoList.splice(index, 1);
      this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
      this.setTransactionDtoList();
      this.persit.setProducts(this.transactionLineItemDaoList);
    }
  }

  updateProductQuantity(value: any) {
    console.log('Quantity change');
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity = value;
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity).toFixed(2));
    this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    this.setTransactionDtoList()
    this.persit.setProducts(this.transactionLineItemDaoList);
    this.productForSearchBox = null;
  }

  updateProductPrice(value: any) {
    console.log('Price change');
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount = value;
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity);
    this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    this.setTransactionDtoList();
    this.persit.setProducts(this.transactionLineItemDaoList);
    this.productForSearchBox = null;
  }

  // this method helps to update lineItem Detail when user change the quatity or change the retail from editable box
  updateLineItemDetails(event) {
    this.transactionLineItemDaoList[event.index].saleQuantity = event.data.saleQuantity;
    this.transactionLineItemDaoList[event.index].retailWithDiscount = event.data.retailWithDiscount;
    // this will convert numern into numer to show in 2 digits. cause i can not use .toFix here.
    this.transactionLineItemDaoList[event.index].totalProductPrice = Math.round((event.data.saleQuantity * event.data.retailWithDiscount) * 1e2) / 1e2;
    this.setTransactionDtoList()
    this.persit.setProducts(this.transactionLineItemDaoList);
  }

  showPopover(discount) {
    let { x, y } = <DOMRectInit>discount.getBoundingClientRect();
    if (this.popoverStyle)
      this.popoverStyle = null;
    else
      this.popoverStyle = this.sanitizer.bypassSecurityTrustStyle(`position: absolute; transform: translate3d(${x - 271.86 - 10}px, ${y - 74.5}px, 0px); top: 0px; left: 0px; will-change: transform;`);
  }

  setDiscountType(discountType: any) {
    console.log("inside set discount type", discountType)
    if (discountType == 'By Amount') {
      this.discountType = discountType;
    }
    else if (discountType == 'By Percentage') {
      this.discountType = discountType;
    }
  }

  calculateDiscount(value: any) {
    if (this.discountType == 'By Amount') {
      this.totalTransactionDiscount = value;
    }
    else if (this.discountType == 'By Percentage') {
      this.totalTransactionDiscount = parseFloat(((this.transactionDtoList.totalAmount * value) / 100).toFixed(2));
    }
    this.setTransactionDtoList();
  }

  setTransactionDtoList() {
    let totalQuantity: number = 0;
    let totalPrice: number = 0.00;
    let tax: number = 0.00;
    let totalLineItemDiscount: number = 0.00;
    this.transactionDtoList.totalAmount = 0.00;

    this.transactionLineItemDaoList.forEach((lineItem) => {
      totalQuantity = +lineItem.saleQuantity +totalQuantity;
      totalPrice = +lineItem.totalProductPrice +totalPrice;
    })

    this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
    this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
    let totalAfterDiscount: number = this.transactionDtoList.subtotal - this.totalTransactionDiscount;
    this.transactionDtoList.tax = ((totalAfterDiscount * this.taxPercent / 100));
    this.transactionDtoList.totalAmount = +totalAfterDiscount + this.transactionDtoList.tax;
    this.transactionDtoList.shipping = this.shippingAmount;
    this.transactionDtoList.totalAmount = +this.transactionDtoList.totalAmount + this.transactionDtoList.shipping;

    // This logic helps to manage main payment button enable or diable.
    if (this.transactionDtoList.totalAmount == 0) {
      this.disablePaymentButtonOnSale = true;
    }
    else {
      this.disablePaymentButtonOnSale = false;
    }

    // Here I need to cache the Shipping amount cause if user refresh or come back from other page i need to show shipping amount all the time.
    this.persit.setShippingAmount(this.shippingAmount);
  }

  submitCustomer() {

    this.customerService.getCustomerDetailsByPhoneNo(this.selectedCustomer.phoneNo)
    .subscribe((customer)=>{
      this.selectedCustomer = customer;

      if (this.selectedCustomer.type == 'Business') {
        this.taxPercent = 0.00;
      }
      let totalPreviousBalance = 0;
      this.sellService.getPendingInvoiceByCustomer(this.selectedCustomer.phoneNo)
      .subscribe(transaction => {
        transaction.forEach(trans => {
  
          // This is very important line if i wont set here, i can not handle date change logic for transaction.
          trans.originalDate = trans.date;
          trans.time = moment(trans.date).format('hh:mm A');
          trans.date = moment(trans.date).format('MM-DD-YYYY');
  
          // Calculating totalPendingInvoice here, so i dont need to maintain in backend and in customer table.
          totalPreviousBalance = +totalPreviousBalance +trans.transactionBalance;
          console.log('total Previous balance', totalPreviousBalance);
        })
        this.pendingInvoiceTransactionList = transaction;
        this.selectedCustomer.balance = totalPreviousBalance;
      });
  
      this.persit.setCustomerDetailsForSale(this.selectedCustomer);
  
      this.sellService.getProductPriceByCustomer(this.selectedCustomer.phoneNo)
        .subscribe((productPrice) => {
          this.productPriceArryByCustomer = productPrice;
          this.persit.setCustomerProductPriceForSale(this.productPriceArryByCustomer);
        });
  
        this.setTransactionDtoList();
    })
 

  
  }

  removeCustomerOnSale() {
    this.persit.clearCustomer();
    this.persit.clearCustomerPriceForSale();
    this.selectedCustomer = null;
    this.cust = null;
    this.taxPercent = this.storeDetails.tax;
  }

  // This methode helps to show pending invoice pop for customer.
  // openPendingInvoice(customer: Customer) {
  //   this.sellService.getPendingInvoiceByCustomer(customer.phoneNo)
  //     .subscribe(transaction => {
  //       transaction.forEach(trans => {
  //         trans.time = moment(trans.date).format('hh:mm A');
  //         trans.date = moment(trans.date).format('MM-DD-YYYY');
  //       })
  //       this.transactionDetails = transaction;
  //     });
  // }

  setHeaderAndMessageForDisgardPopup() {
    this.popupHeader = 'Discard Sale';
    this.popupMessage = 'Are You Sure You Want To Delete Complete Sale?';
  }

  setPaymentDto(paymentType: any, paymentAmount: any) {

    if (paymentType == 'Cash') {
      // This is very rare scenario and it happens only if user is stupid but still i need to handle this,
      // Cause user can pay in cash two time by click on cash button by seletecting different buttons.
      if (null != this.paymentDto && this.paymentDto.cash > 0) {
        this.paymentDto.cash = +this.paymentDto.cash + paymentAmount;
      }
      else {
        // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
        if (paymentAmount > this.dueAmountForTransaction) {
          this.paymentDto.cash = this.dueAmountForTransaction;
        }
        else {
          this.paymentDto.cash = paymentAmount;
        }
      }
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount })
      this.validatePaymentButtons(paymentAmount);
    }
    else if (paymentType == 'Credit') {
      if (null != this.paymentDto && this.paymentDto.credit > 0) {
        this.paymentDto.credit = +this.paymentDto.credit + paymentAmount;
      }
      else {
        // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
        if (paymentAmount > this.dueAmountForTransaction) {
          this.paymentDto.credit = this.dueAmountForTransaction;
        }
        else {
          this.paymentDto.credit = paymentAmount;
        }
      }
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount })
      this.validatePaymentButtons(paymentAmount);
    }
    else if (paymentType == 'Debit') {
      if (null != this.paymentDto && this.paymentDto.debit > 0) {
        this.paymentDto.debit = +this.paymentDto.debit + paymentAmount;
      }
      else {
        // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
        if (paymentAmount > this.dueAmountForTransaction) {
          this.paymentDto.debit = this.dueAmountForTransaction;
        }
        else {
          this.paymentDto.debit = paymentAmount;
        }
      }
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount })

      this.validatePaymentButtons(paymentAmount);

    }
    else if (paymentType == 'Check') {
      if (null != this.paymentDto && this.paymentDto.checkAmount > 0) {
        this.paymentDto.checkAmount = +this.paymentDto.checkAmount + paymentAmount;
      }
      else {
        // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
        if (paymentAmount > this.dueAmountForTransaction) {
          this.paymentDto.checkAmount = this.dueAmountForTransaction;
        }
        else {
          this.paymentDto.checkAmount = paymentAmount;
        }
      }
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount })

      this.validatePaymentButtons(paymentAmount);
    }
    else if (paymentType == 'StoreCredit') {

      // First need to check store credit already there added in payment dao or not, 
      if (null != this.paymentDto && this.paymentDto.storeCredit > 0) {
        if (paymentAmount > this.dueAmountForTransaction) {
          // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

          this.paymentDto.storeCredit = +this.paymentDto.storeCredit + this.dueAmountForTransaction;

          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });

          this.validatePaymentButtons(this.paymentDto.storeCredit);
        }
        // Here i am using complete store credit of the customer
        else {

          this.paymentDto.storeCredit = paymentAmount;
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
          this.validatePaymentButtons(this.paymentDto.storeCredit);
        }
      }
      else {
        if (paymentAmount > this.dueAmountForTransaction) {
          // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

          this.paymentDto.storeCredit = this.dueAmountForTransaction;

          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });

          this.validatePaymentButtons(this.paymentDto.storeCredit);
        }
        // Here i am using complete store credit of the customer
        else {
          this.paymentDto.storeCredit = paymentAmount;
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
          this.validatePaymentButtons(this.paymentDto.storeCredit);
        }
      }

      // Now I have to handle two scenario
      // Case 1. Store credit can greater then equal to payment amount
      // Case 2. Store credit can less then equal to payment amount

      // Case 1: where payment amount is customers store credit because that what i am sending from ui
    }
    else if (paymentType == 'OnAccount') {
      this.paymentDto.onAccount = paymentAmount;
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'OnAccount', 'paymentAmount': paymentAmount });
      // this.validatePaymentButtons(this.paymentDto.onAccount);
      this.disablePaymentButtons = true;
      this.disablePaymentButtonsWithAmount = true;
      // This mean customer has provide sufficient balance.
      this.disableCompleteSaleButton = false;
      this.disableOnAccountButtons = true;

      // Here i am blinding disabling store credit cause, it may create so me issue and i will check on delete payment method, wheather customer has store credit or not.
      this.disableStoreCreditButtons = true;
    }
    else if (paymentType == 'Loyalty') {
      this.paymentDto.loyalty = paymentAmount;
    }
  }

  validatePaymentButtons(paymentAmount: number) {

    let totalPaidAmout = 0.00;

    // This means cutomer has paid full amount.
    if (this.dueAmountForTransaction - paymentAmount <= 0) {
      this.dueAmountForTransaction = Math.round((this.dueAmountForTransaction - paymentAmount) * 1e2) / 1e2;
      this.disablePaymentButtons = true;
      this.disablePaymentButtonsWithAmount = true

      // This mean customer has provide sufficient balance.
      this.disableCompleteSaleButton = false;

      // This logic helps to show the data in paid amount tax box when user exact amount or more.
      for (let a of this.paymentObjectForPaymentSellTable) {
        totalPaidAmout = totalPaidAmout + a.paymentAmount;
      }
      this.payAmountTextBox = totalPaidAmout;
    }
    else {
      // this.dueAmountForTransaction = Number.parseFloat((this.dueAmountForTransaction - paymentAmount).toFixed(2));
      this.dueAmountForTransaction = Math.round((this.dueAmountForTransaction - paymentAmount) * 1e2) / 1e2;
      this.payAmountTextBox = Math.round(this.dueAmountForTransaction * 1e2) / 1e2;
    }
  }

  setDataForPaymentModel() {

    // these will help to clean the data if user close the popup and comeback again.
    this.paymentDto = new PaymentDto();
    this.paymentObjectForPaymentSellTable = [];
    this.paymentDao = [];

    // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
    this.payAmountTextBox = Math.round((this.transactionDtoList.totalAmount) * 1e2) / 1e2;
    this.dueAmountForTransaction = Math.round((this.transactionDtoList.totalAmount) * 1e2) / 1e2;

    this.disablePaymentButtons = false;
    this.disablePaymentButtonsWithAmount = false;
    this.disableCompleteSaleButton = true;
    this.disableOnAccountButtons = this.selectedCustomer == null;

    // This mean this customer has some store credit to use so i need to enable store credit button.
    if (this.selectedCustomer && this.selectedCustomer.storeCredit > 0) {
      this.disableStoreCreditButtons = false;
    }
    else {
      this.disableStoreCreditButtons = true;
    }

  }

  // This method helps to take payment when customer is trying to pay for pending invoice.
  setDataForPaymentModelForPendingInvoice(transaction: TransactionDtoList) {
    console.log("inside the pending payment logic");
    this.transactionDtoList = transaction;
    this.transactionLineItemDaoList = transaction.transactionLineItemDaoList;
    this.setTransactionDtoList();

    //this.setTransactionDtoList();
    this.disablePaymentButtons = false;
    this.disablePaymentButtonsWithAmount = false;
    this.disableCompleteSaleButton = true;

    this.disableOnAccountButtons = this.selectedCustomer == null;
      // This mean this customer has some store credit to use so i need to enable store credit button.
      if (this.selectedCustomer && this.selectedCustomer.storeCredit > 0) {
        this.disableStoreCreditButtons = false;
      }
      else {
        this.disableStoreCreditButtons = true;
      }
    this.payAmountTextBox = this.transactionDtoList.transactionBalance;
    this.dueAmountForTransaction = this.transactionDtoList.transactionBalance;

  }

  deletePaymentFromPaymentModel(payment: PaymentObjectForPaymentSellTable) {

    let index = this.paymentObjectForPaymentSellTable.indexOf(payment);
    if (index > -1) {
      this.paymentObjectForPaymentSellTable.splice(index, 1);

      // Need to handle this, because i am adding payment type when user click on add payment,
      // So now when user delete the payment type, i need to change the payment object too, and remove the or subtract the payment amount.
      if (payment.paymentType == 'Cash' && payment.paymentAmount > 0) {
        this.paymentDto.cash = this.paymentDto.cash - payment.paymentAmount;
      }
      if (payment.paymentType == 'Credit' && payment.paymentAmount > 0) {
        this.paymentDto.credit = this.paymentDto.credit - payment.paymentAmount;
      }
      if (payment.paymentType == 'Debit' && payment.paymentAmount > 0) {
        this.paymentDto.debit = this.paymentDto.debit - payment.paymentAmount;
      }
      if (payment.paymentType == 'Check' && payment.paymentAmount > 0) {
        this.paymentDto.checkAmount = this.paymentDto.checkAmount - payment.paymentAmount;
      }
      if (payment.paymentType == 'StoreCredit' && payment.paymentAmount > 0) {
        this.paymentDto.storeCredit = this.paymentDto.storeCredit - payment.paymentAmount;
      }
      if (payment.paymentType == 'OnAccount' && payment.paymentAmount > 0) {
        this.paymentDto.onAccount = this.paymentDto.onAccount - payment.paymentAmount;
      }
    }

    if(payment.paymentType == 'OnAccount'){
      //this.dueAmountForTransaction = this.transactionDtoList.totalAmount -this.paymentDto.onAccount;
    }
    else{
    this.dueAmountForTransaction = +payment.paymentAmount + this.dueAmountForTransaction;
    }
     // I need to check this after all delete, cause i am disabling it on onaccount blindly, please do not remove from here.
     if (this.selectedCustomer && this.selectedCustomer.storeCredit > 0) {
      this.disableStoreCreditButtons = false;
    }
    else {
      this.disableStoreCreditButtons = true;
    }
    this.disableOnAccountButtons = this.selectedCustomer == null;

    this.payAmountTextBox = Math.round(this.dueAmountForTransaction * 1e2) / 1e2;
    if (this.dueAmountForTransaction > 0) {
      this.disableCompleteSaleButton = true;
      this.disablePaymentButtons = false;
      this.disablePaymentButtonsWithAmount = false;

      this.disableOnAccountButtons = this.selectedCustomer == null;
    }
  }
  // This is the method which handle completing the transaction and reset the all flag and other data.
  completeSale() {

    //
    this.loadingService.loading = true;
    this.disableCompleteSaleButton = true;

    
    let totalLineItemDiscount: number = 0.00
    console.log('sales type', this.saleType);
    // setting customer details
    if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
      this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
      this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
      this.transactionDtoList.previousBalance = this.selectedCustomer.balance;
    }

    this.loadingService.loading = true;

    this.transactionDtoList.status = this.saleType;



    // Here I need to fix the problem when customer is just paying the balacne of transaction.
    // So if the transaction has transaction Id then dont send the date just finish the transaction with old date.
    // This means this new transaction
    if(this.transactionDtoList.transactionComId == undefined){
      // seeting current date and time using momemt.
      this.transactionDtoList.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    }
    // Do not do anything, just let it go so date wont chance.
    else {
      this.transactionDtoList.date = this.transactionDtoList.originalDate;
      console.log('old transaction', this.transactionDtoList.originalDate);
    }

    // Setting payment dto into transaction dto, because can not send both as @request body from angular..
    // Always need to pass, latest date so i can handle different payment date for same transaction.
    this.paymentDto.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.paymentDao.push(this.paymentDto);
    this.transactionDtoList.paymentDao = this.paymentDao;

    // this.transactionNotes is bind with the ng model on ui.
    this.transactionDtoList.note = this.transactionNotes

    // To do need to fix this hardcoded value for username
    this.transactionDtoList.username = 'alok@alok.com';
    this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;

        // THIS means customer has over paid, this happens mostly in cash of when customer pay by cash.
    // So i am setting it as chnage amount.
    if (this.dueAmountForTransaction <= 0) {
      this.paymentDto.changeForCash = Math.abs(this.dueAmountForTransaction);

      // This means customer has paid, complete invoice, it was not here before but now i need to do it after adding logic for pending invoice.
      this.transactionDtoList.transactionBalance = 0.00
    }
    // This mean customer has add money on Account or paid perfect price but in both case i need to set transaction balance cause thats how i am handling balance logic in backend.
    else {
      this.transactionDtoList.transactionBalance = this.dueAmountForTransaction;

      // This means customer has put this invoice ON ACCOUNT, OR THIS IS PARK SALE, I need to check that logic here.

      if(this.saleType == 'Park'){
        console.log('come for park now, so wont process as pending');
      }
      else {
        this.transactionDtoList.status = 'Pending';
        this.saleType = 'Pending';
      }
    
    }

     // Setting TransactionLineItemDetails, I need to here, cause this will give me final transaction status.
     for (let lineItem of this.transactionLineItemDaoList) {
      lineItem.status = this.saleType;
      lineItem.date = this.transactionDtoList.date;

      // This means user has given line item discount.
      if (lineItem.retailWithDiscount < lineItem.retail) {
        lineItem.discount = (lineItem.retail - lineItem.retailWithDiscount) * lineItem.saleQuantity;
        totalLineItemDiscount = + ((lineItem.retail - lineItem.retailWithDiscount) * lineItem.saleQuantity) + totalLineItemDiscount;
      }
    }
    
    this.transactionDtoList.totalDiscount = +this.totalTransactionDiscount +totalLineItemDiscount;
    // I am doing this to show subtotal without line item discount, so in invoice customer wont get confuse.
    this.transactionDtoList.subtotal = this.transactionDtoList.subtotal + this.transactionDtoList.totalDiscount;

    for (let payment of this.paymentDao) {
      payment.status = this.saleType;
    }

    // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
    this.sellService.addTransactionDetails(this.transactionDtoList)
    
      .subscribe(
        data => {

          this.printTransactionDto = data.json();
          if (this.saleType == 'Park') {
            this.toastr.success('Parked Transaction Successfully', 'Success!');
            this.clearAllDateAfterTransactionComplete();

          }
          this.disableCompleteSaleButton = true;
          console.log('addTransaction response', data);
          console.log('printTransaction dao', this.printTransactionDto);
        },
        error => {
          console.log(JSON.stringify(error.json()));
        },
        () => {
        }
        

      );
    // This will focus on the autocomplete field
    $('#productsearch > span > input').focus();

    this.loadingService.loading = false;

  }

  // This method helps to add transaction as park, so user can use this transaction later
  parkSale() {

    this.saleType = 'Park';
    this.completeSale();
    // this.saleType = 'Complete'; // Need to set for next transaction

  }

  clearAllDateAfterTransactionComplete() {

    // This is important to handle when user click on Close button from payment popup, we need to clear data only when transaction is completed ottherwise just need to close the popup.
    if (null != this.printTransactionDto) {
      this.transactionDtoList = new TransactionDtoList();

      this.persit.clearProducts();
      this.persit.clearCustomer();
      this.persit.clearCustomerPriceForSale();

      // Very importa can not assign to null
      this.paymentDto = new PaymentDto();

      this.selectedCustomer = null;
      // this.disableCustomerSearchTextbox = false;

      this.paymentObjectForPaymentSellTable = [];
      // This is payment button on the sale page, i need to do this because there is not data in sale table,
      this.disablePaymentButtonOnSale = true;


      this.transactionLineItemDaoList = this.persit.getProducts() || [];
      // I must have to add this here, otherwise it will create problem,
      this.shippingAmount = 0.00;
      this.totalTransactionDiscount = 0;
      this.persit.clearShippingAmount();
      this.setTransactionDtoList();
      this.paymentDao = [];

      // Need set it null cause its showing in next transaction also.
      this.transactionNotes = '';

      this.disableStoreCreditButtons = true;

      this.printTransactionDto = null;

      this.taxPercent = this.storeDetails.tax;
    }

    else {
      console.log('just close the model.')
    }

    // very important cause this will give problem after doing return transaction so, after any transactoin i need to do this.
    this.saleType = 'Complete';

    this.testFocus();

  }


  // TODO< NEED TO CHECK AND UNDERSTAND AGAIN.
  handleParkedTransactionFromSalesHistory(transactionComId: any) {
    // This is temp code for handling parked and online transactions

    let phoneNo: any;
    this.sellService.getTransactionById(transactionComId)
      .subscribe((transaction: TransactionDtoList) => {
        console.log('transaction after park', transaction);
        this.transactionDtoList.transactionComId = transaction.transactionComId;
        this.transactionDtoList.originalDate = transaction.date;
        phoneNo = transaction.customerPhoneno;
        console.log('phono', phoneNo);
        if(phoneNo)
        {
          this.setCustomerDetailsForParkSale(phoneNo);
        }
        
        this.persit.setProducts(transaction.transactionLineItemDaoList);
        this.transactionLineItemDaoList = this.persit.getProducts() || [];  
      });
  }

  setCustomerDetailsForParkSale(phone: string){
    console.log('insoide test')
    this.customerService.getCustomerDetailsByPhoneNo(phone)
    .subscribe((customer) => {
      this.selectedCustomer = customer;
      console.log('customer details after call', this.selectedCustomer);
      if (customer && customer.type == 'Business') {
        console.log('Inside the if for busssiness', this.selectedCustomer);
        this.taxPercent = 0.00;
      }
      this.persit.setCustomerDetailsForSale(this.selectedCustomer);
      console.log('before set transaction', this.selectedCustomer);
      this.setTransactionDtoList();
    });

    console.log('byy test')

  }

  // This is from customer invoice popup model, Do not delete this.
  printReceipt(transaction: TransactionDtoList){
    this.sellService.printReceipt(transaction);
  }

    // This is from customer invoice popup model, Do not delete this.
  sendEmail(transaction: TransactionDtoList){

    if(null != transaction && null != transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {

      // Todo need to add sppiner for this so user can wait that email is sending, cuase its taking littel bit more time to send an email.
      this.sellService.sendEmail(transaction.transactionComId)
      .subscribe((data) =>
    {
      //this.loadingServie.loading = true;
      if(data.text())
      {
        //this.loadingServie.loading = false;
        this.toastr.success('Email Send Sucessfully !!', 'Success!');
      }
      console.log('send email response', data.text());
    },
    (error) => {
     // this.loadingServie.loading = false;
      this.toastr.error('Something goes wrong, not able to send an email now !!', 'Error!');
      console.log(JSON.stringify(error.json()));
  });
    }

    else{
      this.toastr.error('Can not find email address for transaction !!', 'Error!');
    }
  }

  printReciept() {
    this.sellService.printReceipt(this.printTransactionDto);
    this.clearAllDateAfterTransactionComplete();
    $('#paymentModel').modal('toggle');
  }

  public getCustomerDetails() {

    this.customerService.getCustomerDetails();
    this._subscriptionCustomer = this.customerService.customerListChange
    .subscribe((cust)=>{
      this.customerDto = cust;
      this.customerDto = this.customerDto.slice();
    });
  }


  manageTaxForTransaction() {
    // this mean user is doing 0 % on sale page
    if (this.taxPercent > 0) {
      this.taxPercent = 0.00;
    }
    else {
      this.taxPercent = this.storeDetails.tax;
    }
    this.setTransactionDtoList();
  }

  filterProducts(event) {
    let query = event.query;
    // this.productService.getProductDetails()
    //   .subscribe((products) => {
        // console.log(products);
        this.product = this.filterProduct(query, this.productList);
      // });
  }

  filterProduct(query, products: Product[]): Product[] {
    let filtered: Product[] = [];
    for (let i = 0; i < products.length; i++) {
      let p = products[i];
      if (p.description.toLowerCase().includes(query.toLowerCase()) || p.productNo.includes(query)) {
        filtered.push(p);
      }
    }
    return filtered;
  }

  filterCustomers(event) {
    let query = event.query;
    // this.customerService.getCustomerDetailsFromBackEnd()
    //   .subscribe((customers) => {
        // console.log(products);
        this.filteredCustomer = this.filterCustomer(query,this.customerDto);
      // });
  }

  filterCustomer(query, customers: Customer[]): Customer[] {
    let filtered: Customer[] = [];
    for (let i = 0; i < customers.length; i++) {
      let cust = customers[i];
      if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
        filtered.push(cust);
      }
    }
    return filtered;

  }
  getProductDetails() {

    this.productService.getProductDetails();
   this._subscriptionProduct =  this.productService.productListChange.subscribe((product)=>{
      this.productList = product;
    })
    // this.productService.getProductDetails()
    // .subscribe((products) => {
      // console.log(products);
    //   this.productList = products;
    // });
  }

  disgardCompleteSale() {
    this.persit.clearProducts();
    this.persit.clearCustomer();
    this.persit.clearCustomerPriceForSale();
    this.transactionLineItemDaoList = [];
    // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
    this.selectedCustomer = null;
    this.setTransactionDtoList();
    this.saleType = 'Complete';
    this.router.navigate(['/sell/sale']);
  }
  print(obj) {
    console.log("Coming form print", obj);
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscriptionCustomer.unsubscribe();
     this._subscriptionProduct.unsubscribe();
   }
}


export class Product {
  productNo: string;
  // productVariantNo: number;
  description: string;
  categoryId: number;
  brandId?: number
  vendorId?: number;
  modelId?: number;
  alternetNo?: string;
  cost?: number;
  retail?: number;
  markup?: number;
  quantity?: number;
  minQuantity?: number;
  tax?: boolean;
  varaint?: boolean;
  active?: boolean;
  ecommerce?: boolean;
  relatedProduct?: boolean;
  // defaultQuantity = 1;
  saleQuantity?: number;
  returnRule?: any;
  createdTimestamp?: any;

  transactionComId?: number;
  date?: any;
  time?: any;
  status?: string;
  discount?: number;
  retailWithDiscount?: number;
  totalProductPrice?: number;
  taxAmountOnProduct?: number;
  imeiNo?: any;
  productInventoryDaoList?: ProductInventory[];
  operationType?: string;
}
export class TransactionLineItemDaoList {

  productNo: string;
  // productVariantNo: number;
  cost?: number;
  retail?: number;
  // actualRetail?: number;
  saleQuantity?: number;
  // defaultQuantity: number;
  transactionComId?: number;
  date?: any;
  time?: any;
  status?: string;
  discount?: number;
  retailWithDiscount?: number;
  totalProductPrice?: number;
  taxAmountOnProduct?: number;
  imeiNo?: any;
  quantityUpdated?: boolean;
  description: string;
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
}

export class TransactionDtoList {

  // this date helps 
  originalDate: any;
  onlyDate: any;
  date: any;
  time: any;
  totalAmount: number;
  tax: number;
  totalDiscount: number = 0.00;
  subtotal: number;
  shipping: number;
  quantity: number;
  transactionComId: number;
  customerPhoneno: string;
  status: any;
  previousBalance: any;
  transactionBalance: any;
  lineItemDiscount: any;
  username: any;
  customerFirstLastName: string;
  paymentDao: PaymentDto[];
  transactionLineItemDaoList: TransactionLineItemDaoList[];
  note: string;
  previousTransactionId: any;
  description: string;
  rma: boolean;
}

export class PaymentDto {
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
  paymentType: string;
  paymentAmount: number;
}
export class CustomerProductPrice {
  productNo?: string;
  phoneNo?: string;
  retail?: number;
  cost?: number;
  lastUpdatedTimestamp?: string;
}


        //     // Here need to calculate tax because, now we have to apply tax on the amount which come after discount
        //     this.transactionDtoList.tax = ((this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount)*this.taxPercent)/100;
        //     // Here i have to subtract the subtotal from the discount, if i do from total then it will be wrong cause it has alredy calculted tax on it.
        //     this.transactionDtoList.totalAmount = (this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) + this.transactionDtoList.tax;
        //   // Need to do this here, cause then only it will show same amount on payment popup.    this.payAmountTextBox = this.transactionDtoList.totalAmount;
        //   this.dueAmountForTransaction = this.transactionDtoList.totalAmount;



        //   // Here need to calculate tax because, now we have to apply tax on the amount which come after discount
        //   this.transactionDtoList.tax = ((this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount)* this.taxPercent)/100;

        //   this.transactionDtoList.totalAmount = (this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) + this.transactionDtoList.tax;

        //     // Need to do this here, cause then only it will show same amount on payment popup.
        // this.payAmountTextBox = this.transactionDtoList.totalAmount;
        // this.dueAmountForTransaction = this.transactionDtoList.totalAmount;