package com.abm.pos.ABMPos.dto;

public class CustomerStatementDto {

    private int transactionComId;
    private String transactionDate;
    private String paymentDate;
    private double transactionAmount;
    private double transactionBalance;
    private double forwardBalance;

    public int getTransactionComId() {
        return transactionComId;
    }

    public void setTransactionComId(int transactionComId) {
        this.transactionComId = transactionComId;
    }

    public String getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(String transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }

    public double getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(double transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public double getTransactionBalance() {
        return transactionBalance;
    }

    public void setTransactionBalance(double transactionBalance) {
        this.transactionBalance = transactionBalance;
    }

    public double getForwardBalance() {
        return forwardBalance;
    }

    public void setForwardBalance(double forwardBalance) {
        this.forwardBalance = forwardBalance;
    }
}
