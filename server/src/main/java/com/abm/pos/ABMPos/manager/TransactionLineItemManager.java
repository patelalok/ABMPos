package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.ReportDao.SalesDto;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import com.abm.pos.ABMPos.repository.TransactionLineItemRepository;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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

    public List<TransactionLineItemDao> getProductHistory(String productNo,String startDate, String endDate) {

        List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();

        List<Object[]> result = transactionLineItemRepository.getProductHistory(productNo,startDate, endDate);

        if (null != result) {
            for (Object[] j : result) {

                TransactionLineItemDao transactionLineItemDao = new TransactionLineItemDao();

                transactionLineItemDao.setTransactionComId(Integer.parseInt(j[0].toString()));
                transactionLineItemDao.setDate(j[1].toString());
                transactionLineItemDao.setStatus(j[2].toString());
                if(null != j[3]) {
                    transactionLineItemDao.setCustomerFirstLastName(j[3].toString());
                }
                transactionLineItemDao.setUsername(j[4].toString());
                transactionLineItemDao.setProductId(Integer.parseInt(j[5].toString()));
                transactionLineItemDao.setProductNo(j[6].toString());
                transactionLineItemDao.setCost(Double.parseDouble(j[7].toString()));
                transactionLineItemDao.setRetailWithDiscount(Double.parseDouble(j[8].toString()));
                transactionLineItemDao.setSaleQuantity(Integer.parseInt(j[9].toString()));

                transactionLineItemDaoList.add(transactionLineItemDao);

            }

        }

        return transactionLineItemDaoList;

    }
}
