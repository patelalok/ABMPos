package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.ReceiptFormatter;
import com.abm.pos.ABMPos.dao.*;
import com.abm.pos.ABMPos.repository.*;
import com.abm.pos.ABMPos.util.Utility;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;

import org.thymeleaf.context.Context;

import jpos.JposException;
import jpos.POSPrinter;
import jpos.CashDrawer;
import jpos.POSPrinterConst;
import jpos.util.JposPropertiesConst;



/**
 * Created by apatel2 on 5/18/17.
 */
@Component
public class TransactionsManager {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private Utility utility;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductInventoryRepository productInventoryRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StoreCreditRepository storeCreditRepository;

    @Autowired
    private CustomerManager customerManager;

    @Autowired
    private EmailHtmlSender emailHtmlSender;

    @Autowired
    private StoreSetupRepository storeSetupRepository;

    private BaseFont bfBold;
    private BaseFont bf;
    private int pageNumber = 0;


    public TransactionDao addTransaction(TransactionDao transactionDao) {

        assert transactionDao != null;
        if (transactionDao.getStatus().equalsIgnoreCase("Complete") || transactionDao.getStatus().equalsIgnoreCase("Pending")) {

            List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();
            List<TransactionLineItemDao> transactionLineItemDaoListNew = new ArrayList<>();
            transactionLineItemDaoList = transactionDao.getTransactionLineItemDaoList();

            if (transactionDao.getTransactionComId() == 0 || transactionDao.isParkSale()) {

                // Very important to do this other this will create problem again
                transactionDao.setParkSale(false);
                for (TransactionLineItemDao lineItemDao : transactionLineItemDaoList) {

                    // I need to set this up to keep track of the inventory, so with this i will know, whether i need to call Product inventory table again or not.
                    // So with first call if parchedQuantity == 0 that mean we can full fill this sale we do not need to check for other inventory for this product but if not
                    // Then we need to keep doing this process until parched Quantity == 0.
                    int purchasedQuantity = lineItemDao.getSaleQuantity();

                    do {
                        // step 1 : get the product from line item and then get the quantity for that product from inventory table on behalf of created time stamps.
                        ProductInventoryDao productInventoryDao;
                        // This call will give product inventory details on behalf of FIFO.
                        productInventoryDao = productInventoryRepository.findFirstByProductNoOrderByCreatedTimestampAsc(lineItemDao.getProductNo());

                        if (null != productInventoryDao) {
                            // This is best case.
                            if (productInventoryDao.getQuantity() > purchasedQuantity) {

                                // This is Important because i need to set cost price separately that's why i need to do this.
                                lineItemDao.setCost(productInventoryDao.getCost());
                                transactionLineItemDaoListNew.add(lineItemDao);

                                // Here I need to update the Product Inventory Table AS WELL AS PRODUCT TABLE : to keep up with quantity in Product Inventory Table
                                // VERY IMPORT LOGIC.
                                reduceQuantityFromProductInventoryTable(productInventoryDao, productInventoryDao.getQuantity() - purchasedQuantity);
                                purchasedQuantity = 0;
                            }
                            // This means we do not have enough inventory to sale, so we can sale wt we have and then call inventory table again until purchase item == 0.
                            else if (productInventoryDao.getQuantity() > 0) {
                                lineItemDao.setCost(productInventoryDao.getCost());
                                transactionLineItemDaoListNew.add(lineItemDao);
                                purchasedQuantity = purchasedQuantity - productInventoryDao.getQuantity();
                                reduceQuantityFromProductInventoryTable(productInventoryDao, 0);

                                // Also this means in Product Inventory table, inventory of this product is 0
                                // So now we need to delete this row from the table
                                // Here is the interesting this, we can delete this row only, IF IT IS NOT LAST ROW.
                                // IF IT IS LAST ROW THEN WE JUST REDUCE THE QUANTITY AND LET ELSE CONDITION HANDLE IT
                                // THIS CASE HAPPENS WHEN USER HAS NOT UPDATED THE PRODUCT INVENTORY TABLE BUT STILL HE IS TRYING TO SALE THE PRODUCT.

                                deleteProductInventoryRow(productInventoryDao);

                            }
                            // This means we have last entry in product inventory table and user has not updated the quantity.
                            else {
                                // This is Important because i need to set cost price separately that's why i need to do this.
                                lineItemDao.setCost(productInventoryDao.getCost());
                                transactionLineItemDaoListNew.add(lineItemDao);
                                reduceQuantityFromProductInventoryTable(productInventoryDao, productInventoryDao.getQuantity() - purchasedQuantity);

                                purchasedQuantity = 0;
                            }
                        }
                        // TODO need to handle this case  :(
                        else {
                            // Hopefully this logic will work.
                            transactionLineItemDaoListNew.add(lineItemDao);
                            purchasedQuantity = 0;
                            System.out.println("No Inventory details for this product.");
                        }
                    }
                    while (purchasedQuantity != 0);
                }

                transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoListNew);
            }

            // Here i need to handle the case where customer is using Store credit to pay the amount.
            // I need to update the store credit for the customer and handle the transaction.
            if (null != transactionDao.getCustomerPhoneno() && transactionDao.getPaymentDao().get(0).getStoreCredit() > 0) {
                setCustomerStoreCredit(transactionDao);
            }

        } else if (transactionDao.getStatus().equalsIgnoreCase("Return") || transactionDao.getStatus().equalsIgnoreCase("Void")) {


            // Handing store credit here
            // This means user is giving store credit to the customer so i need to add customers store credit with valid reason.
            if (null != transactionDao.getCustomerPhoneno() && null != transactionDao.getPaymentDao()) {

                CustomerDao customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());

                if (transactionDao.getPaymentDao().get(0).getStoreCredit() > 0) {
                    StoreCreditDao storeCreditDao = new StoreCreditDao();

                    storeCreditDao.setAmount(transactionDao.getPaymentDao().get(0).getStoreCredit());
                    storeCreditDao.setCustomerPhoneno(transactionDao.getCustomerPhoneno());
                    storeCreditDao.setEmployeeName(transactionDao.getUsername());
                    storeCreditDao.setReason("Return Credit For Transaction No: " + transactionDao.getTransactionComId());
                    storeCreditDao.setCreatedTimestamp(transactionDao.getDate());

                    storeCreditRepository.save(storeCreditDao);
                    customerDao.setStoreCredit(customerDao.getStoreCredit() + transactionDao.getPaymentDao().get(0).getStoreCredit());
                }

                // finally updating customers account details whether it is store credit or on on account choose by the customer on the
                customerRepository.save(customerDao);
            }

