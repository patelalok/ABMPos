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
import { Product, TransactionLineItemDaoList, TransactionDtoList, PaymentDto, PaymentObjectForPaymentSellTable } from 'app/sell/sale/sale.component';
import { PersistenceService } from 'app/shared/services/persistence.service';
declare var $: JQueryStatic;

@Component({
  selector: 'app-return-sale',
  templateUrl: './return-sale.component.html',
  styleUrls: ['./return-sale.component.scss']
})
export class ReturnSaleComponent implements OnInit, AfterViewInit { 
  // @HostBinding('@fadeInAnimation') fadeInAnimation;
  product: Product[];
  customerDto: PrimeCustomer[];
  cust: any;

  p: any;
  filteredCustomer: any[];
  isProductExistsInSellList = false;
  transactionLineItemDaoList: TransactionLineItemDaoList[] = [];
  transactionDtoList = new TransactionDtoList();
  paymentDto = new PaymentDto();
  a = 'sdfds';
  selectedProduct: Product;
  selectedCustomer: Customer;

  cols: any[];

  filteredCountriesSingle: any[];
  storeDetails: StoreSetupDto;

  popupHeader: string;
  popupMessage: string;
  showCustomerDetails = false;
  payAmountTextBox: number;
  discountType: string;
  discountTexBox: number;
  // disableCustomerSearchTextbox: boolean = false;

  // paymentObjectForPaymentSellTable = new Array <PaymentObjectForPaymentSellTable[]>();
  paymentObjectForPaymentSellTable: PaymentObjectForPaymentSellTable[] = [];

  dueAmountForTransaction: number;

  // this variable helps to manage transaction amount and dueamount for transaction.
  tempTransactionAmountForSale: number;

  // This help when customer has paid full amount, so now user should not able to click on any payment button.
  // These both buttons are on payment page pop up.
  disablePaymentButtons: boolean = false;
  disablePaymentButtonsWithAmount = false;
  disableCompleteSaleButton: boolean = true;

  payLable: string = 'Pay:';
  amountDueLable: string = 'Amount Due:';
  paymentDao: PaymentDto[] = [];

  // This button is on sale page, not on pyament popup page.
  paymentButtonOnSale: boolean = true;
  transactionNotes: string = '';

  disableOnAccountButtons: boolean = true;
  disableStoreCreditButtons: boolean = true;

  saleType: string = 'Complete';
  // This is useful in case of return where user gives store credit, i need oldtransactionId to store in store credit table as reason.
  previousTransactionId: any;

printTransactionDto: TransactionDtoList = null;

  constructor(
    private sellService: SellService, 
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

    this.storeSetupService.getStoreDetails().
    then((data) => {
      this.storeDetails = data;
    });

        // This call is to get all customer details.
        this.getCustomerDetails();

        this.cols = [
          { field: 'productNo', header: 'ProductNo' },
          { field: 'description', header: 'Description' },
          { field: 'retail', header: 'Retail' },
          { field: 'defaultQuantity', header: 'Quantity' },
          { field: 'retailDiscount', header: 'RetailWithDis' },
          { field: 'totalProductPrice', header: 'Total' },
          { field: 'quantity', header: 'In-Stock' }
        ];

  }

