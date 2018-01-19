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

    public CloseRegisterDao getCloseRegisterDetailsByDate(String startDate, String endDate) throws NoSuchFieldException, IllegalAccessException {

        CloseRegisterDao closeRegisterDao = new CloseRegisterDao();

            // Getting the sum of all payment methods from payment table.
            PaymentDao paymentDao = getSumOfAllPayments(startDate, endDate);

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
            TransactionDao transactionDao = getSumOfAllTransactionDetails(startDate, endDate);

            if(null != transactionDao)
            {
                closeRegisterDao.setReportTotalAmount(transactionDao.getTotalAmount());
                closeRegisterDao.setTax(transactionDao.getTax());
                closeRegisterDao.setTotalDiscount(transactionDao.getTotalDiscount());
                closeRegisterDao.setTotalReturn(transactionDao.getTotalReturn());
            }

            // Here i need to check if there is any data from user, this happens when user close the register more then 2 times or
            // User is trying to get details for previous days.

            CloseRegisterDao closeRegisterDao1 = closeRegisterRepository.getCloseRegisterDetailsByDate(startDate,endDate);

            if(null != closeRegisterDao1)
            {
                closeRegisterDao.setCloseCash(closeRegisterDao1.getCloseCash());
                closeRegisterDao.setCloseCredit(closeRegisterDao1.getCloseCredit());
                closeRegisterDao.setCloseDebit(closeRegisterDao1.getCloseDebit());
                closeRegisterDao.setCloseCheck(closeRegisterDao1.getCloseCheck());
                closeRegisterDao.setId(closeRegisterDao1.getId());

            }

            return closeRegisterDao;
                    //closeRegisterRepository.getCloseRegisterDetailsByDate(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
        }

    private TransactionDao getSumOfAllTransactionDetails(String startDate, String endDate) {
        TransactionDao transactionDao = new TransactionDao();

        List<Object[]> result = transactionRepository.getSumOfTransactionDetailsForCloseRegister(startDate, endDate);

        for(Object [] j : result)
        {
            if(j[0] != null) {
                for (int i = 0; i <= result.size(); i++) {
                    transactionDao.setTotalAmount((Double.parseDouble(j[0].toString())));
                    transactionDao.setTax((Double.parseDouble(j[1].toString())));
                    transactionDao.setTotalDiscount((Double.parseDouble(j[2].toString())));

                    if(null != j[3].toString()){
                        transactionDao.setTotalReturn(Double.parseDouble(j[3].toString()));
                    }

                }
            }
        }
        return transactionDao;
    }

    private PaymentDao getSumOfAllPayments(String startDate, String endDate) {

        PaymentDao paymentDao = new PaymentDao();
        List<Object[]> result =  paymentRepository.sumOfAllPayments(startDate, endDate);

        if(result != null) {

            for (Object [] j : result) {

                if(j[0] != null) {

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
        }

        return paymentDao;
    }

}
