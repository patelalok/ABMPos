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

    public void voidPayment(PaymentHistoryDto paymentHistoryDto) {

        PaymentDao paymentDao = new PaymentDao();

        if(null != paymentHistoryDto && paymentHistoryDto.getTransactionPaymentId() > 0 && paymentHistoryDto.getTransactionComId() > 0)
        {
            if(paymentHistoryDto.getStatus().equalsIgnoreCase("Complete") && paymentHistoryDto.getAmount() > 0)
            {
                // In Case of store credit void I need to put the store credit back to customers account.
                if (null != paymentHistoryDto.getCustomerPhoneno() && paymentHistoryDto.getType().equalsIgnoreCase("Store Credit"))
                {
                    CustomerDao customerDao = customerRepository.getOne(paymentHistoryDto.getCustomerPhoneno());
                    if(null != customerDao)
                    {
                        customerDao.setStoreCredit(customerDao.getStoreCredit() + paymentHistoryDto.getAmount());
                        customerRepository.save(customerDao);
                    }
                }
                paymentDao.setStatus("Void");
                paymentDao.setTransactionPaymentId(paymentHistoryDto.getTransactionPaymentId());
                paymentDao.setTransactionComId(paymentHistoryDto.getTransactionComId());
                paymentDao.setDate(paymentHistoryDto.getDate());
                paymentDao.setType(paymentHistoryDto.getType());
                paymentDao.setAmount(paymentHistoryDto.getAmount());
                paymentDao.setNote(paymentHistoryDto.getNote());
                paymentDao.setUpdatedTimestamp(paymentHistoryDto.getUpdatedTimestamp());
                paymentDao.setUsername(paymentDao.getUsername());

                paymentRepository.save(paymentDao);

                // Now Need to get transaction and add the payment amount in transaction balance, also need to change the status to pending.
                TransactionDao transactionDao = transactionRepository.findOneByTransactionComId(paymentHistoryDto.getTransactionComId());

                if(null != transactionDao && transactionDao.getTotalAmount() > paymentHistoryDto.getAmount())
                {

                    transactionDao.setTransactionBalance(transactionDao.getTransactionBalance() + paymentHistoryDto.getAmount());
                    transactionDao.setStatus("Pending");
                    transactionDao.setTotalBalanceDue(transactionDao.getTotalDueBalance() + paymentHistoryDto.getAmount());

                    transactionRepository.save(transactionDao);
                }




            }
        }
    }
}
