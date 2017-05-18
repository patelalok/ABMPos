package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.manager.TransactionsManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



/**
 * Created by apatel2 on 5/18/17.
 */
@RestController
@RequestMapping("*")
public class TransactionController {

    @Autowired
    private TransactionsManager transactionManager;

    @RequestMapping(value = "/addTransaction", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addTransaction(@RequestBody TransactionDao transactionDao)
    {
        transactionManager.addTransaction(transactionDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }
}