            // This logic helps to delete, all payment date when user return the transaction or void the transaction.
            // I need to do this, because in case of void and return, there will be one row with payment status as complete and if i dont delete it, i will show in reporting,
            // So this is very important logic to implement.
            // This will delete all payment details and at the end i am inserting new payment details for this transaction.
            if (transactionDao.getTransactionComId() != 0) {
                paymentRepository.deletePaymentDetails(transactionDao.getTransactionComId());
            }
        } else if (transactionDao.getStatus().equalsIgnoreCase("Park")) {
            transactionDao.setParkSale(true);
        }


        TransactionDao transactionDao1 = transactionRepository.save(transactionDao);

        // I need to do this because, I am not able to update payment, just payment table becuase of forign key problem.
        // Every time inserting manually.

        List<PaymentDao> paymentDaoList = new ArrayList<>();

        if (transactionDao1.getTransactionComId() != 0) {

            PaymentDao paymentDao;
            paymentDao = transactionDao.getPaymentDao().get(0);

            if (null != paymentDao) {

                // This logic helps when user is returing the transactin by giving store credit to the user, so here i need to store store credit as negative value to show correct reporting.
                if (paymentDao.getStoreCredit() > 0 && transactionDao.getStatus().equalsIgnoreCase("Return")) {
                    // funny logic, i love it.
                    paymentDao.setStoreCredit(paymentDao.getStoreCredit() * -1);
                }
                paymentRepository.insertPaymentDetail(transactionDao.getTransactionComId(),
                        transactionDao.getStatus(),
                        paymentDao.getDate(),
                        paymentDao.getCash(),
                        paymentDao.getCredit(),
                        paymentDao.getDebit(),
                        paymentDao.getCheckAmount(),
                        paymentDao.getStoreCredit(),
                        paymentDao.getLoyalty(),
                        paymentDao.getLayby(),
                        paymentDao.getChangeForCash(),
                        paymentDao.getCreditCardLast4()
                );
            }
//            transactionDao.setPaymentDao(paymentDaoList);

            // paymentDaoList = paymentRepository.findAllByTransactionComId(transactionDao.getTransactionComId());
        }


        // for(PaymentDao paymentDao : paymentDaoList){


        //     DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //     Date d1 = null;
        //     try {
        //         d1 = f.parse(paymentDao.getDate());
        //     } catch (ParseException e) {
        //         e.printStackTrace();
        //     }
        //     DateFormat payDate = new SimpleDateFormat("dd MMMM yyyy");//NEED TO CHECK THIS
        //     DateFormat payTime = new SimpleDateFormat("hh:mm a");

        //     PaymentDetails paymentDetails = new PaymentDetails();

        //     if(paymentDao.getCash() > 0){

        //         paymentDetails.setPaymentType("CASH");
        //         paymentDetails.setPaymentAmount(paymentDao.getCash());
        //         paymentDetails.setPaymentDate(payDate.format(d1));
        //         paymentDetails.setPaymentTime(payTime.format(d1));

        //         paymentDetailsList.add(paymentDetails);

        //     }
        //     if(paymentDao.getCredit() > 0){

        //         paymentDetails.setPaymentType("CREDIT");
        //         paymentDetails.setPaymentAmount(paymentDao.getCredit());
        //         paymentDetails.setPaymentDate(payDate.format(d1));
        //         paymentDetails.setPaymentTime(payTime.format(d1));

        //         paymentDetailsList.add(paymentDetails);

        //     }
        //     if(paymentDao.getCheckAmount() > 0){

        //         paymentDetails.setPaymentType("CHECK");
        //         paymentDetails.setPaymentAmount(paymentDao.getCheckAmount());
        //         paymentDetails.setPaymentDate(payDate.format(d1));
        //         paymentDetails.setPaymentTime(payTime.format(d1));

        //         paymentDetailsList.add(paymentDetails);

        //     }
        //     if(paymentDao.getDebit() > 0){

        //         paymentDetails.setPaymentType("DEBIT");
        //         paymentDetails.setPaymentAmount(paymentDao.getDebit());
        //         paymentDetails.setPaymentDate(payDate.format(d1));
        //         paymentDetails.setPaymentTime(payTime.format(d1));

        //         paymentDetailsList.add(paymentDetails);

        //     }
        //     if(paymentDao.getStoreCredit() > 0){

        //         paymentDetails.setPaymentType("STORE CREDIT");
        //         paymentDetails.setPaymentAmount(paymentDao.getStoreCredit());
        //         paymentDetails.setPaymentDate(payDate.format(d1));
        //         paymentDetails.setPaymentTime(payTime.format(d1));

        //         paymentDetailsList.add(paymentDetails);

        //     }


        // }

        transactionDao1.setPaymentDao(paymentDaoList);
        //transactionDao1.setPaymentDetails(paymentDetailsList);

        return transactionDao1;
    }

    private void manageProductInventoryAfterSale(TransactionDao transactionDao) {

        for (TransactionLineItemDao lineItemDao : transactionDao.getTransactionLineItemDaoList()) {


            ProductInventoryDao productInventoryDao = productInventoryRepository.findFirstByProductNoOrderByCreatedTimestampAsc(lineItemDao.getProductNo());

            // This is very important, if i dont do this then it will messed up complete count of the quantity.
            ProductInventoryDao productInventoryDaoFinal = new ProductInventoryDao();
            if (null != productInventoryDao) {
                productInventoryDaoFinal.setCost(Math.abs(productInventoryDao.getCost()));
                productInventoryDaoFinal.setProductNo(lineItemDao.getProductNo());
                productInventoryDaoFinal.setRetail(Math.abs((lineItemDao.getRetail())));
                productInventoryDaoFinal.setQuantity(lineItemDao.getSaleQuantity());
                productInventoryDaoFinal.setCreatedTimestamp(transactionDao.getDate());
            }

            ProductInventoryDao productInventoryDao1 = productInventoryRepository.save(productInventoryDaoFinal);

            // I need to recalculate the product inventory from inventory table and then set the quantity to PRODUCT tabel to sync product table stock and inventory Table.
            // This is real method who updated the PRODUCT TABLE.
            updateQuantityInProductTable(productInventoryDao1);
        }
    }

    // VERY IMPORT :::: HELPS TO SYNC PRODUCT INVENTORY TABLE AND PRODUCT TABLE.
    private void updateQuantityInProductTable(ProductInventoryDao productInventoryDao) {
        int totalProduct = 0;

        if (null != productInventoryDao) {

            List<ProductInventoryDao> productInventoryDaoList = productInventoryRepository.findAllByProductNo(productInventoryDao.getProductNo());

            if (null != productInventoryDaoList && productInventoryDaoList.size() > 0) {
                for (ProductInventoryDao productInventoryDao2 : productInventoryDaoList) {
                    totalProduct = totalProduct + productInventoryDao2.getQuantity();
                }
                // Now i need to update quantity in product table
                productRepository.updateQuantityAfterInventoryUpdate(totalProduct, productInventoryDaoList.get(0).getCost(), productInventoryDaoList.get(0).getProductNo());
            }
        }
    }

    private void setCustomerStoreCredit(TransactionDao transactionDao) {

        CustomerDao customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());

        if (null != customerDao) {
            customerDao.setStoreCredit(customerDao.getStoreCredit() - transactionDao.getPaymentDao().get(0).getStoreCredit());
            customerRepository.save(customerDao);
        }
    }

    private void deleteProductInventoryRow(ProductInventoryDao productInventoryDao) {
        // First we need to get the count of the row, we can delete row only and only if it is not last row,
        // if it is not last row then we need to keep it.

        int count = productInventoryRepository.getCountOfRowByProductNo(productInventoryDao.getProductNo());

        if (count > 1) {
            productInventoryRepository.delete(productInventoryDao.getId());
        }
    }


    private void reduceQuantityFromProductInventoryTable(ProductInventoryDao productInventoryDao, int newQuantityAfterSubtractionFromPurchasedQuantity) {

        // Here i am just reducing purchasedQuantity from current inventory and updating into table.
        // Need to set purchasedQuantity cause that what customer has bought.(purchasedQuantity i)
        productInventoryDao.setQuantity(newQuantityAfterSubtractionFromPurchasedQuantity);
        ProductInventoryDao productInventoryDao1 = productInventoryRepository.save(productInventoryDao);
        // Here I need to update the Product Table to keep up with quantity in Product Inventory Table
        // VERY IMPORT LOGIC.
        updateQuantityInProductTable(productInventoryDao1);
    }

    public TransactionDao getTransactionById(int transactionCompId) {

        List<PaymentDao> paymentDaoList = new ArrayList<>();
        // just basic java logic to get the details from db
        TransactionDao transactionDao = transactionRepository.findOne(transactionCompId);

        transactionDao.setStoreSetupDao(storeSetupRepository.findOne(1));

        List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();

        for (TransactionLineItemDao lineItem : transactionDao.getTransactionLineItemDaoList()) {

            if (null == lineItem.getDescription() || lineItem.getDescription().length() < 1) {
                ProductDao productDao = productRepository.findOneByProductNo(lineItem.getProductNo());

                if (null != productDao) {
                    lineItem.setDescription(productDao.getDescription());
                    transactionLineItemDaoList.add(lineItem);
                }

            } else {
                transactionLineItemDaoList.add(lineItem);
            }

        }

        transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoList);
        List<Object[]> result = paymentRepository.getPaymentDetailsByTransactionId(transactionDao.getTransactionComId());
        if (null != result) {
            for (Object[] j : result) {
                PaymentDao paymentDao = new PaymentDao();

                paymentDao.setTransactionComId((Integer) j[1]);
                paymentDao.setStatus(j[2].toString());
                paymentDao.setDate(j[3].toString());
                paymentDao.setCash(Double.parseDouble(j[4].toString()));
                paymentDao.setCredit(Double.parseDouble(j[5].toString()));
                paymentDao.setDebit(Double.parseDouble(j[6].toString()));
                paymentDao.setCheckAmount(Double.parseDouble(j[7].toString()));
                paymentDao.setStoreCredit(Double.parseDouble(j[8].toString()));
                paymentDao.setOnAccount(Double.parseDouble(j[9].toString()));
                paymentDao.setLoyalty(Double.parseDouble(j[10].toString()));
                paymentDao.setLayby(Double.parseDouble(j[11].toString()));
                paymentDao.setChangeForCash(Double.parseDouble(j[12].toString()));
                paymentDao.setCreditCardLast4(Double.parseDouble(j[13].toString()));

                paymentDaoList.add(paymentDao);
            }
        }
        transactionDao.setPaymentDao(paymentDaoList);
        return transactionDao;
    }

    public List<TransactionDao> getTransactionByDate(String startDate, String endDate) {

        List<TransactionDao> transactionDaoList = new ArrayList<>();

        List<Object[]> result = transactionRepository.getTransactionByDate(startDate, endDate);


        if (null != result) {
            for (Object[] j : result) {
                TransactionDao transactionDao = new TransactionDao();

                transactionDao.setTransactionComId((Integer) j[0]);
                transactionDao.setDate(String.valueOf(j[1]));
                transactionDao.setTotalAmount(Double.parseDouble(j[2].toString()));
                transactionDao.setTax(Double.parseDouble(j[3].toString()));
                transactionDao.setTotalDiscount(Double.parseDouble(j[4].toString()));
                transactionDao.setSubtotal(Double.parseDouble(j[5].toString()));
                transactionDao.setQuantity((Integer) j[6]);
                transactionDao.setCustomerPhoneno(String.valueOf(j[7]));
                transactionDao.setStatus(String.valueOf(j[8]));
                transactionDao.setTransactionBalance(Double.parseDouble(j[9].toString()));
                transactionDao.setUsername(String.valueOf(j[10]));
                transactionDao.setCustomerFirstLastName(String.valueOf(j[11]));

                transactionDaoList.add(transactionDao);
            }
        }

        return transactionDaoList;
    }

    public TransactionDao voidTransaction(TransactionDao transactionDao) {

        // Managing inventory for the Void Transaction same as return.
        manageProductInventoryAfterSale(transactionDao);
        return transactionRepository.save(transactionDao);
    }

    public boolean sendEmail(int receiptId) {

        Context context = new Context();
        TransactionDao transactionDao = getTransactionById(receiptId);
        String email = null;
        if (null != transactionDao && transactionDao.getCustomerPhoneno().length() > 1 && null != transactionDao.getTransactionLineItemDaoList() && null != transactionDao.getPaymentDao()) {
            //First get customer details to send an email.
            CustomerDao customerDao;
            customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());

            if (null != customerDao && null != customerDao.getEmail()) {

                email = customerDao.getEmail();
                //setting shipping details
                context.setVariable("firstName", customerDao.getName());
                context.setVariable("companyName", customerDao.getCompanyName());
                context.setVariable("addressLine", customerDao.getStreet());
                context.setVariable("City", customerDao.getCity());
                context.setVariable("State", customerDao.getState());
                context.setVariable("zipcode", customerDao.getZipCode());
                context.setVariable("phoneNo", customerDao.getPhoneNo());
            }


            //setting line item details
            context.setVariable("lineItem", transactionDao.getTransactionLineItemDaoList());

            //setting transaction details
            context.setVariable("subtotal", transactionDao.getSubtotal());
            context.setVariable("quantity", transactionDao.getQuantity());
            context.setVariable("discount", transactionDao.getTotalDiscount());

            context.setVariable("storeCredit", transactionDao.getPaymentDao().get(0).getStoreCredit());
//            context.setVariable("previousBalance", transactionDao.getPreviousBalance());
            context.setVariable("salesTax", transactionDao.getTax());
            context.setVariable("grandTotal", transactionDao.getTotalAmount());
            context.setVariable("balance", transactionDao.getTransactionBalance());


            //By this logic if email is failing i will get an email
//            if( null != receiptDtoList.get(0).getCustomerDtosList().get(0).getEmail())
//            {
//                email = receiptDtoList.get(0).getCustomerDtosList().get(0).getEmail();
//            }
        }
        assert transactionDao != null;
        EmailStatus emailStatus = emailHtmlSender.send(email, transactionDao.getStoreSetupDao().getName() + " ORDER DETAILS", "template-1", context);

        return emailStatus.isSuccess();
    }

    public byte[] getA4Receipt(int receiptNo) throws DocumentException, IOException {

        TransactionDao transactionDao;

        Document doc = new Document(PageSize.A4);
        initializeFonts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);
        doc.open();
        PdfContentByte cb = writer.getDirectContent();
        transactionDao = getTransactionById(receiptNo);

        if (null != transactionDao) {

            //printCustomerDetailsTest(cb, transactionDao);
            printStoreDetailsTest(transactionDao, doc);
            //printTransactionDetailsTest(doc, transactionDao);
            //generateLineItemTable(cb);
        }
        doc.close();

        return byteArrayOutputStream.toByteArray();
    }

    private void printStoreDetailsTest(TransactionDao transactionDao, Document doc) throws IOException, DocumentException {

        PdfPTable storeTable = new PdfPTable(2);
        PdfPTable customerTable = new PdfPTable(2);
        PdfPTable lineItemTable = new PdfPTable(5);
        PdfPTable paymentTable = new PdfPTable(2);
        PdfPTable paymentMethod = new PdfPTable(4);
        PdfPTable totalDueAmount = new PdfPTable(2);


        String[] header = new String[]{"PRODUCT NO", "DESCRIPTION", "QTY", "RETAIL", "AMOUNT"};
        String[] paymentHeader = new String[]{"PAYMENT METHOD", "AMOUNT", "DATE", "TIME"};


        storeTable.setWidthPercentage(100);
        customerTable.setWidthPercentage(100);
        lineItemTable.setWidthPercentage(100);
        paymentTable.setWidthPercentage(100);
        paymentMethod.setWidthPercentage(100);
        totalDueAmount.setWidthPercentage(100);


        PdfPCell logo = new PdfPCell();
        PdfPCell invoiceDetails = new PdfPCell();

        PdfPCell storeDetails = new PdfPCell();
        PdfPCell customerDetails = new PdfPCell();

        PdfPCell paymentType = new PdfPCell();
        PdfPCell paymentAmount = new PdfPCell();

//        PdfPCell paymentMethod1 = new PdfPCell();
//        PdfPCell amount = new PdfPCell();
//        PdfPCell date = new PdfPCell();
//        PdfPCell time = new PdfPCell();

        PdfPCell totalBalanceDue = new PdfPCell();
        PdfPCell totalBalanceDueAmount = new PdfPCell();


        Image companyLogo = Image.getInstance("server/src/main/resources/static/assets/image/Excellogo.png");
        logo.addElement(companyLogo);
        logo.setPadding(0);
        logo.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
        logo.setBorder(PdfPCell.NO_BORDER);


        if (null != transactionDao) {

            DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Date d1 = null;
            try {
                d1 = f.parse(transactionDao.getDate());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            DateFormat transDate = new SimpleDateFormat("MM-dd-yyyy");//NEED TO CHECK THIS
            DateFormat transTime = new SimpleDateFormat("hh:mm a");

            Paragraph paragraph = new Paragraph("INVOICE #:" + transactionDao.getTransactionComId());
            paragraph.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph paragraph1 = new Paragraph("DATE: " + transDate.format(d1)+" - "+transTime.format(d1));
            paragraph1.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph paragraph2 = new Paragraph("CREATED BY: " + transactionDao.getUsername());
            paragraph2.setAlignment(PdfPCell.ALIGN_RIGHT);

            invoiceDetails.addElement(paragraph);
            invoiceDetails.addElement(paragraph1);
            invoiceDetails.addElement(paragraph2);
            invoiceDetails.setBorder(PdfPCell.NO_BORDER);

            storeTable.addCell(logo);
            storeTable.addCell(invoiceDetails);

            if (null != transactionDao.getStoreSetupDao()) {
                Paragraph storeName = new Paragraph(transactionDao.getStoreSetupDao().getName());
                storeName.setAlignment(PdfPCell.ALIGN_LEFT);
                Paragraph street = new Paragraph(transactionDao.getStoreSetupDao().getStreet());
                street.setAlignment(PdfPCell.ALIGN_LEFT);
                Paragraph city = new Paragraph(transactionDao.getStoreSetupDao().getCity() + " , " + transactionDao.getStoreSetupDao().getState() + " , " + transactionDao.getStoreSetupDao().getZipcode());
                city.setAlignment(PdfPCell.ALIGN_LEFT);
                Paragraph phoneNo = new Paragraph(transactionDao.getStoreSetupDao().getPhoneNo());
                phoneNo.setAlignment(PdfPCell.ALIGN_LEFT);
                Paragraph email = new Paragraph(transactionDao.getStoreSetupDao().getEmail());

                email.setAlignment(PdfPCell.ALIGN_LEFT);

                storeDetails.addElement(storeName);
                storeDetails.addElement(street);
                storeDetails.addElement(city);
                storeDetails.addElement(phoneNo);
                storeDetails.addElement(email);
                storeDetails.setBorder(PdfPCell.NO_BORDER);
            }

            if (null != transactionDao.getCustomerPhoneno()) {
                String phoneNo = transactionDao.getCustomerPhoneno();
                CustomerDao customerDao = customerManager.getCustomerByPhoneNo(phoneNo);

                if (null != customerDao) {

                    Paragraph companyName = new Paragraph(customerDao.getCompanyName());
                    companyName.setAlignment(PdfPCell.ALIGN_RIGHT);
                    Paragraph customerName = new Paragraph(transactionDao.getCustomerFirstLastName());
                    customerName.setAlignment(PdfPCell.ALIGN_RIGHT);
                    Paragraph custStreet = new Paragraph(customerDao.getStreet());
                    custStreet.setAlignment(PdfPCell.ALIGN_RIGHT);
                    Paragraph custCity = new Paragraph(customerDao.getCity() + " , " + customerDao.getState() + " , " + customerDao.getZipCode());
                    custCity.setAlignment(PdfPCell.ALIGN_RIGHT);
                    Paragraph custPhone = new Paragraph(customerDao.getPhoneNo());
                    custPhone.setAlignment(PdfPCell.ALIGN_RIGHT);

                    customerDetails.addElement(companyName);
                    customerDetails.addElement(customerName);
                    customerDetails.addElement(custStreet);
                    customerDetails.addElement(custCity);
                    customerDetails.addElement(custPhone);
                    customerDetails.setBorder(PdfPCell.NO_BORDER);

                    customerTable.addCell(storeDetails);
                    customerTable.addCell(customerDetails);

                    customerTable.setSpacingBefore(25);

                }
            }

            if (null != transactionDao.getTransactionLineItemDaoList()) {

                lineItemTable.setHeaderRows(1);
                lineItemTable.setWidths(new float[]{2.5f, 7.2f, 1, 1.5f, 1.8f});
                lineItemTable.setSpacingBefore(25);
                lineItemTable.setSplitLate(false);

                for (String columnHeader : header) {
                    PdfPCell headerCell = new PdfPCell();
                    headerCell.addElement(new Phrase(columnHeader, FontFactory.getFont(FontFactory.HELVETICA, 10, Font.BOLD)));
                    headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    headerCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                    headerCell.setBorderColor(BaseColor.LIGHT_GRAY);
                    headerCell.setPadding(8);
                    lineItemTable.addCell(headerCell);
                }

                for (TransactionLineItemDao lineItem : transactionDao.getTransactionLineItemDaoList()) {

                    PdfPCell cell1 = new PdfPCell();
                    PdfPCell cell2 = new PdfPCell();
                    PdfPCell cell3 = new PdfPCell();
                    PdfPCell cell4 = new PdfPCell();
                    PdfPCell cell5 = new PdfPCell();

                    cell1.addElement(new Phrase(lineItem.getProductNo(), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));
                    cell2.addElement(new Phrase(lineItem.getDescription(), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));
                    cell3.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(lineItem.getSaleQuantity()), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                    cell4.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(lineItem.getRetailWithDiscount()), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                    cell5.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(lineItem.getTotalProductPrice()), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

//                    cell3.addElement(new Phrase(String.valueOf(lineItem.getSaleQuantity()),FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));
//                    cell4.addElement(new Phrase(String.valueOf(lineItem.getRetailWithDiscount()),FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));
//                    cell5.addElement(new Phrase(String.valueOf(lineItem.getTotalProductPrice()),FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));

                    cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                    cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                    cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                    cell4.setBorderColor(BaseColor.LIGHT_GRAY);
                    cell5.setBorderColor(BaseColor.LIGHT_GRAY);

                    lineItemTable.addCell(cell1);
                    lineItemTable.addCell(cell2);
                    lineItemTable.addCell(cell3);
                    lineItemTable.addCell(cell4);
                    lineItemTable.addCell(cell5);
                }
            }

            Paragraph subtotal = new Paragraph("SUBTOTAL", FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            subtotal.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph tax = new Paragraph("TAX", FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            tax.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph discount = new Paragraph("DISCOUNT", FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            discount.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph quantity = new Paragraph("QUANTITY", FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            quantity.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph shipping = new Paragraph("SHIPPING", FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            shipping.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph total = new Paragraph("TOTAL", FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            total.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph balanceDue = new Paragraph("BALANCE DUE", FontFactory.getFont(FontFactory.HELVETICA, 13, Font.BOLD));
            balanceDue.setAlignment(PdfPCell.ALIGN_LEFT);

            paymentType.addElement(subtotal);
            paymentType.addElement(tax);
            paymentType.addElement(discount);
            paymentType.addElement(quantity);

            paymentType.addElement(total);
            paymentType.addElement(balanceDue);

            paymentType.setBorder(PdfPCell.NO_BORDER);


            Paragraph subtotal1 = new Paragraph("$ " + transactionDao.getSubtotal(), FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            subtotal1.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph tax1 = new Paragraph("$ " + transactionDao.getTax(),FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            tax1.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph discount1 = new Paragraph("$ " + transactionDao.getTotalDiscount(), FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            discount1.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph quantity1 = new Paragraph(String.valueOf(transactionDao.getQuantity()), FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            quantity1.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph total1 = new Paragraph("$ " + transactionDao.getTotalAmount(), FontFactory.getFont(FontFactory.HELVETICA, 13, Font.NORMAL));
            total1.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph balanceDue1 = new Paragraph("$ " + transactionDao.getTransactionBalance(), FontFactory.getFont(FontFactory.HELVETICA, 13, Font.BOLD));
            balanceDue1.setAlignment(PdfPCell.ALIGN_RIGHT);

            paymentAmount.addElement(subtotal1);
            paymentAmount.addElement(tax1);
            paymentAmount.addElement(discount1);
            paymentAmount.addElement(quantity1);
            paymentAmount.addElement(total1);
            paymentAmount.addElement(balanceDue1);

            paymentAmount.setBorder(PdfPCell.NO_BORDER);

            paymentTable.addCell(paymentType);
            paymentTable.addCell(paymentAmount);


            paymentTable.setSpacingBefore(25);

            if (null != transactionDao.getPaymentDao()) {

                for (String payment : paymentHeader) {
                    PdfPCell headerCell = new PdfPCell();
                    Paragraph paragraph3 = new Paragraph(payment, FontFactory.getFont(FontFactory.HELVETICA, 11, Font.BOLD));
                    paragraph3.setAlignment(Element.ALIGN_CENTER);
                    headerCell.addElement(paragraph3);
                    headerCell.setBorderColor(BaseColor.LIGHT_GRAY);
                    headerCell.setPadding(8);
                    paymentMethod.addCell(headerCell);
                }


                for (PaymentDao payment : transactionDao.getPaymentDao()) {

                    try {
                        d1 = f.parse(payment.getDate());
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    DateFormat payDate = new SimpleDateFormat("MM-dd-yyyy");//NEED TO CHECK THIS
                    DateFormat payTime = new SimpleDateFormat("hh:mm a");


                    if (payment.getCash() != 0) {

                        PdfPCell cell1 = new PdfPCell();
                        PdfPCell cell2 = new PdfPCell();
                        PdfPCell cell3 = new PdfPCell();
                        PdfPCell cell4 = new PdfPCell();

                        // This helps set content in middle or center
                        cell1.setFixedHeight(30);
                        cell2.setFixedHeight(30);
                        cell3.setFixedHeight(30);
                        cell4.setFixedHeight(30);

                        cell1.setCellEvent(new PositionEvent(new Phrase(10, "CASH", FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell2.setCellEvent(new PositionEvent(new Phrase(10, "$ "+String.valueOf(payment.getCash()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell3.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(payDate.format(d1)), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell4.setCellEvent(new PositionEvent(new Phrase(10, payTime.format(d1), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

                        cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell4.setBorderColor(BaseColor.LIGHT_GRAY);

                        paymentMethod.addCell(cell1);
                        paymentMethod.addCell(cell2);
                        paymentMethod.addCell(cell3);
                        paymentMethod.addCell(cell4);
                    }
                    if (payment.getCredit() != 0) {

                        PdfPCell cell1 = new PdfPCell();
                        PdfPCell cell2 = new PdfPCell();
                        PdfPCell cell3 = new PdfPCell();
                        PdfPCell cell4 = new PdfPCell();

                        // This helps set content in middle or center
                        cell1.setFixedHeight(30);
                        cell2.setFixedHeight(30);
                        cell3.setFixedHeight(30);
                        cell4.setFixedHeight(30);

                        cell1.setCellEvent(new PositionEvent(new Phrase(10, "CREDIT", FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell2.setCellEvent(new PositionEvent(new Phrase(10, "$ "+String.valueOf(payment.getCredit()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell3.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(payDate.format(d1)), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell4.setCellEvent(new PositionEvent(new Phrase(10, payTime.format(d1), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

                        cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell4.setBorderColor(BaseColor.LIGHT_GRAY);

                        paymentMethod.addCell(cell1);
                        paymentMethod.addCell(cell2);
                        paymentMethod.addCell(cell3);
                        paymentMethod.addCell(cell4);
                    }
                    if (payment.getDebit() != 0) {

                        PdfPCell cell1 = new PdfPCell();
                        PdfPCell cell2 = new PdfPCell();
                        PdfPCell cell3 = new PdfPCell();
                        PdfPCell cell4 = new PdfPCell();

                        // This helps set content in middle or center
                        cell1.setFixedHeight(30);
                        cell2.setFixedHeight(30);
                        cell3.setFixedHeight(30);
                        cell4.setFixedHeight(30);

                        cell1.setCellEvent(new PositionEvent(new Phrase(10, "DEBIT", FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell2.setCellEvent(new PositionEvent(new Phrase(10, "$ "+String.valueOf(payment.getDebit()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell3.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(payDate.format(d1)), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell4.setCellEvent(new PositionEvent(new Phrase(10, payTime.format(d1), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

                        cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell4.setBorderColor(BaseColor.LIGHT_GRAY);

                        paymentMethod.addCell(cell1);
                        paymentMethod.addCell(cell2);
                        paymentMethod.addCell(cell3);
                        paymentMethod.addCell(cell4);
                    }
                    if (payment.getCheckAmount() != 0) {

                        PdfPCell cell1 = new PdfPCell();
                        PdfPCell cell2 = new PdfPCell();
                        PdfPCell cell3 = new PdfPCell();
                        PdfPCell cell4 = new PdfPCell();

                        // This helps set content in middle or center
                        cell1.setFixedHeight(30);
                        cell2.setFixedHeight(30);
                        cell3.setFixedHeight(30);
                        cell4.setFixedHeight(30);

                        cell1.setCellEvent(new PositionEvent(new Phrase(10, "CHECK", FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell2.setCellEvent(new PositionEvent(new Phrase(10, "$ "+String.valueOf(payment.getCheckAmount()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell3.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(payDate.format(d1)), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell4.setCellEvent(new PositionEvent(new Phrase(10, payTime.format(d1), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

                        cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell4.setBorderColor(BaseColor.LIGHT_GRAY);

                        paymentMethod.addCell(cell1);
                        paymentMethod.addCell(cell2);
                        paymentMethod.addCell(cell3);
                        paymentMethod.addCell(cell4);
                    }
                    if (payment.getStoreCredit() != 0) {
                        PdfPCell cell1 = new PdfPCell();
                        PdfPCell cell2 = new PdfPCell();
                        PdfPCell cell3 = new PdfPCell();
                        PdfPCell cell4 = new PdfPCell();

                        // This helps set content in middle or center
                        cell1.setFixedHeight(30);
                        cell2.setFixedHeight(30);
                        cell3.setFixedHeight(30);
                        cell4.setFixedHeight(30);

                        cell1.setCellEvent(new PositionEvent(new Phrase(10, "STORE CREDIT", FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell2.setCellEvent(new PositionEvent(new Phrase(10, "$ "+String.valueOf(payment.getStoreCredit()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell3.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(payDate.format(d1)), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                        cell4.setCellEvent(new PositionEvent(new Phrase(10, payTime.format(d1), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

                        cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                        cell4.setBorderColor(BaseColor.LIGHT_GRAY);

                        paymentMethod.addCell(cell1);
                        paymentMethod.addCell(cell2);
                        paymentMethod.addCell(cell3);
                        paymentMethod.addCell(cell4);
                    }



                }

                paymentMethod.setSpacingBefore(25);
            }

            totalDueAmount.setSpacingBefore(25);

            if (null != transactionDao.getCustomerPhoneno()) {
                List<Double> totalDueBalance;
                totalDueBalance = transactionRepository.getTransactionDueAmountByCustomer(transactionDao.getCustomerPhoneno());

                if (null != totalDueBalance && null != totalDueBalance.get(0) && totalDueBalance.get(0) > 0) {
                    Paragraph totalBalanceDueText = new Paragraph("TOTAL BALANCE DUE", FontFactory.getFont(FontFactory.HELVETICA, 14, Font.BOLD));
                    totalBalanceDueText.setAlignment(PdfPCell.ALIGN_LEFT);

                    totalBalanceDue.addElement(totalBalanceDueText);
                    totalBalanceDue.setBorder(PdfPCell.NO_BORDER);

                    Paragraph totalBalanceDueAmount1 = new Paragraph("$ " + totalDueBalance.get(0), FontFactory.getFont(FontFactory.HELVETICA, 14, Font.BOLD));
                    totalBalanceDueAmount1.setAlignment(PdfPCell.ALIGN_RIGHT);

                    totalBalanceDueAmount.addElement(totalBalanceDueAmount1);
                    totalBalanceDueAmount.setBorder(PdfPCell.NO_BORDER);

                    totalDueAmount.addCell(totalBalanceDue);
                    totalDueAmount.addCell(totalBalanceDueAmount);
                }
            }

            doc.add(storeTable);

            doc.add(customerTable);

            doc.add(lineItemTable);

            doc.add(paymentTable);

            doc.add(paymentMethod);

            doc.add(totalDueAmount);

            if(transactionDao.getNote().length() > 1) {
                Paragraph notes = new Paragraph("Receipt Notes: ");
                Paragraph transactionNotes = new Paragraph(transactionDao.getNote());
                transactionNotes.setSpacingBefore(30f);
                doc.add(notes);
                doc.add(transactionNotes);
            }
        }
    }

    public List<TransactionDao> getPendingInvoiceByCustomer(String phoneNo) {

        return transactionRepository.findAllByStatusEqualsAndCustomerPhoneno("Pending", phoneNo);
    }

    public List<TransactionDao> getAllInvoiceByCustomer(String startDate, String endDate, String phoneNo) {

        List<TransactionDao> transactionDaoList = new ArrayList<>();
        List<TransactionDao> newTransactionDaoList = new ArrayList<>();


        transactionDaoList = transactionRepository.findAllByCustomerPhonenoAndDateBetweenOrderByDateDesc(phoneNo, startDate, endDate);

        if (null != transactionDaoList) {
            for (TransactionDao transactionDao : transactionDaoList) {

                List<PaymentDao> paymentDaoList = paymentRepository.findAllByTransactionComId(transactionDao.getTransactionComId());
                if (null != paymentDaoList) {
                    transactionDao.setPaymentDao(paymentDaoList);
                }

                newTransactionDaoList.add(transactionDao);
            }
        }
        return newTransactionDaoList;
    }

    public List<PaymentDao> getPaymentDetailsById(int transactionCompId) {

        return paymentRepository.findAllByTransactionComId(transactionCompId);
    }

//    public byte[] getA4Receipt(int receiptNo) throws DocumentException {
//
//        TransactionDao transactionDao;
//
//        // this will generate the PDF document as byte []
//        Document doc = new Document(PageSize.A4);
//        initializeFonts();
//        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);
//        doc.open();
//        PdfContentByte cb = writer.getDirectContent();
//
//
//        // this method call the database and sends the receipt details
//        transactionDao = getTransactionById(receiptNo);
//
//        if (null != transactionDao) {
//
//            printCustomerDetails(cb, transactionDao);
//            printStoreDetails(cb, transactionDao);
//            printTransactionDetails(doc, transactionDao);
//            //generateLineItemTable(cb);
//
//            printPageNumber(cb);
//        }
//        doc.close();
//
//        return byteArrayOutputStream.toByteArray();
//    }

//
//    private void printTransactionDetails(Document doc, TransactionDao transactionDao) {
//
//        try {
//            float[] columnWidths = {3, 9, 2, 2, 2};
//            float[] colWidht2 = {4, 4, 4, 4};
//
//
//            doc.add(new Paragraph(":"));
//
//            PdfPTable table = new PdfPTable(columnWidths);
//
//            PdfPTable table1 = new PdfPTable(colWidht2);
//
//            table.setSpacingBefore(5);
////                table.setSpacingAfter(100);
//
//            table.setWidthPercentage(100);
//
//            table.addCell(new Phrase("Product No", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            table.addCell(new Phrase("Product Description", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
////                table.addCell(new Phrase("Disc", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            table.addCell(new Phrase("Retail", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            table.addCell(new Phrase("Items", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            table.addCell(new Phrase("Total", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//
//            DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//            Date d = null;
//            try {
//                d = f.parse(transactionDao.getDate());
//            } catch (ParseException e) {
//                e.printStackTrace();
//            }
//            DateFormat date = new SimpleDateFormat("MM/dd/yyyy");//NEED TO CHECK THIS
//            DateFormat time = new SimpleDateFormat("hh:mm:ss");
//
//
//            // this all dyanamic data which i s cmming form DB
//
//            table1.addCell(new Phrase("Sale Date : " + date.format(d), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            table1.addCell(new Phrase("Sale Time : " + time.format(d), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            table1.addCell(new Phrase("CSR : " + transactionDao.getUsername(), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            table1.addCell(new Phrase("Sales Id : " + transactionDao.getTransactionComId(), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//            for (TransactionLineItemDao lineItemDao : transactionDao.getTransactionLineItemDaoList()) {
//                table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
//                table.addCell(new Phrase(lineItemDao.getProductNo(), new Font(Font.FontFamily.HELVETICA, 8)));
//                table.addCell(new Phrase(lineItemDao.getDescription(), new Font(Font.FontFamily.HELVETICA, 8)));
////                    table.addCell(new Phrase("$ " + String.valueOf(lineItemDao.getDiscount()), new Font(Font.FontFamily.HELVETICA, 8)));
//                table.addCell(new Phrase(String.valueOf(lineItemDao.getRetailWithDiscount()), new Font(Font.FontFamily.HELVETICA, 8)));
//                table.addCell(new Phrase(String.valueOf(lineItemDao.getSaleQuantity()), new Font(Font.FontFamily.HELVETICA, 8)));
//                table.addCell(new Phrase(String.valueOf(lineItemDao.getTotalProductPrice()), new Font(Font.FontFamily.HELVETICA, 8)));
//
//            }
//
//            table1.setSpacingBefore(80);
//            table1.setWidthPercentage(100);
//
//            table1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
//
//            doc.add(table1);
//            doc.add(table);
//
//
//            PdfPTable totalTable = new PdfPTable(2);
//            totalTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);
//
//            totalTable.setSpacingBefore(40);
//            totalTable.setHorizontalAlignment(Element.ALIGN_RIGHT);
//            totalTable.setWidthPercentage(32);
//
//
//            totalTable.addCell(new Phrase("Subtotal", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getSubtotal()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//            totalTable.addCell(new Phrase("Tax", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTax()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//            totalTable.addCell(new Phrase("Discount", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTotalDiscount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//            totalTable.addCell(new Phrase("Quantity", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            totalTable.addCell(new Phrase(String.valueOf(transactionDao.getQuantity()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//
//            // No need to show previous balance, casue now i have change the logic to pay invoice by transaction to fix the close register and other reporting issues.
////                if(transactionDao.getPreviousBalance() != 0) {
////
////                    totalTable.addCell(new Phrase("Pre Balance", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
////                    totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPreviousBalance()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
////                }
//
//            if (transactionDao.getShipping() > 0) {
//
//                totalTable.addCell(new Phrase("Shipping", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getShipping()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            }
//
//            totalTable.addCell(new Phrase("Total", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//            totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTotalAmount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//
//            if (null != transactionDao.getPaymentDao()) {
//
//                for (PaymentDao paymentDaos : transactionDao.getPaymentDao()) {
//
//                    Date d1 = null;
//                    try {
//                        d1 = f.parse(paymentDaos.getDate());
//                    } catch (ParseException e) {
//                        e.printStackTrace();
//                    }
//                    DateFormat payDate = new SimpleDateFormat("MM-dd-yyyy");//NEED TO CHECK THIS
//                    DateFormat payTime = new SimpleDateFormat("hh:mm a");
//
//
//                    if (paymentDaos.getCash() != 0) {
//                        totalTable.addCell(new Phrase("Cash", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getCash()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase(payDate.format(d1) + " " + payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
//                    if (paymentDaos.getChangeForCash() != 0) {
//                        totalTable.addCell(new Phrase("Change", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getChangeForCash()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
//                    if (paymentDaos.getCredit() != 0) {
//                        totalTable.addCell(new Phrase("Credit Card", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getCredit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase(payDate.format(d1) + " " + payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
//                    if (paymentDaos.getDebit() != 0) {
//                        totalTable.addCell(new Phrase("Debit Card", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getDebit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase(payDate.format(d1) + " " + payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
//                    if (paymentDaos.getCheckAmount() != 0) {
//                        totalTable.addCell(new Phrase("Check", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getCheckAmount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase(payDate.format(d1) + " " + payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
//// else if (paymentDaos.getOnAccount() != 0) {
////                        totalTable.addCell(new Phrase("On Account", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
////                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getOnAccount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
////                    }
//                    if (paymentDaos.getStoreCredit() != 0) {
//                        totalTable.addCell(new Phrase("Store Credit", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getStoreCredit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//
//                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase(payDate.format(d1) + " " + payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
//                    if (paymentDaos.getLoyalty() != 0) {
//                        totalTable.addCell(new Phrase("Loyalty", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getLoyalty()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
//
//                }
//
//                if (transactionDao.getTransactionBalance() > 0) {
//
//                    totalTable.addCell(new Phrase("Today's Balance Due", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTransactionBalance()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                }
//
//                // Now to get sum of pending invoice to show, total balance due.
//
//                if (null != transactionDao.getCustomerPhoneno()) {
//                    List<Double> totalDueBalance;
//                    totalDueBalance = transactionRepository.getTransactionDueAmountByCustomer(transactionDao.getCustomerPhoneno());
//
//                    if (null != totalDueBalance && null != totalDueBalance.get(0) && totalDueBalance.get(0) > 0) {
//                        totalTable.addCell(new Phrase("Total Balance Due", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(totalDueBalance), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
//                }
//
//
//            }
//
//
//            doc.add(totalTable);
//
//            Paragraph notes = new Paragraph("Receipt Notes: ");
//            Paragraph transactionNotes = new Paragraph(transactionDao.getNote());
//            transactionNotes.setSpacingBefore(30f);
//
//            doc.add(notes);
//            doc.add(transactionNotes);
//
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//
//    }

//    private void printCustomerDetails(PdfContentByte cb, TransactionDao transactionDao) {
//
//        if (null != transactionDao && null != transactionDao.getCustomerPhoneno()) {
//
//
//            String test = transactionDao.getCustomerPhoneno();
//
//            CustomerDao customerDao = customerManager.getCustomerByPhoneNo(test);
//
//            if (null != customerDao) {
//
//                createCustomerDetails(cb, 460, 800, customerDao.getCompanyName());
//                createCustomerDetails(cb, 460, 785, customerDao.getName());
//                createCustomerDetails(cb, 460, 770, customerDao.getStreet());
//                createCustomerDetails(cb, 460, 755, customerDao.getCity() + customerDao.getState() + customerDao.getZipCode());
//                createCustomerDetails(cb, 460, 740, customerDao.getCountry());
//            }
//        }
//
//    }

//    private void printStoreDetails(PdfContentByte cb, TransactionDao transactionDao) {
//
//        if (null != transactionDao.getStoreSetupDao()) {
//            createCustomerDetails(cb, 35, 800, transactionDao.getStoreSetupDao().getName());
//            createCustomerDetails(cb, 35, 785, transactionDao.getStoreSetupDao().getStreet());
//            createCustomerDetails(cb, 35, 770, transactionDao.getStoreSetupDao().getCity() + " ," + transactionDao.getStoreSetupDao().getState() + " - " + transactionDao.getStoreSetupDao().getZipcode());
//            createCustomerDetails(cb, 35, 755, "USA");
//            createCustomerDetails(cb, 35, 740, transactionDao.getStoreSetupDao().getPhoneNo());
//        }
//
//
//    }

    private void initializeFonts() {


        try {
            bfBold = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);

        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }


    }

//    private void printPageNumber(PdfContentByte cb) {
//
//
//        cb.beginText();
//        cb.setFontAndSize(bfBold, 8);
//        cb.showTextAligned(PdfContentByte.ALIGN_CENTER, "Page No. " + (pageNumber + 1), 570, 25, 0);
//        cb.endText();
//
//        pageNumber++;
//
//    }

//    private void createCustomerDetails(PdfContentByte cb, float x, float y, String text) {
//
//
//        cb.beginText();
//        cb.setFontAndSize(bfBold, 8);
//        cb.setTextMatrix(x, y);
//
//        if (null != text)
//            cb.showText(text.trim());
//        cb.endText();
//
//    }

    public String printTransaction(int transactionId) throws ParseException {
        System.setProperty(JposPropertiesConst.JPOS_POPULATOR_FILE_PROP_NAME, "C:\\jpos.xml");

        String ESC = ((char) 0x1b) + "";
        String LF = ((char) 0x0a) + "";

        String GS = ((char) 0x1d) + "";

        POSPrinter printer = new POSPrinter();
        CashDrawer drawer = new CashDrawer();

        String error = "";
        String receipt = "";
        try {
            printer.open("POSPrinter");
            printer.claim(1);
            printer.setDeviceEnabled(true);
            printer.setMapMode(POSPrinterConst.PTR_MM_METRIC);
            do {
                if (printer.getCoverOpen()) {
                    error = "printer.getCoverOpen() == true"; // thats why i need to output simple json , for testing, can you do ta
                    break;
                }

                if (printer.getRecEmpty()) {
                    error = "printer.getRecEmpty() == true";
                    break;
                }
                // I need get transactionDao code here
                /// could you create it?sure


                TransactionDao transactionDao = new TransactionDao();
                //StoreSetupDao storeSetupDao = new StoreSetupDao();

                transactionDao = getTransactionById(transactionId);
                transactionDao.setStoreSetupDao(storeSetupRepository.findOne(1));

                String date_s = transactionDao.getDate();
                //2018-01-19 09:27:01.0
                Date date = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").parse(date_s);

                ReceiptFormatter formatter = new ReceiptFormatter();
//                formatter.add2Columns(
//                        "%s %n%s".format(new SimpleDateFormat("MM/dd/yyyy").format(date), new SimpleDateFormat("hh:mma").format(date)), 0, 26,
//                        "Ref No. %d %nStation 1".format(String.valueOf(transactionDao.getTransactionComId())), 0, 26);

                formatter.add2Columns(
                        new SimpleDateFormat("MM/dd/yyyy").format(date) + " \n" + new SimpleDateFormat("hh:mma").format(date), 0, 23, ReceiptFormatter.TextAlign.LEFT,
                        "Ref No. " + String.valueOf(transactionDao.getTransactionComId()) + " \nStation 1", 0, 23, ReceiptFormatter.TextAlign.RIGHT);

                //formatter.addLineBreak(1);
                // formatter.addLines("%s \n%s \n%s, %s %s".format(transactionDao.getStoreSetupDao().getName(), transactionDao.getStoreSetupDao().getStreet(), transactionDao.getStoreSetupDao().getCity(), transactionDao.getStoreSetupDao().getState(), transactionDao.getStoreSetupDao().getZipcode()), 46, ReceiptFormatter.TextAlign.CENTER);
                formatter.addLines(transactionDao.getStoreSetupDao().getName() + " \n" + transactionDao.getStoreSetupDao().getStreet() + " \n" + transactionDao.getStoreSetupDao().getCity() + ", " + transactionDao.getStoreSetupDao().getState() + " \n" + transactionDao.getStoreSetupDao().getZipcode()+ " \n" + transactionDao.getStoreSetupDao().getPhoneNo(), 46, ReceiptFormatter.TextAlign.CENTER);
                formatter.addLineBreak(1);
                formatter.add2Columns("Clerk", 0, 15, transactionDao.getUsername(), 0, 20);
                formatter.addLineBreak(1);

                ReceiptFormatter.Table table = new ReceiptFormatter.Table(new ReceiptFormatter.TableColumnSettings[]{
                        new ReceiptFormatter.TableColumnSettings("Item", 8, ReceiptFormatter.TextAlign.CENTER),
                        new ReceiptFormatter.TableColumnSettings("Description", 25, ReceiptFormatter.TextAlign.LEFT),
                        new ReceiptFormatter.TableColumnSettings("Qty", 3, ReceiptFormatter.TextAlign.CENTER),
                        new ReceiptFormatter.TableColumnSettings("Amount", 6, ReceiptFormatter.TextAlign.RIGHT)
                });

                if(null!= transactionDao) {

                    for (TransactionLineItemDao item : transactionDao.getTransactionLineItemDaoList()) {
                        String prodNo = item.getProductNo().toString();
                        table.addRow(prodNo.substring(prodNo.length() - 8), item.getDescription(), String.valueOf(item.getSaleQuantity()), "$" + String.valueOf(item.getTotalProductPrice()));
                    }

                    formatter.printTable(table);
                    formatter.addLineStrike(46);
                    formatter.add3ColumnsLastRight("", 0, 15, "Sub Total", 0, 21, "$" + String.valueOf(transactionDao.getSubtotal()), 0, 10);
                    formatter.add3ColumnsLastRight("", 0, 15, "Tax " + String.valueOf(transactionDao.getStoreSetupDao().getTax()) + "%", 0, 21, "$ "+transactionDao.getTax(), 0, 10);
                    formatter.add3ColumnsLastRight("", 0, 15, "Discount ", 0, 21, "$ "+transactionDao.getTotalDiscount(), 0, 10);
                    formatter.add3ColumnsLastRight("", 0, 15, "Total", 0, 21, "$" + String.valueOf(transactionDao.getTotalAmount()), 0, 10);
                    if(transactionDao.getPaymentDao().get(0).getCash() > 0) {
                        formatter.add3ColumnsLastRight("Cash", 0, 15, "Tendered", 0, 21, "$" + String.valueOf(transactionDao.getPaymentDao().get(0).getCash()), 0, 10);
                    }
                    else if(transactionDao.getPaymentDao().get(0).getCredit() > 0){
                        formatter.add3ColumnsLastRight("Credit Card", 0, 15, "Tendered", 0, 21, "$" + String.valueOf(transactionDao.getPaymentDao().get(0).getCredit()), 0, 10);
                    }
                    else if(transactionDao.getPaymentDao().get(0).getDebit() > 0){
                        formatter.add3ColumnsLastRight("Debit Card", 0, 15, "Tendered", 0, 21, "$" + String.valueOf(transactionDao.getPaymentDao().get(0).getDebit()), 0, 10);
                    }
                    else if(transactionDao.getPaymentDao().get(0).getCheckAmount() > 0){
                        formatter.add3ColumnsLastRight("Check", 0, 15, "Tendered", 0, 21, "$" + String.valueOf(transactionDao.getPaymentDao().get(0).getCheckAmount()), 0, 10);
                    }
                    formatter.addLineBreak(1);
                    formatter.addLines("Thank you for your business", 46, ReceiptFormatter.TextAlign.CENTER);

                    printer.transactionPrint(POSPrinterConst.PTR_S_RECEIPT, POSPrinterConst.PTR_TP_TRANSACTION);
                    //printer.printNormal(POSPrinterConst.PTR_S_RECEIPT, ESC+'@'+ESC+((char)51)+""+((char)40)+"");
                    for (String o : formatter.createReceipt()) {
                        printer.printNormal(POSPrinterConst.PTR_S_RECEIPT, o + "\n");
                        printer.printNormal(POSPrinterConst.PTR_S_RECEIPT, ESC + "|9uF");
                        receipt += o + "\n";
                    }
                    printer.printNormal(POSPrinterConst.PTR_S_RECEIPT, "\n\n\n\n\n");
                    printer.printNormal(POSPrinterConst.PTR_S_RECEIPT, ESC + "|100fP");
                    printer.transactionPrint(POSPrinterConst.PTR_S_RECEIPT, POSPrinterConst.PTR_TP_NORMAL);
                }
            } while (false);

            drawer.open("CashDrawer");
            drawer.claim(1000);
            drawer.setDeviceEnabled(true);
             drawer.openDrawer();
        } catch (JposException e) {
            //e.printStackTrace();
            error = e.getMessage();
        } finally {
            try {
                printer.close();
                 drawer.close();
            } catch (Exception e) {
            }
        }
        TransactionDao print = new TransactionDao();

        print.setStoreSetupDao(storeSetupRepository.findOne(1));

        print = transactionRepository.findOne(7);

        //return print; /// this will ooutputted to browser?yes let me show u
        return (error == "") ? ("{\"success\": 1}") : ("{\"success\":0,\"error\": \"" + error.replaceAll("\"", "\\\"") + "\"}");
    }


    public void openCashDrawer() {

        POSPrinter printer = new POSPrinter();
        CashDrawer drawer = new CashDrawer();
        try {
            printer.open("POSPrinter");
            printer.claim(1);
            printer.setDeviceEnabled(true);
            printer.setMapMode(POSPrinterConst.PTR_MM_METRIC);
            System.setProperty(JposPropertiesConst.JPOS_POPULATOR_FILE_PROP_NAME, "C:\\jpos.xml");

            drawer.open("CashDrawer");
            drawer.claim(1000);
            drawer.setDeviceEnabled(true);
            drawer.openDrawer();

        } catch (JposException e) {
            //e.printStackTrace();
        } finally {
            try {
                printer.close();
                drawer.close();
            } catch (Exception ignored) {
            }
        }
    }




}
