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
      import { Customer, CustomerInterface, PrimeCustomer } from 'app/customer/customer.component';
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
        productForSearchBox: any;
        selectedProduct: Product;
        isProductExistsInSellList = false;
        productPriceArryByCustomer: Array<any[]>;

        customerDto: PrimeCustomer[];
        selectedCustomer: Customer;
        cust: any;
        filteredCustomer: any[];
  
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

        constructor(
          private sellService: SellService,private persit: PersistenceService,private productService: ProductService,private storeSetupService: StoreSetupService,private customerService: CustomerService,private sanitizer: DomSanitizer,private route: ActivatedRoute,private router: Router,private toastr: ToastsManager)
          {}
        ngOnInit() {
          
          this.items = [
            { name: 'Return', icon: 'fa fa-reply-all fa-x', link: '/return' },
            { name: 'Purchase Order', icon: 'fa fa-bookmark fa-x', link: '/sell/purchaseOrder' }
          ];

            this.storeSetupService.getStoreDetails().
            then((data) => {
              this.storeDetails = data;
              if(this.selectedCustomer != null && this.selectedCustomer.type == 'Business'){
                this.taxPercent = 0.00;
              }
              else{
                this.taxPercent = this.storeDetails.tax;
              }
            });

          let transactionComId = this.route.snapshot.paramMap.get('transactionComId');
          if (transactionComId) {
            this.handleParkedTransactionFromSalesHistory(transactionComId);
          }
          
          this.getCustomerDetails();
          this.selectedCustomer = this.persit.getCustomerDetailsForSale();

        // This will help to get customer product price, cause its cusotmer is selected then definetly the price is stored in local storage.
        if(this.selectedCustomer){
          this.productPriceArryByCustomer = this.persit.getCustomerProductPriceForSale();
        }

          this.transactionLineItemDaoList = this.persit.getProducts() || [];
          // this will show transaction data on right side on refresh or on load of the page
          
          this.setTransactionDtoList();
        }

        ngAfterViewInit() {
          // This will focus on the autocomplete field
            $('#productsearch > span > input').focus();
        }

        openSellCustomerView(){
          let url =  '/sell-customer'; 
          window.open(url, '_blank',  'toolbar=0,location=0,menubar=0');
        }


        public addTransactionLineItem(productObj: Product): TransactionLineItemDaoList[] {

          // Price by customer logic.
          if(null != this.selectedCustomer && this.selectedCustomer != undefined){
            if(this.productPriceArryByCustomer && null != this.productPriceArryByCustomer && this.productPriceArryByCustomer.length > 0){

              this.productPriceArryByCustomer.forEach((product) =>{
                // here product[1] is the product no coming from back end, i am sending only 2 values prodcut no and retail.  like this--->["23424234234", 12.99]
                if(product[0] == productObj.productNo){
                  productObj.retailWithDiscount = product[1];
                }})
            }
          }
          // This will help to add retailWithDiscount first time when user add the first line item
          if(productObj.retailWithDiscount <= 0){
            productObj.retailWithDiscount = productObj.retail;
          }
      // this will help me to set default quantity by for each product.
          if(productObj.saleQuantity <= 0){
            productObj.saleQuantity = 1;
          }
          // This is fisrt time when user is adding product to sell.
          if (this.transactionLineItemDaoList.length == 0) {

            productObj.totalProductPrice = parseFloat(productObj.retailWithDiscount.toFixed(2));
            productObj.taxAmountOnProduct = (productObj.retailWithDiscount * this.taxPercent) / 100;

            this.transactionLineItemDaoList.push(productObj);
            this.product = null;
            this.productForSearchBox = null
            this.transactionLineItemDaoList[this.transactionLineItemDaoList.length -1].retailWithDiscount = productObj.retailWithDiscount; 
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
              if(!this.isProductExistsInSellList) {
                this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
                productObj.totalProductPrice = productObj.retailWithDiscount * productObj.saleQuantity;
                productObj.taxAmountOnProduct = parseFloat(((productObj.retailWithDiscount * this.taxPercent) / 100).toFixed(2));
                this.transactionLineItemDaoList.push(productObj);
                this.product = null;
                this.productForSearchBox = null
                this.transactionLineItemDaoList[this.transactionLineItemDaoList.length -1].retailWithDiscount = productObj.retailWithDiscount; 
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

        submitProduct(value: any) {
      
          // if(this.p.length > 8){

          //   this.product.forEach((p)=>{

          //     if(p.productNo == this.p)
          //     {
          //       this.addTransactionLineItem(value);
          //     }
          // })
          //   console.log("ok found wiht scanner");
          // }

          if (typeof value === 'string') {
            if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
              if (value.match(/[a-z]/i))
              {
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
          this.transactionLineItemDaoList[event.index].totalProductPrice = Math.round((event.data.saleQuantity * event.data.retailWithDiscount) * 1e2)/ 1e2;
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
          else if(this.discountType == 'By Percentage'){
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

          this.transactionLineItemDaoList.forEach((lineItem) =>{
            totalQuantity = +lineItem.saleQuantity +totalQuantity;
            totalPrice = +lineItem.totalProductPrice +totalPrice;
          })

          this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
          this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
          let totalAfterDiscount: number = this.transactionDtoList.subtotal - this.totalTransactionDiscount;
          this.transactionDtoList.tax = ((totalAfterDiscount * this.taxPercent/ 100));
          this.transactionDtoList.totalAmount = +totalAfterDiscount +this.transactionDtoList.tax;

          // This logic helps to manage main payment button enable or diable.
          if (this.transactionDtoList.totalAmount == 0) {
            this.disablePaymentButtonOnSale = true;
          }
          else {
            this.disablePaymentButtonOnSale = false;
          }
        }

        submitCustomer() {
          if(this.selectedCustomer.type == 'Business'){
            this.taxPercent = 0.00;
          }
          this.persit.setCustomerDetailsForSale(this.selectedCustomer);

          this.sellService.getProductPriceByCustomer(this.selectedCustomer.phoneNo)
          .subscribe((productPrice) => {
            this.productPriceArryByCustomer = productPrice;
            this.persit.setCustomerProductPriceForSale(this.productPriceArryByCustomer);
          });
        }

        removeCustomerOnSale() {
          this.persit.clearCustomer();
          this.persit.clearCustomerPriceForSale();
          this.selectedCustomer = null;
          this.cust = null;
          this.taxPercent = this.storeDetails.tax;
        }

        // This methode helps to show pending invoice pop for customer.
        openPendingInvoice(customer: Customer){
          this.sellService.getPendingInvoiceByCustomer(customer.phoneNo)
          .subscribe(transaction => {
            transaction.forEach(trans => {
              trans.time = moment(trans.date).format('hh:mm A');
              trans.date = moment(trans.date).format('MM-DD-YYYY');
            })
            this.transactionDetails = transaction;
          });
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
            }
            else if (paymentType == 'Loyalty') {
              this.paymentDto.loyalty = paymentAmount;
            }
        }

        validatePaymentButtons(paymentAmount: number) {

          let totalPaidAmout = 0.00;

          // This means cutomer has paid full amount.
          if (this.dueAmountForTransaction - paymentAmount <= 0) {
            this.dueAmountForTransaction = this.dueAmountForTransaction - paymentAmount;
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
            this.dueAmountForTransaction = this.dueAmountForTransaction - paymentAmount;
            this.payAmountTextBox = this.dueAmountForTransaction;
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

        // This method helps to take payment when customer is trying to pay for pending invoice.
        setDataForPaymentModelForPendingInvoice(transaction: TransactionDtoList) {
          console.log("inside the pending payment logic");
          // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
          this.transactionDtoList = transaction;
          this.transactionLineItemDaoList = transaction.transactionLineItemDaoList;
          this.setTransactionDtoList();
          this.payAmountTextBox = transaction.totalAmount;
          this.disablePaymentButtons = false;
          this.disablePaymentButtonsWithAmount = false;
          this.disableCompleteSaleButton = true;

          this.disableOnAccountButtons = this.selectedCustomer == null;
          this.disableStoreCreditButtons = true;
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
                console.log('Inside On account for delete')
              }
            }

            // This is because of type script,  + it concatting the two variables.  DO NOT FORGET THIS. 
            this.dueAmountForTransaction = +payment.paymentAmount + this.dueAmountForTransaction;
            this.payAmountTextBox = Math.round(this.dueAmountForTransaction * 1e2)/ 1e2;
          
          if (this.dueAmountForTransaction > 0) {
            this.disableCompleteSaleButton = true;
            this.disablePaymentButtons = false;
            this.disablePaymentButtonsWithAmount = false;
          }
        }
        // This is the method which handle completing the transaction and reset the all flag and other data.
        completeSale() {


          let totalLineItemDiscount: number = 0.00
          console.log('sales type', this.saleType);
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
          // Setting payment dto into transaction dto, because can not send both as @request body mfrom angular..
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
            if(lineItem.retailWithDiscount < lineItem.retail)
            {
              lineItem.discount = (lineItem.retail - lineItem.retailWithDiscount) * lineItem.saleQuantity;
              totalLineItemDiscount = + ((lineItem.retail - lineItem.retailWithDiscount)*lineItem.saleQuantity) + totalLineItemDiscount;
            }
            }
          // Seeting paymentDto status

          for(let payment of this.paymentDao){
            payment.status = this.saleType;
          }

          // this.transactionNotes is bind with the ng model on ui.
          this.transactionDtoList.note = this.transactionNotes

          // To do need to fix this hardcoded value for username
          this.transactionDtoList.username = 'alok@alok.com';
          this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;
          this.transactionDtoList.totalDiscount = + this.transactionDtoList.totalDiscount + totalLineItemDiscount;

          // I am doing this to show subtotal without line item discount, so in invoice customer wont get confuse.
          // 
          this.transactionDtoList.subtotal =  this.transactionDtoList.subtotal + this.transactionDtoList.totalDiscount;



          // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
          this.sellService.addTransactionDetails(this.transactionDtoList)
          .subscribe(
            data => {
              this.printTransactionDto = data.json();
              if(this.saleType == 'Park')
              {
                this.toastr.success('Parked Transaction Successfully', 'Success!');
                this.clearAllDateAfterTransactionComplete();
          
              }
            this.disableCompleteSaleButton = true;
            console.log('addTransaction response',data);
            console.log('printTransaction dao',this.printTransactionDto);
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
          if(null != this.printTransactionDto )
          {
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
        }


        // TODO< NEED TO CHECK AND UNDERSTAND AGAIN.
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
                    //this.previousTransactionId = transaction.transactionComId;
                    
                            this.persit.setProducts(transaction.transactionLineItemDaoList);
                    
                            this.transactionLineItemDaoList = this.persit.getProducts() || [];
                        
                            console.log('lineItem for parkSale', this.transactionLineItemDaoList);
                    
                            // Setting customer details to manage store credit and onAccount/ Loylty functionality
                            if (transaction.customerPhoneno != null && transaction.customerPhoneno != undefined && transaction.customerPhoneno.length > 0) {

                              this.selectedCustomer = new Customer();

                              this.customerService.getCustomerDetailsByPhoneNo(transaction.customerPhoneno)
                                .subscribe((customer: Customer) => {

                                  this.selectedCustomer = customer;

                                  if(customer.type == 'Business')
                                  {
                                    this.taxPercent = 0;
                                  }
                                  console.log('Customer details from backend', customer);
                                });
                                
                              console.log('Customer detils for park sale', this.selectedCustomer);
                              this.persit.setCustomerDetailsForSale(this.selectedCustomer);
                              this.selectedCustomer = this.persit.getCustomerDetailsForSale();

                              // TODO NEED TO CHECK HOW THIS WILL WORK
                              this.productPriceArryByCustomer = this.persit.getCustomerDetailsForSale();
                              }

                              this.setTransactionDtoList();
            })
        }

        printReciept() {
          this.sellService.printReceipt(this.printTransactionDto);
          this.clearAllDateAfterTransactionComplete();
          $('#paymentModel').modal('toggle');
        }

        public getCustomerDetails() {
          this.customerService.getCustomerDetails()
            .subscribe((customer: Customer[]) => {
              this.customerDto = customer;
            });
        }
    

        manageTaxForTransaction(){
          // this mean user is doing 0 % on sale page
          if(this.taxPercent > 0){
            this.taxPercent = 0.00;
          }
          else{
            this.taxPercent = this.storeDetails.tax;
          }
          this.setTransactionDtoList();

        }

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
            if (p.description.toLowerCase().includes(query.toLowerCase()) || p.productNo.includes(query)) {
              filtered.push(p);
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

        filterCustomer(query, customers: PrimeCustomer[]): PrimeCustomer[] {
          let filtered: PrimeCustomer[] = [];
          for (let i = 0; i < customers.length; i++) {
            let cust = customers[i];
            if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
              filtered.push(cust);
            }
          }
          return filtered;

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
      }


      export class Product {
        productNo: string;
        // productVariantNo: number;
        description: string;
        categoryId: number;
        brandId: number
        vendorId: number;
        modelId: number;
        alternetNo: string;
        cost: number;
        retail: number;
        markup: number;
        quantity: number;
        minQuantity: number;
        tax: boolean;
        varaint: boolean;
        active: boolean;
        ecommerce: boolean;
        relatedProduct: boolean;
        // defaultQuantity = 1;
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
        productInventoryDaoList: ProductInventory[];
        operationType?:string;
      }
      export class TransactionLineItemDaoList {

        productNo: string;
      // productVariantNo: number;
        cost: number;
        retail: number;
        // actualRetail?: number;
        saleQuantity: number;
        // defaultQuantity: number;
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
        date: any;
        time: any;
        totalAmount: number;
        tax: number;
        totalDiscount: number = 0.00;
        subtotal: number;
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
      }

      export class PaymentDto {
        transactionComIdFk: number;
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