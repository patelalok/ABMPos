package com.abm.pos.ABMPos.controller;


import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.dao.CloseRegisterDao;
import com.abm.pos.ABMPos.manager.CloseRegisterManager;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class CloseRegisterController {

    @Autowired
    private CloseRegisterManager closeRegisterManager;

    @RequestMapping(value = "/addCloseRegisterDetails", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addCloseRegisterDetails(@RequestBody CloseRegisterDao closeRegisterDao)
    {
        closeRegisterManager.addCloseRegisterDetails(closeRegisterDao);
        System.out.println("Close Register Details Added Or Updated Successfully!!");

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getCloseRegisterDetailsByDate", method = RequestMethod.GET)
    public CloseRegisterDao getCloseRegisterDetailsByDate(String startDate, String endDate) throws NoSuchFieldException, IllegalAccessException {
        return closeRegisterManager.getCloseRegisterDetailsByDate(startDate, endDate);
    }

    @RequestMapping(value= "/printClosingDetails", method = RequestMethod.GET, produces = "application/pdf")
    public ResponseEntity<byte[]> getPrintClosingDetails(@RequestParam String startDate, @RequestParam String endDate) throws IOException, DocumentException, NoSuchFieldException, IllegalAccessException {

        byte[] pdfDataBytes = closeRegisterManager.printClosingDetails(startDate,endDate);

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
