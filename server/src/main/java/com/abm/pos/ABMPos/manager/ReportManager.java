package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ReportDao.InventoryDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesSummaryDto;
import com.abm.pos.ABMPos.repository.*;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.itextpdf.text.pdf.BaseFont;
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
    private Utility utility;


    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private VendorRepository vendorRepository;


    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;


    private BaseFont bfBold;
    private BaseFont bf;
    private int pageNumber = 0;


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

    public List<SalesSummaryDto> getReportBySalesSummary(String salesReportBy, String startDate, String endDate) {


        if (salesReportBy.equalsIgnoreCase("Sales By Year")) {

            List<Object[]> result = transactionRepository.getYearlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
//            }
        } else if (salesReportBy.equalsIgnoreCase("Sales By Month")) {
            List<Object[]> result = transactionRepository.getMonthlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
//            }

        }

        // TODO NEED TO FIGURE THIS OUT.
        else if (salesReportBy.equalsIgnoreCase("Sales By Week")) {

        } else if (salesReportBy.equalsIgnoreCase("Sales By Day")) {
            List<Object[]> result = transactionRepository.getMonthlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
//            }
        } else if (salesReportBy.equalsIgnoreCase("Sales By Hour")) {
            List<Object[]> result = transactionRepository.getHourlySalesReport(startDate, endDate);
            return setDataForCommonSalesReport(result);
//            }
        }

        return null;

    }

    private List<SalesSummaryDto> setDataForCommonSalesReport(List<Object[]> result) {

        List<SalesSummaryDto> salesSummaryDtoList = new ArrayList<>();

        if (null != result) {
            for (Object[] j : result) {
                SalesSummaryDto salesSummaryDto = new SalesSummaryDto();

                salesSummaryDto.setName(j[0].toString());
                salesSummaryDto.setCash(Double.parseDouble(j[1].toString()));
                salesSummaryDto.setCredit(Double.parseDouble(j[2].toString()));
                salesSummaryDto.setDebit(Double.parseDouble(j[3].toString()));
                salesSummaryDto.setCheck(Double.parseDouble(j[4].toString()));
                salesSummaryDto.setTax(Double.parseDouble(j[5].toString()));
                salesSummaryDto.setSubtotal(Double.parseDouble(j[6].toString()));
                salesSummaryDto.setDiscount(Double.parseDouble(j[7].toString()));
                salesSummaryDto.setProfit(Double.parseDouble(j[8].toString()));

                salesSummaryDtoList.add(salesSummaryDto);
            }
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
        double totalMarkup = 0;

        if (null != result) {
            for (Object[] j : result) {
                SalesDto salesDto = new SalesDto();

                salesDto.setName(j[0].toString());
                salesDto.setQuantity(Integer.parseInt(j[1].toString()));
                salesDto.setCost(Double.parseDouble(j[2].toString()));
                salesDto.setRetail(Double.parseDouble(j[3].toString()));
                salesDto.setProfit(Double.parseDouble(j[4].toString()));

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

            salesDto.setName("Total");
            salesDto.setCost(totalCost);
            salesDto.setRetail(totalRetail);
            salesDto.setQuantity(totalQuantity);
            salesDto.setProfit(totalProfit);
            salesDto.setDiscount(totalDiscount);

            salesDtoList.add(salesDto);

        }

        return salesDtoList;

    }

    public List<SalesDto> getTop50SellingItem(String productReportType, String date) {
        TimeIntervalDto timeIntervalDto;

        if (productReportType.equalsIgnoreCase("Top50SellingItem")) {
            timeIntervalDto = utility.getDateByInputString(date);
            List<Object[]> result = productRepository.getTop50SellingItem(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonProductReports(result);
        } else if (productReportType.equalsIgnoreCase("Top50MostProfitableItem")) {
            timeIntervalDto = utility.getDateByInputString(date);
            List<Object[]> result = productRepository.getTop50MostProfitableItem(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
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

        if(inventoryReportBy.equalsIgnoreCase("Category"))
        {
            inventoryDtoList = getReportByInventory("Category");

        }
        else if(inventoryReportBy.equalsIgnoreCase("Brand"))
        {
            inventoryDtoList = getReportByInventory("Brand");
        }
        else if(inventoryReportBy.equalsIgnoreCase("Vendor"))
        {
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
                generateHeaderForInventory(doc, cb,inventoryReportBy);
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
                    createForCommonReportsContentForInventory(cb, 220, y,       df.format(inventoryDtoList.get(index).getQuantity()), 0);
                    createForCommonReportsContentForInventory(cb, 330, y, "$" + df.format(inventoryDtoList.get(index).getCost()), 0);
                    createForCommonReportsContentForInventory(cb, 420, y, "$" + df.format(inventoryDtoList.get(index).getRetail()), 0);
                    createForCommonReportsContentForInventory(cb, 510, y,       df.format(inventoryDtoList.get(index).getMarkup()) + "%", 0);
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
            } else if (reportName.equalsIgnoreCase("Vendor")){
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
        cb.setFontAndSize(bfBold,12);
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
    private void generateHeaderForInventory(Document doc, PdfContentByte cb, String  reportName) {

        try {

            DateFormat df = new SimpleDateFormat("dd/MM/yy");
            Date dateobj = new Date();

            createHeadingsForCompanyName(cb, 20, 660, "Date:" + df.format(dateobj));

//            Image companyLogo = Image.getInstance("/assets/images/final-Excel.png");
//            companyLogo.setAbsolutePosition(235,760);
//            companyLogo.scalePercent(15);
//            doc.add(companyLogo);
            createHeadingsForCompanyName(cb, 265, 770, "Excell Wireless");

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void createHeadingsForCompanyName(PdfContentByte cb, float x, float y, String text){


        cb.beginText();
        cb.setFontAndSize(bfBold, 12);
        cb.setTextMatrix(x,y);
        cb.showText(text.trim());
        cb.endText();

    }


    private void printPageNumber(PdfContentByte cb) {


        cb.beginText();
        cb.setFontAndSize(bfBold, 8);
        cb.showTextAligned(PdfContentByte.ALIGN_CENTER, "Page No. " + (pageNumber + 1), 570, 25, 0);
        cb.endText();

        pageNumber++;

    }
    private void initializeFonts(){


        try {
            bfBold = BaseFont.createFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            bf = BaseFont.createFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);

        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    public byte[] printReportBySales(String salesSummaryReportBy, String startDate, String endDate) throws DocumentException {

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

        if(null != salesDtoList) {
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
            } else if(reportName.equalsIgnoreCase("Sales By Vendor")) {
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

             createHeadingsForCompanyName(cb, 265, 770, "Excell Wireless");


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
                createForCommonReportsContent(cb, 205, y,       df.format(salesDtoList.get(index).getQuantity()), 0);
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

    public byte[] printReportBySalesSummary(String salesReportBy, String startDate, String endDate) throws DocumentException {



        Document doc = new Document(PageSize.A4);
        initializeFonts();


        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);

        List<SalesSummaryDto> salesSummaryDtos = new ArrayList<>();

        salesSummaryDtos = getReportBySalesSummary(salesReportBy, startDate, endDate);

        doc.open();

        PdfContentByte cb = writer.getDirectContent();

        boolean beginPage = true;
        int y = 0;

        if(null != salesSummaryDtos) {
            for (int i = 0; i < salesSummaryDtos.size(); i++) {
                if (beginPage) {
                    beginPage = false;
                    generateLayoutForYearlySales(doc, cb, salesReportBy);
                    generateHeader(doc, cb, startDate, endDate);
                    y = 570;
                }
                generateDetailForSaleSummary(doc, cb, i, y, salesSummaryDtos);
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
    private void generateDetailForSaleSummary(Document doc, PdfContentByte cb, int index, int y, List<SalesSummaryDto> salesSummaryDtos) {
        DecimalFormat df = new DecimalFormat("0.00");

        try {

            if (null != salesSummaryDtos && salesSummaryDtos.size() >= 1) {

                createForCommonReportsContent(cb, 23, y, salesSummaryDtos.get(index).getName(), 0);
                createForCommonReportsContent(cb, 110, y, df.format(salesSummaryDtos.get(index).getCash()), 0);
                createForCommonReportsContent(cb, 165, y, df.format(salesSummaryDtos.get(index).getCredit()), 0);
                createForCommonReportsContent(cb, 230, y, df.format(salesSummaryDtos.get(index).getDebit()), 0);
                createForCommonReportsContent(cb, 285, y, df.format(salesSummaryDtos.get(index).getCheck()), 0);
                createForCommonReportsContent(cb, 340, y, df.format(salesSummaryDtos.get(index).getTax()), 0);
                createForCommonReportsContent(cb, 380, y, df.format(salesSummaryDtos.get(index).getDiscount()), 0);
                createForCommonReportsContent(cb, 450, y, df.format(salesSummaryDtos.get(index).getProfit()), 0);
                createForCommonReportsContent(cb, 510, y, df.format(salesSummaryDtos.get(index).getSubtotal()), 0);

            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private void generateLayoutForYearlySales(Document doc, PdfContentByte cb, String salesReportBy) {

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

            if(salesReportBy.equalsIgnoreCase("Sales By Year")) {
                createHeadingsForCommonReports(cb, 23, 605, "Month");
                createHeadingsForCommonReportsName(cb, 200, 730, "Yearly Sales Report");
            }
            else if(salesReportBy.equalsIgnoreCase("Sales By Month"))
            {
                createHeadingsForCommonReports(cb, 23, 605, "Date");
                createHeadingsForCommonReportsName(cb, 200, 730, "Monthly Sales Report");
            }
            else if(salesReportBy.equalsIgnoreCase("Sales By Week"))
            {
                createHeadingsForCommonReports(cb, 23, 605, "Week");
                createHeadingsForCommonReportsName(cb, 200, 730, "Weekly Sales Report");
            }
            else if(salesReportBy.equalsIgnoreCase("Sales By Hour"))
            {
                createHeadingsForCommonReports(cb, 23, 605, "Hour");
                createHeadingsForCommonReportsName(cb, 200, 730, "Hourly Sales Report");
            }

            createHeadingsForCommonReports(cb, 110, 605, "Debit");
            createHeadingsForCommonReports(cb, 165, 605, "Credit");
            createHeadingsForCommonReports(cb, 230, 605, "Cash");
            createHeadingsForCommonReports(cb, 285, 605, "Check");

            createHeadingsForCommonReports(cb, 340, 605, "Tax");
            createHeadingsForCommonReports(cb, 380, 605, "Discount");
            createHeadingsForCommonReports(cb, 450, 605, "Profit");
            createHeadingsForCommonReports(cb, 510, 605, "Total");


        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}