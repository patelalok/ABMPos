package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.VendorDao;
import com.abm.pos.ABMPos.manager.VendorManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@RestController
@RequestMapping("*")
public class VendorController {

    @Autowired
    private VendorManager vendorManager;

    @RequestMapping(value = "/addVendor", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addVendor(@RequestBody VendorDao vendorDao)
    {
        vendorManager.addVendor(vendorDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getVendor", method = RequestMethod.GET, produces = "application/json")
    public List<VendorDao> getVendor()
    {
        return vendorManager.getVendor();
    }


    @RequestMapping(value = "/deleteVendor", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteVendor(@RequestParam String name)
    {
        vendorManager.deleteVendor(name);
        return new ResponseEntity(HttpStatus.OK);
    }
}
