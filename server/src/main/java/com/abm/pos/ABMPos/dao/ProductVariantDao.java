package com.abm.pos.ABMPos.dao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by apatel2 on 5/16/17.
 */

@Entity
@Table(name = "product_variant")
public class ProductVariantDao {

    @Id
    private int productVariantNo;
    private int productNo;

    private double cost;
    private double retail;

    private int quantity;
    private int minQuantity;

    private int productVariantId1;
    private int productVariantId2;
    private int productVariantId3;
    private int productVariantId4;

    private String image;

    public int getProductVariantNo() {
        return productVariantNo;
    }

    public void setProductVariantNo(int productVariantNo) {
        this.productVariantNo = productVariantNo;
    }

    public int getProductNo() {
        return productNo;
    }

    public void setProductNo(int productNo) {
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

    public int getProductVariantId1() {
        return productVariantId1;
    }

    public void setProductVariantId1(int productVariantId1) {
        this.productVariantId1 = productVariantId1;
    }

    public int getProductVariantId2() {
        return productVariantId2;
    }

    public void setProductVariantId2(int productVariantId2) {
        this.productVariantId2 = productVariantId2;
    }

    public int getProductVariantId3() {
        return productVariantId3;
    }

    public void setProductVariantId3(int productVariantId3) {
        this.productVariantId3 = productVariantId3;
    }

    public int getProductVariantId4() {
        return productVariantId4;
    }

    public void setProductVariantId4(int productVariantId4) {
        this.productVariantId4 = productVariantId4;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
