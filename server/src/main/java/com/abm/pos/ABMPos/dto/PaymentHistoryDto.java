package com.abm.pos.ABMPos.dto;

import com.abm.pos.ABMPos.dao.PaymentDao;

public class PaymentHistoryDto {

    private PaymentDao paymentDao;
    private double totalAmount;
    private String customerPhoneno;
    private String customerFirstLastName;
    private double transactionBalance;

    public PaymentDao getPaymentDao() {
        return paymentDao;
    }

    public void setPaymentDao(PaymentDao paymentDao) {
        this.paymentDao = paymentDao;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getCustomerPhoneno() {
        return customerPhoneno;
    }

    public void setCustomerPhoneno(String customerPhoneno) {
        this.customerPhoneno = customerPhoneno;
    }

    public String getCustomerFirstLastName() {
        return customerFirstLastName;
    }

    public void setCustomerFirstLastName(String customerFirstLastName) {
        this.customerFirstLastName = customerFirstLastName;
    }

    public double getTransactionBalance() {
        return transactionBalance;
    }

    public void setTransactionBalance(double transactionBalance) {
        this.transactionBalance = transactionBalance;
    }
}
