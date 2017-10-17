package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CloseRegisterDao;
import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.repository.CloseRegisterRepository;
import com.abm.pos.ABMPos.repository.PaymentRepository;
import com.abm.pos.ABMPos.repository.TransactionRepository;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Component
public class CloseRegisterManager {

    @Autowired
    private CloseRegisterRepository closeRegisterRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private Utility utility;

    public void addCloseRegisterDetails(CloseRegisterDao closeRegisterDao) {

        this.closeRegisterRepository.save(closeRegisterDao);
    }

    public CloseRegisterDao getCloseRegisterDetailsByDate(String date) throws NoSuchFieldException, IllegalAccessException {

        TimeIntervalDto timeIntervalDto;
        CloseRegisterDao closeRegisterDao = new CloseRegisterDao();

        timeIntervalDto = utility.getDateByInputString(date);

        if (null != timeIntervalDto) {


            // Getting the sum of all payment methods from payment table.
            PaymentDao paymentDao = getSumOfAllPayments(timeIntervalDto);

            if(null != paymentDao)
            {
                closeRegisterDao.setReportCash(paymentDao.getCash());
                closeRegisterDao.setReportCredit(paymentDao.getCredit());
                closeRegisterDao.setReportDebit(paymentDao.getDebit());
                closeRegisterDao.setReportCheck(paymentDao.getCheckAmount());
                closeRegisterDao.setOnAccount(paymentDao.getOnAccount());
                closeRegisterDao.setStoreCredit(paymentDao.getStoreCredit());
                closeRegisterDao.setLoyalty(paymentDao.getLoyalty());
            }

            // Now need get transaction details from transaction table.
            TransactionDao transactionDao = getSumOfAllTransactionDetails(timeIntervalDto);

            if(null != transactionDao)
            {
                closeRegisterDao.setReportTotalAmount(transactionDao.getTotalAmount());
                closeRegisterDao.setTax(transactionDao.getTax());
                closeRegisterDao.setDiscount(transactionDao.getTotalDiscount());
            }

            return closeRegisterDao;
                    //closeRegisterRepository.getCloseRegisterDetailsByDate(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
        } else {
            return null;
        }
    }

    private TransactionDao getSumOfAllTransactionDetails(TimeIntervalDto timeIntervalDto) {
        TransactionDao transactionDao = new TransactionDao();

        List<Object[]> result = transactionRepository.getSumOfTransactionDetailsForCloseRegister(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());

        for(Object [] j : result)
        {
            for(int i = 0; i <= result.size(); i++)
            {
                transactionDao.setTotalAmount((Double.parseDouble(j[0].toString())));
                transactionDao.setTax((Double.parseDouble(j[1].toString())));
                transactionDao.setTotalDiscount((Double.parseDouble(j[2].toString())));
            }
        }
        return transactionDao;
    }

    private PaymentDao getSumOfAllPayments(TimeIntervalDto timeIntervalDto) {

        PaymentDao paymentDao = new PaymentDao();
        List<Object[]> result =  paymentRepository.sumOfAllPayments(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());

        if(result != null) {

            for (Object [] j : result) {

                for (int i = 0; i <= result.size(); i++) {

                    paymentDao.setCash(Double.parseDouble(j[0].toString()));
                    paymentDao.setCredit(Double.parseDouble(j[1].toString()));
                    paymentDao.setDebit(Double.parseDouble(j[2].toString()));
                    paymentDao.setCheckAmount(Double.parseDouble(j[3].toString()));
                    paymentDao.setStoreCredit(Double.parseDouble(j[4].toString()));
                    paymentDao.setOnAccount(Double.parseDouble(j[5].toString()));
                    paymentDao.setLoyalty(Double.parseDouble(j[6].toString()));

                }
            }
        }

        return paymentDao;
    }

}
