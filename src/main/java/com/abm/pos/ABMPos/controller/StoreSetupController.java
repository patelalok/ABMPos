package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.StoreSetupDao;
import com.abm.pos.ABMPos.manager.StoreSetupManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by apatel2 on 9/26/17.
 */
@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class StoreSetupController {

    @Autowired
    private StoreSetupManager storeSetupManager;

    @RequestMapping(value = "/addStoreDetails", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addStoreDetails(@RequestBody StoreSetupDao storeSetupDao)
    {
        storeSetupManager.addStoreSetupDetails(storeSetupDao);
        System.out.println("Store setup details added or updated successfully ");
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getStoreSetupDetails", method = RequestMethod.GET, produces = "application/json")
    public StoreSetupDao getStoreSetupDetails()
    {
        return storeSetupManager.getStoreSetupDetails();
    }
}
