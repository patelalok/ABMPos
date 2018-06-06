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
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Component
public class ReportManager {

    @Autowired
    private TransactionsManager transactionsManager;

    private final Utility utility;

    private final ProductInventoryRepository productInventoryRepository;

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final BrandRepository brandRepository;

    private final VendorRepository vendorRepository;

    private final ModelRepository modelRepository;

    private final TransactionRepository transactionRepository;

    private final CustomerRepository customerRepository;

    private final EmployeeRepository employeeRepository;

    private final StoreSetupRepository storeSetupRepository;

    @Autowired
    private CustomerManager customerManager;


    private BaseFont bfBold;
    private BaseFont bf;
    private int pageNumber = 0;

    @Autowired
    public ReportManager(BrandRepository brandRepository, CategoryRepository categoryRepository, ProductRepository productRepository, ProductInventoryRepository productInventoryRepository, Utility utility, VendorRepository vendorRepository, ModelRepository modelRepository, TransactionRepository transactionRepository, CustomerRepository customerRepository, EmployeeRepository employeeRepository, StoreSetupRepository storeSetupRepository) {
        this.brandRepository = brandRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productInventoryRepository = productInventoryRepository;
        this.utility = utility;
        this.vendorRepository = vendorRepository;
        this.modelRepository = modelRepository;
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
        } else if (inventoryReportBy.equalsIgnoreCase("Model")) {

            List<Object[]> result = modelRepository.getInventoryByModel();

            return setDataForCommonInventory(result);
        } else {
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
                DecimalFormat df = new DecimalFormat("#.##");
                inventoryDto.setMarkup(Double.parseDouble(df.format(markupPer)));

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

        inventoryDtoList.add(inventoryDto);

        return inventoryDtoList;
    }

