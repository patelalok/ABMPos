package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 9/29/17.
 */
@Entity
@Table(name = "product_inventory")
public class ProductInventoryDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private int productId;
    private String productNo;
    private double cost;
    private double retail;
    private double tier1;
    private double tier2;
    private double tier3;
    private double markup;
    private int quantity;
    private String createdTimestamp;

    @Transient
    private int totalQuantity;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductNo() {
        return productNo;
    }

    public void setProductNo(String productNo) {
        this.productNo = productNo;
    }

    public double getCost() {
        return cost;
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

    public double getTier1() {
        return tier1;
    }

    public void setTier1(double tier1) {
        this.tier1 = tier1;
    }

    public double getTier2() {
        return tier2;
    }

    public void setTier2(double tier2) {
        this.tier2 = tier2;
    }

    public double getTier3() {
        return tier3;
    }

    public void setTier3(double tier3) {
        this.tier3 = tier3;
    }

    public double getMarkup() {
        return markup;
    }

    public void setMarkup(double markup) {
        this.markup = markup;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getCreatedTimestamp() {
        return createdTimestamp;
    }

    public void setCreatedTimestamp(String createdTimestamp) {
        this.createdTimestamp = createdTimestamp;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }
}
