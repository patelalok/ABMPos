package com.abm.pos.ABMPos.dao.ReportDao;

public class SalesSummaryDto {

    private String name;
//    private double cash;
//    private double credit;
//    private double debit;
//    private double check;
//    private double storeCredit;
    private double tax;
    private double subtotal;
    private double discount;
    private double profit;
    private double returns;
    private double transactionBalance;
    private double totalAmount;
    private int quantity;
    private double totalDueAmount;
    private double shipping;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public double getCash() {
//        return cash;
//    }
//
//    public void setCash(double cash) {
//        this.cash = cash;
//    }
//
//    public double getCredit() {
//        return credit;
//    }
//
//    public void setCredit(double credit) {
//        this.credit = credit;
//    }
//
//    public double getDebit() {
//        return debit;
//    }
//
//    public void setDebit(double debit) {
//        this.debit = debit;
//    }
//
//    public double getCheck() {
//        return check;
//    }
//
//    public void setCheck(double check) {
//        this.check = check;
//    }
//
//    public double getStoreCredit() {
//        return storeCredit;
//    }
//
//    public void setStoreCredit(double storeCredit) {
//        this.storeCredit = storeCredit;
//    }

    public double getTax() {
        return tax;
    }

    public void setTax(double tax) {
        this.tax = tax;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getProfit() {
        return profit;
    }

    public void setProfit(double profit) {
        this.profit = profit;
    }

    public double getReturns() {
        return returns;
    }

    public void setReturns(double returns) {
        this.returns = returns;
    }

    public double getTransactionBalance() {
        return transactionBalance;
    }

    public void setTransactionBalance(double transactionBalance) {
        this.transactionBalance = transactionBalance;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalDueAmount() {
        return totalDueAmount;
    }

    public void setTotalDueAmount(double totalDueAmount) {
        this.totalDueAmount = totalDueAmount;
    }

    public double getShipping() {
        return shipping;
    }

    public void setShipping(double shipping) {
        this.shipping = shipping;
    }
}