    public List<PaymentSummaryDto> getReportByPaymentSummary(String paymentReportBy, String startDate, String endDate) {

        if (paymentReportBy.equalsIgnoreCase("Sales By Year")) {
            List<Object[]> result = transactionRepository.getYearlyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result);
        } else if (paymentReportBy.equalsIgnoreCase("Sales By Month")) {
            List<Object[]> result = transactionRepository.getMonthlyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result);
        } else if (paymentReportBy.equalsIgnoreCase("Sales By Week")) {
            List<Object[]> result = transactionRepository.getWeeklyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result);
        } else if (paymentReportBy.equalsIgnoreCase("Sales By Day")) {
            List<Object[]> result = transactionRepository.getMonthlyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result);
        } else if (paymentReportBy.equalsIgnoreCase("Sales By Hour")) {
            List<Object[]> result = transactionRepository.getHourlyPaymentReport(startDate, endDate);
            return setDataForCommonPaymentReport(result);
        }
        return null;
    }

    public List<SalesSummaryDto> getReportBySalesSummary(String salesReportBy, String startDate, String endDate) {

        if (salesReportBy.equalsIgnoreCase("Sales By Year")) {
            List<Object[]> result = transactionRepository.getYearlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Month")) {
            List<Object[]> result = transactionRepository.getMonthlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Week")) {
            List<Object[]> result = transactionRepository.getWeeklySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Day")) {
            List<Object[]> result = transactionRepository.getMonthlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Hour")) {
            List<Object[]> result = transactionRepository.getHourlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
        }
        return null;
    }

    private List<PaymentSummaryDto> setDataForCommonPaymentReport(List<Object[]> result) {

        List<PaymentSummaryDto> paymentSummaryDtoList = new ArrayList<>();

        double totalCash = 0;
        double totalCredit = 0;
        double totalCheck = 0;
        double totalStoreCredit = 0;

        if (null != result) {
            for (Object[] j : result) {
                PaymentSummaryDto paymentSummaryDto = new PaymentSummaryDto();

                paymentSummaryDto.setName(j[0].toString());
                paymentSummaryDto.setCash(Double.parseDouble(j[1].toString()));
                paymentSummaryDto.setCredit(Double.parseDouble(j[2].toString()));
                paymentSummaryDto.setCheck(Double.parseDouble(j[3].toString()));
                paymentSummaryDto.setStoreCredit(Double.parseDouble(j[4].toString()));

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
            paymentSummaryDto.setCash(totalCash);
            paymentSummaryDto.setCredit(totalCredit);
            paymentSummaryDto.setCheck(totalCheck);
            paymentSummaryDto.setStoreCredit(totalStoreCredit);

            paymentSummaryDtoList.add(paymentSummaryDto);

        }

        return paymentSummaryDtoList;

    }

    private List<SalesSummaryDto> setDataForCommonSalesReport(List<Object[]> result) {

        List<SalesSummaryDto> salesSummaryDtoList = new ArrayList<>();

        double totalAmount = 0;
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
                totalShipping = +totalShipping +sales.getShipping();
                totalProfit = +totalProfit + sales.getProfit();
                }

            SalesSummaryDto salesSummaryDto = new SalesSummaryDto();

            salesSummaryDto.setTotalAmount(totalAmount);
            salesSummaryDto.setTax(totalTax);
            salesSummaryDto.setDiscount(totalDiscount);
            salesSummaryDto.setSubtotal(totalSubtotal);
            salesSummaryDto.setQuantity(totalQuantity);
            salesSummaryDto.setTransactionBalance(totalTransactionBalance);
            salesSummaryDto.setTotalDueAmount(totalDueBalance);
            salesSummaryDto.setShipping(totalShipping);
            salesSummaryDto.setProfit(totalProfit);

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
        } else if (salesReportBy.equalsIgnoreCase("Sales By Model")) {
            List<Object[]> result = modelRepository.getSalesReportByModel(startDate, endDate);
            return setDataForCommonReportBySales(result);
        } else if (salesReportBy.equalsIgnoreCase("Sales By Product")) {
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
            salesDto.setCost(totalCost);
            salesDto.setRetail(totalRetail);
            salesDto.setQuantity(totalQuantity);
            salesDto.setProfit(totalProfit);
            salesDto.setDiscount(totalDiscount);

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

    public byte[] printReportBySalesSummary(String salesSummaryReportBy, String startDate, String endDate) throws DocumentException {

        Document doc = new Document(PageSize.A4);
        initializeFonts();


        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);

        List<SalesDto> salesDtoList = new ArrayList<>();

        salesDtoList = getReportBySales(salesSummaryReportBy, startDate, endDate);

        doc.open();

        PdfContentByte cb = writer.getDirectContent();

        boolean beginPage = true;
        int y = 0;

        if (null != salesDtoList) {
            for (int i = 0; i < salesDtoList.size(); i++) {
                if (beginPage) {
                    beginPage = false;
                    generateLayout(doc, cb, salesSummaryReportBy);
                    generateHeader(doc, cb, startDate, endDate);
                    y = 570;
                }
                generateDetail(doc, cb, i, y, salesDtoList);
                y = y - 40;
                if (y < 60) {
                    printPageNumber(cb);
                    doc.newPage();
                    beginPage = true;
                }
            }
        }

        printPageNumber(cb);

        doc.close();

        byte[] pdfDataBytes = byteArrayOutputStream.toByteArray();


        return pdfDataBytes;


    }

    private void generateLayout(Document doc, PdfContentByte cb, String reportName) {

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
            if (reportName.equalsIgnoreCase("Sales By Category")) {
                createHeadingsForCommonReports(cb, 23, 605, "Category Name");
                createHeadingsForCommonReportsName(cb, 200, 730, "Sales By Category Report");
            } else if (reportName.equalsIgnoreCase("Sales By Vendor")) {
                createHeadingsForCommonReports(cb, 23, 605, "Vendor Name");
                createHeadingsForCommonReportsName(cb, 200, 730, "Sales By Vendor Report");
            } else if (reportName.equalsIgnoreCase("Sales By Brand")) {
                createHeadingsForCommonReports(cb, 23, 605, "Brand Name");
                createHeadingsForCommonReportsName(cb, 200, 730, "Sales By Brand Report");
            } else if (reportName.equalsIgnoreCase("Sales By Product")) {
                createHeadingsForCommonReports(cb, 23, 605, "Product Name");
                createHeadingsForCommonReportsName(cb, 200, 730, "Sales By Product Report");
            } else if (reportName.equalsIgnoreCase("Sales By Employee")) {
                createHeadingsForCommonReports(cb, 23, 605, "Employee Name");
                createHeadingsForCommonReportsName(cb, 200, 730, "Sales By Employee Report");
            } else if (reportName.equalsIgnoreCase("Sales By Customer")) {
                createHeadingsForCommonReports(cb, 23, 605, "Customer Name");
                createHeadingsForCommonReportsName(cb, 200, 730, "Sales By Customer Report");
            } else if (reportName.equalsIgnoreCase("Sales By Top 50 Product")) {
                createHeadingsForCommonReports(cb, 23, 605, "Product Name");
                createHeadingsForCommonReportsName(cb, 180, 730, "Top 50 Products Sale Report");
            }

            createHeadingsForCommonReports(cb, 205, 605, "Quantity");
            createHeadingsForCommonReports(cb, 284, 605, "Discount");
            createHeadingsForCommonReports(cb, 369, 605, "Total Sales");
            createHeadingsForCommonReports(cb, 462, 605, "Tax");
            createHeadingsForCommonReports(cb, 519, 605, "Profit");


        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void generateHeader(Document doc, PdfContentByte cb, String startDate, String endDate) {

        try {

            DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date sd = null;
            Date ed = null;

            try {
                sd = f.parse(startDate);
                ed = f.parse(endDate);

            } catch (ParseException e) {
                e.printStackTrace();
            }
            DateFormat date = new SimpleDateFormat("MM/dd/yyyy");//NEED TO CHECK THIS

            String a = date.format(sd);
            String b = date.format(ed);

            if (a.equals(b)) {
                createHeadingsForCompanyName(cb, 20, 660, "Date:" + date.format(sd));
            } else {
                createHeadingsForCompanyName(cb, 20, 660, "Date:" + a + " " + "To" + " " + b);
            }


//            Image companyLogo = Image.getInstance("Excel.png");
//            companyLogo.setAbsolutePosition(235,760);
//            companyLogo.scalePercent(15);
//            doc.add(companyLogo);

            StoreSetupDao storeSetupDao = storeSetupRepository.findOne(1);
            if (null != storeSetupDao) {
                createHeadingsForCompanyName(cb, 265, 770, storeSetupDao.getName());
            }

            // createHeadingsForCompanyName(cb, 265, 770, "Excell Wireless");


            //createHeadings(cb, 240, 730, "Sales By Category Report");


        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void generateDetail(Document doc, PdfContentByte cb, int index, int y, List<SalesDto> salesDtoList) {
        DecimalFormat df = new DecimalFormat("0.00");

        try {

            if (null != salesDtoList && salesDtoList.size() >= 1) {

                createForCommonReportsContent(cb, 23, y, salesDtoList.get(index).getName(), 0);
                createForCommonReportsContent(cb, 205, y, df.format(salesDtoList.get(index).getQuantity()), 0);
                createForCommonReportsContent(cb, 284, y, "$" + df.format(salesDtoList.get(index).getDiscount()), 0);

                createForCommonReportsContent(cb, 369, y, "$" + df.format(salesDtoList.get(index).getRetail()), 0);
                createForCommonReportsContent(cb, 462, y, "$" + df.format(salesDtoList.get(index).getTax()), 0);
                createForCommonReportsContent(cb, 519, y, "$" + df.format(salesDtoList.get(index).getProfit()), 0);
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void createForCommonReportsContent(PdfContentByte cb, float x, float y, String text, int align) {
        cb.beginText();
        cb.setFontAndSize(bf, 12);
        cb.showTextAligned(align, text.trim(), x, y, 0);
        cb.endText();
    }

    public SalesSummaryDto getDashboardReportBySalesSummary(String salesSummaryReportBy, String startDate, String endDate) {

        List<SalesSummaryDto> salesSummaryDtoList = new ArrayList<>();
        SalesSummaryDto salesSummaryDto = new SalesSummaryDto();
        SalesSummaryDto salesSummaryDtoFinal = new SalesSummaryDto();

        salesSummaryDtoList = getReportBySalesSummary(salesSummaryReportBy, startDate, endDate);

        if (null != salesSummaryDtoList) {
            for (SalesSummaryDto salesSummaryDtoLocal : salesSummaryDtoList) {
//                salesSummaryDto.setCash(salesSummaryDtoLocal.getCash());
//                salesSummaryDto.setCredit(salesSummaryDtoLocal.getCredit());
//                salesSummaryDto.setDebit(salesSummaryDtoLocal.getDebit());
//                salesSummaryDto.setCheck(salesSummaryDtoLocal.getCheck());
//                salesSummaryDto.setTax(salesSummaryDtoLocal.getTax());
//                salesSummaryDto.setDiscount(salesSummaryDtoLocal.getDiscount());
//                salesSummaryDto.setReturns(salesSummaryDtoLocal.getReturns());
//                salesSummaryDto.setProfit(salesSummaryDtoLocal.getProfit());
//                salesSummaryDto.setSubtotal(salesSummaryDtoLocal.getSubtotal());
            }

//            salesSummaryDtoFinal.setCash(salesSummaryDto.getCash());
//            salesSummaryDtoFinal.setCredit(salesSummaryDto.getCredit());
//            salesSummaryDtoFinal.setDebit(salesSummaryDto.getDebit());
//            salesSummaryDtoFinal.setCheck(salesSummaryDto.getCheck());
            salesSummaryDtoFinal.setTax(salesSummaryDto.getTax());
            salesSummaryDtoFinal.setDiscount(salesSummaryDto.getDiscount());
            salesSummaryDtoFinal.setReturns(salesSummaryDto.getReturns());
            salesSummaryDtoFinal.setProfit(salesSummaryDto.getProfit());
            salesSummaryDtoFinal.setSubtotal(salesSummaryDto.getSubtotal());
        }
        return salesSummaryDtoFinal;
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

        StoreSetupDao storeSetupDao = storeSetupRepository.findOne(1);

        if (storeSetupDao != null) {

            Paragraph storeName = new Paragraph(storeSetupDao.getName(), FontFactory.getFont(FontFactory.HELVETICA, 18, Font.BOLD));
            storeName.setAlignment(PdfPCell.ALIGN_CENTER);

            Paragraph reportType = new Paragraph("Open Invoice Report", FontFactory.getFont(FontFactory.HELVETICA, 13, Font.BOLD));
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
            doc.add(fromDate);
        }
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

        List<Object[]> result = transactionRepository.getCustomerStatement();
        List<CustomerStatementDto> customerStatementDtoList = new ArrayList<>();

        if(null != result)
        {
            for(Object[] j: result)
            {
                CustomerStatementDto customerStatementDto = new CustomerStatementDto();

                customerStatementDto.setTransactionComId(Integer.parseInt(j[0].toString()));
                customerStatementDto.setTransactionDate(j[1].toString());
                if(null != j[2]){
                    customerStatementDto.setPaymentDate(j[2].toString());
                }
                customerStatementDto.setTransactionAmount(Double.parseDouble(j[3].toString()));
                customerStatementDto.setTransactionBalance(Double.parseDouble(j[4].toString()));

                customerStatementDtoList.add(customerStatementDto);
            }
        }


        return customerStatementDtoList;
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

            printCustomerStatementDetails(doc, startDate, endDate, phoneNo,customerStatementDtoList);

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

        String[] header = new String[]{"DATE", "TIME", "RECEIPT NO", "AMOUNT", "BALANCE"};

        PdfPCell logo = new PdfPCell();
        PdfPCell storeDetails = new PdfPCell();
        PdfPCell customerDetails = new PdfPCell();

        StoreSetupDao storeSetupDao = storeSetupRepository.getOne(1);

        if(null != storeSetupDao)
        {
            if(null != storeSetupDao.getLogo()){
                Image companyLogo = Image.getInstance(storeSetupDao.getLogo());
                companyLogo.setWidthPercentage(50);
                logo.addElement(companyLogo);
                logo.setPadding(0);
                logo.setHorizontalAlignment(PdfPCell.ALIGN_LEFT);
                logo.setBorder(PdfPCell.NO_BORDER);

                storeTable.addCell(logo);

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

        if(null !=customerStatementDtoList) {
            statementTable.setHeaderRows(1);
            statementTable.setWidths(new float[]{2, 2, 4, 2, 2});
            statementTable.setSpacingBefore(1);
            statementTable.setSplitLate(false);


            printTableHeader(statementTable, header);

            for (CustomerStatementDto customerStatementDto : customerStatementDtoList) {

                DateTimeDto dateTimeDto = getDateAndTime(customerStatementDto.getTransactionDate());

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
                cell3.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(customerStatementDto.getTransactionComId()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell4.setCellEvent(new PositionEvent(new Phrase(1, String.valueOf(customerStatementDto.getTransactionAmount()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));
                cell5.setCellEvent(new PositionEvent(new Phrase(1, "$ " + String.valueOf(customerStatementDto.getTransactionBalance()), FontFactory.getFont(FontFactory.HELVETICA, 8, Font.NORMAL)), 0.5f, 0.5f, Element.ALIGN_CENTER));

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
            Paragraph paragraph3 = new Paragraph(tableHeader, FontFactory.getFont(FontFactory.HELVETICA, 11, Font.BOLD));
            paragraph3.setAlignment(Element.ALIGN_CENTER);
            headerCell.addElement(paragraph3);
            headerCell.setBorderColor(BaseColor.LIGHT_GRAY);
            headerCell.setPadding(5);
            statementTable.addCell(headerCell);
        }
    }

    public List<TransactionDao> getAllPendingInvoiceByCustomer(String startDate, String endDate, String phoneNo) {
        return transactionRepository.findAllByCustomerPhonenoAndStatusAndDateBetweenOrderByDateAsc(phoneNo, "Pending",startDate,endDate);

    }
}

