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

        if(inventoryReportBy.equalsIgnoreCase("Category")) {

            List<Object[]> result = categoryRepository.getInventoryByCategory();

           return setDataForCommonInventory(result);
        }
        else if(inventoryReportBy.equalsIgnoreCase("Brand")) {
            List<Object[]> result = brandRepository.getInventoryByBrand();

            return setDataForCommonInventory(result);
        }
        else if (inventoryReportBy.equalsIgnoreCase("Vendor")) {

            List<Object[]> result = vendorRepository.getInventoryByVendor();

            return setDataForCommonInventory(result);
        }
        else if (inventoryReportBy.equalsIgnoreCase("Model")) {

            List<Object[]> result = modelRepository.getInventoryByModel();

            return setDataForCommonInventory(result);
        }

        else {
            return null;
        }


    }

    private List<InventoryDto>  setDataForCommonInventory(List<Object[]> result) {
        List<InventoryDto> inventoryDtoList = new ArrayList<>();


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
        return inventoryDtoList;
    }

    public List<SalesSummaryDto> getReportBySalesSummary(String salesReportBy, String date) {

        TimeIntervalDto timeIntervalDto;



        if(salesReportBy.equalsIgnoreCase("SalesByYear"))
        {
            timeIntervalDto = utility.getDateByInputString(date);

            if (null != timeIntervalDto && null != timeIntervalDto.getStartDate() && null != timeIntervalDto.getEndDate())
            {
                List<Object[]> result = transactionRepository.getYearlySalesReport(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
                return setDataForCommonSalesReport(result);
            }
        }
        else if(salesReportBy.equalsIgnoreCase("SalesByMonth"))
        {
            timeIntervalDto = utility.getDateByInputString("This Year");
            if (null != timeIntervalDto && null != timeIntervalDto.getStartDate() && null != timeIntervalDto.getEndDate())
            {
                List<Object[]> result = transactionRepository.getMonthlySalesReport(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
                return setDataForCommonSalesReport(result);
            }

        }

        // TODO NEED TO FIGURE THIS OUT.
        else if(salesReportBy.equalsIgnoreCase("SalesByWeek"))
        {

        }
        else if(salesReportBy.equalsIgnoreCase("SalesByDay"))
        {
            timeIntervalDto = utility.getDateByInputString(date);
            if (null != timeIntervalDto && null != timeIntervalDto.getStartDate() && null != timeIntervalDto.getEndDate())
            {
                // Reusing monthly cause i am passing start date and end date as today's date so i will show data for today only.
                List<Object[]> result = transactionRepository.getMonthlySalesReport(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
                return setDataForCommonSalesReport(result);
            }
        }
        else if(salesReportBy.equalsIgnoreCase("SalesByHour"))
        {
            timeIntervalDto = utility.getDateByInputString(date);
            if (null != timeIntervalDto && null != timeIntervalDto.getStartDate() && null != timeIntervalDto.getEndDate())
            {
                List<Object[]> result = transactionRepository.getHourlySalesReport(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
                return setDataForCommonSalesReport(result);
            }
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

    public List<SalesDto> getReportBySales(String salesReportBy, String date) {

        TimeIntervalDto timeIntervalDto;

        if(salesReportBy.equalsIgnoreCase("Category"))
        {
            timeIntervalDto = utility.getDateByInputString(date);

            List <Object[]> result = categoryRepository.getSalesReportByCategory(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonReportBySales(result);

        }
        else if(salesReportBy.equalsIgnoreCase("Brand"))
        {
            timeIntervalDto = utility.getDateByInputString(date);
            List <Object[]> result = brandRepository.getSalesReportByBrand(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonReportBySales(result);
        }
        else if(salesReportBy.equalsIgnoreCase("Vendor"))
        {
            timeIntervalDto = utility.getDateByInputString(date);
            List <Object[]> result = vendorRepository.getSalesReportByVendor(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonReportBySales(result);
        }
        else if(salesReportBy.equalsIgnoreCase("Model"))
        {
            timeIntervalDto = utility.getDateByInputString(date);
            List <Object[]> result = modelRepository.getSalesReportByModel(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonReportBySales(result);
        }
        else if(salesReportBy.equalsIgnoreCase("Product"))
        {
            timeIntervalDto = utility.getDateByInputString(date);
            List <Object[]> result = productRepository.getSalesReportByProduct(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonReportBySales(result);
        }
        else if(salesReportBy.equalsIgnoreCase("Employee"))
        {
            timeIntervalDto = utility.getDateByInputString(date);
            List <Object[]> result = employeeRepository.getSalesReportByEmployee(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonReportBySales(result);
        }
        else if(salesReportBy.equalsIgnoreCase("Customer"))
        {
            timeIntervalDto = utility.getDateByInputString(date);
            List <Object[]> result = customerRepository.getSalesReportByCustomer(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonReportBySales(result);
        }

        return null;
    }

    private List<SalesDto> setDataForCommonReportBySales(List<Object[]> result) {

        List<SalesDto> salesDtoList = new ArrayList<>();

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
        }

        return salesDtoList;

    }

    public List<SalesDto> getTop50SellingItem(String productReportType, String date)
    {
        TimeIntervalDto timeIntervalDto;

        if(productReportType.equalsIgnoreCase("Top50SellingItem")) {
            timeIntervalDto = utility.getDateByInputString(date);
            List<Object[]> result = productRepository.getTop50SellingItem(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
            return setDataForCommonProductReports(result);
        }
        else if(productReportType.equalsIgnoreCase("Top50MostProfitableItem"))
        {
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

