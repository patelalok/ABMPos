package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by apatel2 on 5/18/17.
 */
@Component
public class TransactionsManager {

    @Autowired
    private TransactionRepository transactionRepository;


    public void addTransaction(TransactionDao transactionDao) {

        transactionRepository.save(transactionDao);
    }
}
