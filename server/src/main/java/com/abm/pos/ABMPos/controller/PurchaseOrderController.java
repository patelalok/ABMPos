package com.abm.pos.ABMPos.controller;


import com.abm.pos.ABMPos.dao.PurchaseOrderDao;
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

    @Autowired
    private PurchaseOrderManager purchaseOrderManager;

    @RequestMapping(value = "/addPurchaseOrder", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addPurchaseOrder(@RequestBody PurchaseOrderDao purchaseOrderDao)
    {
        PurchaseOrderDao purchaseOrderDao1 = purchaseOrderManager.addPurchaseOrder(purchaseOrderDao);
        if(null != purchaseOrderDao1)
        {
            return ResponseEntity.status(201).body(purchaseOrderDao1);
        }
        return ResponseEntity.status(500).body(null);
    }

    @RequestMapping(value = "/getPurchaseOrder", method = RequestMethod.GET, produces = "application/json")
    public List<PurchaseOrderDao> getPurchaseOrder(@RequestParam String startDate, @RequestParam String endDate)
    {
        return purchaseOrderManager.getPurchaseOrder(startDate, endDate);

    }
}
