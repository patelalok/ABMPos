import { Component, ViewChild, ElementRef, OnInit, Pipe, PipeTransform, AfterViewInit, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LazyLoadEvent } from 'primeng/primeng';
import { SellService } from 'app/sell/sell.service';
import 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { StoreSetupService } from 'app/shared/storesetup/storesetup.service';
import { StoreSetupDto } from 'app/shared/storesetup/storesetup.component';
import { CustomerService } from 'app/customer/customer.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { fadeInAnimation } from 'app/shared/animations/fade-in.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { empty } from 'rxjs/Observer';
import { MenuItem } from 'app/shared/top-navbar/top-navbar.component';
import { PersistenceService } from 'app/shared/services/persistence.service';
import { PrimeCustomer, Customer } from 'app/customer/subcustomer/subcustomer.component';
import { Category } from 'app/product/product.component';
import { ProductService } from 'app/product/product.service';
declare var $: JQueryStatic;



@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  //@HostBinding('@fadeInAnimation') fadeInAnimation;
  @Input() category: { categoryId: number, name: string, description: string };


  product: Product[] = [];
  productListByCategory: Product[] = [];
  productList: Product[] = [];
  productForSearchBox: any;
  selectedProduct: Product;
  isProductExistsInSellList = false;
  productPriceArryByCustomer: Array<any[]>;
  productMap = new Map();

  categoryDto: Category[] = [];

  customerDto: PrimeCustomer[];
  selectedCustomer: Customer;
  cust: any;
  filteredCustomer: any[];
  showCustomerSearchBox: boolean = true;

  transactionLineItemDaoList: TransactionLineItemDaoList[];
  transactionDtoList = new TransactionDtoList();
  transactionDetails: TransactionDtoList[] = [];
  printTransactionDto: TransactionDtoList = null;
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
  tipAmount: number;


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
  disableLoyaltyButton: boolean = true;
  payAmountTextBox: number;
  paymentObjectForPaymentSellTable: PaymentObjectForPaymentSellTable[] = [];
  dueAmountForTransaction: number;

  popupHeader: string;
  popupMessage: string;
  items: MenuItem[];

  constructor(
    private sellService: SellService,
    private productService: ProductService,
    private persit: PersistenceService,
    private storeSetupService: StoreSetupService,
    private customerService: CustomerService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager
  ) {

  }
  ngOnInit() {
    this.items = [
      { name: 'Return', icon: 'fa fa-reply-all fa-x', link: '/return' },
      { name: 'Purchase Order', icon: 'fa fa-bookmark fa-x', link: '/sell/purchaseOrder' }
    ];
    this.getCategoryDetails();
    this.getProduct();

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

    let transactionComId = this.route.snapshot.paramMap.get('transactionComId');
    if (transactionComId) {
      this.handleParkedTransactionFromSalesHistory(transactionComId);
    }
    this.getCustomerDetails();
    this.selectedCustomer = this.persit.getCustomerDetailsForSale();

    this.transactionLineItemDaoList = this.persit.getProducts() || [];

    if (this.selectedCustomer) {
      this.showCustomerSearchBox = false;
    }
    else {
      this.showCustomerSearchBox = true;
    }
    this.getFavoriteProduct();
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


  submitProduct(value: any) {

    let productFound: boolean = false;

    if (value && value.length > 3) {
      console.log('This mean user has scan the barcode no', value);

      let product = this.productMap.get(value);
      if (product != undefined) {
        productFound = true;
        this.timeOut();
        this.addTransactionLineItem(product);
      }


      if (productFound == false) {
        alert("Sorry Can Not Find The Product!!!");
        this.productForSearchBox = null;
      }
    }

    else {

        if (typeof value === 'string') {
          if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
            // if (value.match(/[a-z]/i)) {
            //   // Not sure wt it is doing
            // }
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
  }

  timeOut() {
    setTimeout(() => {
      this.product = null;
      this.productForSearchBox = null;
    }, 400);
  }



  addProductForSale(productIndex: number) {
    let productObj: Product = this.productListByCategory[productIndex];
    this.addTransactionLineItem(productObj);
  }

  addTransactionLineItem(productObj: Product) {
    productObj.saleQuantity = 1;


    productObj.retailWithDiscount = productObj.retail;
    productObj.totalProductPrice = productObj.saleQuantity * productObj.retailWithDiscount;

    if (this.selectedCustomer && productObj.productNo == '100000000014' && this.selectedCustomer.noOfEyebrow == 7) {
      // This customer is eligable for free eybrow.
      productObj.retailWithDiscount = 0.00;
      productObj.totalProductPrice = productObj.saleQuantity * productObj.retailWithDiscount;
    }
    this.transactionLineItemDaoList.push(productObj);
    this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    this.persit.setProducts(this.transactionLineItemDaoList);
    this.setTransactionDtoList();
    this.productForSearchBox = null;

    // $(`lineitem${productObj.productNo}`).ready(function () {
    //   // $(`lineitem${productObj.productNo}`).sc
    //   document.getElementById(`lineitem${productObj.productNo}`).scrollIntoView();
    // });

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

  updateProductQuantity(value: any) {
    console.log('Quantity change');
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity = value;
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity).toFixed(2));
    this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    this.persit.setProducts(this.transactionLineItemDaoList);
    this.setTransactionDtoList();

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

  updateLineItemDetails(event) {
    console.log('event line item', event);
    this.transactionLineItemDaoList[event.index].saleQuantity = event.data.saleQuantity;
    // this will convert numern into numer to show in 2 digits. cause i can not use .toFix here.
    this.transactionLineItemDaoList[event.index].retailWithDiscount = event.data.retailWithDiscount;
    this.transactionLineItemDaoList[event.index].totalProductPrice = Math.round((event.data.saleQuantity * event.data.retailWithDiscount) * 1e2) / 1e2;
    this.setTransactionDtoList();
    this.persit.setProducts(this.transactionLineItemDaoList);

  }

  setTransactionDtoList() {
    let totalQuantity: number = 0;
    let totalPrice: number = 0.00;
    let tax: number = 0.00;
    let totalLineItemDiscount: number = 0.00;
    this.transactionDtoList.totalAmount = 0.00;

    this.transactionLineItemDaoList.forEach((lineItem) => {
      totalQuantity = +lineItem.saleQuantity + totalQuantity;
      totalPrice = +lineItem.totalProductPrice + totalPrice;
      if (lineItem.tax) {
        tax = +tax + (lineItem.totalProductPrice * this.taxPercent) / 100;
      }
    })

    this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
    this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
    let totalAfterDiscount: number = this.transactionDtoList.subtotal - this.totalTransactionDiscount;
    this.transactionDtoList.tax = tax;
    this.transactionDtoList.totalAmount = +totalAfterDiscount + this.transactionDtoList.tax;

    // This logic helps to manage main payment button enable or diable.
    if (this.transactionDtoList.totalAmount < 0) {
      this.disablePaymentButtonOnSale = true;
    }
    else {
      this.disablePaymentButtonOnSale = false;
    }
  }
  submitCustomer() {
    this.persit.setCustomerDetailsForSale(this.selectedCustomer);

    this.showCustomerSearchBox = !this.showCustomerSearchBox;
  }

  removeCustomerOnSale() {
    this.persit.clearCustomer();
    this.selectedCustomer = null;
    this.cust = null;
    this.showCustomerSearchBox = !this.showCustomerSearchBox;
  }
  showCustomerDetailsPopup() {
    console.log('inside the mnethose');
  }

  print(obj) {
    console.log("Coming form print", obj);
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

  setProductForDelete(product: Product) {
    this.selectedProduct = product;
    this.popupHeader = 'Delete Product';
    this.popupMessage = 'Are You Sure You Want To Delete Product?';
  }
  disgardCompleteSale() {
    this.persit.clearProducts();
    this.persit.clearCustomer();
    this.transactionLineItemDaoList = [];

    // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
    this.selectedCustomer = null;
    this.setTransactionDtoList();
    this.saleType = 'Complete';
    this.showCustomerSearchBox = true;
    this.router.navigate(['/sell/sale']);
  }

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

    else if (paymentType == 'Gift Card') {
      if (null != this.paymentDto && this.paymentDto.giftCard > 0) {
        this.paymentDto.giftCard = +this.paymentDto.giftCard + paymentAmount;
      }
      else {
        // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
        if (paymentAmount > this.dueAmountForTransaction) {
          this.paymentDto.giftCard = this.dueAmountForTransaction;
        }
        else {
          this.paymentDto.giftCard = paymentAmount;
        }
      }
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Gift Card', 'paymentAmount': paymentAmount })

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

    else if (paymentType == 'Loyalty') {


      // First need to check store credit already there added in payment dao or not, 
      if (null != this.paymentDto && this.paymentDto.loyalty > 0) {
        if (paymentAmount > this.dueAmountForTransaction) {
          // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

          this.paymentDto.loyalty = +this.paymentDto.loyalty + this.dueAmountForTransaction;

          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Loyalty', 'paymentAmount': this.paymentDto.loyalty });

          this.validatePaymentButtons(this.paymentDto.loyalty);
        }
        // Here i am using complete store credit of the customer
        else {

          this.paymentDto.loyalty = paymentAmount;
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Loyalty', 'paymentAmount': this.paymentDto.loyalty });
          this.validatePaymentButtons(this.paymentDto.storeCredit);
        }
      }
      else {
        if (paymentAmount > this.dueAmountForTransaction) {
          // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

          this.paymentDto.loyalty = this.dueAmountForTransaction;

          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Loyalty', 'paymentAmount': this.paymentDto.loyalty });

          this.validatePaymentButtons(this.paymentDto.loyalty);
        }
        // Here i am using complete store credit of the customer
        else {

          this.paymentDto.loyalty = paymentAmount;
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Loyalty', 'paymentAmount': this.paymentDto.loyalty });
          this.validatePaymentButtons(this.paymentDto.loyalty);
        }
      }
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
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'OnAccount', 'paymentAmount': paymentAmount })
      this.validatePaymentButtons(paymentAmount);
      this.disablePaymentButtons = true;
      this.disablePaymentButtonsWithAmount = true;


      // This mean customer has provide sufficient balance.
      this.disableCompleteSaleButton = false;
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
    this.payAmountTextBox = this.transactionDtoList.totalAmount;
    this.dueAmountForTransaction = this.transactionDtoList.totalAmount;

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
      if (payment.paymentType == 'Gift Card' && payment.paymentAmount > 0) {
        this.paymentDto.giftCard = this.paymentDto.giftCard - payment.paymentAmount;
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
        console.log('Inside On account for delete')
      }
    }

    // This is because of type script,  + it concatting the two variables.  DO NOT FORGET THIS. 
    this.dueAmountForTransaction = +payment.paymentAmount + this.dueAmountForTransaction;
    this.payAmountTextBox = Math.round(this.dueAmountForTransaction * 1e2) / 1e2;

    if (this.dueAmountForTransaction > 0) {
      this.disableCompleteSaleButton = true;
      this.disablePaymentButtons = false;
      this.disablePaymentButtonsWithAmount = false;

      this.disableOnAccountButtons = this.selectedCustomer == null;

      // This means customer has some loyalty points to redem.
      if (this.selectedCustomer && this.selectedCustomer.loyalty > 0) {
        this.disableLoyaltyButton = false;
      }
      // This mean this customer has some store credit to use so i need to enable store credit button.
      if (this.selectedCustomer && this.selectedCustomer.storeCredit > 0) {
        this.disableStoreCreditButtons = false;
      }
      else {
        this.disableStoreCreditButtons = true;
      }
    }
  }

  completeSale() {

    let totalLineItemDiscount: number = 0.00
    // setting customer details
    if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
      this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
      this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
      this.transactionDtoList.previousBalance = this.selectedCustomer.balance;
    }
    this.transactionDtoList.status = this.saleType;

    // This help only when user do return transaction where user gives store credit to the customer.
    //this.transactionDtoList.previousTransactionId = this.previousTransactionId;
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
      // This means customer has put this invoice ON ACCOUNT, and as per logic, just changing  
      this.transactionDtoList.status = 'Pending';
      this.saleType = 'Pending';
    }
    // seeting current date and time using momemt.
    this.transactionDtoList.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // Setting payment dto into transaction dto, because can not send both as @request body from angular..
    this.paymentDto.date = this.transactionDtoList.date;
    this.paymentDao.push(this.paymentDto);
    this.transactionDtoList.paymentDao = this.paymentDao;

    // Setting TransactionLineItemDetails
    for (let lineItem of this.transactionLineItemDaoList) {
      lineItem.status = this.saleType;
      lineItem.date = this.transactionDtoList.date;

      // I need to do this casue in backend i am using quantity and here i have to use defult quanity to show 1 as user insert product.
      // No need to do this any more cause now i am using only one name saleQuanity.
      // lineItem.quantity = lineItem.defaultQuantity;
      // This means user has given line item discount.
      if (lineItem.retailWithDiscount < lineItem.retail) {
        lineItem.discount = (lineItem.retail - lineItem.retailWithDiscount) * lineItem.saleQuantity;
        totalLineItemDiscount = + ((lineItem.retail - lineItem.retailWithDiscount) * lineItem.saleQuantity) + totalLineItemDiscount;
      }
    }
    // Seeting paymentDto status
    for (let payment of this.paymentDao) {
      payment.status = this.saleType;
    }

    // this.transactionNotes is bind with the ng model on ui.
    this.transactionDtoList.note = this.transactionNotes
    this.transactionDtoList.tip = this.tipAmount;


    // To do need to fix this hardcoded value for username
    this.transactionDtoList.username = 'alok@alok.com';
    this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;
    this.transactionDtoList.totalDiscount = + this.totalTransactionDiscount + totalLineItemDiscount;

    // I am doing this to show subtotal without line item discount, so in invoice customer wont get confuse.
    // 
    this.transactionDtoList.subtotal = this.transactionDtoList.subtotal + this.transactionDtoList.totalDiscount;
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
    //this.disableCompleteSaleButton = true;
    console.log('Transaction Details', this.transactionDtoList);
    console.log('TransactionLineItem Details', this.transactionLineItemDaoList);
    console.log('Payment Dto', this.paymentDto);
    //this.disablePaymentButtons = true;
    console.log("done with sales");


    // This will focus on the autocomplete field
    $('#productsearch > span > input').focus();


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

      // Very importa can not assign to null
      this.paymentDto = new PaymentDto();

      this.selectedCustomer = null;
      // this.disableCustomerSearchTextbox = false;
      this.paymentObjectForPaymentSellTable = [];
      // This is payment button on the sale page, i need to do this because there is not data in sale table,
      this.disablePaymentButtonOnSale = true;

      this.transactionLineItemDaoList = this.persit.getProducts() || [];
      // I must have to add this here, otherwise it will create problem,
      this.tipAmount = 0.00;
      this.totalTransactionDiscount = 0.00;
      this.setTransactionDtoList();
      this.paymentDao = [];

      // Need set it null cause its showing in next transaction also.
      this.transactionNotes = '';
      this.disableStoreCreditButtons = true;
      this.printTransactionDto = null;
      this.taxPercent = this.storeDetails.tax;
      this.showCustomerSearchBox = true;

    }

    else {
      console.log('just close the model.')
    }
    // very important cause this will give problem after doing return transaction so, after any transactoin i need to do this.
    this.saleType = 'Complete';
  }
  handleParkedTransactionFromSalesHistory(transactionComId: any) {

    // This is temp code for handling parked and online transactions
    this.sellService.getTransactionById(transactionComId)
      .subscribe((transaction: TransactionDtoList) => {

        // if(transaction.status == 'Parked'){

        transaction.transactionLineItemDaoList.forEach((lineItem) => {
          lineItem.saleQuantity = lineItem.saleQuantity;
          lineItem.saleQuantity = 0;
        });

        console.log('transaction details in park sale', transaction);
        // Setting transactoin id here so i can send this in case of return and when user gives store credit to the customer.

        this.persit.setProducts(transaction.transactionLineItemDaoList);

        this.transactionLineItemDaoList = this.persit.getProducts() || [];

        console.log('lineItem for parkSale', this.transactionLineItemDaoList);

        // Setting customer details to manage store credit and onAccount/ Loylty functionality
        if (transaction.customerPhoneno != null && transaction.customerPhoneno != undefined && transaction.customerPhoneno.length > 0) {

          this.selectedCustomer = new Customer();
          this.customerService.getCustomerDetailsByPhoneNo(transaction.customerPhoneno)
            .subscribe((customer: Customer) => {

              this.selectedCustomer = customer;

              if (customer.type == 'Business') {
                this.taxPercent = 0;
              }
              console.log('Customer details from backend', customer);
            });

          console.log('Customer detils for park sale', this.selectedCustomer);
          this.persit.setCustomerDetailsForSale(this.selectedCustomer);
          this.selectedCustomer = this.persit.getCustomerDetailsForSale();
        }

        this.setTransactionDtoList();


      })
  }

  printReciept() {
    console.log('coming for thermal print');
    this.sellService.printThermalReceipt(this.printTransactionDto)
      .subscribe((data) => {
        console.log(data);
      });
    this.clearAllDateAfterTransactionComplete();
    $('#paymentModel').modal('toggle');
  }


  filterProducts(event) {
    let query = event.query;
    this.sellService.getProductDetails()
      .subscribe((products) => {
        // console.log(products);
        this.product = this.filterProduct(query, products);
      });
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

  filterCustomer(query, customers: PrimeCustomer[]): PrimeCustomer[] {
    let filtered: PrimeCustomer[] = [];
    for (let i = 0; i < customers.length; i++) {
      let cust = customers[i];
      if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
        filtered.push(cust);
      }
    }
    return filtered;

  }

  filterCustomers(event) {
    let query = event.query;
    this.customerService.getCustomerDetails()
      .subscribe((customers) => {
        // console.log(products);
        this.filteredCustomer = this.filterCustomer(query, customers);
      });
  }

  getProduct() {
    this.productService.getProductDetails()
      .subscribe((product: Product[]) => {
        this.productList = product;
        this.productList.forEach((product) => {
          if (product.favorite) {
            this.productListByCategory.push(product);
          }
          this.productMap.set(product.productNo, product);
        })
        this.productListByCategory = this.productListByCategory.slice();
      });
  }

  getCategoryDetails(): void {
    this.productService.getCategoryDetails()
      .subscribe((categories: Category[]) => {
        this.categoryDto = categories;
        console.log('CategoryList' + this.categoryDto);
      });
  }

  getFavoriteProduct() {
    this.productListByCategory = [];
    this.productList.forEach((product) => {
      if (product.favorite) {
        this.productListByCategory.push(product);
      }
    })
    this.productListByCategory = this.productListByCategory.slice();
  }

  getProductByCategory(test: any) {
    console.log("category event", test);
    this.productListByCategory = [];

    let no: number = this.categoryDto[test].categoryId;
    console.log("category event", no);

    this.productList.forEach((product) => {

      if (product.categoryId == no) {
        this.productListByCategory.push(product);
      }
    })
    this.productListByCategory = this.productListByCategory.slice();

    console.log('category prodcut', this.productListByCategory)
  }

  public getCustomerDetails() {

    this.customerService.getCustomerDetails()
      .subscribe((customer: Customer[]) => {
        this.customerDto = customer;
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
  public opneCashDrawer() {
    console.log('Coming into cash drawer');
    this.sellService.opneCashDrawer()
      .subscribe(() => {
        console.log('inside after caling opoen cash drawer');
      });
  }
}

export class Product {
  productId?: number;
  productNo: string;
  // productVariantNo: number;
  description: string;
  categoryId: number;
  brandId: number
  vendorId: number;
  //modelId: number;
  alternetNo: string;
  cost: number;
  retail: number;
  markup: number;
  quantity: number;
  minQuantity: number;
  tax: boolean;
  varaint?: boolean;
  active: boolean;
  ecommerce: boolean;
  relatedProduct: boolean;
  favorite?: boolean;
  saleQuantity: number;
  returnRule: any;
  createdTimestamp: any;
  transactionComId: number;
  date: any;
  time: any;
  status: string;
  discount: number;
  retailWithDiscount: number;
  totalProductPrice: number;
  taxAmountOnProduct: number;
  imeiNo: any;
  operationType?: string;
  noOfSaleForFreeService?: any;
}
export class TransactionLineItemDaoList {
  productNo: string;
  cost: number;
  retail: number;
  quantity: number;
  saleQuantity: number;
  transactionComId: number;
  date: any;
  time: any;
  status: string;
  discount: number;
  retailWithDiscount: number;
  totalProductPrice: number;
  taxAmountOnProduct: number;
  imeiNo: any;
  quantityUpdated?: boolean;
  description: string;
  noOfSaleForFreeService?: number;
  tax: boolean;

}

export class TransactionDtoList {
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
  tip?: any;
}

export class PaymentDto {

  transactionComIdFk: number;
  date: any;
  cash: number;
  credit: number;
  giftCard: number;
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

