package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.StoreSetupDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dto.DateTimeDto;
import com.abm.pos.ABMPos.dto.PaymentHistoryDto;
import com.abm.pos.ABMPos.repository.CustomerRepository;
import com.abm.pos.ABMPos.repository.PaymentRepository;
import com.abm.pos.ABMPos.repository.StoreSetupRepository;
import com.abm.pos.ABMPos.repository.TransactionRepository;
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

@Component
public class PaymentManager {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StoreSetupRepository storeSetupRepository;

    private BaseFont bfBold;
    private BaseFont bf;
    private int pageNumber = 0;

    public byte[] addPayment(List<PaymentDao> paymentDaoList) throws DocumentException {

        byte[] response = new byte[0];

        if (null != paymentDaoList) {
            for (PaymentDao paymentDao : paymentDaoList) {

                // This means Customer has paid the invoice.
                if (paymentDao.getTransactionComId() > 0 && paymentDao.getStatus().equalsIgnoreCase("Complete")) {
                    TransactionDao transactionDao = transactionRepository.getOne(paymentDao.getTransactionComId());
                    if (null != transactionDao) {
                        transactionDao.setStatus(paymentDao.getStatus());
                        transactionDao.setTransactionBalance(0.00);
                        transactionRepository.save(transactionDao);
                        System.out.println("Customer Has Paid full invoice" + transactionDao.getTransactionComId());
                    }
                } else if (paymentDao.getTransactionComId() > 0 && paymentDao.getStatus().equalsIgnoreCase("Pending")) {
                    TransactionDao transactionDao = transactionRepository.getOne(paymentDao.getTransactionComId());
                    if (null != transactionDao) {
                        transactionDao.setStatus(paymentDao.getStatus());
                        transactionDao.setTransactionBalance(transactionDao.getTransactionBalance() - paymentDao.getAmount());
                        transactionRepository.save(transactionDao);
                        System.out.println("Customer Has not Paid full invoice" + transactionDao.getTransactionComId());
                    }
                }
            }
        }

        List<PaymentDao> paymentDaoListAfterAdd = paymentRepository.save(paymentDaoList);

        // In this case i need to generate pdf for user to print it.
        if (null != paymentDaoListAfterAdd) {

            response = generatePaymentInvoice(paymentDaoListAfterAdd);
        }

        return response;
    }

    private byte[] generatePaymentInvoice(List<PaymentDao> paymentDaoListAfterAdd) throws DocumentException {

        Document doc = new Document(PageSize.A4);
        initializeFonts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);
        PdfPTable table = new PdfPTable(1);
        table.setTotalWidth(523);
        PdfPCell cell = new PdfPCell(new Phrase("***** ALL SALES ARE FINAL NO EXCHANGE AND NO RETURN ACCEPTED *****", FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBorder(0);
        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);


        table.addCell(cell);
        cell = new PdfPCell(new Phrase("Any item returned its need to be in original packaging and only eligible for exchange and store credit as long as there is no physical damage and discontinued by carriers. If you prefer a store credit you will be refunded at the current sale price of the item or your purchase price(which is lower) and also 15% Restocking fess apply after 15 days period.", FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)));
        cell.setBorder(0);

        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
        table.addCell(cell);


        cell = new PdfPCell(new Phrase("***** NO PHYSICAL DAMAGE COVERED *****", FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBorder(0);
        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);


        table.addCell(cell);

        TransactionsManager.FooterTable event = new TransactionsManager.FooterTable(table);
        writer.setPageEvent(event);

        doc.open();
        PdfContentByte cb = writer.getDirectContent();

        if (null != paymentDaoListAfterAdd && paymentDaoListAfterAdd.size() > 0) {

            printStoreDetails(doc, paymentDaoListAfterAdd);
        }

        doc.close();

        return byteArrayOutputStream.toByteArray();
    }

