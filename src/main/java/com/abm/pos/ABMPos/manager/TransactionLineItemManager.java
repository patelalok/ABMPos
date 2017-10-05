package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import com.abm.pos.ABMPos.repository.TransactionLineItemRepository;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
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

    @Autowired
    private Utility utility;


    public void addTransactionLineItem(List<TransactionLineItemDao> transactionLineItemDaoList) {

        transactionLineItemRepository.save(transactionLineItemDaoList);
    }

    public List<TransactionLineItemDao> getTransactionLineItemById(int transactionCompId) {

       // return transactionLineItemRepository.findAllByTransactionComId(transactionCompId);

        return null;
    }

    public List<TransactionLineItemDao> getProductHistory(String productNo, String duration) {

        TimeIntervalDto timeIntervalDto;

        timeIntervalDto = utility.getDateByInputString(duration);

        if(null != timeIntervalDto && null != timeIntervalDto.getStartDate() && null != timeIntervalDto.getEndDate())
        {
            return transactionLineItemRepository.getProductHistory(productNo, timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
        }
        else {

            return null;
        }
    }
}
