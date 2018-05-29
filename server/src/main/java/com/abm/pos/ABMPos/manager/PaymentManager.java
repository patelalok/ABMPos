package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dto.PaymentHistoryDto;
import com.abm.pos.ABMPos.repository.PaymentRepository;
import com.abm.pos.ABMPos.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PaymentManager {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public List<PaymentDao> addPayment(List<PaymentDao> paymentDaoList) {

        if (null != paymentDaoList) {
            for (PaymentDao paymentDao : paymentDaoList) {

                // This means Customer has paid the invoice.
                if (paymentDao.getTransactionComId() > 0 && paymentDao.getStatus().equalsIgnoreCase("Complete")) {
                    TransactionDao transactionDao = transactionRepository.getOne(paymentDao.getTransactionComId());
                    if (null != transactionDao) {
                        transactionDao.setStatus(paymentDao.getStatus());
                        transactionDao.setTransactionBalance(0.00);
                        transactionRepository.save(transactionDao);
                        System.out.println("Customer Has Paid full invoice" + transactionDao.getTransactionComId());
                    }
                } else if (paymentDao.getTransactionComId() > 0 && paymentDao.getStatus().equalsIgnoreCase("Pending")) {
                    TransactionDao transactionDao = transactionRepository.getOne(paymentDao.getTransactionComId());
                    if (null != transactionDao) {
                        transactionDao.setStatus(paymentDao.getStatus());
                        transactionDao.setTransactionBalance(transactionDao.getTransactionBalance() - paymentDao.getAmount());
                        transactionRepository.save(transactionDao);
                        System.out.println("Customer Has not Paid full invoice" + transactionDao.getTransactionComId());
                    }
                }
            }
        }

        return paymentRepository.save(paymentDaoList);
    }

    public List<PaymentHistoryDto> getPaymentHistory(String startDate, String endDate) {

        List<PaymentHistoryDto> paymentHistoryDtoList = new ArrayList<>();
        List<Object[]> result = paymentRepository.getPaymentHistory(startDate, endDate);

        if (null != result) {
            for (Object[] j : result) {
                PaymentHistoryDto paymentHistoryDto = new PaymentHistoryDto();

                paymentHistoryDto.setTransactionPaymentId((Integer) j[0]);
                paymentHistoryDto.setTransactionComId((Integer) j[1]);

                if(null != j[2] && null != j[3] && null != j[4])
                {
                    paymentHistoryDto.setStatus(j[2].toString());
                    paymentHistoryDto.setDate(j[3].toString());
                    paymentHistoryDto.setType(j[4].toString());
                }

                paymentHistoryDto.setAmount(Double.parseDouble(j[5].toString()));

                // For now commenting this cause its throwing null pointer
                //paymentHistoryDto.setNote(j[6].toString());
                paymentHistoryDto.setTotalAmount(Double.parseDouble(j[7].toString()));

                if(null != j[8] && null != j[9])
                {
                    paymentHistoryDto.setCustomerPhoneno(j[8].toString());
                    paymentHistoryDto.setCustomerFirstLastName(j[9].toString());
                }

                paymentHistoryDto.setTransactionBalance(Double.parseDouble(j[10].toString()));
                if(null != j[11])
                paymentHistoryDto.setUsername(j[11].toString());



                paymentHistoryDtoList.add(paymentHistoryDto);
            }
        }
        return paymentHistoryDtoList;

    }
}
