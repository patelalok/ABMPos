package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.repository.PaymentRepository;
import com.abm.pos.ABMPos.repository.TransactionRepository;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
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


    public void addTransaction(TransactionDao transactionDao) {

        // Here adding transaction details and payment detail together.
        transactionRepository.save(transactionDao);

        if(null != transactionDao && null != transactionDao.getPaymentDao())
        {
            paymentRepository.save(transactionDao.getPaymentDao());
        }

    }

    public List<TransactionDao> getTransaction() {

        return transactionRepository.findAll();
    }

    public TransactionDao getTransactionById(int transactionCompId) {

        return transactionRepository.findOne(transactionCompId);
    }

    public TimeIntervalDto getTransactionByDate(String date) {

       return utility.getDateByInputString(date);
    }

    public int getLastTransactionId() {
        return transactionRepository.getMaxTransactionId();
    }
}
