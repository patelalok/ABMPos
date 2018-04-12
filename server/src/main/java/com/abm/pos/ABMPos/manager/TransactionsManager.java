package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.*;
import com.abm.pos.ABMPos.dto.PaymentDetails;
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

import javax.swing.text.TabStop;


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

    @Autowired
    private CustomerProductPriceRepository customerProductPriceRepository;

    private BaseFont bfBold;
    private BaseFont bf;
    private int pageNumber = 0;


    public TransactionDao addTransaction(TransactionDao transactionDao) {

        assert transactionDao != null;
        if (transactionDao.getStatus().equalsIgnoreCase("Complete") || transactionDao.getStatus().equalsIgnoreCase("Pending")) {

            List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();
            List<TransactionLineItemDao> transactionLineItemDaoListNew = new ArrayList<>();
            transactionLineItemDaoList = transactionDao.getTransactionLineItemDaoList();

            if(transactionDao.getTransactionComId() == 0 || transactionDao.isParkSale()) {

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
            // Here I am handling the logic for the customer price lock where customers price will be saved after every transactions. No matter how is the retail price.
            // Here is the problem though, on return i need to manage this logic on ui, otherwise customer get profited when he does the return.

            if (null != transactionDao.getCustomerPhoneno() && transactionDao.getCustomerPhoneno().length() > 9 && null != transactionDao.getTransactionLineItemDaoList()) {
                for (TransactionLineItemDao lineItem : transactionDao.getTransactionLineItemDaoList()) {

                    CustomerProductPrice customerProductPrice = new CustomerProductPrice();
                    CustomerProductPricePK customerProductPricePK = new CustomerProductPricePK();

                    customerProductPricePK.setPhoneNo(transactionDao.getCustomerPhoneno());
                    customerProductPricePK.setProductNo(lineItem.getProductNo());

                    // Need to do retail with discount, because that is discounted price for customer
                    customerProductPrice.setRetail(lineItem.getRetailWithDiscount());
                    customerProductPrice.setCost(lineItem.getCost());
                    customerProductPrice.setLastUpdatedTimestamp(transactionDao.getDate());

                    customerProductPrice.setCustomerProductPricePK(customerProductPricePK);

                    customerProductPriceRepository.save(customerProductPrice);
                }
            }
        }
        else if (transactionDao.getStatus().equalsIgnoreCase("Return") || transactionDao.getStatus().equalsIgnoreCase("Void")) {

            // this logic help to, manage regular return and RMI return, cause in RMI return we do not need to insert inventory again.
            if(!transactionDao.isRma())
            {
                // Managing inventory for the RETURN or VOID
                manageProductInventoryAfterSale(transactionDao);
            }

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
            if(transactionDao.getTransactionComId() != 0)
            {
                paymentRepository.deletePaymentDetails(transactionDao.getTransactionComId());
            }
        }

        else if(transactionDao.getStatus().equalsIgnoreCase("Park")){
            transactionDao.setParkSale(true);
        }


        TransactionDao transactionDao1 = transactionRepository.save(transactionDao);

        // I need to do this because, I am not able to update payment, just payment table becuase of forign key problem.
        // Every time inserting manually.

        List<PaymentDao> paymentDaoList = new ArrayList<>();
        List<PaymentDetails> paymentDetailsList = new ArrayList<>();

        if(transactionDao1.getTransactionComId() != 0){

            PaymentDao paymentDao = new PaymentDao();
            paymentDao = transactionDao.getPaymentDao().get(0);

            if(null != paymentDao) {

                // This logic helps when user is returing the transactin by giving store credit to the user, so here i need to store store credit as negative value to show correct reporting.
                if(paymentDao.getStoreCredit() > 0 && transactionDao.getStatus().equalsIgnoreCase("Return")){
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

            if(null == lineItem.getDescription() || lineItem.getDescription().length() < 1) {
                ProductDao productDao = productRepository.findOneByProductNo(lineItem.getProductNo());

                if (null != productDao) {
                    lineItem.setDescription(productDao.getDescription());
                    transactionLineItemDaoList.add(lineItem);
                }

            }
            else {
                transactionLineItemDaoList.add(lineItem);
            }

        }

        transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoList);
        List<Object[]> result = paymentRepository.getPaymentDetailsByTransactionId(transactionDao.getTransactionComId());
        if(null != result)
        {
            for(Object[] j: result)
            {
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
                transactionDao.setPreviousBalance(Double.parseDouble(j[9].toString()));
                transactionDao.setTransactionBalance(Double.parseDouble(j[10].toString()));
                transactionDao.setUsername(String.valueOf(j[11]));
                transactionDao.setCustomerFirstLastName(String.valueOf(j[12]));

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
            context.setVariable("shipping", transactionDao.getShipping());
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
        EmailStatus emailStatus = emailHtmlSender.send(email, transactionDao.getStoreSetupDao().getName() + "Order Details", "template-1", context);

        return emailStatus.isSuccess();
    }

    public byte[] getA4Receipt(int receiptNo) throws DocumentException, IOException {

        TransactionDao transactionDao;

        // this will generate the PDF document as byte []
        Document doc = new Document(PageSize.A4);
        initializeFonts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);
        doc.open();
        PdfContentByte cb = writer.getDirectContent();


        // this method call the database and sends the receipt details
        transactionDao = getTransactionById(receiptNo);

        if (null != transactionDao) {

            printCustomerDetails(cb, transactionDao);
            printStoreDetails(cb, transactionDao);
            printTransactionDetails(doc, transactionDao);
            //generateLineItemTable(cb);

            printPageNumber(cb);
        }
        doc.close();

        return byteArrayOutputStream.toByteArray();
    }

    private void printTransactionDetails(Document doc, TransactionDao transactionDao) {

        try {
            float[] columnWidths = {3, 9, 2, 2, 2};
            float[] colWidht2 = {4, 4, 4, 4};


            doc.add(new Paragraph(":"));

            PdfPTable table = new PdfPTable(columnWidths);

           PdfPTable table1 = new PdfPTable(colWidht2);

            table.setSpacingBefore(5);
//                table.setSpacingAfter(100);

            table.setWidthPercentage(100);

            table.addCell(new Phrase("Product No", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            table.addCell(new Phrase("Product Description", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                table.addCell(new Phrase("Disc", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            table.addCell(new Phrase("Retail", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            table.addCell(new Phrase("Items", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            table.addCell(new Phrase("Total", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));


            DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date d = null;
            try {
                d = f.parse(transactionDao.getDate());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            DateFormat date = new SimpleDateFormat("MM/dd/yyyy");//NEED TO CHECK THIS
            DateFormat time = new SimpleDateFormat("hh:mm:ss");


            // this all dyanamic data which i s cmming form DB

           table1.addCell(new Phrase("Sale Date : " + date.format(d), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
           table1.addCell(new Phrase("Sale Time : " + time.format(d), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
           table1.addCell(new Phrase("CSR : " + transactionDao.getUsername(), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
           table1.addCell(new Phrase("Sales Id : " + transactionDao.getTransactionComId(), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

            for (TransactionLineItemDao lineItemDao : transactionDao.getTransactionLineItemDaoList()) {
                table.getDefaultCell().setBorder(Rectangle.NO_BORDER);
                table.addCell(new Phrase(lineItemDao.getProductNo(), new Font(Font.FontFamily.HELVETICA, 8)));
                table.addCell(new Phrase(lineItemDao.getDescription(), new Font(Font.FontFamily.HELVETICA, 8)));
//                    table.addCell(new Phrase("$ " + String.valueOf(lineItemDao.getDiscount()), new Font(Font.FontFamily.HELVETICA, 8)));
                table.addCell(new Phrase(String.valueOf(lineItemDao.getRetailWithDiscount()), new Font(Font.FontFamily.HELVETICA, 8)));
                table.addCell(new Phrase(String.valueOf(lineItemDao.getSaleQuantity()), new Font(Font.FontFamily.HELVETICA, 8)));
                table.addCell(new Phrase(String.valueOf(lineItemDao.getTotalProductPrice()), new Font(Font.FontFamily.HELVETICA, 8)));

            }

            table1.setSpacingBefore(80);
           table1.setWidthPercentage(100);

           table1.getDefaultCell().setBorder(Rectangle.NO_BORDER);

           doc.add(table1);
            doc.add(table);


            PdfPTable totalTable = new PdfPTable(2);
            totalTable.getDefaultCell().setBorder(Rectangle.NO_BORDER);

            totalTable.setSpacingBefore(40);
            totalTable.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalTable.setWidthPercentage(32);


            totalTable.addCell(new Phrase("Subtotal", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getSubtotal()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

            totalTable.addCell(new Phrase("Tax", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTax()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

            totalTable.addCell(new Phrase("Discount", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTotalDiscount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

            totalTable.addCell(new Phrase("Quantity", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            totalTable.addCell(new Phrase(String.valueOf(transactionDao.getQuantity()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));


            // No need to show previous balance, casue now i have change the logic to pay invoice by transaction to fix the close register and other reporting issues.
//                if(transactionDao.getPreviousBalance() != 0) {
//
//                    totalTable.addCell(new Phrase("Pre Balance", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPreviousBalance()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                }

            if(transactionDao.getShipping() > 0){

                totalTable.addCell(new Phrase("Shipping", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getShipping()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            }

            totalTable.addCell(new Phrase("Total", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
            totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTotalAmount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));


            if (null != transactionDao.getPaymentDao()) {

                for (PaymentDao paymentDaos : transactionDao.getPaymentDao()) {

                    Date d1 = null;
                    try {
                        d1 = f.parse(paymentDaos.getDate());
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    DateFormat payDate = new SimpleDateFormat("MM-dd-yyyy");//NEED TO CHECK THIS
                    DateFormat payTime = new SimpleDateFormat("hh:mm a");



                    if (paymentDaos.getCash() != 0) {
                        totalTable.addCell(new Phrase("Cash", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getCash()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase(payDate.format(d1)+" "+payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (paymentDaos.getChangeForCash() != 0) {
                        totalTable.addCell(new Phrase("Change", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getChangeForCash()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (paymentDaos.getCredit() != 0) {
                        totalTable.addCell(new Phrase("Credit Card", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getCredit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase(payDate.format(d1)+" "+payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (paymentDaos.getDebit() != 0) {
                        totalTable.addCell(new Phrase("Debit Card", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getDebit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase(payDate.format(d1)+" "+payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (paymentDaos.getCheckAmount() != 0) {
                        totalTable.addCell(new Phrase("Check", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getCheckAmount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase(payDate.format(d1)+" "+payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
// else if (paymentDaos.getOnAccount() != 0) {
//                        totalTable.addCell(new Phrase("On Account", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getOnAccount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
                    if (paymentDaos.getStoreCredit() != 0) {
                        totalTable.addCell(new Phrase("Store Credit", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getStoreCredit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

                        totalTable.addCell(new Phrase("Pay On", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase(payDate.format(d1)+" "+payTime.format(d1), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (paymentDaos.getLoyalty() != 0) {
                        totalTable.addCell(new Phrase("Loyalty", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(paymentDaos.getLoyalty()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }

                }

                if (transactionDao.getTransactionBalance() > 0) {

                    totalTable.addCell(new Phrase("Today's Balance Due", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTransactionBalance()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                }

                // Now to get sum of pending invoice to show, total balance due.

                if(null != transactionDao.getCustomerPhoneno())
                {
                    List<Double> totalDueBalance;
                    totalDueBalance = transactionRepository.getTransactionDueAmountByCustomer(transactionDao.getCustomerPhoneno());

                    if (null != totalDueBalance && null != totalDueBalance.get(0) && totalDueBalance.get(0) > 0) {
                        totalTable.addCell(new Phrase("Total Balance Due", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(totalDueBalance), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                }


            }


            doc.add(totalTable);

            Paragraph notes = new Paragraph("Receipt Notes: ");
            Paragraph transactionNotes = new Paragraph(transactionDao.getNote());
            transactionNotes.setSpacingBefore(30f);

            doc.add(notes);
            doc.add(transactionNotes);

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

//    public PdfPCell getCell(String text, int alignment) {
//        PdfPCell cell = new PdfPCell(new Phrase(text));
//        cell.setPadding(0);
//        cell.setHorizontalAlignment(alignment);
//        cell.setBorder(PdfPCell.NO_BORDER);
//        return cell;
//    }

    private void printCustomerDetails(PdfContentByte cb, TransactionDao transactionDao) {

        if (null != transactionDao && null != transactionDao.getCustomerPhoneno()) {


            String test = transactionDao.getCustomerPhoneno();

            CustomerDao customerDao = customerManager.getCustomerByPhoneNo(test);

            if (null != customerDao) {

                createCustomerDetails(cb, 460, 800, customerDao.getCompanyName());
                createCustomerDetails(cb, 460, 785, customerDao.getName());
                createCustomerDetails(cb, 460, 770, customerDao.getStreet());
                createCustomerDetails(cb, 460, 755, customerDao.getCity() + customerDao.getState() + customerDao.getZipCode());
                createCustomerDetails(cb, 460, 740, customerDao.getCountry());
            }
        }

    }

    private void printStoreDetails(PdfContentByte cb, TransactionDao transactionDao) {

        if (null != transactionDao.getStoreSetupDao()) {
            createCustomerDetails(cb, 35, 800, transactionDao.getStoreSetupDao().getName());
            createCustomerDetails(cb, 35, 785, transactionDao.getStoreSetupDao().getStreet());
            createCustomerDetails(cb, 35, 770, transactionDao.getStoreSetupDao().getCity() + " ," + transactionDao.getStoreSetupDao().getState() + " - " + transactionDao.getStoreSetupDao().getZipcode());
            createCustomerDetails(cb, 35, 755, "USA");
            createCustomerDetails(cb, 35, 740, transactionDao.getStoreSetupDao().getPhoneNo());
        }


    }

    private void initializeFonts() {


        try {
            bfBold = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);

        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }


    }

    private void printPageNumber(PdfContentByte cb) {


        cb.beginText();
        cb.setFontAndSize(bfBold, 8);
        cb.showTextAligned(PdfContentByte.ALIGN_CENTER, "Page No. " + (pageNumber + 1), 570, 25, 0);
        cb.endText();

        pageNumber++;

    }

    private void createCustomerDetails(PdfContentByte cb, float x, float y, String text) {


        cb.beginText();
        cb.setFontAndSize(bfBold, 8);
        cb.setTextMatrix(x, y);

        if (null != text)
            cb.showText(text.trim());
        cb.endText();

    }
    private void headerDetails(PdfContentByte cb, float x, float y, String text) {


        cb.beginText();
        cb.setFontAndSize(bfBold, 12);
        cb.setTextMatrix(x, y);

        if (null != text)
            cb.showText(text.trim());
        cb.endText();

    }

    private void createHeadings(PdfContentByte cb, float x, float y, String text) {


        cb.beginText();
        cb.setFontAndSize(bfBold, 8);
        cb.setTextMatrix(x, y);
        cb.showText(text.trim());
        cb.endText();

    }

    private void createContent(PdfContentByte cb, float x, float y, String text, int align) {


        cb.beginText();
        cb.setFontAndSize(bf, 8);
        cb.showTextAligned(align, text.trim(), x, y, 0);
        cb.endText();

    }


    public List<TransactionDao> getPendingInvoiceByCustomer(String phoneNo) {

        return transactionRepository.findAllByStatusEqualsAndCustomerPhoneno("Pending", phoneNo);
    }

    public List<TransactionDao> getAllInvoiceByCustomer(String startDate, String endDate, String phoneNo) {

        List<TransactionDao> transactionDaoList = new ArrayList<>();
        List<TransactionDao> newTransactionDaoList = new ArrayList<>();


        transactionDaoList = transactionRepository.findAllByCustomerPhonenoAndDateBetweenOrderByDateDesc(phoneNo, startDate, endDate);

        if(null != transactionDaoList) {
            for (TransactionDao transactionDao : transactionDaoList) {

                List<PaymentDao> paymentDaoList = paymentRepository.findAllByTransactionComId(transactionDao.getTransactionComId());
                if(null != paymentDaoList){
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
}
