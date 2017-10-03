package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.manager.TransactionsManager;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
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
public class TransactionController {

    @Autowired
    private TransactionsManager transactionManager;

    @RequestMapping(value = "/addTransaction", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addTransaction(@RequestBody TransactionDao transactionDao, @RequestBody PaymentDao paymentDao)
    {
        transactionManager.addTransaction(transactionDao, paymentDao);
        return new ResponseEntity(HttpStatus.CREATED);
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
    public TimeIntervalDto getTransactionByDate(@RequestParam String date)
    {

        return transactionManager.getTransactionByDate(date);
    }
}
