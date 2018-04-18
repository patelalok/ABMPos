package com.abm.pos.ABMPos.dto;

import com.abm.pos.ABMPos.dao.TransactionDao;

import java.util.List;

public class OpenInvoiceResponse {

    private CustomerSum  customerSum;
    private List<TransactionDao> transactionDaoList;

    public CustomerSum getCustomerSum() {
        return customerSum;
    }

    public void setCustomerSum(CustomerSum customerSum) {
        this.customerSum = customerSum;
    }

    public List<TransactionDao> getTransactionDaoList() {
        return transactionDaoList;
    }

    public void setTransactionDaoList(List<TransactionDao> transactionDaoList) {
        this.transactionDaoList = transactionDaoList;
    }
}
