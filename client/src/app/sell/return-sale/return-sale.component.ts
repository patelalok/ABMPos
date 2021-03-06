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
import { TransactionLineItemDaoList, TransactionDtoList, PaymentDao, PaymentObjectForPaymentSellTable, Product, ProductVariant } from 'app/sell/sale/sale.component';
import { PersistenceService } from 'app/shared/services/persistence.service';
import { ProductService } from 'app/product/product.service';
declare var $: JQueryStatic;

@Component({
  selector: 'app-return-sale',
  templateUrl: './return-sale.component.html',
  styleUrls: ['./return-sale.component.scss']
})
export class ReturnSaleComponent implements OnInit, AfterViewInit {
  // @HostBinding('@fadeInAnimation') fadeInAnimation;


  product: Product[];
  productVariantList: ProductVariant[] = [];
  productForSearchBox: any;
  isProductExistsInSellList = false;
  selectedProduct: Product;


  customerDto: Customer[];
  cust: any;
  filteredCustomer: any[];
  selectedCustomer: Customer;
  productPriceArryByCustomer: Array<any[]>;


  transactionLineItemDaoList: TransactionLineItemDaoList[] = [];
  transactionDtoList = new TransactionDtoList();
  tempTransactionAmountForSale: number; // this variable helps to manage transaction amount and dueamount for transaction.
  printTransactionDto: TransactionDtoList = null;
  transactionNotes: string = '';
  taxPercent: number = 0.00;
  storeDetails: StoreSetupDto;

  payAmountTextBox: number;
  discountType: string;
  discountTexBox: number;
  paymentObjectForPaymentSellTable: PaymentObjectForPaymentSellTable[] = [];
  paymentDaoList: PaymentDao[] = [];
  productPopupVariantList: ProductVariant[] = [];

  // paymentDto = new PaymentDao();
  dueAmountForTransaction: number;

  disablePaymentButtons: boolean = false;  // This help when customer has paid full amount, so now user should not able to click on any payment button.// These both buttons are on payment page pop up.
  disablePaymentButtonsWithAmount = false;
  disableCompleteSaleButton: boolean = true;
  disableOnAccountButtons: boolean = true;
  disableStoreCreditButtons: boolean = true;
  disablePaymentButtonOnSale: boolean = true;
  popupHeader: string;
  popupMessage: string;

