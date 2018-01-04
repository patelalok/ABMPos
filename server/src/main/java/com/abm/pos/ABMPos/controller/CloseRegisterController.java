package com.abm.pos.ABMPos.controller;


import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.dao.CloseRegisterDao;
import com.abm.pos.ABMPos.manager.CloseRegisterManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
