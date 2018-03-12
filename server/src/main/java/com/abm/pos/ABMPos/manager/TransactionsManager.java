package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.ReceiptFormatter;
import com.abm.pos.ABMPos.dao.*;
import com.abm.pos.ABMPos.repository.*;
import com.abm.pos.ABMPos.util.Utility;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;

import jpos.JposException;
import jpos.POSPrinter;
import jpos.CashDrawer;
import jpos.POSPrinterConst;
import jpos.util.JposPropertiesConst;
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
        if ((transactionDao.getStatus().equalsIgnoreCase("Complete") || transactionDao.getStatus().equalsIgnoreCase("Pending"))) {

            if (null != transactionDao.getTransactionLineItemDaoList()) {
                for (TransactionLineItemDao transactionLineItemDao : transactionDao.getTransactionLineItemDaoList()) {
                    ProductDao productDao = productRepository.findOneByProductNo(transactionLineItemDao.getProductNo());

                    if (null != productDao) {

                        // Here I am assuming when TAX = 0, that mean do not count inventory at all, so no need to Reduce the quantity.
                        if (productDao.isTax()) {
                            productDao.setQuantity(productDao.getQuantity() - transactionLineItemDao.getSaleQuantity());
                            productRepository.save(productDao);
                        }

                        // This is the digital punching logic for EYEBROW only :)
                        if (productDao.getProductNo().equalsIgnoreCase("100000000014") && productDao.isEnableDigitalPunch()) {
                            if (null != transactionDao.getCustomerPhoneno()) {
                                CustomerDao customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());

                                if (null != customerDao) {
                                    customerDao.setNoOfEyebrow(customerDao.getNoOfEyebrow() + 1);
                                    // Just for testing
                                    //sendEmailForEyebrowReminder(transactionDao, customerDao);

                                    //Here Need to send an email to the customer on his/her 5th eyebrow, doing with 6 cause i am doing +1 before.
                                    if (customerDao.getNoOfEyebrow() == 6 && null != customerDao.getEmail()) {
                                        //sendEmailForEyebrowReminder(transactionDao, customerDao);
                                    }

                                    // Here i need to reset the count after customer reach to final service.
                                    if (customerDao.getNoOfEyebrow() > productDao.getNoOfSaleForFreeService()) {
                                        customerDao.setNoOfEyebrow(0);
                                    }
                                    customerRepository.save(customerDao);
                                }
                            }
                        }
                    }
                }
            }

            if (null != transactionDao.getCustomerPhoneno()) {
                if (transactionDao.getTransactionBalance() >= 0) {
                    setCustomerBalance(transactionDao);
                }

                // Here i need to handle the case where customer is using Store credit to pay the amount.
                // I need to update the store credit for the customer and handle the transaction.
                if (transactionDao.getPaymentDao().get(0).getStoreCredit() > 0) {
                    setCustomerStoreCredit(transactionDao);
                }
                // Here i need to handle the case where customer is using Loyalty Amount to pay the amount.
                // I need to update the Loyalty  Amount for the customer and handle the transaction.
                if (transactionDao.getPaymentDao().get(0).getLoyalty() > 0) {
                    setCustomerLoyalty(transactionDao);
                }
                // Now here i need to check if loyalty enable for this store or not
                // If Yes then i need to give customer loyalty points for the amount of purchase.
                if (storeSetupRepository.getOne(1).getLoyaltyAmountForDollar() > 0) {
                    double loyaltyAmount = (transactionDao.getSubtotal() - transactionDao.getTotalDiscount()) / storeSetupRepository.getOne(1).getLoyaltyAmountForDollar();
                    addCustomerLoyaltyAmount(transactionDao, loyaltyAmount);
                }
            }
        }
        if ((transactionDao.getStatus().equalsIgnoreCase("Return") || transactionDao.getStatus().equalsIgnoreCase("Void"))) {


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

                } else if (transactionDao.getPaymentDao().get(0).getOnAccount() > 0) {
                    // First check this customer has any balance on account or not, if yes then check return amount on account if it is less than return amount then subtract the amount other wise
                    //Subtract the amount and rest of the amount just add as the store credit.

                    if (customerDao.getBalance() >= transactionDao.getPaymentDao().get(0).getOnAccount()) {
                        customerDao.setBalance(customerDao.getBalance() - transactionDao.getPaymentDao().get(0).getOnAccount());
                    } else {
                        double difference = transactionDao.getPaymentDao().get(0).getOnAccount() - customerDao.getBalance();

                        // This will make customer balance as 0.
                        customerDao.setBalance(0.00);

                        customerDao.setStoreCredit(difference);


                        StoreCreditDao storeCreditDao = new StoreCreditDao();
                        storeCreditDao.setAmount(transactionDao.getPaymentDao().get(0).getStoreCredit());
                        storeCreditDao.setCustomerPhoneno(transactionDao.getCustomerPhoneno());
                        storeCreditDao.setEmployeeName(transactionDao.getUsername());
                        storeCreditDao.setReason("Return Credit For Transaction No: " + transactionDao.getTransactionComId());
                        storeCreditDao.setCreatedTimestamp(transactionDao.getDate());

                        storeCreditRepository.save(storeCreditDao);
                    }
                }

                // finally updating customers account details whether it is store credit or on on account choose by the customer on the
                customerRepository.save(customerDao);
            }

        }


        return transactionRepository.save(transactionDao);
    }


    private boolean sendEmailForEyebrowReminder(TransactionDao transactionDao, CustomerDao customerDao) {

        Context context = new Context();
        String email = null;

        StoreSetupDao storeSetupDao = storeSetupRepository.findOne(1);

        context = setCustomerDetailsToSendEmail(customerDao, context);
        email = customerDao.getEmail();

        if (null != storeSetupDao) {
            context.setVariable("storeDetails", storeSetupDao);
        }


        assert storeSetupDao != null;
        EmailStatus emailStatus = emailHtmlSender.send(email, storeSetupDao.getName() + " Purchase Detail", "eyebrowNotification", context);

        return emailStatus.isSuccess();
    }

    private Context setCustomerDetailsToSendEmail(CustomerDao customerDao, Context context) {
        if (null != customerDao && null != customerDao.getEmail()) {
            context.setVariable("firstName", customerDao.getName());
            context.setVariable("companyName", customerDao.getCompanyName());
            context.setVariable("addressLine", customerDao.getStreet());
            context.setVariable("City", customerDao.getCity());
            context.setVariable("State", customerDao.getState());
            context.setVariable("zipcode", customerDao.getZipCode());
            context.setVariable("phoneNo", customerDao.getPhoneNo());
        }
        return context;
    }


    private void addCustomerLoyaltyAmount(TransactionDao transactionDao, double loyaltyAmount) {

        CustomerDao customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());
        if (null != customerDao) {
            customerDao.setLoyalty(customerDao.getLoyalty() + loyaltyAmount);
            customerRepository.save(customerDao);
        }

    }

    private void setCustomerLoyalty(TransactionDao transactionDao) {

        CustomerDao customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());
        if (null != customerDao) {
            customerDao.setLoyalty(customerDao.getLoyalty() - transactionDao.getPaymentDao().get(0).getLoyalty());
            customerRepository.save(customerDao);
        }

    }

    private void setCustomerStoreCredit(TransactionDao transactionDao) {

        CustomerDao customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());

        if (null != customerDao) {
            customerDao.setStoreCredit(customerDao.getStoreCredit() - transactionDao.getPaymentDao().get(0).getStoreCredit());

            customerRepository.save(customerDao);
        }

    }

    //    Here i need to handle the scenario where customer is doing partial payment, or not paying right now and will pay later so
    //    Here i need to maintain his balance by just adding transaction balance to that customers account

    private void setCustomerBalance(TransactionDao transactionDao) {
        CustomerDao customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());

        if (null != customerDao) {
            customerDao.setBalance(transactionDao.getTransactionBalance());

            customerRepository.save(customerDao);
        }
    }


    public List<TransactionDao> getTransaction() {

        List<TransactionDao> transactionDaoList = new ArrayList<>();

        transactionDaoList = transactionRepository.findAll();
        List<TransactionDao> transactionDaoFinal = new ArrayList<>();


        if (null != transactionDaoList) {
            ProductDao productDao = new ProductDao();
            List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();

            for (TransactionDao transactionDao : transactionDaoList) {
                for (TransactionLineItemDao lineItem : transactionDao.getTransactionLineItemDaoList()) {
                    productDao = productRepository.findOneByProductNo(lineItem.getProductNo());

                    if (null != productDao) {
                        lineItem.setDescription(productDao.getDescription());
                        transactionLineItemDaoList.add(lineItem);
                    }
                }

                transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoList);

                transactionDaoFinal.add(transactionDao);
            }
        }

        return transactionDaoFinal;
    }

    public TransactionDao getTransactionById(int transactionCompId) {

        // just basic java logic to get the details from db
        TransactionDao transactionDao = transactionRepository.findOne(transactionCompId);
        List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();

        if (null != transactionDao) {
            for (TransactionLineItemDao lineItem : transactionDao.getTransactionLineItemDaoList()) {
                ProductDao productDao = productRepository.findOneByProductNo(lineItem.getProductNo());

                if (null != productDao) {
                    lineItem.setDescription(productDao.getDescription());
                    transactionLineItemDaoList.add(lineItem);
                }
            }

            transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoList);
        }

        return transactionDao;
    }

    public List<TransactionDao> getTransactionByDate(String startDate, String endDate) {

        List<TransactionDao> transactionDaoList;

        transactionDaoList = transactionRepository.getTransactionByDate(startDate, endDate);

        List<TransactionDao> transactionDaoFinal = new ArrayList<>();


        if (null != transactionDaoList) {
            ProductDao productDao;


            for (TransactionDao transactionDao : transactionDaoList) {
                List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();
                for (TransactionLineItemDao lineItem : transactionDao.getTransactionLineItemDaoList()) {
                    productDao = productRepository.findOneByProductNo(lineItem.getProductNo());

                    if (null != productDao) {
                        lineItem.setDescription(productDao.getDescription());
                        transactionLineItemDaoList.add(lineItem);
                    }

                }
                transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoList);


                transactionDaoFinal.add(transactionDao);
            }

        }

        return transactionDaoFinal;


    }

    public TransactionDao voidTransaction(TransactionDao transactionDao) {


        return transactionRepository.save(transactionDao);
    }

    public boolean sendEmail(int receiptId) {

        //String customerEmail =  jdbcTemplate.queryForObject(sqlQuery.getCustomerEmail, new Object[]{receiptId}, String.class);

        Context context = new Context();

        TransactionDao transactionDao = getTransactionById(receiptId);

        String email = null;
        StoreSetupDao storeSetupDao = null;

        if (null != transactionDao && transactionDao.getCustomerPhoneno().length() > 1 && null != transactionDao.getTransactionLineItemDaoList() && null != transactionDao.getPaymentDao()) {

            //First get customer details to send an email.

            CustomerDao customerDao = new CustomerDao();

            customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());
            storeSetupDao = storeSetupRepository.findOne(1);

            if (null != customerDao) {
                context = setCustomerDetailsToSendEmail(customerDao, context);
                email = customerDao.getEmail();
            }

            if (null != storeSetupDao) {
                context.setVariable("storeDetails", storeSetupDao);
            }

            //setting line item details
            context.setVariable("lineItem", transactionDao.getTransactionLineItemDaoList());

            //setting transaction details
            context.setVariable("subtotal", transactionDao.getSubtotal());
            context.setVariable("shipping", "00");//TODO need to figure out this problem
            context.setVariable("quantity", transactionDao.getQuantity());
            context.setVariable("discount", transactionDao.getTotalDiscount());
            context.setVariable("previousBalance", transactionDao.getPreviousBalance());
            context.setVariable("salesTax", transactionDao.getTax());
            context.setVariable("grandTotal", transactionDao.getTotalAmount());
            context.setVariable("balance", transactionDao.getTransactionBalance());


            //By this logic if email is failing i will get an email
//            if( null != receiptDtoList.get(0).getCustomerDtosList().get(0).getEmail())
//            {
//                email = receiptDtoList.get(0).getCustomerDtosList().get(0).getEmail();
//            }

        }

        assert storeSetupDao != null;
        EmailStatus emailStatus = emailHtmlSender.send(email, storeSetupDao.getName() + " Order Details", "template-1", context);

        return emailStatus.isSuccess();
    }

    public byte[] getA4Receipt(int receiptNo) throws DocumentException {

        TransactionDao transactionDao = new TransactionDao();

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
            printTransactionDetails(doc, cb, transactionDao);
            generateLineItemTable(cb);

            printPageNumber(cb);
        }
        doc.close();

        return byteArrayOutputStream.toByteArray();
    }

    private void printTransactionDetails(Document doc, PdfContentByte cb, TransactionDao transactionDao) {

        try {


            if (transactionDao.getTransactionLineItemDaoList().size() > 0) {

                float[] columnWidths = {3, 7, 2, 2, 2, 2};
                float[] colWidht2 = {4, 4, 4, 4};


                doc.add(new Paragraph(":"));

                PdfPTable table = new PdfPTable(columnWidths);

                PdfPTable table1 = new PdfPTable(colWidht2);

                table.setSpacingBefore(5);
//                table.setSpacingAfter(100);

                table.setWidthPercentage(100);

                table.addCell(new Phrase("Product No", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                table.addCell(new Phrase("Product Description", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                table.addCell(new Phrase("Disc", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
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
                    table.addCell(new Phrase("$ " + String.valueOf(lineItemDao.getDiscount()), new Font(Font.FontFamily.HELVETICA, 8)));
                    table.addCell(new Phrase("$ " + String.valueOf(lineItemDao.getRetail()), new Font(Font.FontFamily.HELVETICA, 8)));
                    table.addCell(new Phrase(String.valueOf(lineItemDao.getSaleQuantity()), new Font(Font.FontFamily.HELVETICA, 8)));
                    table.addCell(new Phrase("$ " + String.valueOf(lineItemDao.getTotalProductPrice()), new Font(Font.FontFamily.HELVETICA, 8)));

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
                totalTable.setWidthPercentage(30);


                totalTable.addCell(new Phrase("Subtotal", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getSubtotal()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

                totalTable.addCell(new Phrase("Tax", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTax()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

                totalTable.addCell(new Phrase("Discount", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTotalDiscount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));

                if (transactionDao.getPreviousBalance() != 0) {

                    totalTable.addCell(new Phrase("Pre Balance", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPreviousBalance()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                }

                totalTable.addCell(new Phrase("Total", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTotalAmount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));


                if (null != transactionDao.getPaymentDao()) {
                    if (transactionDao.getPaymentDao().get(0).getCash() != 0) {
                        totalTable.addCell(new Phrase("Cash", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getCash()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (transactionDao.getPaymentDao().get(0).getChangeForCash() != 0) {
                        totalTable.addCell(new Phrase("Change", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getChangeForCash()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (transactionDao.getPaymentDao().get(0).getCredit() != 0) {
                        totalTable.addCell(new Phrase("Credit", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getCredit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (transactionDao.getPaymentDao().get(0).getDebit() != 0) {
                        totalTable.addCell(new Phrase("Debit", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getDebit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (transactionDao.getPaymentDao().get(0).getCheckAmount() != 0) {
                        totalTable.addCell(new Phrase("Check", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getCheckAmount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    } else if (transactionDao.getPaymentDao().get(0).getOnAccount() != 0) {
                        totalTable.addCell(new Phrase("On Account", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getOnAccount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (transactionDao.getPaymentDao().get(0).getStoreCredit() != 0) {
                        totalTable.addCell(new Phrase("Store Credit", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getStoreCredit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    if (transactionDao.getPaymentDao().get(0).getLoyalty() != 0) {
                        totalTable.addCell(new Phrase("Loyalty", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getLoyalty()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
                    totalTable.addCell(new Phrase("Balance Due", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTransactionBalance()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                }


                doc.add(totalTable);

            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    public PdfPCell getCell(String text, int alignment) {
        PdfPCell cell = new PdfPCell(new Phrase(text));
        cell.setPadding(0);
        cell.setHorizontalAlignment(alignment);
        cell.setBorder(PdfPCell.NO_BORDER);
        return cell;
    }

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

        createCustomerDetails(cb, 35, 800, "Excel Wireless");
        createCustomerDetails(cb, 35, 785, "5955 Jimmy Carter Boulevard, Suite 120");
        createCustomerDetails(cb, 35, 770, "Norcross, GA - 30071");
        createCustomerDetails(cb, 35, 755, "USA");
        createCustomerDetails(cb, 35, 740, "(678) 694-1873");
    }


    private void generateLineItemTable(PdfContentByte cb) {

        try {

            // Invoice Header box layout
            // cb.rectangle(35,800,50,50);
//            cb.moveTo(35,720);
//            cb.lineTo(570,720);
//
//
//            cb.moveTo(70,720);
//            cb.lineTo(570,720);

//            cb.moveTo(420,740);
//            cb.lineTo(570,740);
//            cb.moveTo(480,700);
//            cb.lineTo(480,760);
            //  cb.stroke();


            // Invoice Header box Text Headings.
//            createHeadings(cb,422,743,"Account No.");
//            createHeadings(cb,422,723,"Invoice No.");
//            createHeadings(cb,422,703,"Invoice Date");


        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void initializeFonts() {


        try {
            bfBold = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);

        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
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

    public String printTransaction(int transactionId) throws ParseException {
        System.setProperty(JposPropertiesConst.JPOS_POPULATOR_FILE_PROP_NAME, "C:\\jpos.xml");

        String ESC = ((char) 0x1b) + "";
        String LF = ((char) 0x0a) + "";

        String GS = ((char) 0x1d) + "";

        POSPrinter printer = new POSPrinter();
        //CashDrawer drawer = new CashDrawer();

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

            //drawer.open("CashDrawer1");
            //drawer.claim(1000);
            //drawer.setDeviceEnabled(true);
           // drawer.openDrawer();
        } catch (JposException e) {
            //e.printStackTrace();
            error = e.getMessage();
        } finally {
            try {
                printer.close();
               // drawer.close();
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
