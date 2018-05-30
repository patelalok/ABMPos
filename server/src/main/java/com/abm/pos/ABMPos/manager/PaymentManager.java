package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dto.PaymentHistoryDto;
import com.abm.pos.ABMPos.repository.CustomerRepository;
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

    @Autowired
    private CustomerRepository customerRepository;

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
                PaymentDao paymentDao = new PaymentDao();

                paymentDao.setTransactionPaymentId((Integer) j[0]);
                paymentDao.setTransactionComId((Integer) j[1]);

                if(null != j[2] && null != j[3] && null != j[4])
                {
                    paymentDao.setStatus(j[2].toString());
                    paymentDao.setDate(j[3].toString());
                    paymentDao.setType(j[4].toString());
                }

                paymentDao.setAmount(Double.parseDouble(j[5].toString()));

                // For now commenting this cause its throwing null pointer
                //paymentHistoryDto.setNote(j[6].toString());
                paymentHistoryDto.setTotalAmount(Double.parseDouble(j[7].toString()));

                if(null != j[8] && null != j[9])
                {
                    paymentHistoryDto.setCustomerPhoneno(j[8].toString());
                    paymentHistoryDto.setCustomerFirstLastName(j[9].toString());
                }
                paymentHistoryDto.setTransactionBalance(Double.parseDouble(j[10].toString()));
                if(null != j[11]) {
                    paymentDao.setUsername(j[11].toString());
                }

                paymentHistoryDto.setPaymentDao(paymentDao);

                paymentHistoryDtoList.add(paymentHistoryDto);
            }
        }
        return paymentHistoryDtoList;

    }

    public PaymentDao voidPayment(PaymentHistoryDto paymentHistoryDto) {

        PaymentDao paymentDao = new PaymentDao();

        if(null != paymentHistoryDto && null != paymentHistoryDto.getPaymentDao() && paymentHistoryDto.getPaymentDao().getTransactionPaymentId() > 0 && paymentHistoryDto.getPaymentDao().getTransactionComId() > 0) {
            if(paymentHistoryDto.getPaymentDao().getStatus().equalsIgnoreCase("Complete") && paymentHistoryDto.getPaymentDao().getAmount() > 0) {
                // In Case of store credit void I need to put the store credit back to customers account.
                if (null != paymentHistoryDto.getCustomerPhoneno() && paymentHistoryDto.getPaymentDao().getType().equalsIgnoreCase("Store Credit")) {
                    CustomerDao customerDao = customerRepository.getOne(paymentHistoryDto.getCustomerPhoneno());
                    if(null != customerDao) {
                        customerDao.setStoreCredit(customerDao.getStoreCredit() + paymentHistoryDto.getPaymentDao().getAmount());
                        customerRepository.save(customerDao);
                    }
                }
                paymentDao = paymentHistoryDto.getPaymentDao();
                paymentDao.setStatus("Void");

                paymentDao = paymentRepository.save(paymentDao);

                // Now Need to get transaction and add the payment amount in transaction balance, also need to change the status to pending.
                TransactionDao transactionDao = transactionRepository.findOneByTransactionComId(paymentHistoryDto.getPaymentDao().getTransactionComId());

                if(null != transactionDao && transactionDao.getTotalAmount() >= paymentHistoryDto.getPaymentDao().getAmount()) {
                    transactionDao.setTransactionBalance(transactionDao.getTransactionBalance() + paymentHistoryDto.getPaymentDao().getAmount());
                    transactionDao.setStatus("Pending");
                    transactionDao.setTotalBalanceDue(transactionDao.getTotalBalanceDue() + paymentHistoryDto.getPaymentDao().getAmount());

                    transactionRepository.save(transactionDao);
                }
            }
        }
        return paymentDao;
    }
}
