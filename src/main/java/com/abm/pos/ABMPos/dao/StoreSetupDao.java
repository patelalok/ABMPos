package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 9/26/17.
 */

@Entity
@Table(name = "store_setup")
public class StoreSetupDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;
    private double tax;
    private String address;
    private String email;
    private byte[] logo;
    private String receiptFooter;
    private Integer receiptType;
    private boolean loyaltyEnabled;
    private double loyaltyAmountForDollar;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getTax() {
        return tax;
    }

    public void setTax(double tax) {
        this.tax = tax;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getReceiptFooter() {
        return receiptFooter;
    }

    public void setReceiptFooter(String receiptFooter) {
        this.receiptFooter = receiptFooter;
    }

    public Integer getReceiptType() {
        return receiptType;
    }

    public void setReceiptType(Integer receiptType) {
        this.receiptType = receiptType;
    }

    public boolean isLoyaltyEnabled() {
        return loyaltyEnabled;
    }

    public void setLoyaltyEnabled(boolean loyaltyEnabled) {
        this.loyaltyEnabled = loyaltyEnabled;
    }

    public double getLoyaltyAmountForDollar() {
        return loyaltyAmountForDollar;
    }

    public void setLoyaltyAmountForDollar(double loyaltyAmountForDollar) {
        this.loyaltyAmountForDollar = loyaltyAmountForDollar;
    }
}
