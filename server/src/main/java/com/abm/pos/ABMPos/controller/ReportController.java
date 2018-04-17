package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ReportDao.InventoryDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesDto;
import com.abm.pos.ABMPos.dao.ReportDao.SalesSummaryDto;
import com.abm.pos.ABMPos.manager.ReportManager;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @RequestMapping(value = "/printReportByInventory", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<byte[]> printReportByInventory(String inventoryReportBy) throws DocumentException {
        byte [] pdfDataBytes = reportManager.printReportByInventory(inventoryReportBy);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(pdfDataBytes, headers, HttpStatus.OK);
        return response;

    }

    @RequestMapping(value = "/getReportBySalesSummary", method = RequestMethod.GET, produces = "application/json")
    public List<SalesSummaryDto> getReportBySalesSummary(String salesSummaryReportBy, String startDate, String endDate)
    {
        return reportManager.getReportBySalesSummary(salesSummaryReportBy, startDate, endDate);
    }

    @RequestMapping(value = "/printReportBySalesSummary", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<byte[]>  printReportBySalesSummary(String salesSummaryReportBy, String startDate, String endDate) throws DocumentException {

        byte [] pdfDataBytes =  reportManager.printReportBySalesSummary(salesSummaryReportBy, startDate, endDate);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(pdfDataBytes, headers, HttpStatus.OK);
        return response;
    }

    @RequestMapping(value = "/getDashboardReportBySalesSummary", method = RequestMethod.GET, produces = "application/json")
    public SalesSummaryDto getDashboardReportBySalesSummary(String salesSummaryReportBy, String startDate, String endDate)
    {
        return reportManager.getDashboardReportBySalesSummary(salesSummaryReportBy, startDate, endDate);
    }

    @RequestMapping(value = "/getReportBySales", method = RequestMethod.GET, produces = "application/json")
    public List<SalesDto> getReportBySales(String salesReportBy, String startDate, String endDate)
    {
        return reportManager.getReportBySales(salesReportBy, startDate, endDate);
    }

    @RequestMapping(value = "/getTop50SellingItem", method = RequestMethod.GET, produces = "application/json")
    public List<SalesDto> getTop50SellingItem(String productReportType, String startDate, String endDate)
    {
        return reportManager.getTop50SellingItem(productReportType,startDate, endDate);
    }

    @RequestMapping(value = "/getOpenInvoice", method = RequestMethod.GET, produces = "application/json")
    public List<SalesDto> getOpenInvoice(String startDate, String endDate)
    {
        return reportManager.getOpenInvoice(startDate, endDate);
    }
    @RequestMapping(value = "/printOpenInvoice", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<byte[]> printOpenInvoice(String startDate, String endDate)
    {
        byte [] pdfDataBytes =  reportManager.printOpenInvoice(startDate, endDate);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(pdfDataBytes, headers, HttpStatus.OK);
        return response;
    }



}
