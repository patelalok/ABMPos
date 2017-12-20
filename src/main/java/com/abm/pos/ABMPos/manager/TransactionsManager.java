package com.abm.pos.ABMPos.manager;

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
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    private BaseFont bfBold;
    private BaseFont bf;
    private int pageNumber = 0;


    public TransactionDao addTransaction(TransactionDao transactionDao) {

        if (null != transactionDao && transactionDao.getStatus().equalsIgnoreCase("Return")) {

            // Managing inventory for the return

            ProductInventoryDao productInventoryDao = new ProductInventoryDao();

            for (TransactionLineItemDao lineItemDao : transactionDao.getTransactionLineItemDaoList()) {
                productInventoryDao.setProductNo(lineItemDao.getProductNo());
                productInventoryDao.setCost(Math.abs(lineItemDao.getCost()));
                productInventoryDao.setRetail(Math.abs((lineItemDao.getRetail())));
                productInventoryDao.setQuantity(lineItemDao.getQuantity());
                productInventoryDao.setCreatedTimestamp(transactionDao.getDate());

                productInventoryRepository.save(productInventoryDao);
            }


            // Handing store credit here
            // This means user is giving store credit to the customer so i need to add customers store credit with valid reason.
            if (null != transactionDao.getCustomerPhoneno() && null != transactionDao.getPaymentDao() && transactionDao.getPaymentDao().get(0).getStoreCredit() > 0) {
                StoreCreditDao storeCreditDao = new StoreCreditDao();

                storeCreditDao.setAmount(transactionDao.getPaymentDao().get(0).getStoreCredit());
                storeCreditDao.setCustomerPhoneno(transactionDao.getCustomerPhoneno());
                storeCreditDao.setEmployeeName(transactionDao.getUsername());
                storeCreditDao.setReason("Return Credit For Transaction No: " + transactionDao.getTransactionComId());
                storeCreditDao.setCreatedTimestamp(transactionDao.getDate());

                storeCreditRepository.save(storeCreditDao);

                CustomerDao customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());

                // This add the store credit into customer's account
                if (null != customerDao) {
                    customerDao.setStoreCredit(customerDao.getStoreCredit() + transactionDao.getPaymentDao().get(0).getStoreCredit());

                    customerRepository.save(customerDao);
                }


            }
        } else {

            List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();
            List<TransactionLineItemDao> transactionLineItemDaoListNew = new ArrayList<>();


            transactionLineItemDaoList = transactionDao.getTransactionLineItemDaoList();


            for (TransactionLineItemDao lineItemDao : transactionLineItemDaoList) {
                // I need to set this up to keep track of the inventory, so with this i will know, whether i need to call Product inventory table again or not.
                // So with first call if parchedQuantity == 0 that mean we can full fill this sale we do not need to check for other inventory for this product but if not
                // Then we need to keep doing this process until parched Quantity == 0.
                int purchasedQuantity = lineItemDao.getQuantity();


                do {
                    // step 1 : get the product from line item and then get the quantity for that product from inventory table on behalf of created time stamps.
                    ProductInventoryDao productInventoryDao = new ProductInventoryDao();

                    // This call will give product inventory details on behalf of FIFO.
                    productInventoryDao = productInventoryRepository.findFirstByProductNoOrderByCreatedTimestampAsc(lineItemDao.getProductNo());


                    if (null != productInventoryDao) {
                        // This is best case.
                        if (productInventoryDao.getQuantity() > purchasedQuantity) {

                            // This is Important because i need to set cost price separately that's why i need to do this.
                            lineItemDao.setCost(productInventoryDao.getCost());
                            transactionLineItemDaoListNew.add(lineItemDao);

                            reduceQuantityFromProductInventoryTable(productInventoryDao, purchasedQuantity);

                            purchasedQuantity = 0;
                        }
                        // This means we do not have enough inventory to sale, so we can sale wt we have and then call inventory table again until purchase item == 0.
                        else if (productInventoryDao.getQuantity() > 0) {
                            lineItemDao.setCost(productInventoryDao.getCost());
                            lineItemDao.setQuantity(productInventoryDao.getQuantity());

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
                        System.out.println("OPPS Some problem need to handle this.");
                    }
                }

                while (purchasedQuantity != 0);

            }

            transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoListNew);

//        Here i need to handle the scenario where customer is doing partial payment, or not paying right now and will pay later so
//        Here i need to maintain his balance by just adding transaction balance to that customers account
            // I am doing this only if customer is doing partial payment cause only in that case customers balance will be more then 0.

            if (null != transactionDao.getCustomerPhoneno() && transactionDao.getTransactionBalance() >= 0) {
                setCustomerBalance(transactionDao);
            }

            // Here i need to handle the case where customer is using Store credit to pay the amount.
            // I need to update the store credit for the customer and handle the transaction.

            if (null != transactionDao.getCustomerPhoneno() && transactionDao.getPaymentDao().get(0).getStoreCredit() > 0) {
                setCustomerStoreCredit(transactionDao);
            }
        }


        return transactionRepository.save(transactionDao);


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
        productInventoryRepository.save(productInventoryDao);
    }


    public List<TransactionDao> getTransaction() {

        List<TransactionDao> transactionDaoList = new ArrayList<>();

        transactionDaoList = transactionRepository.findAll();
        List<TransactionDao> transactionDaoFinal = new ArrayList<>();


        if(null != transactionDaoList)
        {
            ProductDao productDao = new ProductDao();
            List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();

            for(TransactionDao transactionDao: transactionDaoList)
            {
                for(TransactionLineItemDao lineItem: transactionDao.getTransactionLineItemDaoList())
                {
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

        TransactionDao transactionDao = transactionRepository.findOne(transactionCompId);
        List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();

        if(null != transactionDao)
        {
            for(TransactionLineItemDao lineItem: transactionDao.getTransactionLineItemDaoList())
            {
                ProductDao productDao = productRepository.findOneByProductNo(lineItem.getProductNo());

                if (null != productDao) {
                    lineItem.setDescription(productDao.getDescription());
                    transactionLineItemDaoList.add(lineItem);
                }
            }

            transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoList);
        }

        return  transactionDao;
    }

    public List<TransactionDao> getTransactionByDate(String startDate, String endDate) {

        return transactionRepository.getTransactionByDate(startDate, endDate);
    }

    public void voidTransaction(TransactionDao transactionDao) {

        this.transactionRepository.save(transactionDao);
    }

    public byte[] getA4Receipt(int receiptNo) throws DocumentException {

        TransactionDao transactionDao = new TransactionDao();

        Document doc = new Document(PageSize.A4);
        initializeFonts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);
        doc.open();
        PdfContentByte cb = writer.getDirectContent();

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
                    table.addCell(new Phrase(String.valueOf(lineItemDao.getQuantity()), new Font(Font.FontFamily.HELVETICA, 8)));
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

                if(transactionDao.getPreviousBalance() != 0) {

                    totalTable.addCell(new Phrase("Pre Balance", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPreviousBalance()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                }

                totalTable.addCell(new Phrase("Total", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getTotalAmount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));


                if (null != transactionDao.getPaymentDao()) {
                    if (transactionDao.getPaymentDao().get(0).getCash() != 0) {
                        totalTable.addCell(new Phrase("Cash", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getCash()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    } else if (transactionDao.getPaymentDao().get(0).getChangeForCash() != 0) {
                        totalTable.addCell(new Phrase("Change", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getChangeForCash()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    } else if (transactionDao.getPaymentDao().get(0).getCredit() != 0) {
                        totalTable.addCell(new Phrase("Credit", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getCredit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    } else if (transactionDao.getPaymentDao().get(0).getDebit() != 0) {
                        totalTable.addCell(new Phrase("Debit", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getDebit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    } else if (transactionDao.getPaymentDao().get(0).getCheckAmount() != 0) {
                        totalTable.addCell(new Phrase("Check", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getCheckAmount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    }
//                    else if (transactionDao.getPaymentDao().get(0).getOnAccount() > 0) {
//                        totalTable.addCell(new Phrase("On Account", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getOnAccount()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
//                    }
                    else if (transactionDao.getPaymentDao().get(0).getStoreCredit() != 0) {
                        totalTable.addCell(new Phrase("Store Credit", new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                        totalTable.addCell(new Phrase("$ " + String.valueOf(transactionDao.getPaymentDao().get(0).getStoreCredit()), new Font(Font.FontFamily.HELVETICA, 8, Font.BOLD)));
                    } else if (transactionDao.getPaymentDao().get(0).getLoyalty() != 0) {
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


}
