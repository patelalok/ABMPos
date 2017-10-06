package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import com.abm.pos.ABMPos.repository.PaymentRepository;
import com.abm.pos.ABMPos.repository.ProductRepository;
import com.abm.pos.ABMPos.repository.TransactionRepository;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sun.dc.pr.PRError;

import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */
@Component
public class TransactionsManager {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private Utility utility;

    @Autowired
    private ProductRepository productRepository;


    public void addTransaction(TransactionDao transactionDao) {

        transactionRepository.save(transactionDao);

        // Now I need to reduce the quantity from product table.
        // TODO need to handle failure scenario
        for(TransactionLineItemDao lineItemDao: transactionDao.getTransactionLineItemDaoList())
        {
            int CurrentQuantity = productRepository.getProductQuantity(lineItemDao.getProductNo());
            productRepository.updateProductQuantity(lineItemDao.getProductNo(), CurrentQuantity - lineItemDao.getQuantity());
        }
    }

    public List<TransactionDao> getTransaction() {

        return transactionRepository.findAll();
    }

    public TransactionDao getTransactionById(int transactionCompId) {

        return transactionRepository.findOne(transactionCompId);
    }

    public List<TransactionDao> getTransactionByDate(String date) {

        TimeIntervalDto timeIntervalDto;

       timeIntervalDto = utility.getDateByInputString(date);

       if(null != timeIntervalDto)
       {
          return transactionRepository.getTransactionByDate(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
       }
       else {
           return null;
       }

    }
}