    public List<PaymentHistoryDto> getPaymentHistory(String startDate, String endDate) {

        List<PaymentHistoryDto> paymentHistoryDtoList = new ArrayList<>();
        List<Object[]> result = paymentRepository.getPaymentHistory(startDate, endDate);

        if (null != result) {
            for (Object[] j : result) {
                PaymentHistoryDto paymentHistoryDto = new PaymentHistoryDto();
                PaymentDao paymentDao = new PaymentDao();

                paymentDao.setTransactionPaymentId((Integer) j[0]);
                paymentDao.setTransactionComId((Integer) j[1]);

                if (null != j[2] && null != j[3] && null != j[4]) {
                    paymentDao.setStatus(j[2].toString());
                    paymentDao.setDate(j[3].toString());
                    paymentDao.setType(j[4].toString());
                }

                paymentDao.setAmount(Double.parseDouble(j[5].toString()));

                // For now commenting this cause its throwing null pointer
                //paymentHistoryDto.setNote(j[6].toString());
                paymentHistoryDto.setTotalAmount(Double.parseDouble(j[7].toString()));

                if (null != j[8] && null != j[9]) {
                    paymentHistoryDto.setCustomerPhoneno(j[8].toString());
                    paymentHistoryDto.setCustomerFirstLastName(j[9].toString());
                }
                paymentHistoryDto.setTransactionBalance(Double.parseDouble(j[10].toString()));
                if (null != j[11]) {
                    paymentDao.setUsername(j[11].toString());
                }

                paymentHistoryDto.setPaymentDao(paymentDao);

                paymentHistoryDtoList.add(paymentHistoryDto);
            }
        }
        return paymentHistoryDtoList;

    }

    public PaymentDao voidPayment(PaymentHistoryDto paymentHistoryDto) {

        PaymentDao paymentDao = new PaymentDao();

        if (null != paymentHistoryDto && null != paymentHistoryDto.getPaymentDao() && paymentHistoryDto.getPaymentDao().getTransactionPaymentId() > 0 && paymentHistoryDto.getPaymentDao().getTransactionComId() > 0) {
            if (paymentHistoryDto.getPaymentDao().getStatus().equalsIgnoreCase("Complete") && paymentHistoryDto.getPaymentDao().getAmount() > 0) {
                // In Case of store credit void I need to put the store credit back to customers account.
                if (null != paymentHistoryDto.getCustomerPhoneno() && paymentHistoryDto.getPaymentDao().getType().equalsIgnoreCase("Store Credit")) {
                    CustomerDao customerDao = customerRepository.getOne(paymentHistoryDto.getCustomerPhoneno());
                    if (null != customerDao) {
                        customerDao.setStoreCredit(customerDao.getStoreCredit() + paymentHistoryDto.getPaymentDao().getAmount());
                        customerRepository.save(customerDao);
                    }
                }
                paymentDao = paymentHistoryDto.getPaymentDao();
                paymentDao.setStatus("Void");

                paymentDao = paymentRepository.save(paymentDao);

                // Now Need to get transaction and add the payment amount in transaction balance, also need to change the status to pending.
                TransactionDao transactionDao = transactionRepository.findOneByTransactionComId(paymentHistoryDto.getPaymentDao().getTransactionComId());

                if (null != transactionDao && transactionDao.getTotalAmount() >= paymentHistoryDto.getPaymentDao().getAmount()) {
                    transactionDao.setTransactionBalance(transactionDao.getTransactionBalance() + paymentHistoryDto.getPaymentDao().getAmount());
                    transactionDao.setStatus("Pending");
                    transactionDao.setTotalBalanceDue(transactionDao.getTotalBalanceDue() + paymentHistoryDto.getPaymentDao().getAmount());

                    transactionRepository.save(transactionDao);
                }
            }
        }
        return paymentDao;
    }