  _subscriptionCustomer: any;
  _subscriptionProductVariant: any;



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
    this.getCustomerDetails();

  }

  ngOnInit() {

    this.storeSetupService.getStoreDetails().
      then((data) => {
        this.storeDetails = data;
        this.taxPercent = this.storeDetails.tax;
      });

    this.getAllProductVariant();
    this.getCustomerDetails();
  }

  ngAfterViewInit() {
    // This will focus on the autocomplete field
    $('#productsearch > span > input').focus();
  }

  selectProductFromSearch(productForSearchBox: Product) {

    this.productPopupVariantList = [];

    console.log('test return',productForSearchBox );

    if(productForSearchBox.variant){
      this.productVariantList.forEach((variant)=>{
        if(productForSearchBox.productId == variant.productId){
          this.productPopupVariantList.push(variant);
        }
        //this.productPopupVariantList = this.productPopupVariantList.slice();
      });
      $('#productVariantPopup').modal('show');
      this.productPopupVariantList = this.productPopupVariantList.slice();
    }
    else if(productForSearchBox != null) {
      this.addTransactionLineItem(productForSearchBox);
    }
  }

  onVariantSelect(event){
    console.log('variant Event', event.data);
    $('#productVariantPopup').modal('hide');
    //this.setFocusOnProductSearch();
    this.addTransactionLineItem(event.data);
  }

  submitProduct(value: any) {

    if (typeof value === 'string') {
      // this is the senario where user is adding new product to Sell
      if (this.product != null && this.product.length > 0) {
        // this.addTransactionLineItem(this.product[0]);
      }
      else if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
        if (value.match(/[a-z]/i))
          console.log('contains only charcters');

        // this mean this is decimal value so it will change the retail price of the product
        if (value.match(/[0-9]/i) && value.indexOf('.') > 0)
          this.updateProductPrice(value);

        // this mean this is integer value so it will change the quantity of the product
        // Also i need to change length of the value cause i need to add product by product no
        // So here i am assuming quantity is not gonna be more then 5, so anything more then 5 just add to product grid.
        else if (value.match(/[0-9]/i) && value.length < 5)
          this.updateProductQuantity(value);
      }
    }
    else if (value != null) {
      this.addTransactionLineItem(value);
    }
  }

  updateProductQuantity(value: any) {
    console.log('Quantity change');
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity = value;
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity).toFixed(2));
    this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    this.setTransactionDtoList(this.transactionLineItemDaoList)
    //this.persit.setProducts(this.transactionLineItemDaoList);
    this.productForSearchBox = null;
  }

  updateProductPrice(value: any) {
    console.log('Price change');
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount = -value;
    this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailWithDiscount * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].saleQuantity);
    this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    this.setTransactionDtoList(this.transactionLineItemDaoList)
    //this.persit.setProducts(this.transactionLineItemDaoList);
    this.productForSearchBox = null;
  }

  // this method helps to update lineItem Detail when user change the quatity or change the retail from editable box
  updateLineItemDetails(event) {
    this.transactionLineItemDaoList[event.index].saleQuantity = event.data.saleQuantity;
    this.transactionLineItemDaoList[event.index].retailWithDiscount = event.data.retailWithDiscount;
    this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.saleQuantity * event.data.retailWithDiscount);
    this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.saleQuantity * event.data.retailWithDiscount) * this.taxPercent) / 100;
    this.setTransactionDtoList(this.transactionLineItemDaoList);
    //this.persit.setProducts(this.transactionLineItemDaoList);
  }

  public addTransactionLineItem(productObj: Product): TransactionLineItemDaoList[] {

    if(null!= this.selectedCustomer && this.selectedCustomer != undefined && this.selectedCustomer.tier > 0)
    {
        if(this.selectedCustomer.tier == 1){
          productObj.retailWithDiscount = -productObj.tier1;
          productObj.retail = -productObj.tier1;
          productObj.cost = -productObj.cost;

        }
        else if(this.selectedCustomer.tier == 2){
          productObj.retailWithDiscount = -productObj.tier2;
          productObj.retail = -productObj.tier2;
          productObj.cost = -productObj.cost;

        }
        else if(this.selectedCustomer.tier == 3){
          productObj.retailWithDiscount = -productObj.tier3;
          productObj.retail = -productObj.tier3;
          productObj.cost = -productObj.cost;

        }      
    }
    else {
      productObj.retailWithDiscount = -productObj.tier3;
      productObj.retail = -productObj.tier3;
      productObj.cost = -productObj.cost;

    }
    // // This will help to add retailWithDiscount first time when user add the first line item
    // if (productObj.retailWithDiscount >= 0) {
    //   productObj.cost = -productObj.cost;
    //   productObj.retailWithDiscount = -productObj.retail;
    //   productObj.retail = -productObj.retail;
    // }
    productObj.totalProductPrice = parseFloat(productObj.retailWithDiscount.toFixed(2));
    productObj.taxAmountOnProduct = (productObj.retailWithDiscount * this.taxPercent) / 100;

    // this will help me to set default quantity by for each product.
    if (productObj.saleQuantity <= 0 || productObj.saleQuantity == undefined) {
      productObj.saleQuantity = 1;
    }
    console.log("Product Object for return sale", productObj);
    this.transactionLineItemDaoList.push(productObj);
    this.product = null;
    this.productForSearchBox = null
    this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    this.setTransactionDtoList(this.transactionLineItemDaoList)
    //this.persit.setProducts(this.transactionLineItemDaoList);
    return this.transactionLineItemDaoList;
  }

  setTransactionDtoList(lineItem: TransactionLineItemDaoList[]) {
    console.log('line item in settransaction', lineItem);
    let totalQuantity: number = 0;
    let totalPrice: number = 0.00;
    let tax: number = 0.00;
    let totalLineItemDiscount: number = 0.00;
    this.transactionDtoList.totalAmount = 0.00;

    lineItem.forEach((item) => {
      totalQuantity = +item.saleQuantity + totalQuantity;
      totalPrice = +item.totalProductPrice + totalPrice;
    })

    this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
    this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
    this.transactionDtoList.tax = ((this.transactionDtoList.subtotal * this.taxPercent / 100));
    this.transactionDtoList.totalAmount = +this.transactionDtoList.totalAmount + this.transactionDtoList.subtotal + this.transactionDtoList.tax

    // This logic helps to manage main payment button enable or diable.
    if (this.transactionDtoList.totalAmount == 0) {
      this.disablePaymentButtonOnSale = true;
    }
    else {
      this.disablePaymentButtonOnSale = false;
    }

    // These for sale page pop -- First row.
    this.payAmountTextBox = this.transactionDtoList.totalAmount;
    this.dueAmountForTransaction = this.transactionDtoList.totalAmount;

  }
  submitCustomer(a: any) {

    this.customerService.getCustomerDetailsByPhoneNo(a.phoneNo)
    .subscribe((customer)=>{
      this.selectedCustomer = customer;
      if (this.selectedCustomer.type == 'Business') {
        this.taxPercent = 0;
      }

    this.sellService.getProductPriceByCustomer(this.selectedCustomer.phoneNo)
    .subscribe((productPrice) => {
      this.productPriceArryByCustomer = productPrice;
    });
  console.log('customer', this.selectedCustomer);
    })
    
  }
  removeCustomerOnSale() {
    this.selectedCustomer = null;
    this.cust = null;
  }
  // This methode calls when user click on the payment button.
  setDataForPaymentModel() {
    // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
    this.payAmountTextBox = this.dueAmountForTransaction;
    this.disablePaymentButtons = false;
    this.disablePaymentButtonsWithAmount = false;
    this.disableCompleteSaleButton = true;
    // Because in return, thats only way to give return, other then real payment
    this.disableStoreCreditButtons = this.selectedCustomer == null;
  }

  deleteProduct() {
    console.log("inside delete");
    let index = this.transactionLineItemDaoList.indexOf(this.selectedProduct, 0);
    console.log("index", index);
    if (index > -1) {
      this.transactionLineItemDaoList.splice(index, 1);
      this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
      this.setTransactionDtoList(this.transactionLineItemDaoList);
      this.persit.setProducts(this.transactionLineItemDaoList);
    }
  }
  setPaymentDtoForRetun(paymentType: any, paymentAmount: any) {

    let paymentDaoObj = new PaymentDao();

     if (paymentType == 'CASH') {
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'CASH', 'paymentAmount': paymentAmount });
      paymentDaoObj.amount = paymentAmount;
      paymentDaoObj.type = 'CASH';
      this.paymentDaoList.push(paymentDaoObj);
      this.validatePaymentForReturn();
    }
    if (paymentType == 'CREDIT') {
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'CREDIT', 'paymentAmount': paymentAmount });
      paymentDaoObj.amount = paymentAmount;
      paymentDaoObj.type = 'CREDIT';
      this.paymentDaoList.push(paymentDaoObj);
      this.validatePaymentForReturn();
    }
    if (paymentType == 'CHECK') {
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'CHECK', 'paymentAmount': paymentAmount });
      paymentDaoObj.amount = paymentAmount;
      paymentDaoObj.type = 'CHECK';
      this.paymentDaoList.push(paymentDaoObj);
      this.validatePaymentForReturn();
    }
    if (paymentType == 'STORE CREDIT') {
      paymentAmount = Math.abs(paymentAmount);
      this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'STORE CREDIT', 'paymentAmount': paymentAmount });
      paymentDaoObj.amount = paymentAmount;
      paymentDaoObj.type = 'STORE CREDIT';
      this.paymentDaoList.push(paymentDaoObj);
      this.validatePaymentForReturn();
    }
    
    // if (paymentType == 'Cash') {
    //   this.paymentDto.cash = paymentAmount;
    //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount })
    //   this.validatePaymentForReturn();
    // }
    // else if (paymentType == 'Credit') {
    //   this.paymentDto.credit = paymentAmount;
    //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount })
    //   this.validatePaymentForReturn();
    // }
    // else if (paymentType == 'Debit') {
    //   this.paymentDto.debit = paymentAmount;
    //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount })
    //   this.validatePaymentForReturn();
    // }
    // else if (paymentType == 'Check') {
    //   this.paymentDto.checkAmount = paymentAmount;
    //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount })
    //   this.validatePaymentForReturn();
    // }
    // else if (paymentType == 'StoreCredit') {
    //   // Converting negative amount to positive so i can add this amount in backend.
    //   this.paymentDto.storeCredit = Math.abs(paymentAmount);
    //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': paymentAmount })
    //   this.disableStoreCreditButtons = true;
    //   this.validatePaymentForReturn();
    // }
    // else if (paymentType == 'OnAccount') {
    //   // Converting negative amount to positive so i can add this amount in backend.
    //   this.paymentDto.onAccount = Math.abs(paymentAmount);
    //   this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'OnAccount', 'paymentAmount': paymentAmount })
    //   this.disableOnAccountButtons = true;
    //   this.validatePaymentForReturn();
    // }

  }
  setHeaderAndMessageForDisgardPopup() {
    this.popupHeader = 'Discard Sale';
    this.popupMessage = 'Are You Sure You Want To Delete Complete Sale?';
  }

  getAllProductVariant(){
    this.productService.getAllProductVariant();
    this._subscriptionProductVariant = this.productService.productVariantListChange.subscribe((variant)=>{
      this.productVariantList = variant;
      this.productPopupVariantList = this.productPopupVariantList.slice();
    })
  }
  //This methode will completly remove the all transaction line item and transaction details.
  disgardCompleteSale() {
    this.transactionLineItemDaoList = [];
    // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
    this.selectedCustomer = null;
    this.setTransactionDtoList([]);
  }

  validatePaymentForReturn() {
    console.log('duw amount', this.dueAmountForTransaction)
    this.disablePaymentButtons = true;
    this.disableCompleteSaleButton = false;
    this.disableOnAccountButtons = true;
    this.disableStoreCreditButtons = true;
    this.dueAmountForTransaction = 0.00;
  }
  // This method helps to delete payment type and recaculate all other parameters.
  deletePaymentFromPaymentModel(payment: PaymentObjectForPaymentSellTable) {
    let index = this.paymentObjectForPaymentSellTable.indexOf(payment);
    if (index > -1) {
      this.paymentObjectForPaymentSellTable.splice(index, 1);
      this.dueAmountForTransaction = payment.paymentAmount;
      this.payAmountTextBox = this.dueAmountForTransaction;
      this.disablePaymentButtons = false;
      this.disableCompleteSaleButton = true;
      // Because in return, thats only way to give return, other then real payment
      this.disableStoreCreditButtons = this.selectedCustomer == null;
    }
  }

  clearAllDateAfterTransactionComplete() {
    // This is important to handle when user clock on Close button from payment popup, we need to clear data only when transaction is completed ottherwise just need to close the popup.
    if (null != this.printTransactionDto) {
      // Very importa can not assign to null
      this.selectedCustomer = null;
      this.paymentObjectForPaymentSellTable = [];
      // This is payment button on the sale page, i need to do this because there is not data in sale table,
      this.disablePaymentButtonOnSale = true;
      this.transactionLineItemDaoList = [];
      this.setTransactionDtoList(this.transactionLineItemDaoList);
      this.paymentDaoList = [];
      this.transactionNotes = '';
      this.disableStoreCreditButtons = true;
      this.taxPercent = this.storeDetails.tax;

      this.printTransactionDto = null;

    }

    else {
      console.log('just close the model.')
    }
  }

  manageTaxForTransaction() {
    // this mean user is doing 0 % on sale page
    if (this.taxPercent > 0) {
      this.taxPercent = 0.00;
    }
    else {
      this.taxPercent = this.storeDetails.tax;
    }
    
    //this.setTransactionDtoList();
  }


  returnSale(rma?:boolean) {

    this.transactionDtoList.status = 'Return';
    this.transactionDtoList.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // setting customer details
    if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
      this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
      this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
      this.transactionDtoList.previousBalance = this.selectedCustomer.balance;
    }
    // Setting payment dto into transaction dto, because can not send both as @request body mfrom angular..
    this.transactionDtoList.paymentDao = this.paymentDaoList;
    // Setting TransactionLineItemDetails
    for (let lineItem of this.transactionLineItemDaoList) {
      lineItem.status = 'Return';
      lineItem.date = this.transactionDtoList.date;
    }
    for (let payment of this.paymentDaoList) {
      payment.status = 'Return';
      payment.date = this.transactionDtoList.date;
    }
    this.transactionDtoList.note = this.transactionNotes
    this.transactionDtoList.rma = rma;
    // To do need to fix this hardcoded value for username
    this.transactionDtoList.username = 'alok@alok.com';
    this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;
    // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
    this.sellService.addTransactionDetails(this.transactionDtoList)
      .subscribe(
        data => {
          this.disableCompleteSaleButton = true;
          this.printTransactionDto = data.json();
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
  }

  printReciept() {
    this.sellService.printReceipt(this.printTransactionDto);
    this.clearAllDateAfterTransactionComplete();
    $('#paymentModel').modal('toggle');
  }

  filterProducts(event) {
    let query = event.query;
    this.productService.getProductDetailsFromBackEnd()
      .subscribe((products: Product[]) => {
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
  setProductForDelete(product: Product) {
    this.selectedProduct = product;
    this.popupHeader = 'Delete Product';
    this.popupMessage = 'Are You Sure You Want To Delete Product?';
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
      if(cust != undefined && cust.companyName != null && cust.companyName != undefined)
      if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
        filtered.push(cust);
      }
    }
    return filtered;

  }

  getCustomerDetails() {

    this.customerService.getCustomerDetails();
    this._subscriptionCustomer = this.customerService.customerListChange
    .subscribe((cust)=>{
      this.customerDto = cust;
      this.customerDto = this.customerDto.slice();
    });
  }
  ngOnDestroy() {
    //prevent memory leak when component destroyed
     this._subscriptionCustomer.unsubscribe();
    //  this._subscriptionProduct.unsubscribe();
   }

}

