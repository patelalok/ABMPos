package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 5/16/17.
 */

@Entity
@Table(name = "product_variant")
public class ProductVariantDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int productVariantId;

    private int productId;
    private String productNo;
    private String variant1;
    private String value1;
    private String variant2;
    private String value2;
    private String variant3;
    private String value3;
    private boolean active;
    private byte[] image;
    private String createdTimestamp;

    @Transient
    private String description;

    @Transient
    private String oldProductNo;

    @Transient
    private double tier1;
    @Transient
    private double tier2;
    @Transient
    private double tier3;

    @Transient
    private String operationType;



    @Transient
    private double cost;
    @Transient
    private double retail;
    @Transient
    private int quantity;
    @Transient
    private int minQuantity;

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

    public String getVariant1() {
        return variant1;
    }

    public void setVariant1(String variant1) {
        this.variant1 = variant1;
    }

    public String getValue1() {
        return value1;
    }

    public void setValue1(String value1) {
        this.value1 = value1;
    }

    public String getVariant2() {
        return variant2;
    }

    public void setVariant2(String variant2) {
        this.variant2 = variant2;
    }

    public String getValue2() {
        return value2;
    }

    public void setValue2(String value2) {
        this.value2 = value2;
    }

    public String getVariant3() {
        return variant3;
    }

    public void setVariant3(String variant3) {
        this.variant3 = variant3;
    }

    public String getValue3() {
        return value3;
    }

    public void setValue3(String value3) {
        this.value3 = value3;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
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

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(int minQuantity) {
        this.minQuantity = minQuantity;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getCreatedTimestamp() {
        return createdTimestamp;
    }

    public void setCreatedTimestamp(String createdTimestamp) {
        this.createdTimestamp = createdTimestamp;
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

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getProductVariantId() {
        return productVariantId;
    }

    public void setProductVariantId(int productVariantId) {
        this.productVariantId = productVariantId;
    }

    public String getOldProductNo() {
        return oldProductNo;
    }

    public void setOldProductNo(String oldProductNo) {
        this.oldProductNo = oldProductNo;
    }
}
