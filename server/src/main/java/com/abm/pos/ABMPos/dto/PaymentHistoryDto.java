package com.abm.pos.ABMPos.dto;

public class PaymentHistoryDto {

    private int transactionPaymentId;
    private int transactionComId;
    private String status;
    private String date;
    private double amount;
    private String type;
    private String note;
    private double totalAmount;
    private String customerPhoneno;
    private String customerFirstLastName;
    private double transactionBalance;
    private String username;


    public int getTransactionPaymentId() {
        return transactionPaymentId;
    }

    public void setTransactionPaymentId(int transactionPaymentId) {
        this.transactionPaymentId = transactionPaymentId;
    }

    public int getTransactionComId() {
        return transactionComId;
    }

    public void setTransactionComId(int transactionComId) {
        this.transactionComId = transactionComId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
