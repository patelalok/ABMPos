package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import com.abm.pos.ABMPos.repository.TransactionLineItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Component
public class TransactionLineItemManager {

    @Autowired
    private TransactionLineItemRepository transactionLineItemRepository;


    public void addTransactionLineItem(List<TransactionLineItemDao> transactionLineItemDaoList) {

        transactionLineItemRepository.save(transactionLineItemDaoList);
    }

    public List<TransactionLineItemDao> getTransactionLineItemById(int transactionCompId) {

        return transactionLineItemRepository.findAllByTransactionComId(transactionCompId);
    }
}
