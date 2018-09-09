import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'app/customer/customer.component';
import { CustomerService } from 'app/customer/customer.service';
import { ProductInventory, ProductVariantDetail } from 'app/product/product.component';
import { ProductService } from 'app/product/product.service';
import { SellService } from 'app/sell/sell.service';
import { fadeInAnimation } from 'app/shared/animations/fade-in.animation';
import { PersistenceService } from 'app/shared/services/persistence.service';
import { StoreSetupDto } from 'app/shared/storesetup/storesetup.component';
import { StoreSetupService } from 'app/shared/storesetup/storesetup.service';
import { MenuItem } from 'app/shared/top-navbar/top-navbar.component';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import 'rxjs/Rx';
import { UtilService } from '../../shared/services/util.service';

declare var $: JQueryStatic;
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  // animations: [fadeInAnimation],
  // providers: [
  //   { provide: 'Window', useValue: window }
  // ]

  // host: { '[@fadeInAnimation]': '' }
})
export class SaleComponent implements OnInit {
  // @HostBinding('@fadeInAnimation') fadeInAnimation;

  product: Product[] = [];
  productList: Product[] = [];
  productForSearchBox: any;
  selectedProduct: Product;
  isProductExistsInSellList = false;
  productPriceArryByCustomer: Array<any[]>;
  productVariantList: ProductVariant[] = [];
  productPopupVariantList: ProductVariant[] = [];

  customerDto: Customer[];
  selectedCustomer: Customer;
  cust: any;
  filteredCustomer: any[];
  customerTier: number = 0;

  transactionLineItemDaoList: TransactionLineItemDaoList[];
  transactionDtoList = new TransactionDtoList();
  transactionDetails: TransactionDtoList[] = [];
  printTransactionDto: TransactionDtoList = null;
  pendingInvoiceTransactionList: TransactionDtoList[] = [];
  //paymentDto = new PaymentDto();

  paymentDaoList: PaymentDao[] = [];
  discountType: string;
  discountTexBox: number;
  discountValue: number = 0;
  totalTransactionDiscount: number = 0;
  popoverStyle: any;
  saleType: string = 'Complete';
  storeDetails: StoreSetupDto;
  taxPercent: number = 0.00;
  shippingAmount: number = 0.00;

  // This is for printing payment details on receipt.


  // This help when customer has paid full amount, so now user should not able to click on any payment button.
  // These both buttons are on payment page pop up.
  disablePaymentButtons: boolean = false;
  disablePaymentButtonsWithAmount = false;
  disableCompleteSaleButton: boolean = true;
  paymentDao: PaymentDao[] = [];
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

  //_subscriptionCustomer: any;
  _subscriptionProduct: any;
  _subscriptionProductVariant: any;

  parkDate: any;

  productMap = new Map();
  productVariantMap = new Map();


