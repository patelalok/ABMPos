package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.ReportDao.InventoryDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesSummaryDto;
import com.abm.pos.ABMPos.dao.StoreSetupDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import com.abm.pos.ABMPos.dto.*;
import com.abm.pos.ABMPos.repository.*;
import com.abm.pos.ABMPos.util.Utility;
import com.google.api.client.util.NanoClock;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;


@Component
public class ReportManager {

    private final Utility utility;
    private final ProductInventoryRepository productInventoryRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final VendorRepository vendorRepository;
    private final TransactionRepository transactionRepository;
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private final StoreSetupRepository storeSetupRepository;
    @Autowired
    private TransactionsManager transactionsManager;
    @Autowired
    private CustomerManager customerManager;


    private BaseFont bfBold;
    private BaseFont bf;
    private int pageNumber = 0;

    DecimalFormat df = new DecimalFormat("#.00");


    @Autowired
    public ReportManager(BrandRepository brandRepository, CategoryRepository categoryRepository, ProductRepository productRepository, ProductInventoryRepository productInventoryRepository, Utility utility, VendorRepository vendorRepository, TransactionRepository transactionRepository, CustomerRepository customerRepository, EmployeeRepository employeeRepository, StoreSetupRepository storeSetupRepository) {
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productInventoryRepository = productInventoryRepository;
        this.utility = utility;
        this.vendorRepository = vendorRepository;
        this.transactionRepository = transactionRepository;
        this.customerRepository = customerRepository;
        this.employeeRepository = employeeRepository;
        this.storeSetupRepository = storeSetupRepository;
    }


    public List<InventoryDto> getReportByInventory(String inventoryReportBy) {

        if (inventoryReportBy.equalsIgnoreCase("Category")) {

            List<Object[]> result = categoryRepository.getInventoryByCategory();

            return setDataForCommonInventory(result);
        } else if (inventoryReportBy.equalsIgnoreCase("Brand")) {
            List<Object[]> result = brandRepository.getInventoryByBrand();

            return setDataForCommonInventory(result);
        } else if (inventoryReportBy.equalsIgnoreCase("Vendor")) {

            List<Object[]> result = vendorRepository.getInventoryByVendor();

            return setDataForCommonInventory(result);
        }  else {
            return null;
        }

    }

    private List<InventoryDto> setDataForCommonInventory(List<Object[]> result) {
        List<InventoryDto> inventoryDtoList = new ArrayList<>();
        double totalCost = 0;
        double totalRetail = 0;
        int totalQuantity = 0;
        double avgMarkup;



        if (null != result) {
            for (Object[] j : result) {
                InventoryDto inventoryDto = new InventoryDto();

                inventoryDto.setName(j[0].toString());
                inventoryDto.setQuantity(Integer.parseInt(j[1].toString()));
                inventoryDto.setCost(Double.parseDouble(j[2].toString()));
                inventoryDto.setRetail(Double.parseDouble(j[3].toString()));

                double markupPer = ((inventoryDto.getRetail() - inventoryDto.getCost()) / inventoryDto.getCost()) * 100;

                if(!Double.isNaN(markupPer))
                {
                    inventoryDto.setMarkup(Double.parseDouble(df.format(markupPer)));

                }
                else {
                    inventoryDto.setMarkup(0.00);

                }


                inventoryDtoList.add(inventoryDto);
            }
        }

        for (InventoryDto inventory : inventoryDtoList) {
            totalCost = +totalCost + inventory.getCost();
            totalRetail = +totalRetail + inventory.getRetail();
            totalQuantity = +totalQuantity + inventory.getQuantity();
        }

        InventoryDto inventoryDto = new InventoryDto();

        inventoryDto.setName("Total");
        inventoryDto.setCost(totalCost);
        inventoryDto.setRetail(totalRetail);
        inventoryDto.setQuantity(totalQuantity);

        System.out.println(totalRetail);
        System.out.println(totalCost);



        double totalMarkUp = ((totalRetail - totalCost) / totalCost) * 100;
        System.out.println(totalMarkUp);


        if(!Double.isNaN(totalMarkUp))
        {
            inventoryDto.setMarkup(Double.parseDouble(df.format(totalMarkUp)));
        }

        inventoryDtoList.add(inventoryDto);

        return inventoryDtoList;
    }

