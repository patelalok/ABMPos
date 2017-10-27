package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ReportDao.InventoryDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesSummaryDto;
import com.abm.pos.ABMPos.repository.*;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReportManager {

    @Autowired
    private Utility utility;

    @Autowired
    private ProductInventoryRepository productInventoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

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

        TimeIntervalDto timeIntervalDto;


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

        TimeIntervalDto timeIntervalDto;

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

}

