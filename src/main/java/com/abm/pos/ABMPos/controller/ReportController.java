package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ReportDao.InventoryDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesSummaryDto;
import com.abm.pos.ABMPos.manager.ReportManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class ReportController {

    @Autowired
    private ReportManager reportManager;

    @RequestMapping(value = "/getReportByInventory", method = RequestMethod.GET, produces = "application/json")
    public List<InventoryDto> getReportByInventory(String inventoryReportBy)
    {
        return reportManager.getReportByInventory(inventoryReportBy);
    }

    @RequestMapping(value = "/getReportBySalesSummary", method = RequestMethod.GET, produces = "application/json")
    public List<SalesSummaryDto> getReportBySalesSummary(String salesSummaryReportBy)
    {
        return reportManager.getReportBySalesSummary(salesSummaryReportBy);
    }

    @RequestMapping(value = "/getReportBySales", method = RequestMethod.GET, produces = "application/json")
    public List<SalesDto> getReportBySales(String salesReportBy)
    {
        return reportManager.getReportBySales(salesReportBy);
    }

}
