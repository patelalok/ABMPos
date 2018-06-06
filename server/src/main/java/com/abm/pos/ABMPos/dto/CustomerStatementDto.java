package com.abm.pos.ABMPos.dto;

public class CustomerStatementDto {

    private int transactionComId;
    private String date;
    private String transactionDate;
    private String paymentDate;
    private String description;
    private double transactionAmount;
    private double transactionBalance;
    private double totalDueAmount;
    private double forwardBalance;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public double getTotalDueAmount() {
        return totalDueAmount;
    }

    public void setTotalDueAmount(double totalDueAmount) {
        this.totalDueAmount = totalDueAmount;
    }

    public double getForwardBalance() {
        return forwardBalance;
    }

    public void setForwardBalance(double forwardBalance) {
        this.forwardBalance = forwardBalance;
    }
}
