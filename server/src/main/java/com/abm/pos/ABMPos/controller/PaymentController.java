package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.manager.PaymentManager;
import com.abm.pos.ABMPos.manager.TransactionsManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class PaymentController {

    @Autowired
    private PaymentManager paymentManager;

    @RequestMapping(value = "/addPayment", method = RequestMethod.POST, consumes = "application/json")
    public List<PaymentDao> addTransaction(@RequestBody List<PaymentDao> paymentDaoList)
    {
        return paymentManager.addPayment(paymentDaoList);
    }
}