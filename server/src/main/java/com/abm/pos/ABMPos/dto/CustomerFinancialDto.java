package com.abm.pos.ABMPos.dto;

public class CustomerFinancialDto {

    private double dueBalance;
    private double storeCredit;
    private double totalSpending;
    private double totalReturn;
    private int pendingInvoiceCount;

    public double getDueBalance() {
        return dueBalance;
    }

    public void setDueBalance(double dueBalance) {
        this.dueBalance = dueBalance;
    }

    public double getStoreCredit() {
        return storeCredit;
    }

    public void setStoreCredit(double storeCredit) {
        this.storeCredit = storeCredit;
    }

    public double getTotalSpending() {
        return totalSpending;
    }

    public void setTotalSpending(double totalSpending) {
        this.totalSpending = totalSpending;
    }

    public double getTotalReturn() {
        return totalReturn;
    }

    public void setTotalReturn(double totalReturn) {
        this.totalReturn = totalReturn;
    }

    public int getPendingInvoiceCount() {
        return pendingInvoiceCount;
    }

    public void setPendingInvoiceCount(int pendingInvoiceCount) {
        this.pendingInvoiceCount = pendingInvoiceCount;
    }
}