    private void initializeFonts() {


        try {
            bfBold = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);

        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }


    }

    public class FooterTable extends PdfPageEventHelper {
        protected PdfPTable footer;

        public FooterTable(PdfPTable footer) {
            this.footer = footer;
        }

        public void onEndPage(PdfWriter writer, Document document) {
            footer.writeSelectedRows(0, -4, 36, 64, writer.getDirectContent());
        }
    }

    private void printStoreDetails(Document doc, List<PaymentDao> paymentDaoListAfterAdd) throws DocumentException {


        if (paymentDaoListAfterAdd.size() > 0) {

            CustomerDao customerDao = null;

            PdfPTable storeTable = new PdfPTable(2);
            PdfPTable customerTable = new PdfPTable(2);
            PdfPTable paymentMethod = new PdfPTable(5);
            PdfPTable totalPaidAmount = new PdfPTable(2);
            PdfPTable totalDueAmount = new PdfPTable(2);


            String[] paymentHeader = new String[]{"INVOICE #", "DATE", "TIME", "PAID IN", "AMOUNT",};

            storeTable.setWidthPercentage(100);
            customerTable.setWidthPercentage(100);
            paymentMethod.setWidthPercentage(100);
            totalDueAmount.setWidthPercentage(100);
            totalPaidAmount.setWidthPercentage(100);

            PdfPCell logo = new PdfPCell();
            PdfPCell invoiceDetails = new PdfPCell();
            PdfPCell storeDetails = new PdfPCell();
            PdfPCell customerDetails = new PdfPCell();

            PdfPCell totalBalanceDue = new PdfPCell();
            PdfPCell totalBalanceDueAmount = new PdfPCell();

            PdfPCell totalPaidTextCell = new PdfPCell();
            PdfPCell totalPaidAmountCell = new PdfPCell();


            StoreSetupDao storeSetupDao = storeSetupRepository.findOne(1);

            if (null != storeSetupDao) {
                try {
                    if (null != storeSetupDao.getLogo()) {
                        Image companyLogo = Image.getInstance(storeSetupDao.getLogo());
                        logo.addElement(companyLogo);
                        logo.setPadding(0);
                        logo.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
                        logo.setBorder(PdfPCell.NO_BORDER);
                    }
                } catch (Exception e) {
                    System.out.println("Exception ===> Can not find logo for receipt" + e);
                }

                Paragraph storeName = new Paragraph(storeSetupDao.getName());
                storeName.setAlignment(PdfPCell.ALIGN_LEFT);
                Paragraph street = new Paragraph(storeSetupDao.getStreet());
                street.setAlignment(PdfPCell.ALIGN_LEFT);
                Paragraph city = new Paragraph(storeSetupDao.getCity() + " , " + storeSetupDao.getState() + " , " + storeSetupDao.getZipcode());
                city.setAlignment(PdfPCell.ALIGN_LEFT);
                Paragraph phoneNo = new Paragraph(storeSetupDao.getPhoneNo());
                phoneNo.setAlignment(PdfPCell.ALIGN_LEFT);
                Paragraph email = new Paragraph(storeSetupDao.getEmail());

                email.setAlignment(PdfPCell.ALIGN_LEFT);

                storeDetails.addElement(storeName);
                storeDetails.addElement(street);
                storeDetails.addElement(city);
                storeDetails.addElement(phoneNo);
                storeDetails.addElement(email);
                storeDetails.setBorder(PdfPCell.NO_BORDER);

            }


            DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Date d1 = null;
            try {
                d1 = f.parse(paymentDaoListAfterAdd.get(0).getDate());
            } catch (ParseException e) {
                e.printStackTrace();
            }
            DateFormat transDate = new SimpleDateFormat("MM-dd-yyyy");//NEED TO CHECK THIS
            DateFormat transTime = new SimpleDateFormat("hh:mm a");

            Paragraph paragraph = new Paragraph("PAYMENT INVOICE");
            paragraph.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph paragraph1 = new Paragraph("DATE: " + transDate.format(d1) + " - " + transTime.format(d1));
            paragraph1.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph paragraph2 = new Paragraph("CREATED BY: ");
            paragraph2.setAlignment(PdfPCell.ALIGN_RIGHT);

            invoiceDetails.addElement(paragraph);
            invoiceDetails.addElement(paragraph1);
            invoiceDetails.addElement(paragraph2);
            invoiceDetails.setBorder(PdfPCell.NO_BORDER);

            storeTable.addCell(logo);
            storeTable.addCell(invoiceDetails);

            // Now Lets get the customer phone no via transaction id and then get customer details to print on receipt.
            TransactionDao transactionDao = transactionRepository.findOneByTransactionComId(paymentDaoListAfterAdd.get(0).getTransactionComId());

            if (null != transactionDao && null != transactionDao.getCustomerPhoneno() && transactionDao.getCustomerPhoneno().length() > 1) {
                customerDao = customerRepository.findByPhoneNo(transactionDao.getCustomerPhoneno());

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

                for (String payment : paymentHeader) {
                    PdfPCell headerCell = new PdfPCell();
                    Paragraph paragraph3 = new Paragraph(payment, FontFactory.getFont(FontFactory.HELVETICA, 10, Font.BOLD));
                    paragraph3.setAlignment(Element.ALIGN_CENTER);
                    headerCell.addElement(paragraph3);
                    headerCell.setBorderColor(BaseColor.LIGHT_GRAY);
                    headerCell.setPadding(8);
                    paymentMethod.addCell(headerCell);
                }

                for (PaymentDao payment : paymentDaoListAfterAdd) {

                    try {
                        d1 = f.parse(payment.getDate());
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    DateFormat payDate = new SimpleDateFormat("MM-dd-yyyy");//NEED TO CHECK THIS
                    DateFormat payTime = new SimpleDateFormat("hh:mm a");

                    PdfPCell cell1 = new PdfPCell();
                    PdfPCell cell2 = new PdfPCell();
                    PdfPCell cell3 = new PdfPCell();
                    PdfPCell cell4 = new PdfPCell();
                    PdfPCell cell5 = new PdfPCell();


                    cell1.setFixedHeight(30);
                    cell2.setFixedHeight(30);
                    cell3.setFixedHeight(30);
                    cell4.setFixedHeight(30);
                    cell5.setFixedHeight(30);


                    cell1.setCellEvent(new PositionEvent(new Phrase(10, String.valueOf(payment.getTransactionComId()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                    cell2.setCellEvent(new PositionEvent(new Phrase(10, payDate.format(d1), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                    cell3.setCellEvent(new PositionEvent(new Phrase(10, payTime.format(d1), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                    cell4.setCellEvent(new PositionEvent(new Phrase(10, payment.getType(), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                    cell5.setCellEvent(new PositionEvent(new Phrase(10, "$ " + String.valueOf(payment.getAmount()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));


                    cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                    cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                    cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                    cell4.setBorderColor(BaseColor.LIGHT_GRAY);
                    cell5.setBorderColor(BaseColor.LIGHT_GRAY);


                    paymentMethod.addCell(cell1);
                    paymentMethod.addCell(cell2);
                    paymentMethod.addCell(cell3);
                    paymentMethod.addCell(cell4);
                    paymentMethod.addCell(cell5);

                }

                paymentMethod.setSpacingBefore(25);

            }

            totalPaidAmount.setSpacingBefore(25);

            double totalAmountPaid = 0.00;

            for (PaymentDao paymentDao : paymentDaoListAfterAdd) {
                totalAmountPaid = totalAmountPaid + paymentDao.getAmount();
            }

            Paragraph totalPaidAmountText = new Paragraph("TOTAL PAID AMOUNT", FontFactory.getFont(FontFactory.HELVETICA, 14, Font.BOLD));
            totalPaidAmountText.setAlignment(PdfPCell.ALIGN_LEFT);

            totalPaidTextCell.addElement(totalPaidAmountText);
            totalPaidTextCell.setBorder(PdfPCell.NO_BORDER);

            Paragraph totalPaidAmountText1 = new Paragraph("$ " + totalAmountPaid, FontFactory.getFont(FontFactory.HELVETICA, 14, Font.BOLD));
            totalPaidAmountText1.setAlignment(PdfPCell.ALIGN_RIGHT);

            totalPaidAmountCell.addElement(totalPaidAmountText1);
            totalPaidAmountCell.setBorder(PdfPCell.NO_BORDER);

            totalPaidAmount.addCell(totalPaidTextCell);
            totalPaidAmount.addCell(totalPaidAmountCell);


            totalDueAmount.setSpacingBefore(25);

            if (null != customerDao) {

                List<Double> totalDueBalance;

                // this will give live due amount but this is not what we want so i am commenting this.
                totalDueBalance = transactionRepository.getTransactionDueAmountByCustomer(transactionDao.getCustomerPhoneno());

                if (null != totalDueBalance && totalDueBalance.get(0) > 0) {

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
            doc.add(paymentMethod);
            doc.add(totalPaidAmount);
            doc.add(totalDueAmount);
        }
    }
}


