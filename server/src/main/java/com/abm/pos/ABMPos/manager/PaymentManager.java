package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.repository.PaymentRepository;
import com.abm.pos.ABMPos.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PaymentManager {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<PaymentDao> addPayment(List<PaymentDao> paymentDaoList) {

        if(null != paymentDaoList)
        {
            for(PaymentDao paymentDao: paymentDaoList){

                // This means Customer has paid the invoice.
                if(paymentDao.getTransactionComId() > 0 && paymentDao.getStatus().equalsIgnoreCase("Complete"))
                {
                    TransactionDao transactionDao= transactionRepository.getOne(paymentDao.getTransactionComId());
                    if(null != transactionDao)
                    {
                        transactionDao.setStatus(paymentDao.getStatus());
                        transactionDao.setTransactionBalance(0.00);
                        transactionRepository.save(transactionDao);
                        System.out.println("Customer Has Paid full invoice"+transactionDao.getTransactionComId());
                    }
                }
                else if(paymentDao.getTransactionComId() > 0 && paymentDao.getStatus().equalsIgnoreCase("Pending"))
                {
                    TransactionDao transactionDao= transactionRepository.getOne(paymentDao.getTransactionComId());
                    if(null != transactionDao)
                    {
                        transactionDao.setStatus(paymentDao.getStatus());
                        transactionDao.setTransactionBalance(transactionDao.getTransactionBalance() - paymentDao.getAmount());
                        transactionRepository.save(transactionDao);
                        System.out.println("Customer Has not Paid full invoice"+transactionDao.getTransactionComId());
                    }
                }
            }
        }

        return paymentRepository.save(paymentDaoList);
    }
}