  ngAfterViewInit() {
    
        // This will focus on the autocomplete field
        $('#productsearch > span > input').focus();
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

        // This method helps when user try to change retial price or quanity from the sell text box.
  submitProduct(value: any) {
    
        if (typeof value === 'string') {
    
          console.log('This is value: ', value);
    
          // this is the senario where user is adding new product to Sell
          if (this.product != null && this.product.length > 0) {
            // this.addTransactionLineItem(this.product[0]);
          }
    
          // Dont understabd this
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
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity = value;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity).toFixed(2));
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList)
        //this.persit.setProducts(this.transactionLineItemDaoList);
        this.p = null;
      }
    
      updateProductPrice(value: any) {
        console.log('Price change');
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail = value;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList)
    
        //this.persit.setProducts(this.transactionLineItemDaoList);
        this.p = null;
      }
    
      // this method helps to update lineItem Detail when user change the quatity or change the retail from editable box
      updateLineItemDetails(event) {
        this.transactionLineItemDaoList[event.index].defaultQuantity = event.data.defaultQuantity;
        this.transactionLineItemDaoList[event.index].retail = event.data.retail;
        this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.defaultQuantity * event.data.retail);
        this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.defaultQuantity * event.data.retail) * 7) / 100
        this.setTransactionDtoList(this.transactionLineItemDaoList)
    
        //this.persit.setProducts(this.transactionLineItemDaoList);
      }

      public addTransactionLineItem(productObj: Product): TransactionLineItemDaoList[] {

              productObj.cost = - productObj.cost;
              productObj.retail = - productObj.retail;
        
              productObj.totalProductPrice = parseFloat(productObj.retail.toFixed(2));
              productObj.taxAmountOnProduct = (productObj.retail * 7) / 100;
        
        
              console.log("when add product", productObj);
              this.transactionLineItemDaoList.push(productObj);
              this.product = null;
              this.p = null
        
              this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
              this.setTransactionDtoList(this.transactionLineItemDaoList)
              // This will save the data into local storage.
              //this.persit.setProducts(this.transactionLineItemDaoList);
            return this.transactionLineItemDaoList;
        
        
          }

          setTransactionDtoList(lineItem: TransactionLineItemDaoList[]) {
            let totalQuantity = 0;
            let totalPrice = 0.00;
            let tax: number = 0.00;
        
            if (this.selectedCustomer && this.saleType == 'Complete') {
              this.transactionDtoList.totalAmount = this.selectedCustomer.balance
            }
            else {
              this.transactionDtoList.totalAmount = 0.00;
            }
        
        
            for (let i = 0; i < lineItem.length; i++) {
              totalQuantity = + lineItem[i].defaultQuantity + totalQuantity;
              totalPrice = + lineItem[i].totalProductPrice + totalPrice;
        
              // Here totalProductPriceWithTax mean, only amount of the tax on that product dont get confuse with naming
              tax = + (lineItem[i].totalProductPrice * 7) / 100 + tax;
              console.log("totalQuantity", totalQuantity);
              console.log("totalPrice", totalPrice);
              console.log("totalTax", tax);
            }
        
        
            this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
            this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
            this.transactionDtoList.tax = parseFloat(tax.toFixed(2));
            this.transactionDtoList.totalAmount = this.transactionDtoList.totalAmount + parseFloat(((totalPrice) + tax).toFixed(2));
        
            
        
            // This logic helps to manage main payment button enable or diable.
            if (this.transactionDtoList.totalAmount == 0) {
              this.paymentButtonOnSale = true;
            }
            else {
              this.paymentButtonOnSale = false;
            }
        
            // These for sale page pop -- First row.
            this.payAmountTextBox = this.transactionDtoList.totalAmount;
            this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
        
          }

          public getCustomerDetails() {
            
                this.customerService.getCustomerDetails()
                  .subscribe((customer: Customer[]) => {
                    this.customerDto = customer;
                  });
              }

              setProductForDelete(product: Product) {
                this.selectedProduct = product;
                this.popupHeader = 'Delete Product';
                this.popupMessage = 'Are You Sure You Want To Delete Product?';
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
  

  submitCustomer(a: any) {


    this.selectedCustomer = a;
    // this.cust = null;
    // this.disableCustomerSearchTextbox = true;


    // Storing customer detials into local storage.
    //this.persit.setCustomerDetailsForSale(this.selectedCustomer);

    // Need to do this to add balance into transaction details
    //this.setTransactionDtoList(this.transactionLineItemDaoList);

    console.log('customer', this.selectedCustomer);
  }
    // This will remove the customer from local storage.
    removeCustomerOnSale() {
      
          //this.persit.clearCustomer();
          this.selectedCustomer = null;
          this.cust = null;
          // this.disableCustomerSearchTextbox = false;
          //this.setTransactionDtoList(this.transactionLineItemDaoList);
      
        }

          // This methode calls when user click on the payment button.
  setDataForPaymentModel() {
    
    
    
        // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
        this.payAmountTextBox = this.dueAmountForTransaction;
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
        console.log("selected customer", this.selectedCustomer);
    
        console.log("inside the set data");
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
        this.payLable = 'Return';
        this.amountDueLable = 'Return Amount:';
    
    
        if (paymentType == 'Cash') {
    
          this.paymentDto.cash = paymentAmount;
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount })
          this.validatePaymentForReturn();
        }
        else if (paymentType == 'Credit') {
    
          this.paymentDto.credit = paymentAmount;
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount })
          this.validatePaymentForReturn();
        }
        else if (paymentType == 'Debit') {
    
          this.paymentDto.debit = paymentAmount;
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount })
          this.validatePaymentForReturn();
        }
        else if (paymentType == 'Check') {
    
          this.paymentDto.checkAmount = paymentAmount;
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount })
          this.validatePaymentForReturn();
        }
    
        else if(paymentType == 'StoreCredit')
        {
          // Converting negative amount to positive so i can add this amount in backend.
          this.paymentDto.storeCredit = Math.abs(paymentAmount);
          this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': paymentAmount })
          this.disableStoreCreditButtons = true;
          this.validatePaymentForReturn();
        }
    
    
      }
      setHeaderAndMessageForDisgardPopup() {
        this.popupHeader = 'Discard Sale';
        this.popupMessage = 'Are You Sure You Want To Delete Complete Sale?';
      }
      //This methode will completly remove the all transaction line item and transaction details.
  disgardCompleteSale() {
    
        this.transactionLineItemDaoList = [];
    
        // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
        this.selectedCustomer = null;
    
        this.setTransactionDtoList([]);
      }
    
    
      validatePaymentForReturn() {
    
        this.disablePaymentButtons = true;
        this.disableCompleteSaleButton = false;
    
    
      }

      clearAllDateAfterTransactionComplete() {
        
        
            // This is important to handle when user clock on Close button from payment popup, we need to clear data only when transaction is completed ottherwise just need to close the popup.
            if(null != this.printTransactionDto)
            {
          
              // Very importa can not assign to null
              this.paymentDto = new PaymentDto();
          
              this.selectedCustomer = null;
              // this.disableCustomerSearchTextbox = false;
          
              this.paymentObjectForPaymentSellTable = [];
              // This is payment button on the sale page, i need to do this because there is not data in sale table,
              this.paymentButtonOnSale = true;
          
          
              this.transactionLineItemDaoList =  [];
              this.setTransactionDtoList(this.transactionLineItemDaoList);
              this.paymentDao = [];
          
              // Need set it null cause its showing in next transaction also.
              this.transactionNotes = '';
          
              // very important cause this will give problem after doing return transaction so, after any transactoin i need to do this.
             this.saleType = 'Complete';
             this.disableStoreCreditButtons = true;
          
             this.printTransactionDto = null;
            }
        
            else {
              console.log('just close the model.')
            }
        
        
        
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
        }
      }


          returnSale() {

            this.transactionDtoList.status = 'Return';
            this.transactionDtoList.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            
            

    // setting customer details
    if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
      this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
      this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
      this.transactionDtoList.previousBalance = this.selectedCustomer.balance;

    }

      // Setting payment dto into transaction dto, because can not send both as @request body mfrom angular..
      this.paymentDto.date = this.transactionDtoList.date;
      this.paymentDao.push(this.paymentDto);
      this.transactionDtoList.paymentDao = this.paymentDao;

          // Setting TransactionLineItemDetails
    for (let lineItem of this.transactionLineItemDaoList) {
      
            lineItem.status = this.saleType;
            lineItem.date = this.transactionDtoList.date;
            // I need to do this casue in backend i am using quantity and here i have to use defult quanity to show 1 as user insert product.
            lineItem.quantity = lineItem.defaultQuantity;
          }
      
          // this.transactionNotes is bind with the ng model on ui.
          this.transactionDtoList.note = this.transactionNotes
      
          // To do need to fix this hardcoded value for username
          this.transactionDtoList.username = 'alok@alok.com';
          this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;


    // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
    this.sellService.addTransactionDetails(this.transactionDtoList)
    .subscribe(
      data => {
      // alert('ok');
      this.disableCompleteSaleButton = true;
      this.printTransactionDto = data.json();
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

    
      printReciept(){
    
        this.sellService.printReceipt(this.printTransactionDto);
        this.clearAllDateAfterTransactionComplete();
        $('#paymentModel').modal('toggle');
      }
    
}

