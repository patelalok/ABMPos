package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.ProductInventoryDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.manager.TransactionsManager;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Created by apatel2 on 5/18/17.
 */
@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class TransactionController {

    @Autowired
    private TransactionsManager transactionManager;

    @RequestMapping(value = "/addTransaction", method = RequestMethod.POST, consumes = "application/json")
    public TransactionDao addTransaction(@RequestBody TransactionDao transactionDao)
    {
       return transactionManager.addTransaction(transactionDao);
//        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getA4Receipt", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<byte[]> getA4Receipt(@RequestParam int receiptNo) throws DocumentException {

        byte [] pdfDataBytes = transactionManager.getA4Receipt(receiptNo);
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


    @RequestMapping(value = "/getTransaction", method = RequestMethod.GET, produces = "application/json")
    public List<TransactionDao> getTransaction()
    {
        return transactionManager.getTransaction();
    }

    @RequestMapping(value = "/getTransactionById", method = RequestMethod.GET, produces = "application/json")
    public TransactionDao getTransactionById(@RequestParam int transactionCompId)
    {
        return transactionManager.getTransactionById(transactionCompId);
    }

    @RequestMapping(value = "/getTransactionByDate", method = RequestMethod.GET, produces = "application/json")
    public List<TransactionDao> getTransactionByDate(String startDate,String endDate)
    {
        return transactionManager.getTransactionByDate(startDate, endDate);
    }
    @RequestMapping(value = "/getPendingInvoiceByCustomer", method = RequestMethod.GET, produces = "application/json")
    public List<TransactionDao> getPendingInvoiceByCustomer(String phoneNo)
    {
        return transactionManager.getPendingInvoiceByCustomer(phoneNo);
    }
    @RequestMapping(value = "/voidTransaction", method = RequestMethod.POST)
    public ResponseEntity voidTransaction(@RequestBody TransactionDao transactionDao)

    {
        TransactionDao transactionDao1;

       transactionDao1 =  transactionManager.voidTransaction(transactionDao);

       if(null != transactionDao1)
       {
           System.out.println("Transaction Voided Successfully!!");
           return  new ResponseEntity(HttpStatus.OK);
       }
       else
       {
           return  new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    @RequestMapping(value = "/sendEmail", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public boolean sendEmail(@RequestParam int transactionCompId)
    {
        return transactionManager.sendEmail(transactionCompId);
    }



}
