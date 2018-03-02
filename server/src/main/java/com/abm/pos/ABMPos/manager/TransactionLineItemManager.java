package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ProductDao;
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

    public List<TransactionLineItemDao> getProductHistory(String startDate, String endDate, String productNo) {

        List<Object[]> result = transactionLineItemRepository.getProductHistory(startDate,endDate,productNo);
        List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();


        for(Object [] j : result)
        {
            TransactionLineItemDao transactionLineItemDao = new TransactionLineItemDao();

            if(j[0] != null) {
                for (int i = 0; i <= result.size(); i++) {


                    transactionLineItemDao.setDate((j[0].toString()));
                    transactionLineItemDao.setProductNo(j[1].toString());
                    transactionLineItemDao.setDescription(j[2].toString());
                    transactionLineItemDao.setSaleQuantity(Integer.parseInt(j[3].toString()));
                    if(null != j[4]){
                        transactionLineItemDao.setImeiNo(j[4].toString());
                    }
                   // transactionLineItemDao.setTotalQuantity(Integer.parseInt(j[5].toString()));
                    transactionLineItemDao.setRetail(Double.parseDouble(j[6].toString()));
                    transactionLineItemDao.setCost(Double.parseDouble(j[7].toString()));
                    transactionLineItemDao.setDiscount(Double.parseDouble(j[8].toString()));

                }
            }

            transactionLineItemDaoList.add(transactionLineItemDao);
        }
        return  transactionLineItemDaoList;
    }
}
