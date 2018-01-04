package com.abm.pos.ABMPos.controller;


import com.abm.pos.ABMPos.dao.ProductInventoryDao;
import com.abm.pos.ABMPos.manager.PurchaseOrderManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class PurchaseOrderController {

//    @Autowired
//    private PurchaseOrderManager purchaseOrderManager;
//
//    @RequestMapping(value = "/addProductInventory", method = RequestMethod.POST, consumes = "application/json")
//    public ResponseEntity addProductInventory(@RequestBody List<ProductInventoryDao> productInventoryDao)
//    {
//       // purchaseOrderManager.addProductInventory(productInventoryDao);
//        System.out.println("Product Inventory list added successfully ");
//        return new ResponseEntity(HttpStatus.CREATED);
//    }
}
