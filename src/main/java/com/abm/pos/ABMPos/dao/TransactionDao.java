package com.abm.pos.ABMPos.dao;

import javax.persistence.*;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Entity
@Table(name = "transaction")
public class TransactionDao {

    @Id
    @Column(name = "transaction_com_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int transactionComId;

    private String date;
    private double totalAmount;
    private double tax;
    private double totalDiscount;
    private double  subtotal;
    private int quantity;
    private Long customerPhoneno;
    private String status;
    private double previousBalance;
    private double transactionBalance;
    private String username;
    private String customerFirstLastName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "transaction_com_id")
    private List<TransactionLineItemDao> transactionLineItemDaoList;

    @Transient
    private PaymentDao paymentDao;

    public int getTransactionComId() {
        return transactionComId;
    }

    public void setTransactionComId(int transactionComId) {
        this.transactionComId = transactionComId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getTax() {
        return tax;
    }

    public void setTax(double tax) {
        this.tax = tax;
    }

    public double getTotalDiscount() {
        return totalDiscount;
    }

    public void setTotalDiscount(double totalDiscount) {
        this.totalDiscount = totalDiscount;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getCustomerPhoneno() {
        return customerPhoneno;
    }

    public void setCustomerPhoneno(Long customerPhoneno) {
        this.customerPhoneno = customerPhoneno;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getPreviousBalance() {
        return previousBalance;
    }

    public void setPreviousBalance(double previousBalance) {
        this.previousBalance = previousBalance;
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

    public String getCustomerFirstLastName() {
        return customerFirstLastName;
    }

    public void setCustomerFirstLastName(String customerFirstLastName) {
        this.customerFirstLastName = customerFirstLastName;
    }

    public List<TransactionLineItemDao> getTransactionLineItemDaoList() {
        return transactionLineItemDaoList;
    }

    public void setTransactionLineItemDaoList(List<TransactionLineItemDao> transactionLineItemDaoList) {
        this.transactionLineItemDaoList = transactionLineItemDaoList;
    }

    public PaymentDao getPaymentDao() {
        return paymentDao;
    }

    public void setPaymentDao(PaymentDao paymentDao) {
        this.paymentDao = paymentDao;
    }
}
