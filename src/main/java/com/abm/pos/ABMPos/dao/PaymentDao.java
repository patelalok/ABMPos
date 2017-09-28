package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 9/28/17.
 */

@Entity
@Table(name = "transaction_payment")
public class PaymentDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int transactionPaymentId;
    private int transactionComIdFk;
    private double cash;
    private double credit;
    private double debit;
    private double check;
    private double storeCredit;
    private double onAccount;
    private double loyalty;
    private double layby;
    private double changeForCash;
    private double creditCardLast4;
    private double receiptNote;
    private double transactionNote;

    public int getTransactionPaymentId() {
        return transactionPaymentId;
    }

    public void setTransactionPaymentId(int transactionPaymentId) {
        this.transactionPaymentId = transactionPaymentId;
    }

    public int getTransactionComIdFk() {
        return transactionComIdFk;
    }

    public void setTransactionComIdFk(int transactionComIdFk) {
        this.transactionComIdFk = transactionComIdFk;
    }

    public double getCash() {
        return cash;
    }

    public void setCash(double cash) {
        this.cash = cash;
    }

    public double getCredit() {
        return credit;
    }

    public void setCredit(double credit) {
        this.credit = credit;
    }

    public double getDebit() {
        return debit;
    }

    public void setDebit(double debit) {
        this.debit = debit;
    }

    public double getCheck() {
        return check;
    }

    public void setCheck(double check) {
        this.check = check;
    }

    public double getStoreCredit() {
        return storeCredit;
    }

    public void setStoreCredit(double storeCredit) {
        this.storeCredit = storeCredit;
    }

    public double getOnAccount() {
        return onAccount;
    }

    public void setOnAccount(double onAccount) {
        this.onAccount = onAccount;
    }

    public double getLoyalty() {
        return loyalty;
    }

    public void setLoyalty(double loyalty) {
        this.loyalty = loyalty;
    }

    public double getLayby() {
        return layby;
    }

    public void setLayby(double layby) {
        this.layby = layby;
    }

    public double getChangeForCash() {
        return changeForCash;
    }

    public void setChangeForCash(double changeForCash) {
        this.changeForCash = changeForCash;
    }

    public double getCreditCardLast4() {
        return creditCardLast4;
    }

    public void setCreditCardLast4(double creditCardLast4) {
        this.creditCardLast4 = creditCardLast4;
    }

    public double getReceiptNote() {
        return receiptNote;
    }

    public void setReceiptNote(double receiptNote) {
        this.receiptNote = receiptNote;
    }

    public double getTransactionNote() {
        return transactionNote;
    }

    public void setTransactionNote(double transactionNote) {
        this.transactionNote = transactionNote;
    }
}
