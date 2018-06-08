package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dto.PaymentHistoryDto;
import com.abm.pos.ABMPos.manager.PaymentManager;
import com.abm.pos.ABMPos.manager.TransactionsManager;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class PaymentController {

    @Autowired
    private PaymentManager paymentManager;

    @RequestMapping(value = "/addPayment", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity<byte[]> addPayment(@RequestBody List<PaymentDao> paymentDaoList) throws DocumentException {

        byte [] pdfDataBytes = paymentManager.addPayment(paymentDaoList);
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

    @RequestMapping(value = "/getPaymentHistory", method = RequestMethod.GET, produces = "application/json")
    public List<PaymentHistoryDto> getPaymentHistory(String startDate, String endDate)
    {
        return paymentManager.getPaymentHistory(startDate,endDate);
    }

    @RequestMapping(value = "/voidPayment", method = RequestMethod.POST, consumes = "application/json")
    public void voidPayment(@RequestBody PaymentHistoryDto paymentHistoryDto)
    {
        paymentManager.voidPayment(paymentHistoryDto);
    }


}
