package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

@Entity
@Table(name = "close_register")
public class CloseRegisterDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String date;
    private String username;
    private double reportCash;
    private double reportCredit;
    private double reportGiftCard;
    private double reportDebit;
    private double reportCheck;
    private double reportTotalAmount;
    private double closeCash;
    private double closeCredit;
    private double closeGiftCard;
    private double closeDebit;
    private double closeCheck;
    private double closeTotalAmount;
    private double differenceCash;
    private double differenceCredit;
    private double differenceGiftCard;
    private double differenceDebit;
    private double differenceCheck;
    private double differenceTotal;
    private double totalBusinessAmount;
    private double tax;
    private double totalDiscount;
    private double totalReturn;
    private double profit;
    private double markup;
    private double bankDeposit;
    private double onAccount;
    private double storeCredit;
    private double loyalty;
    private double inHandCash;
    private String note;
    private double tip;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getReportCash() {
        return reportCash;
    }

    public void setReportCash(double reportCash) {
        this.reportCash = reportCash;
    }

    public double getReportCredit() {
        return reportCredit;
    }

    public void setReportCredit(double reportCredit) {
        this.reportCredit = reportCredit;
    }

    public double getReportDebit() {
        return reportDebit;
    }

    public void setReportDebit(double reportDebit) {
        this.reportDebit = reportDebit;
    }

    public double getReportCheck() {
        return reportCheck;
    }

    public void setReportCheck(double reportCheck) {
        this.reportCheck = reportCheck;
    }

    public double getReportTotalAmount() {
        return reportTotalAmount;
    }

    public void setReportTotalAmount(double reportTotalAmount) {
        this.reportTotalAmount = reportTotalAmount;
    }

    public double getCloseCash() {
        return closeCash;
    }

    public void setCloseCash(double closeCash) {
        this.closeCash = closeCash;
    }

    public double getCloseCredit() {
        return closeCredit;
    }

    public void setCloseCredit(double closeCredit) {
        this.closeCredit = closeCredit;
    }

    public double getCloseDebit() {
        return closeDebit;
    }

    public void setCloseDebit(double closeDebit) {
        this.closeDebit = closeDebit;
    }

    public double getCloseCheck() {
        return closeCheck;
    }

    public void setCloseCheck(double closeCheck) {
        this.closeCheck = closeCheck;
    }

    public double getCloseTotalAmount() {
        return closeTotalAmount;
    }

    public void setCloseTotalAmount(double closeTotalAmount) {
        this.closeTotalAmount = closeTotalAmount;
    }

    public double getDifferenceCash() {
        return differenceCash;
    }

    public void setDifferenceCash(double differenceCash) {
        this.differenceCash = differenceCash;
    }

    public double getDifferenceCredit() {
        return differenceCredit;
    }

    public void setDifferenceCredit(double differenceCredit) {
        this.differenceCredit = differenceCredit;
    }

    public double getDifferenceDebit() {
        return differenceDebit;
    }

    public void setDifferenceDebit(double differenceDebit) {
        this.differenceDebit = differenceDebit;
    }

    public double getDifferenceCheck() {
        return differenceCheck;
    }

    public void setDifferenceCheck(double differenceCheck) {
        this.differenceCheck = differenceCheck;
    }

    public double getDifferenceTotal() {
        return differenceTotal;
    }

    public void setDifferenceTotal(double differenceTotal) {
        this.differenceTotal = differenceTotal;
    }

    public double getTotalBusinessAmount() {
        return totalBusinessAmount;
    }

    public void setTotalBusinessAmount(double totalBusinessAmount) {
        this.totalBusinessAmount = totalBusinessAmount;
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

    public double getTotalReturn() {
        return totalReturn;
    }

    public void setTotalReturn(double totalReturn) {
        this.totalReturn = totalReturn;
    }

    public double getProfit() {
        return profit;
    }

    public void setProfit(double profit) {
        this.profit = profit;
    }

    public double getMarkup() {
        return markup;
    }

    public void setMarkup(double markup) {
        this.markup = markup;
    }

    public double getBankDeposit() {
        return bankDeposit;
    }

    public void setBankDeposit(double bankDeposit) {
        this.bankDeposit = bankDeposit;
    }

    public double getOnAccount() {
        return onAccount;
    }

    public void setOnAccount(double onAccount) {
        this.onAccount = onAccount;
    }

    public double getStoreCredit() {
        return storeCredit;
    }

    public void setStoreCredit(double storeCredit) {
        this.storeCredit = storeCredit;
    }

    public double getLoyalty() {
        return loyalty;
    }

    public void setLoyalty(double loyalty) {
        this.loyalty = loyalty;
    }

    public double getInHandCash() {
        return inHandCash;
    }

    public void setInHandCash(double inHandCash) {
        this.inHandCash = inHandCash;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public double getTip() {
        return tip;
    }

    public void setTip(double tip) {
        this.tip = tip;
    }

    public double getReportGiftCard() {
        return reportGiftCard;
    }

    public void setReportGiftCard(double reportGiftCard) {
        this.reportGiftCard = reportGiftCard;
    }

    public double getCloseGiftCard() {
        return closeGiftCard;
    }

    public void setCloseGiftCard(double closeGiftCard) {
        this.closeGiftCard = closeGiftCard;
    }

    public double getDifferenceGiftCard() {
        return differenceGiftCard;
    }

    public void setDifferenceGiftCard(double differenceGiftCard) {
        this.differenceGiftCard = differenceGiftCard;
    }
}