  constructor(
    private sellService: SellService,
    // @Inject('Window') private window: Window, 
    private persit: PersistenceService,
    private productService: ProductService,
    private storeSetupService: StoreSetupService,
    private customerService: CustomerService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    // private loadingService: LoadingService, 
    private utilService: UtilService) {
    // this.getCustomerDetails();
    this.getProductDetails();
    this.getAllProductVariant();

  }
  ngOnInit() {

    // this.items = [
    //   { name: 'Return', icon: 'fa fa-reply-all fa-x', link: '/return' },
    //   { name: 'Purchase Order', icon: 'fa fa-bookmark fa-x', link: '/sell/purchaseOrder' }
    // ];

    // this.getAllProductVariant();
    this.storeSetupService.getStoreDetails().
      then((data) => {
        this.storeDetails = data;
        if (this.selectedCustomer != null && this.selectedCustomer.type == 'Business') {
          this.taxPercent = 0.00;
          this.customerTier = this.selectedCustomer.tier;
        }
        else {
          this.taxPercent = this.storeDetails.tax;
        }
      });

    this.getCustomerDetails();
    // this.getProductDetails();
    this.selectedCustomer = this.persit.getCustomerDetailsForSale();

    //this.setFocusOnProductSearch();

    // This will help to get customer product price, cause its cusotmer is selected then definetly the price is stored in local storage.
    // if (this.selectedCustomer) {
    //   // this.productPriceArryByCustomer = this.persit.getCustomerProductPriceForSale();
    // }

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

  // openSellCustomerView() {
  //   let url = '/sell-customer';
  //   window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
  // }


  public addTransactionLineItem(productObj: any) {

    console.log('line item at the time of add TRansation', this.transactionLineItemDaoList);
    console.log('inside the add lineItem method', productObj);

    // FIRST NEED TO CHECK CUSTOMER IS SELECTED OR NOT.
    // THEN NEED TO CHECK HIS TIER AND WITH TIER, I NEED TO SET RETAIL PRICE FOR THE PERTICULAR PRODUCT.

    if (null != this.selectedCustomer && this.selectedCustomer != undefined && this.selectedCustomer.tier > 0) {

      if (this.selectedCustomer.tier == 1) {
        productObj.retailWithDiscount = productObj.tier1;
        productObj.retail = productObj.tier1;
      }
      else if (this.selectedCustomer.tier == 2) {
        productObj.retailWithDiscount = productObj.tier2;
        productObj.retail = productObj.tier2;
      }
      // Dont be smart, please keep this logic.
      else if (this.selectedCustomer.tier == 3) {
        productObj.retailWithDiscount = productObj.tier3;
        productObj.retail = productObj.tier3;
      }
    }
    else {
      productObj.retailWithDiscount = productObj.tier3;
      productObj.retail = productObj.tier3;
    }

    console.log('product price', productObj);
    // this will help me to set default quantity by for each product.
    if (productObj.saleQuantity <= 0 || productObj.saleQuantity == undefined) {
      productObj.saleQuantity = 1;
    }
    console.log('line item before', this.transactionLineItemDaoList);
          for (let lineItem of this.transactionLineItemDaoList) {
          if (productObj.productNo == lineItem.productNo) {
            // This flag helps to determin whether to add new product or just update the quantity
            this.isProductExistsInSellList = true;
            lineItem.saleQuantity = +lineItem.saleQuantity + 1;
            lineItem.quantityUpdated = true;
  
            lineItem.totalProductPrice = parseFloat((lineItem.retailWithDiscount * lineItem.saleQuantity).toFixed(2));
            lineItem.taxAmountOnProduct = (lineItem.retailWithDiscount * this.taxPercent) / 100;
            this.product = null;
            this.productForSearchBox = null;
            this.setTransactionDtoList()
            this.persit.setProducts(this.transactionLineItemDaoList);
  
            setTimeout(() => {
              lineItem.quantityUpdated = false;
              this.persit.setProducts(this.transactionLineItemDaoList);
              this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
            }, 400);

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

    // NEVER Delete this very important logic
    // for now just commenting this logic to fix the issue with screen going blank.
    $(`lineitem${productObj.productNo}`).ready(function () {
      document.getElementById(`lineitem${productObj.productNo}`).scrollIntoView();
    });
  }

  // This method helps to set focus on search box when user come on sell page.
  setFocusOnProductSearch() {
    $('#productsearch > span > input').focus();
  }

  selectProductFromSearch(productForSearchBox: Product) {

    console.log('selected');

    this.productPopupVariantList = [];

    if (productForSearchBox.variant) {
      this.productVariantList.forEach((variant) => {
        if (productForSearchBox.productId == variant.productId) {
          this.productPopupVariantList.push(variant);
        }
        //this.productPopupVariantList = this.productPopupVariantList.slice();
      });
      $('#productVariantPopup').modal('show');
      this.productPopupVariantList = this.productPopupVariantList.slice();
    }
    else if (productForSearchBox != null) {
      this.addTransactionLineItem(productForSearchBox);
    }
  }

  onVariantSelect(event) {
    console.log('variant Event', event.data);
    $('#productVariantPopup').modal('hide');
    this.setFocusOnProductSearch();
    this.addTransactionLineItem(event.data);
  }

  submitProduct(value: any) {

    let productFound: boolean = false;

    if (value && value.length > 7 && (value.match(/[0-9]/i))) {
      console.log('This mean user has scan the barcode no', value);

      let product = this.productMap.get(value);
      if (product != undefined) {
        productFound = true;
        this.timeOut();
        this.addTransactionLineItem(product);
      }

      console.log('before variant check', productFound)
      if (!productFound) {
        let product = this.productVariantMap.get(value);
        if (product != undefined) {
          productFound = true;
          this.timeOut();
          this.addTransactionLineItem(product);
        }
      }

      if (productFound == false) {
        alert("Sorry Can Not Find The Product!!!");
        this.productForSearchBox = null;
      }

      // setTimeout(() => {
      //   this.product = null;
      //   this.productForSearchBox = null;
      // }, 300)
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
      else if (value != null && value != undefined && !value.variant) {
        // if (!value.variant)
        console.log('oops coming for lineitem');
        this.addTransactionLineItem(value);
      }
    }

    // setTimeout(() => {
    //   this.product = null;
    //   this.productForSearchBox = null; 
    // }, 300)
  }

  timeOut() {
    setTimeout(() => {
      this.product = null;
      this.productForSearchBox = null;
    }, 400);
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
      // Very important to do it here, otherwise this will cache the old quantuty.
      this.transactionLineItemDaoList[index].saleQuantity = 1;
      this.transactionLineItemDaoList.splice(index, 1);
      console.log('lineItem after delete', this.transactionLineItemDaoList);
      this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
      this.persit.setProducts(this.transactionLineItemDaoList);
      this.setTransactionDtoList();

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

    let index = this.transactionLineItemDaoList.indexOf(event.data);

    console.log('event after update', event);
    this.transactionLineItemDaoList[index].saleQuantity = event.data.saleQuantity;
    this.transactionLineItemDaoList[index].retailWithDiscount = event.data.retailWithDiscount;
    this.transactionLineItemDaoList[index].description = event.data.description;
    // this will convert numern into numer to show in 2 digits. cause i can not use .toFix here.
    this.transactionLineItemDaoList[index].totalProductPrice = Math.round((event.data.saleQuantity * event.data.retailWithDiscount) * 1e2) / 1e2;
    this.setTransactionDtoList()
    this.persit.setProducts(this.transactionLineItemDaoList);

    

    //THIS IS OLD P-TABLE WORKING CODE DONT REMOVE THIS PLEASE.

    //  this.transactionLineItemDaoList[event.data].saleQuantity = event.data.saleQuantity;
    // this.transactionLineItemDaoList[event.data].retailWithDiscount = event.data.retailWithDiscount;
    // this.transactionLineItemDaoList[event.data].description = event.data.description;
    // // this will convert numern into numer to show in 2 digits. cause i can not use .toFix here.
    // this.transactionLineItemDaoList[event.data].totalProductPrice = Math.round((event.data.saleQuantity * event.data.retailWithDiscount) * 1e2) / 1e2;
    // this.setTransactionDtoList()
    // this.persit.setProducts(this.transactionLineItemDaoList);
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

    console.log('discount value', this.discountType);
    if (this.discountType == 'By Amount') {
      this.totalTransactionDiscount = value;
    }
    else if (this.discountType == 'By Percentage') {

      // AS a user u need to make sure that, thats the last thing you do, cause it wont store the price.
      // This logic is to set lineItem discount on all the product when user selete discount type as percentage, so i am changing retail with discount price for all products.
      // this.transactionLineItemDaoList.forEach((lineItem)=>{
      //   lineItem.retailWithDiscount = lineItem.retailWithDiscount -(parseFloat(((lineItem.retailWithDiscount * value) / 100).toFixed(2)));
      //   lineItem.retailWithDiscount = parseFloat((lineItem.retailWithDiscount).toFixed(2));
      //   lineItem.totalProductPrice = lineItem.retailWithDiscount * lineItem.saleQuantity;
      // });
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
      totalQuantity = +lineItem.saleQuantity + totalQuantity;
      totalPrice = +lineItem.totalProductPrice + totalPrice;
    })

    this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
    this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
    let totalAfterDiscount: number = this.transactionDtoList.subtotal - this.totalTransactionDiscount;
    this.transactionDtoList.tax = ((totalAfterDiscount * this.taxPercent / 100));
    this.transactionDtoList.totalAmount = +totalAfterDiscount + this.transactionDtoList.tax;
    // logic helps to fix the problem when user first put transactin on on account with shippiing price..and then try to pay, its not adding shipping amount in the transactionTotal amout
    // So this logic wil fix that problem. // This condition is true only when user is taking regular transaction, if not then i need to add shiping details in the transacttion total.
    if (this.transactionDtoList.shipping == NaN || this.transactionDtoList.shipping <= 0 || this.transactionDtoList.shipping == undefined || this.shippingAmount > 0) {
      this.transactionDtoList.shipping = this.shippingAmount;
    }
    // This will help to make shipping amount 0, when user wants to remove shipping from transaction.
    if (this.shippingAmount == 0) {
      this.transactionDtoList.shipping = 0;
    }
    this.transactionDtoList.totalAmount = +this.transactionDtoList.totalAmount + this.transactionDtoList.shipping;

    console.log('total amount', this.transactionDtoList.totalAmount);
    // This logic helps to manage main payment button enable or diable.
    if (this.transactionDtoList.totalAmount > 0) {
      this.disablePaymentButtonOnSale = false;
    }
    else {
      this.disablePaymentButtonOnSale = true;
    }

    // Here I need to cache the Shipping amount cause if user refresh or come back from other page i need to show shipping amount all the time.
    this.persit.setShippingAmount(this.shippingAmount);
  }

  submitCustomer() {

    this.customerService.getCustomerDetailsByPhoneNo(this.selectedCustomer.phoneNo)
      .subscribe((customer) => {
        this.selectedCustomer = customer;
        this.customerTier = this.selectedCustomer.tier;

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
              totalPreviousBalance = +totalPreviousBalance + trans.transactionBalance;
              console.log('total Previous balance', totalPreviousBalance);
            })
            this.pendingInvoiceTransactionList = transaction;
            this.selectedCustomer.balance = totalPreviousBalance;
          });

        this.persit.setCustomerDetailsForSale(this.selectedCustomer);

        // this.sellService.getProductPriceByCustomer(this.selectedCustomer.phoneNo)
        //   .subscribe((productPrice) => {
        //     this.productPriceArryByCustomer = productPrice;
        //     // this.persit.setCustomerProductPriceForSale(this.productPriceArryByCustomer);
        //   });

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

  setHeaderAndMessageForDisgardPopup() {
    this.popupHeader = 'Discard Sale';
    this.popupMessage = 'Are You Sure You Want To Delete Complete Sale?';
  }

  setPaymentDto(paymentType: any, paymentAmount: any) {

    let paymentDaoObj = new PaymentDao();

    if (paymentType == 'Cash') {

      paymentDaoObj.type = 'Cash';
      // This mean customer has paid less or equal amount.
      if (paymentAmount <= this.dueAmountForTransaction) {
        paymentDaoObj.amount = paymentAmount;
      }
      else {
        paymentDaoObj.amount = this.dueAmountForTransaction;
      }
      //this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'CASH', 'paymentAmount': paymentAmount });
      this.paymentDaoList.push(paymentDaoObj);
      this.validatePaymentButtons(paymentAmount);
    }



    // This is very rare scenario and it happens only if user is stupid but still i need to handle this,
    // Cause user can pay in cash two time by click on cash button by seletecting different buttons.



    // if (null != this.paymentDto && this.paymentDto.cash > 0) {
    //   this.paymentDto.cash = +this.paymentDto.cash + paymentAmount;
    // }


    // else {
    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
    // if (paymentAmount > this.dueAmountForTransaction) {
    //   this.paymentDto.cash = this.dueAmountForTransaction;
    // }
    // else {
    //   this.paymentDto.cash = paymentAmount;
    // }
    // }
    // this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount });

    // this.validatePaymentButtons(paymentAmount);
    else if (paymentType == 'Credit') {

      paymentDaoObj.type = 'Credit';
      // This mean customer has paid less or equal amount.
      if (paymentAmount <= this.dueAmountForTransaction) {
        paymentDaoObj.amount = paymentAmount;
      }
      else {
        paymentDaoObj.amount = this.dueAmountForTransaction;
      }

      //this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'CREDIT', 'paymentAmount': paymentAmount });
      this.paymentDaoList.push(paymentDaoObj);

      this.validatePaymentButtons(paymentAmount);
    }
    else if (paymentType == 'Check') {

      paymentDaoObj.type = 'Check';
      // This mean customer has paid less or equal amount.
      if (paymentAmount <= this.dueAmountForTransaction) {
        paymentDaoObj.amount = paymentAmount;
      }
      else {
        paymentDaoObj.amount = this.dueAmountForTransaction;
      }

      //this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'CHECK', 'paymentAmount': paymentAmount });
      this.paymentDaoList.push(paymentDaoObj);
      this.validatePaymentButtons(paymentAmount);
    }

    else if (paymentType == 'Store Credit') {

      paymentDaoObj.type = 'Store Credit';

      this.disableStoreCreditButtons = true;

      // Now I have to handle two scenario
      // Case 1. Store credit can greater then equal to payment amount
      // Case 2. Store credit can less then equal to payment amount

      // Case 1: where payment amount is customers store credit because that what i am sending from ui
      if (paymentAmount > this.dueAmountForTransaction) {
        // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

        paymentDaoObj.amount = this.dueAmountForTransaction;
        this.paymentDaoList.push(paymentDaoObj);

        //this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': paymentDaoObj.amount });
        this.validatePaymentButtons(paymentDaoObj.amount);
      }
      // Here i am using complete store credit of the customer
      else {
        paymentDaoObj.amount = paymentAmount;
        this.paymentDaoList.push(paymentDaoObj);

        //this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': paymentDaoObj.amount });
        this.validatePaymentButtons(paymentDaoObj.amount);
      }
    }
  }

  // if (null != this.paymentDto && this.paymentDto.credit > 0) {
  //   this.paymentDto.credit = +this.paymentDto.credit + paymentAmount;
  // }
  // else {
  //   // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
  //   if (paymentAmount > this.dueAmountForTransaction) {
  //     this.paymentDto.credit = this.dueAmountForTransaction;
  //   }
  //   else {
  //     this.paymentDto.credit = paymentAmount;
  //   }
  // }
  // this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount })
  // this.validatePaymentButtons(paymentAmount);

  // else if (paymentType == 'Debit') {
  //   if (null != this.paymentDto && this.paymentDto.debit > 0) {
  //     this.paymentDto.debit = +this.paymentDto.debit + paymentAmount;
  //   }
  //   else {
  //     // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
  //     if (paymentAmount > this.dueAmountForTransaction) {
  //       this.paymentDto.debit = this.dueAmountForTransaction;
  //     }
  //     else {
  //       this.paymentDto.debit = paymentAmount;
  //     }
  //   }
  //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount })

  //   this.validatePaymentButtons(paymentAmount);

  // }
  // else if (paymentType == 'Check') {
  //   if (null != this.paymentDto && this.paymentDto.checkAmount > 0) {
  //     this.paymentDto.checkAmount = +this.paymentDto.checkAmount + paymentAmount;
  //   }
  //   else {
  //     // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
  //     if (paymentAmount > this.dueAmountForTransaction) {
  //       this.paymentDto.checkAmount = this.dueAmountForTransaction;
  //     }
  //     else {
  //       this.paymentDto.checkAmount = paymentAmount;
  //     }
  //   }
  //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount })

  //   this.validatePaymentButtons(paymentAmount);
  // }
  // else if (paymentType == 'StoreCredit') {

  //   // First need to check store credit already there added in payment dao or not, 
  //   if (null != this.paymentDto && this.paymentDto.storeCredit > 0) {
  //     if (paymentAmount > this.dueAmountForTransaction) {
  //       // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

  //       this.paymentDto.storeCredit = +this.paymentDto.storeCredit + this.dueAmountForTransaction;

  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });

  //       this.validatePaymentButtons(this.paymentDto.storeCredit);
  //     }
  //     // Here i am using complete store credit of the customer
  //     else {

  //       this.paymentDto.storeCredit = paymentAmount;
  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
  //       this.validatePaymentButtons(this.paymentDto.storeCredit);
  //     }
  //   }
  //   else {
  //     if (paymentAmount > this.dueAmountForTransaction) {
  //       // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.

  //       this.paymentDto.storeCredit = this.dueAmountForTransaction;

  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });

  //       this.validatePaymentButtons(this.paymentDto.storeCredit);
  //     }
  //     // Here i am using complete store credit of the customer
  //     else {
  //       this.paymentDto.storeCredit = paymentAmount;
  //       this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
  //       this.validatePaymentButtons(this.paymentDto.storeCredit);
  //     }
  //   }

  //   // Now I have to handle two scenario
  //   // Case 1. Store credit can greater then equal to payment amount
  //   // Case 2. Store credit can less then equal to payment amount

  //   // Case 1: where payment amount is customers store credit because that what i am sending from ui
  // }


  // else if (paymentType == 'OnAccount') {
  //   this.paymentDto.onAccount = paymentAmount;
  //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'OnAccount', 'paymentAmount': paymentAmount });
  //   // this.validatePaymentButtons(this.paymentDto.onAccount);
  //   this.disablePaymentButtons = true;
  //   this.disablePaymentButtonsWithAmount = true;
  //   // This mean customer has provide sufficient balance.
  //   this.disableCompleteSaleButton = false;
  //   this.disableOnAccountButtons = true;

  //   // Here i am blinding disabling store credit cause, it may create so me issue and i will check on delete payment method, wheather customer has store credit or not.
  //   this.disableStoreCreditButtons = true;
  // }
  // else if (paymentType == 'Loyalty') {
  //   this.paymentDto.loyalty = paymentAmount;
  // }


  validatePaymentButtons(paymentAmount: number) {

    let totalPaidAmout = 0.00;
    // This means cutomer has paid full amount.
    if (this.dueAmountForTransaction - paymentAmount <= 0) {
      this.dueAmountForTransaction = Math.round((this.dueAmountForTransaction - paymentAmount) * 1e2) / 1e2;
      this.disablePaymentButtons = true;
      this.disablePaymentButtonsWithAmount = true
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
    this.paymentObjectForPaymentSellTable = [];
    this.paymentDao = [];
    this.paymentDaoList = [];

    // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
    this.payAmountTextBox = Math.round((this.transactionDtoList.totalAmount) * 1e2) / 1e2;
    this.dueAmountForTransaction = Math.round((this.transactionDtoList.totalAmount) * 1e2) / 1e2;

    this.disablePaymentButtons = false;
    this.disablePaymentButtonsWithAmount = false;
    // this.disableOnAccountButtons = this.selectedCustomer == null;

    // This mean this customer has some store credit to use so i need to enable store credit button.
    if (this.selectedCustomer) {
      this.disableCompleteSaleButton = false;
      if (this.selectedCustomer.storeCredit > 0) {
        this.disableStoreCreditButtons = false;
      }
      else {
        this.disableStoreCreditButtons = true;
      }
    }
    else {
      this.disableCompleteSaleButton = true;
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

    // This mean this customer has some store credit to use so i need to enable store credit button.
    if (this.selectedCustomer) {
      this.disableCompleteSaleButton = false;
      if (this.selectedCustomer.storeCredit > 0) {
        this.disableStoreCreditButtons = false;
      }
      else {
        this.disableStoreCreditButtons = true;
      }
    }
    else {
      this.disableCompleteSaleButton = true;
    }
    this.payAmountTextBox = this.transactionDtoList.transactionBalance;
    this.dueAmountForTransaction = this.transactionDtoList.transactionBalance;

  }


  deletePaymentFromPaymentModel(payment: PaymentDao) {

    let index = this.paymentDaoList.indexOf(payment);

    console.log('due balance when delete', this.dueAmountForTransaction);
    if (index > -1) {
      this.paymentDaoList.splice(index, 1);

      if (payment.amount > 0) {
        this.dueAmountForTransaction = this.dueAmountForTransaction + payment.amount;
      }


      // Need to handle this, because i am adding payment type when user click on add payment,
      // So now when user delete the payment type, i need to change the payment object too, and remove the or subtract the payment amount.
      // if (payment.type == 'Cash' && payment.amount > 0) {
      //this.paymentDto.cash = this.paymentDto.cash - payment.paymentAmount;
      // }
      // if (payment.paymentType == 'Credit' && payment.paymentAmount > 0) {
      //   this.paymentDto.credit = this.paymentDto.credit - payment.paymentAmount;
      // }
      // if (payment.paymentType == 'Debit' && payment.paymentAmount > 0) {
      //   this.paymentDto.debit = this.paymentDto.debit - payment.paymentAmount;
      // }
      // if (payment.paymentType == 'Check' && payment.paymentAmount > 0) {
      //   this.paymentDto.checkAmount = this.paymentDto.checkAmount - payment.paymentAmount;
      // }
      // if (payment.paymentType == 'StoreCredit' && payment.paymentAmount > 0) {
      //   this.paymentDto.storeCredit = this.paymentDto.storeCredit - payment.paymentAmount;
      // }
      // if (payment.paymentType == 'OnAccount' && payment.paymentAmount > 0) {
      //   this.paymentDto.onAccount = this.paymentDto.onAccount - payment.paymentAmount;
      // }
    }

    // if(payment.paymentType == 'OnAccount'){
    //   //this.dueAmountForTransaction = this.transactionDtoList.totalAmount -this.paymentDto.onAccount;
    // }
    // else{
    // this.dueAmountForTransaction = +payment.paymentAmount + this.dueAmountForTransaction;
    // }
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
      this.disablePaymentButtons = false;
      this.disablePaymentButtonsWithAmount = false;

      this.disableOnAccountButtons = this.selectedCustomer == null;
      this.disableCompleteSaleButton = this.selectedCustomer == null;
    }
  }
  // This is the method which handle completing the transaction and reset the all flag and other data.
  completeSale() {
    this.disableCompleteSaleButton = true;
    let totalLineItemDiscount: number = 0.00;

    console.log('sales type', this.saleType);
    // setting customer details
    if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
      this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
      this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
      this.transactionDtoList.previousBalance = this.selectedCustomer.balance;
    }
    this.transactionDtoList.status = this.saleType;

    // Here I need to fix the problem when customer is just paying the balacne of transaction.
    // So if the transaction has transaction Id then dont send the date just finish the transaction with old date.
    // This means this new transaction
    if (this.transactionDtoList.transactionComId == undefined) {
      // seeting current date and time using momemt.
      this.transactionDtoList.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    }
    // Do not do anything, just let it go so date wont chance.
    else {
      this.transactionDtoList.date = this.transactionDtoList.originalDate;
      console.log('old transaction', this.transactionDtoList.originalDate);
    }
    this.transactionDtoList.paymentDao = this.paymentDaoList;

    // this.transactionNotes is bind with the ng model on ui.
    this.transactionDtoList.note = this.transactionNotes

    // To do need to fix this hardcoded value for username
    this.transactionDtoList.username = 'alok@alok.com';
    this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;

    // THIS means customer has over paid, this happens mostly in cash of when customer pay by cash.
    // So i am setting it as chnage amount.
    if (this.dueAmountForTransaction <= 0) {
      //this.paymentDto.changeForCash = Math.abs(this.dueAmountForTransaction);

      // This means customer has paid, complete invoice, it was not here before but now i need to do it after adding logic for pending invoice.
      this.transactionDtoList.transactionBalance = 0.00;
    }
    // This mean customer has add money on Account or paid perfect price but in both case i need to set transaction balance cause thats how i am handling balance logic in backend.
    else {
      this.transactionDtoList.transactionBalance = this.dueAmountForTransaction;
      // This means customer has put this invoice ON ACCOUNT, OR THIS IS PARK SALE, I need to check that logic here.

      if (this.saleType == 'Park') {
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
    this.transactionDtoList.totalDiscount = +this.totalTransactionDiscount + totalLineItemDiscount;
    // I am doing this to show subtotal without line item discount, so in invoice customer wont get confuse.
    this.transactionDtoList.subtotal = this.transactionDtoList.subtotal + totalLineItemDiscount;

    for (let payment of this.paymentDaoList) {

      payment.status = this.saleType;
      payment.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      // console.log('paymentId', payment.transactionPaymentId);
      // if(payment.transactionPaymentId <=0 || payment.transactionPaymentId == undefined){
      //   payment.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      // }
      // else {
      //   payment.date = this.transactionDtoList.date;
      // }
    }
    // This is very important logic to maintain, total due balance in backend.
    if (this.selectedCustomer && this.selectedCustomer != undefined) {
      if (this.transactionDtoList.status == 'Pending') {
        this.transactionDtoList.totalBalanceDue = +this.selectedCustomer.balance + this.dueAmountForTransaction;
      }
      else {
        this.transactionDtoList.totalBalanceDue = this.selectedCustomer.balance;
      }
    }

    // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
    this.sellService.addTransactionDetails(this.transactionDtoList)
      .subscribe(data => {
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

    // this.loadingService.loading = false;

  }

  // This method helps to add transaction as park, so user can use this transaction later
  parkSale() {

    this.saleType = 'Park';
    this.completeSale();
    // this.saleType = 'Complete'; // Need to set for next transaction

  }

  clearAllDateAfterTransactionComplete() {
    // For now i have to do this to fix the issue with quantity not showing 
    this.getProductDetails();

    // This is important to handle when user click on Close button from payment popup, we need to clear data only when transaction is completed ottherwise just need to close the popup.
    if (null != this.printTransactionDto) {
      this.transactionDtoList = new TransactionDtoList();

      this.persit.clearProducts();
      this.persit.clearCustomer();
      this.persit.clearCustomerPriceForSale();

      // Very importa can not assign to null
      //this.paymentDto = new PaymentDto();

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
      this.shippingAmount = 0.00;

      this.setTransactionDtoList();
      this.paymentDao = [];
      this.paymentDaoList = [];
      this.discountValue = 0;


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
    this.setFocusOnProductSearch();
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
        this.shippingAmount = transaction.shipping;
        this.transactionDtoList.parkSale = transaction.parkSale;
        phoneNo = transaction.customerPhoneno;
        console.log('phono', phoneNo);
        if (phoneNo) {
          this.setCustomerDetailsForParkSale(phoneNo);
        }

        //Hopefull this will fix the issue with parksale, where transactionLineItemId coming from back and creating
        // Percitance entity exceptions - > which was painfull to figure it out.
        if (transaction && transaction.transactionLineItemDaoList) {
          transaction.transactionLineItemDaoList.forEach((lineItem) => {
            lineItem.transactionLineItemId = 0;
          });

          this.persit.setProducts(transaction.transactionLineItemDaoList);
          this.transactionLineItemDaoList = this.persit.getProducts() || [];
        }
        this.setTransactionDtoList();
      });
  }

  setCustomerDetailsForParkSale(phone: string) {
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
  printReceipt(transaction: TransactionDtoList) {

    this.sellService.printReceipt(transaction);
  }

  // This is from customer invoice popup model, Do not delete this.
  sendEmail(transaction: TransactionDtoList) {

    if (null != transaction && null != transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {

      // Todo need to add sppiner for this so user can wait that email is sending, cuase its taking littel bit more time to send an email.
      this.sellService.sendEmail(transaction.transactionComId)
        .subscribe((data) => {
          //this.loadingServie.loading = true;
          if (data.text()) {
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

    else {
      this.toastr.error('Can not find email address for transaction !!', 'Error!');
    }
  }

  printReciept() {
    this.sellService.printReceipt(this.printTransactionDto);
    this.clearAllDateAfterTransactionComplete();
    $('#paymentModel').modal('toggle');
  }

  public getCustomerDetails() {

    this.customerService.getCustomerDetailsFromBackEnd()
      .subscribe((customer) => {
        this.customerDto = customer;
      })
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
    // if(!event){
    //   this.product = null; 

    //   return;
    // }
    let query = event.query;
    // this.productService.getProductDetails()
    // if(!query){
    //   this.product = null; 

    //   return;
    // }
    //   .subscribe((products) => {
    // console.log(products);
    this.product = this.filterProduct(query, this.productList);
    // });
  }

  filterProduct(query, products: Product[]): Product[] {
    let filtered: Product[] = [];
    for (let i = 0; i < products.length; i++) {
      let p = products[i];
      // if (p.description.toLowerCase().includes(query.toLowerCase()) || p.productNo.includes(query)) {
      if (p.description.toLowerCase().includes(query.toLowerCase())) {

        filtered.push(p);
      }
    }
    return filtered;
  }

  filterCustomers(event) {
    let query = event.query;
    this.customerService.getCustomerDetailsFromBackEnd()
      .subscribe((customers) => {
        this.filteredCustomer = this.filterCustomer(query, this.customerDto);
      });
  }

  filterCustomer(query, customers: Customer[]): Customer[] {
    let filtered: Customer[] = [];
    for (let i = 0; i < customers.length; i++) {
      let cust = customers[i];

      // This if condition will fix the problem of searching when company name is null.
      if (cust != undefined && cust.companyName != null && cust.companyName != undefined)
        if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
          filtered.push(cust);
        }
    }
    return filtered;

  }
  getProductDetails() {
    this.productService.getProductDetails();
    this._subscriptionProduct = this.productService.productListChange.subscribe((product) => {
      this.productList = product;
      // this.productList = this.productList.slice();

      if(null != this.productList){
        this.productList.forEach((p)=>{
          this.productMap.set(p.productNo, p);
        });
      }
      console.log('map object after get product', this.productMap);
    });
  }
  getAllProductVariant() {
    // this.productService.getAllProductVariantFromBackEnd()
    //   .subscribe((variant) => {
    //     this.productVariantList = variant;
    //   })
    this.productService.getAllProductVariant();
    this._subscriptionProductVariant = this.productService.productVariantListChange.subscribe((variant) => {
      this.productVariantList = variant;
      //this.productVariantList = this.productVariantList.slice();

      this.productVariantList.forEach((variant)=>{
        this.productVariantMap.set(variant.productNo, variant);
      });
      console.log('map object after get productProduct Variant', this.productVariantMap);

    });

  }

  disgardCompleteSale() {
    this.persit.clearProducts();
    this.persit.clearCustomer();
    this.persit.clearCustomerPriceForSale();
    this.transactionLineItemDaoList = [];
    this.persit.clearShippingAmount();
    this.shippingAmount = 0.00;
    this.transactionDtoList = new TransactionDtoList();
    // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
    this.selectedCustomer = null;
    this.setTransactionDtoList();
    this.saleType = 'Complete';
    //this.router.navigate(['/sell/sale']);
    //this.productList = [];
    //this.getProductDetails();
  }
  print(obj) {
    console.log("Coming form print", obj);
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    //this._subscriptionCustomer.unsubscribe();
    this._subscriptionProduct.unsubscribe();
    this._subscriptionProductVariant.unsubscribe();
  }
}


export class Product {
  productId?: number;
  productNo: string;
  // productVariantNo: number;
  description: string;
  categoryId: number;
  subCategoryId?: number;
  brandId?: number
  vendorId?: number;
  alternetNo?: string;
  cost?: number;
  retail?: number;
  tier1?: number;
  tier2?: number;
  tier3?: number;
  markup?: number;
  quantity?: number;
  minQuantity?: number;
  tax?: boolean;
  variant?: boolean;
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
  color?: string;
  memory?: string;
  newProduct?:boolean;
  onSale?:boolean;
  featured?:boolean;

}

export class ProductVariant {
  productVariantId?:number;
  id?:number;
  productId: number;
  productNo: string;
  oldProductNo?:string
  cost?: number;
  retail?: number;
  tier1?: number;
  tier2?: number;
  tier3?: number;
  quantity?: number;
  variant1: string;
  value1: string;
  variant2?: string;
  value2?: string;
  variant3?: string;
  value3?: string;
  createdTimestamp: any;
  operationType?: string;


  // productVariantNo: number;
  description?: string;
  categoryId?: number;
  subCategoryId?: number;
  brandId?: number
  vendorId?: number;
  alternetNo?: string;

  markup?: number;
  minQuantity?: number;
  tax?: boolean;
  variant?: boolean;
  active?: boolean;
  ecommerce?: boolean;
  relatedProduct?: boolean;
  // defaultQuantity = 1;
  saleQuantity?: number;
  returnRule?: any;

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
}

export interface ProductVariantForm {
  productVariantId?:number;
  productId: number;
  productNo: string;
  oldProductNo?:string;
  cost?: number;
  retail?: number;
  tier1?: number;
  tier2?: number;
  tier3?: number;
  quantity?: number;
  variant1: ProductVariantDetail;
  value1: string;
  variant2?: ProductVariantDetail;
  value2?: string;
  variant3?: ProductVariantDetail;
  value3?: string;
  createdTimestamp: any;
  operationType?: string;


  // productVariantNo: number;
  description?: string;
  categoryId?: number;
  subCategoryId?: number;
  brandId?: number
  vendorId?: number;
  alternetNo?: string;

  markup?: number;
  minQuantity?: number;
  tax?: boolean;
  variant?: boolean;
  active?: boolean;
  ecommerce?: boolean;
  relatedProduct?: boolean;
  // defaultQuantity = 1;
  saleQuantity?: number;
  returnRule?: any;

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
  color?: string;
  memory?: string;


}

export class VariantInventoryDto {
  productVariantDao: ProductVariant;
  productInventoryDao: ProductInventory[];
  totalQuantity: number;
}
export class TransactionLineItemDaoList {

  productId?: number;
  productNo: string;
  cost?: number;
  retail?: number;
  saleQuantity?: number;
  transactionComId?: number;
  transactionLineItemId?: number;
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
  username?:string;
  customerFirstLastName?: string;

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
  previousBalance: number;
  transactionBalance: number;
  totalBalanceDue: number;
  lineItemDiscount: any;
  username: any;
  customerFirstLastName: string;
  paymentDao: PaymentDao[];
  transactionLineItemDaoList: TransactionLineItemDaoList[];
  note: string;
  previousTransactionId: any;
  description: string;
  rma: boolean;
  parkSale: boolean;
  paymentDetails: PaymentDetails[];
  paymentTableAmount: number;
}

export class PaymentDao {
  transactionPaymentId: number;
  transactionComId: number;
  status: string;
  date: any;
  amount: number;
  type: string;
  note: string;
  updatedTimestamp: any;
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

export class PaymentDetails {
  paymentType: string;
  paymentAmount: number;
  paymentDate: any;
  paymentTime: any;
}

export class PaymentHistoryDto {

  transactionComId: number;
  paymentDao: PaymentDao;
  customerFirstLastName: string;
  customerPhoneno: string;
  originalDate: any;
  onlyDate: any;
  time: any;
  totalAmount: number;
  transactionBalance: any;
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