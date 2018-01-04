package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 5/18/17.
 */

@Entity
@Table(name = "transaction_line_item")
public class TransactionLineItemDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int transactionLineItemId;

    private String date;
    private String status;
    private String productNo;
    private int productVariantNo;
    private int quantity;
    private double cost;
    private double retail;
    private double discount;
    private double retailDiscount;
    private double totalProductPrice;
    private String imeiNo;

    @Transient
    private String description;


    public int getTransactionLineItemId() {
        return transactionLineItemId;
    }

    public void setTransactionLineItemId(int transactionLineItemId) {
        this.transactionLineItemId = transactionLineItemId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProductNo() {
        return productNo;
    }

    public void setProductNo(String productNo) {
        this.productNo = productNo;
    }

    public int getProductVariantNo() {
        return productVariantNo;
    }

    public void setProductVariantNo(int productVariantNo) {
        this.productVariantNo = productVariantNo;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getCost() {
        return cost;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public double getRetail() {
        return retail;
    }

    public void setRetail(double retail) {
        this.retail = retail;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getRetailDiscount() {
        return retailDiscount;
    }

    public void setRetailDiscount(double retailDiscount) {
        this.retailDiscount = retailDiscount;
    }

    public double getTotalProductPrice() {
        return totalProductPrice;
    }

    public void setTotalProductPrice(double totalProductPrice) {
        this.totalProductPrice = totalProductPrice;
    }


    public String getImeiNo() {
        return imeiNo;
    }

    public void setImeiNo(String imeiNo) {
        this.imeiNo = imeiNo;
    }

}
