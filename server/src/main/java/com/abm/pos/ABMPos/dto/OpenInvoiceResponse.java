package com.abm.pos.ABMPos.dto;

import com.abm.pos.ABMPos.dao.TransactionDao;

import java.util.List;

public class OpenInvoiceResponse {

    private CustomerSum  customerSum;
    private List<TransactionDao> transactionDaoList;
    private double totalBalance;

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

    public double getTotalBalance() {
        return totalBalance;
    }

    public void setTotalBalance(double totalBalance) {
        this.totalBalance = totalBalance;
    }
}
