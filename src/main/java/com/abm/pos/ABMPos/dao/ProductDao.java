package com.abm.pos.ABMPos.dao;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by apatel2 on 5/16/17.
 */

@Entity
@Table(name = "product")
public class ProductDao implements Serializable {

    @Id
    private int productNo;

    @NotEmpty
    private String description;
    @NotEmpty
    private String categoryName;
    @NotEmpty
    private String brandName;
    @NotEmpty
    private String vendorName;
    private String modelName;
    private String alternetNo;

    private double cost;
    private double retail;
    private double markup;

    private int quantity;
    private int minQuantity;

    private String image;

    private int isTax;
    private int isVarient;
    private int isActive;
    private int isEcomerce;
    private int isRelatedProduct;

    private String returnRule;

    public int getProductNo() {
        return productNo;
    }

    public void setProductNo(int productNo) {
        this.productNo = productNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getAlternetNo() {
        return alternetNo;
    }

    public void setAlternetNo(String alternetNo) {
        this.alternetNo = alternetNo;
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

    public int getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(int minQuantity) {
        this.minQuantity = minQuantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getIsTax() {
        return isTax;
    }

    public void setIsTax(int isTax) {
        this.isTax = isTax;
    }

    public int getIsVarient() {
        return isVarient;
    }

    public void setIsVarient(int isVarient) {
        this.isVarient = isVarient;
    }

    public int getIsActive() {
        return isActive;
    }

    public void setIsActive(int isActive) {
        this.isActive = isActive;
    }

    public int getIsEcomerce() {
        return isEcomerce;
    }

    public void setIsEcomerce(int isEcomerce) {
        this.isEcomerce = isEcomerce;
    }

    public int getIsRelatedProduct() {
        return isRelatedProduct;
    }

    public void setIsRelatedProduct(int isRelatedProduct) {
        this.isRelatedProduct = isRelatedProduct;
    }

    public String getReturnRule() {
        return returnRule;
    }

    public void setReturnRule(String returnRule) {
        this.returnRule = returnRule;
    }
}
