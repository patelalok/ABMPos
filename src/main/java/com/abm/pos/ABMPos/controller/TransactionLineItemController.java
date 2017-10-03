package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import com.abm.pos.ABMPos.manager.TransactionLineItemManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */
@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class TransactionLineItemController {

    @Autowired
    private TransactionLineItemManager transactionLineItemManager;

    @RequestMapping(value = "/addTransactionLineItem", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addTransactionLineItem(@RequestBody List<TransactionLineItemDao> transactionLineItemDaoList)
    {
        transactionLineItemManager.addTransactionLineItem(transactionLineItemDaoList);
        return new ResponseEntity(HttpStatus.CREATED);
    }
    @RequestMapping(value = "/getTransactionLineItemById", method = RequestMethod.GET, produces = "application/json")
    public List<TransactionLineItemDao> getTransactionLineItemById(@RequestParam int transactionCompId)
    {

        return transactionLineItemManager.getTransactionLineItemById(transactionCompId);
    }

}