    public List<PaymentSummaryDto> getReportByPaymentSummary(String paymentReportBy, String startDate, String endDate) {

        if (null != paymentReportBy && paymentReportBy.equalsIgnoreCase("Sales By Year")) {
            List<Object[]> result = transactionRepository.getYearlyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result, false);
        } else if (null != paymentReportBy && paymentReportBy.equalsIgnoreCase("Sales By Month")) {
            List<Object[]> result = transactionRepository.getMonthlyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result, false);
        } else if (null != paymentReportBy && paymentReportBy.equalsIgnoreCase("Sales By Week")) {
            List<Object[]> result = transactionRepository.getWeeklyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result, true);
        } else if (null != paymentReportBy && paymentReportBy.equalsIgnoreCase("Sales By Day")) {
            List<Object[]> result = transactionRepository.getMonthlyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result, false);
        } else if (null != paymentReportBy && paymentReportBy.equalsIgnoreCase("Sales By Hour")) {
            List<Object[]> result = transactionRepository.getHourlyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result, false);
        }
        return null;
    }

    public List<SalesSummaryDto> getReportBySalesSummary(String salesReportBy, String startDate, String endDate) {

        if (null != salesReportBy && salesReportBy.equalsIgnoreCase("Sales By Year")) {
            List<Object[]> result = transactionRepository.getYearlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result, false);
        } else if (null != salesReportBy && salesReportBy.equalsIgnoreCase("Sales By Month")) {
            List<Object[]> result = transactionRepository.getMonthlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result, false);
        } else if (null != salesReportBy && salesReportBy.equalsIgnoreCase("Sales By Week")) {
            List<Object[]> result = transactionRepository.getWeeklySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result, true);
        } else if (null != salesReportBy && salesReportBy.equalsIgnoreCase("Sales By Day")) {
            List<Object[]> result = transactionRepository.getMonthlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result, false);
        } else if (null != salesReportBy && salesReportBy.equalsIgnoreCase("Sales By Hour")) {
            List<Object[]> result = transactionRepository.getHourlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result, false);
        }
        return null;
    }

    private List<PaymentSummaryDto> setDataForCommonPaymentReport(List<Object[]> result, boolean isWeekly) {

        List<PaymentSummaryDto> paymentSummaryDtoList = new ArrayList<>();

        double totalCash = 0;
        double totalCredit = 0;
        double totalCheck = 0;
        double totalStoreCredit = 0;

        if (null != result) {
            for (Object[] j : result) {
                PaymentSummaryDto paymentSummaryDto = new PaymentSummaryDto();

                if (isWeekly) {
                    paymentSummaryDto.setName("(" + j[1].toString() + ")" + " to " + "(" + j[2].toString() + ")");
                    paymentSummaryDto.setCash(Double.parseDouble(j[3].toString()));
                    paymentSummaryDto.setCredit(Double.parseDouble(j[4].toString()));
                    paymentSummaryDto.setCheck(Double.parseDouble(j[5].toString()));
                    paymentSummaryDto.setStoreCredit(Double.parseDouble(j[6].toString()));
                } else {
                    paymentSummaryDto.setName(j[0].toString());
                    paymentSummaryDto.setCash(Double.parseDouble(j[1].toString()));
                    paymentSummaryDto.setCredit(Double.parseDouble(j[2].toString()));
                    paymentSummaryDto.setCheck(Double.parseDouble(j[3].toString()));
                    paymentSummaryDto.setStoreCredit(Double.parseDouble(j[4].toString()));
                }
                paymentSummaryDtoList.add(paymentSummaryDto);
            }

            for (PaymentSummaryDto payment : paymentSummaryDtoList) {

                totalCash = +totalCash + payment.getCash();
                totalCredit = +totalCredit + payment.getCredit();
                totalCheck = +totalCheck + payment.getCheck();
                totalStoreCredit = +totalStoreCredit + payment.getStoreCredit();
            }

            PaymentSummaryDto paymentSummaryDto = new PaymentSummaryDto();

            paymentSummaryDto.setName("TOTAL");
            paymentSummaryDto.setCash(Double.parseDouble(df.format(totalCash)));
            paymentSummaryDto.setCredit(Double.parseDouble(df.format(totalCredit)));
            paymentSummaryDto.setCheck(Double.parseDouble(df.format(totalCheck)));
            paymentSummaryDto.setStoreCredit(Double.parseDouble(df.format(totalStoreCredit)));

            paymentSummaryDtoList.add(paymentSummaryDto);

        }

        return paymentSummaryDtoList;

    }

    private List<SalesSummaryDto> setDataForCommonSalesReport(List<Object[]> result, boolean isWeekly) {

        List<SalesSummaryDto> salesSummaryDtoList = new ArrayList<>();

        double totalAmount = 0;
        double totalReturn = 0;
        double totalTax = 0;
        double totalDiscount = 0;
        double totalSubtotal = 0;
        int totalQuantity = 0;
        double totalTransactionBalance = 0;
        double totalDueBalance = 0;
        double totalShipping = 0;
        double totalProfit = 0;
        double totalMarkup = 0;

        if (null != result) {
            for (Object[] j : result) {
                SalesSummaryDto salesSummaryDto = new SalesSummaryDto();

                if (isWeekly) {

                    try {
                        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

                        Date a = dateFormat.parse(j[1].toString());
                        Date b = dateFormat.parse(j[2].toString());

                        salesSummaryDto.setName("(" +dateFormat.format(a) + ")" + " to " + "(" + dateFormat.format(b) + ")");
                        salesSummaryDto.setTotalAmount(Double.parseDouble(j[3].toString()));
                        salesSummaryDto.setTax(Double.parseDouble(j[4].toString()));
                        salesSummaryDto.setDiscount(Double.parseDouble(j[5].toString()));
                        salesSummaryDto.setSubtotal(Double.parseDouble(j[6].toString()));
                        salesSummaryDto.setQuantity(Integer.parseInt(j[7].toString()));
                        salesSummaryDto.setTransactionBalance(Double.parseDouble(j[8].toString()));
                        salesSummaryDto.setTotalDueAmount(Double.parseDouble(j[9].toString()));
                        salesSummaryDto.setShipping(Double.parseDouble(j[10].toString()));
                        salesSummaryDto.setProfit(Double.parseDouble(j[11].toString()));
                        salesSummaryDto.setReturns(Double.parseDouble(j[12].toString()));
                    }
                    catch (Exception e){

                    }


                } else {

                    salesSummaryDto.setName(j[0].toString());
                    salesSummaryDto.setTotalAmount(Double.parseDouble(j[1].toString()));
                    salesSummaryDto.setTax(Double.parseDouble(j[2].toString()));
                    salesSummaryDto.setDiscount(Double.parseDouble(j[3].toString()));
                    salesSummaryDto.setSubtotal(Double.parseDouble(j[4].toString()));
                    salesSummaryDto.setQuantity(Integer.parseInt(j[5].toString()));
                    salesSummaryDto.setTransactionBalance(Double.parseDouble(j[6].toString()));
                    salesSummaryDto.setTotalDueAmount(Double.parseDouble(j[7].toString()));
                    salesSummaryDto.setShipping(Double.parseDouble(j[8].toString()));
                    salesSummaryDto.setProfit(Double.parseDouble(j[9].toString()));
                    salesSummaryDto.setReturns(Double.parseDouble(j[10].toString()));

                }


                salesSummaryDtoList.add(salesSummaryDto);
            }

            for (SalesSummaryDto sales : salesSummaryDtoList) {

                totalAmount = +totalAmount + sales.getTotalAmount();
                totalTax = +totalTax + sales.getTax();
                totalDiscount = +totalDiscount + sales.getDiscount();
                totalSubtotal = +totalSubtotal + sales.getSubtotal();
                totalQuantity = +totalQuantity + sales.getQuantity();
                totalTransactionBalance = +totalTransactionBalance + sales.getTransactionBalance();
                totalDueBalance = +totalDueBalance + sales.getTotalDueAmount();
                totalShipping = +totalShipping + sales.getShipping();
                totalProfit = +totalProfit + sales.getProfit();
                totalReturn = +totalReturn + sales.getReturns();
            }

            SalesSummaryDto salesSummaryDto = new SalesSummaryDto();

            salesSummaryDto.setName("Total");
            salesSummaryDto.setTotalAmount(Double.parseDouble(df.format(totalAmount)));
            salesSummaryDto.setTax(Double.parseDouble(df.format(totalTax)));
            salesSummaryDto.setDiscount(Double.parseDouble(df.format(totalDiscount)));
            salesSummaryDto.setSubtotal(Double.parseDouble(df.format(totalSubtotal)));
            salesSummaryDto.setQuantity(totalQuantity);
            salesSummaryDto.setTransactionBalance(Double.parseDouble(df.format(totalTransactionBalance)));
            salesSummaryDto.setTotalDueAmount(Double.parseDouble(df.format(totalDueBalance)));
            salesSummaryDto.setShipping(Double.parseDouble(df.format(totalShipping)));
            salesSummaryDto.setProfit(Double.parseDouble(df.format(totalProfit)));
            salesSummaryDto.setReturns(Double.parseDouble(df.format(totalReturn)));

            salesSummaryDtoList.add(salesSummaryDto);
        }

        return salesSummaryDtoList;

    }

    public List<SalesDto> getReportBySales(String salesReportBy, String startDate, String endDate) {

        if (salesReportBy.equalsIgnoreCase("Sales By Category")) {
            List<Object[]> result = categoryRepository.getSalesReportByCategory(startDate, endDate);
            return setDataForCommonReportBySales(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Brand")) {
            List<Object[]> result = brandRepository.getSalesReportByBrand(startDate, endDate);
            return setDataForCommonReportBySales(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Vendor")) {
            List<Object[]> result = vendorRepository.getSalesReportByVendor(startDate, endDate);
            return setDataForCommonReportBySales(result);
        }  else if (salesReportBy.equalsIgnoreCase("Sales By Product")) {
            List<Object[]> result = productRepository.getSalesReportByProduct(startDate, endDate);
            return setDataForCommonReportBySales(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Employee")) {
            List<Object[]> result = employeeRepository.getSalesReportByEmployee(startDate, endDate);
            return setDataForCommonReportBySales(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Customer")) {
            List<Object[]> result = customerRepository.getSalesReportByCustomer(startDate, endDate);
            return setDataForCommonReportBySales(result);
        }

        return null;
    }

    private List<SalesDto> setDataForCommonReportBySales(List<Object[]> result) {

        List<SalesDto> salesDtoList = new ArrayList<>();

        double totalCost = 0;
        double totalRetail = 0;
        int totalQuantity = 0;
        double totalProfit = 0;
        double totalDiscount = 0;
        // double totalMarkup = 0;

        if (null != result) {
            for (Object[] j : result) {
                SalesDto salesDto = new SalesDto();

                salesDto.setName(j[0].toString());
                salesDto.setQuantity(Integer.parseInt(j[1].toString()));
                salesDto.setCost(Double.parseDouble(j[2].toString()));
                salesDto.setRetail(Double.parseDouble(j[3].toString()));
                salesDto.setDiscount(Double.parseDouble(j[4].toString()));
                salesDto.setProfit(Double.parseDouble(j[5].toString()));

                salesDtoList.add(salesDto);
            }

            for (SalesDto sales : salesDtoList) {
                totalCost = +totalCost + sales.getCost();
                totalRetail = +totalRetail + sales.getRetail();
                totalQuantity = +totalQuantity + sales.getQuantity();
                totalProfit = +totalProfit + sales.getProfit();
                totalDiscount = +totalDiscount + sales.getDiscount();
            }

            SalesDto salesDto = new SalesDto();

            salesDto.setName("TOTAL");
            salesDto.setCost(Double.parseDouble(df.format(totalCost)));
            salesDto.setRetail(Double.parseDouble(df.format(totalRetail)));
            salesDto.setQuantity(totalQuantity);
            salesDto.setProfit(Double.parseDouble(df.format(totalProfit)));
            salesDto.setDiscount(Double.parseDouble(df.format(totalDiscount)));

            salesDtoList.add(salesDto);

        }

        return salesDtoList;

    }


    private List<SalesDto> setDataForCategoryReportBySales(List<Object[]> result) {

        List<SalesDto> salesDtoList = new ArrayList<>();

        double totalCost = 0;
        double totalRetail = 0;
        int totalQuantity = 0;
        double totalProfit = 0;
        double totalDiscount = 0;
        // double totalMarkup = 0;

        if (null != result) {
            for (Object[] j : result) {
                SalesDto salesDto = new SalesDto();

                salesDto.setName(j[0].toString());
                salesDto.setQuantity(Integer.parseInt(j[1].toString()));
                salesDto.setCost(Double.parseDouble(j[2].toString()));
                salesDto.setRetail(Double.parseDouble(j[3].toString()));
                salesDto.setDiscount(Double.parseDouble(j[4].toString()));
                salesDto.setProfit(Double.parseDouble(j[5].toString()));

                salesDtoList.add(salesDto);
            }

            for (SalesDto sales : salesDtoList) {
                totalCost = +totalCost + sales.getCost();
                totalRetail = +totalRetail + sales.getRetail();
                totalQuantity = +totalQuantity + sales.getQuantity();
                totalProfit = +totalProfit + sales.getProfit();
                totalDiscount = +totalDiscount + sales.getDiscount();
            }

            SalesDto salesDto = new SalesDto();

            salesDto.setName("TOTAL");
            salesDto.setCost(Double.parseDouble(df.format(totalCost)));
            salesDto.setRetail(Double.parseDouble(df.format(totalRetail)));
            salesDto.setQuantity(totalQuantity);
            salesDto.setProfit(Double.parseDouble(df.format(totalProfit)));
            salesDto.setDiscount(Double.parseDouble(df.format(totalDiscount)));

            salesDtoList.add(salesDto);

        }

        return salesDtoList;

    }


    public List<SalesDto> getTop50SellingItem(String productReportType, String startDate, String endDate) {
        //TimeIntervalDto timeIntervalDto;

        if (productReportType.equalsIgnoreCase("Top50SellingItem")) {
            //timeIntervalDto = utility.getDateByInputString(date);
            List<Object[]> result = productRepository.getTop50SellingItem(startDate, endDate);
            return setDataForCommonProductReports(result);
        } else if (productReportType.equalsIgnoreCase("Top50MostProfitableItem")) {
            //timeIntervalDto = utility.getDateByInputString(date);
            List<Object[]> result = productRepository.getTop50MostProfitableItem(startDate, endDate);
            return setDataForCommonProductReports(result);
        }

        return null;

    }

    private List<SalesDto> setDataForCommonProductReports(List<Object[]> result) {

        List<SalesDto> salesDtoList = new ArrayList<>();

        if (null != result) {
            for (Object[] j : result) {
                SalesDto salesDto = new SalesDto();

                salesDto.setName(j[0].toString());
                salesDto.setProductNo(j[1].toString());
                salesDto.setQuantity(Integer.parseInt(j[2].toString()));
                salesDto.setCost(Double.parseDouble(j[3].toString()));
                salesDto.setRetail(Double.parseDouble(j[4].toString()));
                salesDto.setProfit(Double.parseDouble(j[5].toString()));
                salesDto.setDiscount(Double.parseDouble(j[6].toString()));

                salesDtoList.add(salesDto);
            }
        }

        return salesDtoList;

    }

    public byte[] printReportByInventory(String inventoryReportBy) throws DocumentException {

        Document doc = new Document(PageSize.A4);
        initializeFonts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);


        List<InventoryDto> inventoryDtoList = new ArrayList<>();

        if (inventoryReportBy.equalsIgnoreCase("Category")) {
            inventoryDtoList = getReportByInventory("Category");

        } else if (inventoryReportBy.equalsIgnoreCase("Brand")) {
            inventoryDtoList = getReportByInventory("Brand");
        } else if (inventoryReportBy.equalsIgnoreCase("Vendor")) {
            inventoryDtoList = getReportByInventory("Vendor");
        }

        doc.open();

        PdfContentByte cb = writer.getDirectContent();

        boolean beginPage = true;
        int y = 0;

        for (int i = 0; i < inventoryDtoList.size(); i++) {
            if (beginPage) {
                beginPage = false;
                generateLayoutForInventory(doc, cb, inventoryReportBy);
                generateHeaderForInventory(doc, cb, inventoryReportBy);
                y = 570;
            }
            generateDetailForInventory(doc, cb, i, y, inventoryDtoList);
            y = y - 40;
            if (y < 60) {
                printPageNumber(cb);
                doc.newPage();
                beginPage = true;
            }
        }

        printPageNumber(cb);

        doc.close();

        byte[] pdfDataBytes = byteArrayOutputStream.toByteArray();


        return pdfDataBytes;

    }


    private void generateDetailForInventory(Document doc, PdfContentByte cb, int index, int y, List<InventoryDto> inventoryDtoList) {

        DecimalFormat df = new DecimalFormat("0.00");

        try {

            if (null != inventoryDtoList && inventoryDtoList.size() >= 1) {


                createForCommonReportsContentForInventory(cb, 23, y, inventoryDtoList.get(index).getName(), 0);
                createForCommonReportsContentForInventory(cb, 220, y, df.format(inventoryDtoList.get(index).getQuantity()), 0);
                createForCommonReportsContentForInventory(cb, 330, y, "$" + df.format(inventoryDtoList.get(index).getCost()), 0);
                createForCommonReportsContentForInventory(cb, 420, y, "$" + df.format(inventoryDtoList.get(index).getRetail()), 0);
                createForCommonReportsContentForInventory(cb, 510, y, df.format(inventoryDtoList.get(index).getMarkup()) + "%", 0);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void createForCommonReportsContentForInventory(PdfContentByte cb, float x, float y, String text, int align) {


        cb.beginText();
        cb.setFontAndSize(bf, 12);
        cb.showTextAligned(align, text.trim(), x, y, 0);
        cb.endText();

    }

    private void generateLayoutForInventory(Document doc, PdfContentByte cb, String reportName) {

        try {

            cb.setLineWidth(1f);


            // Invoice Detail box layout
            cb.rectangle(20, 50, 550, 580);
            cb.moveTo(20, 590);
            cb.lineTo(570, 590);
//            cb.moveTo(50, 50);
//            cb.lineTo(50, 650);
//            cb.moveTo(150, 50);
//            cb.lineTo(150, 650);
//            cb.moveTo(430, 50);
//            cb.lineTo(430, 650);
//            cb.moveTo(500, 50);
//            cb.lineTo(500, 650);
            cb.stroke();

            // Invoice Detail box Text Headings

            //Checking which kind of report is this.
            if (reportName.equalsIgnoreCase("Category")) {
                createHeadingsForCommonReports(cb, 23, 605, "Category Name");
                createHeadingsForCommonReportsName(cb, 168, 730, "Inventory By Category Report");
            } else if (reportName.equalsIgnoreCase("Vendor")) {
                createHeadingsForCommonReports(cb, 23, 605, "Vendor Name");
                createHeadingsForCommonReportsName(cb, 175, 730, "Inventory By Vendor Report");
            } else if (reportName.equalsIgnoreCase("Brand")) {
                createHeadingsForCommonReports(cb, 23, 605, "Brand Name");
                createHeadingsForCommonReportsName(cb, 175, 730, "Inventory By Brand Report");
            }


            createHeadingsForCommonReports(cb, 220, 605, "Quantity");
            createHeadingsForCommonReports(cb, 330, 605, "Cost");
            createHeadingsForCommonReports(cb, 420, 605, "Retail");
            createHeadingsForCommonReports(cb, 510, 605, "Margin");


        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void createHeadingsForCommonReports(PdfContentByte cb, float x, float y, String text) {
        cb.beginText();
        cb.setFontAndSize(bfBold, 12);
        cb.setTextMatrix(x, y);
        cb.showText(text.trim());
        cb.endText();
    }

    private void createHeadingsForCommonReportsName(PdfContentByte cb, float x, float y, String text) {
        cb.beginText();
        cb.setFontAndSize(bfBold, 20);
        cb.setTextMatrix(x, y);
        cb.showText(text.trim());
        cb.endText();

    }

    private void generateHeaderForInventory(Document doc, PdfContentByte cb, String reportName) {

        try {

            DateFormat df = new SimpleDateFormat("dd/MM/yy");
            Date dateobj = new Date();

            createHeadingsForCompanyName(cb, 20, 660, "Date:" + df.format(dateobj));

//            Image companyLogo = Image.getInstance("/assets/images/final-Excel.png");
//            companyLogo.setAbsolutePosition(235,760);
//            companyLogo.scalePercent(15);
//            doc.add(companyLogo);

            StoreSetupDao storeSetupDao = storeSetupRepository.findOne(1);
            if (null != storeSetupDao) {
                createHeadingsForCompanyName(cb, 265, 770, storeSetupDao.getName());
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void createHeadingsForCompanyName(PdfContentByte cb, float x, float y, String text) {


        cb.beginText();
        cb.setFontAndSize(bfBold, 12);
        cb.setTextMatrix(x, y);
        cb.showText(text.trim());
        cb.endText();

    }


    public void printPageNumber(PdfContentByte cb) {


        cb.beginText();
        cb.setFontAndSize(bfBold, 8);
        cb.showTextAligned(PdfContentByte.ALIGN_CENTER, "Page No. " + (pageNumber + 1), 570, 25, 0);
        cb.endText();

        pageNumber++;

    }

    private void initializeFonts() {


        try {
            bfBold = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);

        } catch (DocumentException | IOException e) {
            e.printStackTrace();
        }


    }

    public byte[] printReportBySalesSummary(String salesSummaryReportBy, String salesSummaryReportType, String startDate, String endDate) throws DocumentException {

        Document doc = new Document(PageSize.A4);
        initializeFonts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);
        doc.open();
        PdfContentByte cb = writer.getDirectContent();


        if (null != salesSummaryReportBy && salesSummaryReportBy.equalsIgnoreCase("Payment Summary")) {
            List<PaymentSummaryDto> paymentSummaryDtoList = getReportByPaymentSummary(salesSummaryReportType, startDate, endDate);

            if (null != paymentSummaryDtoList) {
                printStoreDetails(doc, startDate, endDate, "Payment Summary Report");
                printPaymentSummaryReport(doc, paymentSummaryDtoList);
            }
        } else if (null != salesSummaryReportBy && salesSummaryReportBy.equalsIgnoreCase("Sales Summary")) {
            List<SalesSummaryDto> salesSummaryDtoList = getReportBySalesSummary(salesSummaryReportType, startDate, endDate);
            if (null != salesSummaryDtoList) {
                printStoreDetails(doc, startDate, endDate, "Sales Summary Report");
                printSalesSummaryReport(doc, salesSummaryDtoList);
            }
        } else {

            List<SalesDto> salesDtoList = getReportBySales(salesSummaryReportBy, startDate, endDate);
            if (null != salesDtoList) {
                printStoreDetails(doc, startDate, endDate, salesSummaryReportBy+" Report");

                printSalesSummaryReportByOtherType(doc, salesDtoList);
            }

        }
        doc.close();

        return byteArrayOutputStream.toByteArray();


//
//        doc.open();
//
//        PdfContentByte cb = writer.getDirectContent();
//
//        boolean beginPage = true;
//        int y = 0;

//        if (null != salesDtoList) {
//            for (int i = 0; i < salesDtoList.size(); i++) {
//                if (beginPage) {
//                    beginPage = false;
//                    generateLayout(doc, cb, salesSummaryReportBy);
//                    generateHeader(doc, cb, startDate, endDate);
//                    y = 570;
//                }
//                generateDetail(doc, cb, i, y, salesDtoList);
//                y = y - 40;
//                if (y < 60) {
//                    printPageNumber(cb);
//                    doc.newPage();
//                    beginPage = true;
//                }
//            }
//        }
//
//        printPageNumber(cb);
//
//        doc.close();
//
//        byte[] pdfDataBytes = byteArrayOutputStream.toByteArray();
//
//
//        return pdfDataBytes;


    }

    // This will print report by CATEGORY, BRAND AND ALL.
    private void printSalesSummaryReportByOtherType(Document doc, List<SalesDto> salesDtoList) throws DocumentException {

        PdfPTable mainTable = new PdfPTable(5);
        String[] mainTableHeader = new String[]{"NAME", "TOTAL AMOUNT","QUANTITY","DISCOUNT", "PROFIT"};
        mainTable.setWidthPercentage(100);

        // This will print table header only
        mainTable.setHeaderRows(1);
        mainTable.setWidths(new float[]{4,3,2,2,2});
        mainTable.setSpacingBefore(3);
        mainTable.setSplitLate(false);

        printTableHeader(mainTable, mainTableHeader);

        for (SalesDto salesDto : salesDtoList) {

            PdfPCell cell1 = new PdfPCell();
            PdfPCell cell2 = new PdfPCell();
            PdfPCell cell3 = new PdfPCell();
            PdfPCell cell4 = new PdfPCell();
            PdfPCell cell5 = new PdfPCell();


            cell1.addElement(new Phrase(salesDto.getName(), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)));
            cell2.setCellEvent(new PositionEvent(new Phrase(1, "$ " + String.valueOf(salesDto.getRetail()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell3.setCellEvent(new PositionEvent(new Phrase(1,  String.valueOf(salesDto.getQuantity()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell4.setCellEvent(new PositionEvent(new Phrase(1, "$ " + String.valueOf(salesDto.getDiscount()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell5.setCellEvent(new PositionEvent(new Phrase(1, "$ " + String.valueOf(salesDto.getProfit()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));


            cell1.setBorderColor(BaseColor.LIGHT_GRAY);
            cell2.setBorderColor(BaseColor.LIGHT_GRAY);
            cell3.setBorderColor(BaseColor.LIGHT_GRAY);
            cell4.setBorderColor(BaseColor.LIGHT_GRAY);
            cell5.setBorderColor(BaseColor.LIGHT_GRAY);


            cell1.setBorder(Rectangle.NO_BORDER);
            cell2.setBorder(Rectangle.NO_BORDER);
            cell3.setBorder(Rectangle.NO_BORDER);
            cell4.setBorder(Rectangle.NO_BORDER);
            cell5.setBorder(Rectangle.NO_BORDER);



            mainTable.addCell(cell1);
            mainTable.addCell(cell2);
            mainTable.addCell(cell3);
            mainTable.addCell(cell4);
            mainTable.addCell(cell5);

        }
        doc.add(mainTable);
    }

    private void printSalesSummaryReport(Document doc, List<SalesSummaryDto> salesSummaryDtoList) throws DocumentException {

        PdfPTable mainTable = new PdfPTable(6);
        String[] mainTableHeader = new String[]{"NAME", "TOTAL", "TAX", "DISCOUNT", "RETURN", "DUE BAL"};
        mainTable.setWidthPercentage(100);

        // This will print table header only
        mainTable.setHeaderRows(1);
        mainTable.setWidths(new float[]{3,2,2,2,2,2});
        mainTable.setSpacingBefore(3);
        mainTable.setSplitLate(false);

        printTableHeader(mainTable, mainTableHeader);

        for (SalesSummaryDto salesSummaryDto : salesSummaryDtoList) {

            PdfPCell cell1 = new PdfPCell();
            PdfPCell cell2 = new PdfPCell();
            PdfPCell cell3 = new PdfPCell();
            PdfPCell cell4 = new PdfPCell();
//            PdfPCell cell5 = new PdfPCell();
            PdfPCell cell6 = new PdfPCell();
            PdfPCell cell7 = new PdfPCell();
//            PdfPCell cell8 = new PdfPCell();

            cell1.addElement(new Phrase(salesSummaryDto.getName(), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)));
            //cell1.setCellEvent(new PositionEvent(new Phrase(1, salesSummaryDto.getName(), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell2.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(salesSummaryDto.getTotalAmount()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell3.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(salesSummaryDto.getTax()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell4.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(salesSummaryDto.getDiscount()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
//            cell5.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(salesSummaryDto.getQuantity()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell6.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(salesSummaryDto.getReturns()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell7.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(salesSummaryDto.getTotalDueAmount()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
//            cell8.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(salesSummaryDto.getProfit()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

            cell1.setBorderColor(BaseColor.LIGHT_GRAY);
            cell2.setBorderColor(BaseColor.LIGHT_GRAY);
            cell3.setBorderColor(BaseColor.LIGHT_GRAY);
            cell4.setBorderColor(BaseColor.LIGHT_GRAY);
//            cell5.setBorderColor(BaseColor.LIGHT_GRAY);
            cell6.setBorderColor(BaseColor.LIGHT_GRAY);
            cell7.setBorderColor(BaseColor.LIGHT_GRAY);
//            cell8.setBorderColor(BaseColor.LIGHT_GRAY);

            cell1.setBorder(Rectangle.NO_BORDER);
            cell2.setBorder(Rectangle.NO_BORDER);
            cell3.setBorder(Rectangle.NO_BORDER);
            cell4.setBorder(Rectangle.NO_BORDER);
//            cell5.setBorder(Rectangle.NO_BORDER);
            cell6.setBorder(Rectangle.NO_BORDER);
            cell7.setBorder(Rectangle.NO_BORDER);
//            cell8.setBorder(Rectangle.NO_BORDER);

            mainTable.addCell(cell1);
            mainTable.addCell(cell2);
            mainTable.addCell(cell3);
            mainTable.addCell(cell4);
//            mainTable.addCell(cell5);
            mainTable.addCell(cell6);
            mainTable.addCell(cell7);
//            mainTable.addCell(cell8);

        }

        doc.add(mainTable);

    }

    private void printPaymentSummaryReport(Document doc, List<PaymentSummaryDto> paymentSummaryDtoList) throws DocumentException {

        PdfPTable mainTable = new PdfPTable(5);
        String[] mainTableHeader = new String[]{"NAME", "CASH", "CHECK", "CREDIT", "STORE CREDIT"};
        mainTable.setWidthPercentage(100);

        // This will print table header only
        mainTable.setHeaderRows(1);
        mainTable.setWidths(new float[]{4, 2, 2, 2, 2});
        mainTable.setSpacingBefore(1);
        mainTable.setSpacingAfter(3);

        mainTable.setSplitLate(false);

        printTableHeader(mainTable, mainTableHeader);


        for (PaymentSummaryDto paymentSummaryDto : paymentSummaryDtoList) {

            PdfPCell cell1 = new PdfPCell();
            PdfPCell cell2 = new PdfPCell();
            PdfPCell cell3 = new PdfPCell();
            PdfPCell cell4 = new PdfPCell();
            PdfPCell cell5 = new PdfPCell();

            cell1.addElement(new Phrase(paymentSummaryDto.getName(), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)));
            //cell1.setCellEvent(new PositionEvent(new Phrase(1, paymentSummaryDto.getName(), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell2.setCellEvent(new PositionEvent(new Phrase(1, "$ " + String.valueOf(paymentSummaryDto.getCash()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell3.setCellEvent(new PositionEvent(new Phrase(1, "$ " + String.valueOf(paymentSummaryDto.getCredit()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell4.setCellEvent(new PositionEvent(new Phrase(1, "$ " + String.valueOf(paymentSummaryDto.getCheck()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
            cell5.setCellEvent(new PositionEvent(new Phrase(1, "$ " +  String.valueOf(paymentSummaryDto.getStoreCredit()), FontFactory.getFont(FontFactory.HELVETICA, 12, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

            cell1.setBorderColor(BaseColor.LIGHT_GRAY);
            cell2.setBorderColor(BaseColor.LIGHT_GRAY);
            cell3.setBorderColor(BaseColor.LIGHT_GRAY);
            cell4.setBorderColor(BaseColor.LIGHT_GRAY);
            cell5.setBorderColor(BaseColor.LIGHT_GRAY);

            cell1.setBorder(Rectangle.NO_BORDER);
            cell2.setBorder(Rectangle.NO_BORDER);
            cell3.setBorder(Rectangle.NO_BORDER);
            cell4.setBorder(Rectangle.NO_BORDER);
            cell5.setBorder(Rectangle.NO_BORDER);

            mainTable.addCell(cell1);
            mainTable.addCell(cell2);
            mainTable.addCell(cell3);
            mainTable.addCell(cell4);
            mainTable.addCell(cell5);
        }
        doc.add(mainTable);
    }

    public SalesSummaryDto getDashboardReportBySalesSummary(String salesSummaryReportBy, String startDate, String endDate) {

        List<SalesSummaryDto> salesSummaryDtoList = new ArrayList<>();
        SalesSummaryDto salesSummaryDto = new SalesSummaryDto();
        SalesSummaryDto salesSummaryDtoFinal = new SalesSummaryDto();

        salesSummaryDtoList = getReportBySalesSummary(salesSummaryReportBy, startDate, endDate);

        if (null != salesSummaryDtoList) {
            for (SalesSummaryDto salesSummaryDtoLocal : salesSummaryDtoList) {

                salesSummaryDto.setTax(salesSummaryDtoLocal.getTax());
                salesSummaryDto.setDiscount(salesSummaryDtoLocal.getDiscount());
                salesSummaryDto.setReturns(salesSummaryDtoLocal.getReturns());
                salesSummaryDto.setProfit(salesSummaryDtoLocal.getProfit());
                salesSummaryDto.setSubtotal(salesSummaryDtoLocal.getSubtotal());
                salesSummaryDto.setReturns(salesSummaryDtoLocal.getReturns());
            }

            salesSummaryDtoFinal.setTax(salesSummaryDto.getTax());
            salesSummaryDtoFinal.setDiscount(salesSummaryDto.getDiscount());
            salesSummaryDtoFinal.setReturns(salesSummaryDto.getReturns());
            salesSummaryDtoFinal.setProfit(salesSummaryDto.getProfit());
            salesSummaryDtoFinal.setSubtotal(salesSummaryDto.getSubtotal());
            salesSummaryDtoFinal.setReturns(salesSummaryDto.getReturns());
        }
        return salesSummaryDtoFinal;
    }

    public PaymentSummaryDto getDashboardReportByPaymentSummary(String paymentSummaryReportBy, String startDate, String endDate) {

        List<PaymentSummaryDto> paymentSummaryDtoList = new ArrayList<>();
        PaymentSummaryDto paymentSummaryDto = new PaymentSummaryDto();
        PaymentSummaryDto paymentSummaryDtoFinal = new PaymentSummaryDto();

        paymentSummaryDtoList = getReportByPaymentSummary(paymentSummaryReportBy, startDate, endDate);

        if (null != paymentSummaryDtoList) {
            for (PaymentSummaryDto paymentSummaryDtoLocal : paymentSummaryDtoList) {

                paymentSummaryDto.setCash(paymentSummaryDtoLocal.getCash());
                paymentSummaryDto.setCredit(paymentSummaryDtoLocal.getCredit());
                paymentSummaryDto.setCheck(paymentSummaryDtoLocal.getCheck());
                paymentSummaryDto.setStoreCredit(paymentSummaryDtoLocal.getStoreCredit());

            }
            paymentSummaryDtoFinal.setCash(paymentSummaryDto.getCash());
            paymentSummaryDtoFinal.setCredit(paymentSummaryDto.getCredit());
            paymentSummaryDtoFinal.setCheck(paymentSummaryDto.getCheck());
            paymentSummaryDtoFinal.setStoreCredit(paymentSummaryDto.getStoreCredit());

        }


        return paymentSummaryDtoFinal;

    }

    public List<OpenInvoiceResponse> getOpenInvoice(String startDate, String endDate) {

        List<Object[]> result = transactionRepository.getCustomerDetailsForPendingInvoice(startDate, endDate);

        List<CustomerSum> customerSumList = new ArrayList<>();
        List<OpenInvoiceResponse> openInvoiceResponseList = new ArrayList<>();
        double totalBalance = 0.00;


        if (null != result) {

            for (Object[] j : result) {
                CustomerSum customerSum = new CustomerSum();

                customerSum.setCompanyName(j[0].toString());
                customerSum.setPhoneNo(j[1].toString());
                customerSum.setTotalBalance(Double.parseDouble(j[2].toString()));

                totalBalance = totalBalance + customerSum.getTotalBalance();

                customerSumList.add(customerSum);
            }

            for (CustomerSum customerSum : customerSumList) {

                OpenInvoiceResponse openInvoiceResponse = new OpenInvoiceResponse();

                List<TransactionDao> transactionList = transactionRepository.findAllByCustomerPhonenoAndStatusAndDateBetweenOrderByDateAsc(customerSum.getPhoneNo(), "Pending", startDate, endDate);
                openInvoiceResponse.setCustomerSum(customerSum);
                openInvoiceResponse.setTransactionDaoList(transactionList);

                openInvoiceResponse.setTotalBalance(totalBalance);

                openInvoiceResponseList.add(openInvoiceResponse);
            }

        }

        return openInvoiceResponseList;
    }

    public byte[] printOpenInvoice(String startDate, String endDate) throws DocumentException {

        List<OpenInvoiceResponse> openInvoiceResponseList;

        Document doc = new Document(PageSize.A4);
        initializeFonts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);
        doc.open();
        PdfContentByte cb = writer.getDirectContent();

        openInvoiceResponseList = getOpenInvoice(startDate, endDate);

        if (null != openInvoiceResponseList) {

            printStoreDetailsTest(doc, startDate, endDate, openInvoiceResponseList);
            printOpenInvoiceDetails(doc, openInvoiceResponseList);
        }
        doc.close();

        return byteArrayOutputStream.toByteArray();
    }

    private void printStoreDetailsTest(Document doc, String startDate, String endDate, List<OpenInvoiceResponse> openInvoiceResponseList) throws DocumentException {

        printStoreDetails(doc, startDate, endDate, "Open Invoice Report");

        PdfPTable mainTable = new PdfPTable(5);
        String[] mainTableHeader = new String[]{"DATE", "TIME", "RECEIPT NO", "BALANCE", "FULL NAME"};
        mainTable.setWidthPercentage(100);

        // This will print table header only
        mainTable.setHeaderRows(1);
        mainTable.setWidths(new float[]{2, 2, 2, 2, 5});
        mainTable.setSpacingBefore(1);
        mainTable.setSplitLate(false);

        printTableHeader(mainTable, mainTableHeader);

        // Now Printing Open Invoice Table Details
        for (OpenInvoiceResponse openInvoiceResponse : openInvoiceResponseList) {

            Paragraph companyName = new Paragraph(openInvoiceResponse.getCustomerSum().getCompanyName(), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.BOLD));
            companyName.setAlignment(PdfPCell.ALIGN_LEFT);
            companyName.setSpacingBefore(5);
            doc.add(companyName);

            for (TransactionDao transactionDao : openInvoiceResponse.getTransactionDaoList()) {

                DateTimeDto dateTimeDto = getDateAndTime(transactionDao.getDate());

                PdfPCell cell1 = new PdfPCell();
                PdfPCell cell2 = new PdfPCell();
                PdfPCell cell3 = new PdfPCell();
                PdfPCell cell4 = new PdfPCell();
                PdfPCell cell5 = new PdfPCell();

                // This helps set content in middle or center
                cell1.setFixedHeight(30);
                cell2.setFixedHeight(30);
                cell3.setFixedHeight(30);
                cell4.setFixedHeight(30);
                cell5.setFixedHeight(30);


                cell1.setCellEvent(new PositionEvent(new Phrase(1, dateTimeDto.getDate(), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell2.setCellEvent(new PositionEvent(new Phrase(1, dateTimeDto.getTime(), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell3.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(transactionDao.getTransactionComId()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell4.setCellEvent(new PositionEvent(new Phrase(1, "$ " + String.valueOf(transactionDao.getTransactionBalance()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell5.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(transactionDao.getCustomerFirstLastName()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

//
//                cell1.addElement(new Phrase(dateTimeDto.getDate(), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));
//                cell2.addElement(new Phrase(dateTimeDto.getTime(), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));
//                cell3.addElement(new Phrase(String.valueOf(transactionDao.getTransactionComId()), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));
//                cell4.addElement(new Phrase(String.valueOf(transactionDao.getTransactionBalance()), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));
//                cell5.addElement(new Phrase(String.valueOf(transactionDao.getCustomerFirstLastName()), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL)));

                cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                cell4.setBorderColor(BaseColor.LIGHT_GRAY);
                cell5.setBorderColor(BaseColor.LIGHT_GRAY);

                cell1.setBorder(Rectangle.NO_BORDER);
                cell2.setBorder(Rectangle.NO_BORDER);
                cell3.setBorder(Rectangle.NO_BORDER);
                cell4.setBorder(Rectangle.NO_BORDER);
                cell5.setBorder(Rectangle.NO_BORDER);


                mainTable.addCell(cell1);
                mainTable.addCell(cell2);
                mainTable.addCell(cell3);
                mainTable.addCell(cell4);
                mainTable.addCell(cell5);
            }

            doc.add(mainTable);

            // This will reset the table data and print details by customer.
            mainTable = new PdfPTable(5);
            mainTable.setWidthPercentage(100);
            mainTable.setWidths(new float[]{2, 2, 2, 2, 5});

            Paragraph totalBalanceAmount = new Paragraph("TOTAL BALANCE DUE    " + "$ " + String.valueOf(openInvoiceResponse.getCustomerSum().getTotalBalance()), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.BOLD));
            totalBalanceAmount.setAlignment(PdfPCell.ALIGN_LEFT);
            totalBalanceAmount.setSpacingAfter(5);
            doc.add(totalBalanceAmount);
            LineSeparator objectName = new LineSeparator();
            doc.add(objectName);

        }

        // This will print the final total at the end of the report.
        Paragraph finalTotalBalance = new Paragraph("TOTAL OPEN INVOICE BALANCE    " + "$ " + Double.parseDouble(new DecimalFormat("##.####").format(openInvoiceResponseList.get(0).getTotalBalance())), FontFactory.getFont(FontFactory.HELVETICA, 14, Font.BOLD));
        finalTotalBalance.setAlignment(PdfPCell.ALIGN_LEFT);
        finalTotalBalance.setSpacingBefore(10);
        finalTotalBalance.setSpacingAfter(15);

        doc.add(finalTotalBalance);

        LineSeparator objectName = new LineSeparator();

        LineSeparator objectName1 = new LineSeparator();
        objectName1.setLineWidth(15);

        doc.add(objectName);
    }

    private void printStoreDetails(Document doc, String startDate, String endDate, String reportTitle) throws DocumentException {
        StoreSetupDao storeSetupDao = storeSetupRepository.findOne(1);

        if (storeSetupDao != null) {

            Paragraph storeName = new Paragraph(storeSetupDao.getName(), FontFactory.getFont(FontFactory.HELVETICA, 18, Font.BOLD));
            storeName.setAlignment(PdfPCell.ALIGN_CENTER);

            Paragraph reportType = new Paragraph(reportTitle, FontFactory.getFont(FontFactory.HELVETICA, 13, Font.BOLD));
            reportType.setAlignment(PdfPCell.ALIGN_CENTER);
            reportType.setSpacingBefore(10);

            doc.add(storeName);
            doc.add(reportType);

            DateTimeDto dateTimeDto;
            dateTimeDto = getDateAndTime(startDate);

            DateTimeDto dateTimeDto1;
            dateTimeDto1 = getDateAndTime(endDate);

            Paragraph fromDate = new Paragraph("FROM    " + dateTimeDto.getDate() + "   TO    " + dateTimeDto1.getDate(), FontFactory.getFont(FontFactory.HELVETICA, 10, Font.BOLD));
            fromDate.setAlignment(PdfPCell.ALIGN_CENTER);
            fromDate.setSpacingBefore(9);

            fromDate.setSpacingAfter(20);
            doc.add(fromDate);
        }
    }

    private DateTimeDto getDateAndTime(String date) {

        DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        DateTimeDto dateTimeDto = new DateTimeDto();

        Date d1 = null;
        try {
            d1 = f.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        DateFormat transDate = new SimpleDateFormat("MM-dd-yyyy");//NEED TO CHECK THIS
        DateFormat transTime = new SimpleDateFormat("hh:mm a");

        dateTimeDto.setDate(transDate.format(d1));
        dateTimeDto.setTime(transTime.format(d1));

        return dateTimeDto;

    }

    private void printOpenInvoiceDetails(Document doc, List<OpenInvoiceResponse> openInvoiceResponseList) {

    }

    public List<CustomerStatementDto> getCustomerStatement(String startDate, String endDate, String phoneNo) {


        // First get balance forward amount and then get details for current month.
        double finalBalanceForwardAmount = transactionRepository.getBalanceForwardAmount(startDate, phoneNo);
        List<Object[]> result = transactionRepository.getCustomerStatement(startDate, phoneNo);
        List<CustomerStatementDto> customerStatementDtoList = new ArrayList<>();
        CustomerStatementDto customerStatementDto1 = new CustomerStatementDto();

        // Now I need to get payment detail, for the invoice where invoice was in last month but customer has paid in this month,
        // and ADD to balance transfer amount to show right calculation,

        double lastMonthBalancePaidAmount = transactionRepository.getPaidAmountForPreviousMonthTransactions(startDate, phoneNo);
        lastMonthBalancePaidAmount =  Double.parseDouble(df.format(lastMonthBalancePaidAmount));

        finalBalanceForwardAmount = Double.parseDouble(df.format(finalBalanceForwardAmount));

        // Now I need to set balance transfer, right here cause after this i need to add or subtract balance forward amount accordingly.
        customerStatementDto1.setDate(endDate);
        customerStatementDto1.setDescription("Balance Forward");

        // Now I have to add Final balance forward amount and paid amount for last month transaction in current month
        finalBalanceForwardAmount = finalBalanceForwardAmount + lastMonthBalancePaidAmount;

        customerStatementDto1.setTransactionBalance(finalBalanceForwardAmount);

        customerStatementDtoList.add(customerStatementDto1);


        if (null != result) {

            int transId = 0;
            for (Object[] j : result) {

                // this means transaction date is not null, this will happen in case where user has invoice in last month and paying in current month.
                // The second condition is very important, it handles the scenario where customer has more then one time for on invoice, this logic saves duplicate entry here, to make our calculation right.
                if(j[1] != null && transId != Integer.parseInt(j[0].toString())) {

                    transId = Integer.parseInt(j[0].toString());

                    CustomerStatementDto customerStatementDto = new CustomerStatementDto();

                    double transactionAmount = Double.parseDouble(df.format(Double.parseDouble(j[3].toString())));

                    finalBalanceForwardAmount = +finalBalanceForwardAmount + transactionAmount;

                    finalBalanceForwardAmount = Double.parseDouble(df.format(finalBalanceForwardAmount));

                    customerStatementDto.setDate(j[1].toString());
                    customerStatementDto.setDescription("Invoice" + "(# " + j[0].toString() + ")");
                    customerStatementDto.setTransactionAmount(Double.parseDouble(j[3].toString()));
                    customerStatementDto.setTransactionBalance(finalBalanceForwardAmount);
//                customerStatementDto.setTotalDueAmount(Double.parseDouble(j[7].toString()));

                    customerStatementDtoList.add(customerStatementDto);
                }

                // This mean this transaction has payment as well as transaction, so i need to add two entries for this transaction
                if (
                        null != j[2]
                        && null != j[5]
                        && !(j[5].toString().equalsIgnoreCase("Store Credit")
                        && Double.parseDouble(j[4].toString()) < 0)
                        && !(j[9].toString().equalsIgnoreCase("Void"))
                        ) {


                    CustomerStatementDto customerStatementDto = new CustomerStatementDto();

                    double paymentAmount = Double.parseDouble(df.format(Double.parseDouble(j[4].toString())));

                    finalBalanceForwardAmount = finalBalanceForwardAmount - paymentAmount;

                    finalBalanceForwardAmount = Double.parseDouble(df.format(finalBalanceForwardAmount));


                    // This is payment date in query
                    customerStatementDto.setDate(j[2].toString());
                    customerStatementDto.setDescription("Payment" + "(" + j[5].toString() + ")");
                    customerStatementDto.setTransactionAmount(Double.parseDouble(j[4].toString()) * -1);
                    customerStatementDto.setTransactionBalance(finalBalanceForwardAmount);

                    customerStatementDtoList.add(customerStatementDto);
//                    setPaymentDetailsToStatement(j, customerStatementDtoList, finalBalanceForwardAmount);
                }
            }
        }


        return customerStatementDtoList;
    }

    private void setPaymentDetailsToStatement(Object[] j, List<CustomerStatementDto> customerStatementDtoList, double finalBalanceForwardAmount) {

        CustomerStatementDto customerStatementDto = new CustomerStatementDto();

        finalBalanceForwardAmount = finalBalanceForwardAmount - Double.parseDouble(j[4].toString());

        // This is payment date in query
        customerStatementDto.setDate(j[2].toString());
        customerStatementDto.setDescription("Payment" + "(" + j[5].toString() + ")");
        customerStatementDto.setTransactionAmount(Double.parseDouble(j[4].toString()) * -1);
        customerStatementDto.setTransactionBalance(finalBalanceForwardAmount);

        customerStatementDtoList.add(customerStatementDto);


    }

    public byte[] printCustomerStatement(String startDate, String endDate, String phoneNo) throws DocumentException, IOException {

        List<CustomerStatementDto> customerStatementDtoList;

        Document doc = new Document(PageSize.A4);
        initializeFonts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);
        doc.open();
        PdfContentByte cb = writer.getDirectContent();

        customerStatementDtoList = getCustomerStatement(startDate, endDate, phoneNo);

        if (null != customerStatementDtoList) {

            printCustomerStatementDetails(doc, startDate, endDate, phoneNo, customerStatementDtoList);

            //printOpenInvoiceDetails(doc, openInvoiceResponseList);
        }

        doc.close();
        return byteArrayOutputStream.toByteArray();

    }

    private void printCustomerStatementDetails(Document doc, String startDate, String endDate, String phoneNo, List<CustomerStatementDto> customerStatementDtoList) throws IOException, DocumentException {

        PdfPTable storeTable = new PdfPTable(1);
        PdfPTable customerTable = new PdfPTable(2);
        PdfPTable statementTable = new PdfPTable(5);

        storeTable.setWidthPercentage(100);
        customerTable.setWidthPercentage(100);
        statementTable.setWidthPercentage(100);

        String[] header = new String[]{"DATE", "TIME", "DESCRIPTION", "AMOUNT", "BALANCE"};

        PdfPCell logo = new PdfPCell();
        PdfPCell storeDetails = new PdfPCell();
        PdfPCell customerDetails = new PdfPCell();

        StoreSetupDao storeSetupDao = storeSetupRepository.getOne(1);

        if (null != storeSetupDao) {
            if (null != storeSetupDao.getLogo()) {

                try {
                    Image companyLogo = Image.getInstance(storeSetupDao.getLogo());
                    if (null != companyLogo) {

                        companyLogo.setWidthPercentage(50);
                        logo.addElement(companyLogo);
                        logo.setPadding(0);
                        logo.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
                        logo.setBorder(PdfPCell.NO_BORDER);

                        storeTable.addCell(logo);
                    }

                } catch (Exception e) {
                    System.out.println("Not able to find image in db === >" + e);
                }


            }

            Paragraph storeName = new Paragraph(storeSetupDao.getName());
            storeName.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph street = new Paragraph(storeSetupDao.getStreet());
            street.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph city = new Paragraph(storeSetupDao.getCity() + " , " + storeSetupDao.getState() + " , " + storeSetupDao.getZipcode());
            city.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph phoneNo1 = new Paragraph(storeSetupDao.getPhoneNo());
            phoneNo1.setAlignment(PdfPCell.ALIGN_LEFT);
            Paragraph email = new Paragraph(storeSetupDao.getEmail());
            email.setAlignment(PdfPCell.ALIGN_LEFT);

            storeDetails.addElement(storeName);
            storeDetails.addElement(street);
            storeDetails.addElement(city);
            storeDetails.addElement(phoneNo1);
            storeDetails.addElement(email);
            storeDetails.setBorder(PdfPCell.NO_BORDER);

        }

        CustomerDao customerDao = customerManager.getCustomerByPhoneNo(phoneNo);

        if (null != customerDao) {

            Paragraph companyName = new Paragraph(customerDao.getCompanyName());
            companyName.setAlignment(PdfPCell.ALIGN_RIGHT);
            Paragraph customerName = new Paragraph(customerDao.getName());
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

        if (null != customerStatementDtoList) {
            statementTable.setHeaderRows(1);
            statementTable.setWidths(new float[]{2f, 2f, 4f, 2f, 2f});
            statementTable.setSpacingBefore(15);
            statementTable.setSplitLate(false);


            printTableHeader(statementTable, header);

            for (CustomerStatementDto customerStatementDto : customerStatementDtoList) {

                DateTimeDto dateTimeDto = getDateAndTime(customerStatementDto.getDate());

                PdfPCell cell1 = new PdfPCell();
                PdfPCell cell2 = new PdfPCell();
                PdfPCell cell3 = new PdfPCell();
                PdfPCell cell4 = new PdfPCell();
                PdfPCell cell5 = new PdfPCell();

                // This helps set content in middle or center
//                cell1.setFixedHeight(30);
//                cell2.setFixedHeight(30);
//                cell3.setFixedHeight(30);
//                cell4.setFixedHeight(30);
//                cell5.setFixedHeight(30);

//                cell1.setCellEvent(new PositionEvent(new Phrase(0f, dateTimeDto.getDate(), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

                // I dont understand but, i have to use add element here, to reduce the space in between two lines
                cell1.addElement(new Phrase(dateTimeDto.getDate(), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)));
                cell2.setCellEvent(new PositionEvent(new Phrase(0f, dateTimeDto.getTime(), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell3.setCellEvent(new PositionEvent(new Phrase(0f, String.valueOf(customerStatementDto.getDescription()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell4.setCellEvent(new PositionEvent(new Phrase(0f, String.valueOf(customerStatementDto.getTransactionAmount()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell5.setCellEvent(new PositionEvent(new Phrase(0f, "$ " + String.valueOf(customerStatementDto.getTransactionBalance()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

                cell1.setBorderColor(BaseColor.LIGHT_GRAY);
                cell2.setBorderColor(BaseColor.LIGHT_GRAY);
                cell3.setBorderColor(BaseColor.LIGHT_GRAY);
                cell4.setBorderColor(BaseColor.LIGHT_GRAY);
                cell5.setBorderColor(BaseColor.LIGHT_GRAY);

                cell1.setBorder(Rectangle.NO_BORDER);
                cell2.setBorder(Rectangle.NO_BORDER);
                cell3.setBorder(Rectangle.NO_BORDER);
                cell4.setBorder(Rectangle.NO_BORDER);
                cell5.setBorder(Rectangle.NO_BORDER);

                statementTable.addCell(cell1);
                statementTable.addCell(cell2);
                statementTable.addCell(cell3);
                statementTable.addCell(cell4);
                statementTable.addCell(cell5);

            }

        }

        doc.add(storeTable);

        doc.add(customerTable);
        doc.add(statementTable);
    }

    private void printTableHeader(PdfPTable statementTable, String[] header) {

        for (String tableHeader : header) {
            PdfPCell headerCell = new PdfPCell();
            Paragraph paragraph3 = new Paragraph(tableHeader, FontFactory.getFont(FontFactory.HELVETICA, 10, Font.BOLD));
            paragraph3.setAlignment(Element.ALIGN_CENTER);
            headerCell.addElement(paragraph3);
            headerCell.setBorderColor(BaseColor.LIGHT_GRAY);
            headerCell.setPadding(4);
            statementTable.addCell(headerCell);


//            headerCell.addElement(new Phrase(tableHeader, FontFactory.getFont(FontFactory.HELVETICA, 10, Font.BOLD)));
//            headerCell.setHorizontalAlignment(Element.ALIGN_CENTER);
//            headerCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
//            headerCell.setBorderColor(BaseColor.LIGHT_GRAY);
//            headerCell.setPadding(4);
//            statementTable.addCell(headerCell);

        }
    }

    public List<TransactionDao> getAllPendingInvoiceByCustomer(String startDate, String endDate, String phoneNo) {
        return transactionRepository.findAllByCustomerPhonenoAndStatusAndDateBetweenOrderByDateAsc(phoneNo, "Pending", startDate, endDate);

    }

    public boolean emailCustomerStatement(String startDate, String endDate, String phoneNo) {

        //TransactionDao transactionDao = getTransactionById(receiptId);
        boolean response = false;
        if (null != phoneNo && phoneNo.length() > 1) {
            //First get customer details to send an email.
            CustomerDao customerDao;
            customerDao = customerRepository.findByPhoneNo(phoneNo);
            StoreSetupDao storeSetupDao = storeSetupRepository.findOne(1);

            if (null != customerDao && null != customerDao.getEmail() && null != storeSetupDao && null != storeSetupDao.getEmail() && null != storeSetupDao.getEmailPassword()) {

                String from = storeSetupDao.getEmail();
                String to = customerDao.getEmail();

                String newline = System.getProperty("line.separator");
                String content = "Dear " + customerDao.getName() + newline
                        + newline
                        + newline
                        + "Please find attachment for your payment statement details."
                        + newline
                        + newline
                        + newline
                        + newline
                        + "Thank You" + newline
                        + storeSetupDao.getName();


                String subject = storeSetupDao.getName() + " PAYMENT STATEMENT";
                final String password = storeSetupDao.getEmailPassword();

                Properties props = new Properties();
                props.setProperty("mail.transport.protocol", "smtp");
                props.setProperty("mail.host", "smtp.gmail.com");
                props.put("mail.smtp.auth", "true");
                props.put("mail.smtp.port", "465");
                props.put("mail.debug", "true");
                props.put("mail.smtp.socketFactory.port", "465");
                props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
                props.put("mail.smtp.socketFactory.fallback", "false");
                Session session = Session.getDefaultInstance(props,
                        new javax.mail.Authenticator() {
                            protected PasswordAuthentication getPasswordAuthentication() {
                                return new PasswordAuthentication(from, password);
                            }
                        });
                ByteArrayOutputStream outputStream = null;

                try {
                    //construct the text body part
                    MimeBodyPart textBodyPart = new MimeBodyPart();
                    textBodyPart.setText(content);

                    //now write the PDF content to the output stream
                    outputStream = new ByteArrayOutputStream();
                    byte[] bytes = printCustomerStatement(startDate, endDate, phoneNo);

                    //construct the pdf body part
                    DataSource dataSource = new ByteArrayDataSource(bytes, "application/pdf");
                    MimeBodyPart pdfBodyPart = new MimeBodyPart();
                    pdfBodyPart.setDataHandler(new DataHandler(dataSource));
                    pdfBodyPart.setFileName("PaymentStatement.pdf");

                    //construct the mime multi part
                    MimeMultipart mimeMultipart = new MimeMultipart();
                    mimeMultipart.addBodyPart(textBodyPart);
                    mimeMultipart.addBodyPart(pdfBodyPart);

                    Transport transport = session.getTransport();
                    InternetAddress addressFrom = new InternetAddress(from);

                    MimeMessage message = new MimeMessage(session);

                    message.setSender(addressFrom);
                    message.setSubject(subject);
                    message.setContent(mimeMultipart);
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

                    transport.connect();
                    Transport.send(message);
                    transport.close();
                    response = true;

                    System.out.println("sent from " + to +
                            ", to " + to +
                            "; server = " + from + ", port = " + from);
                } catch (Exception ex) {
                    ex.printStackTrace();
                    response = false;
                } finally {
                    //clean off
                    if (null != outputStream) {
                        try {
                            outputStream.close();
                            outputStream = null;
                        } catch (Exception ex) {
                            response = false;
                        }
                    }
                }

            }

        }

        return response;

    }

}

