package com.abm.pos.ABMPos.dao;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
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


    //this is just to send as 1 when we sell the product default
    @Transient
    private int defaultQuantity = 1;

    private String image;

    private Boolean isTax;
    private Boolean isVarient;
    private Boolean isActive;
    private Boolean isEcomerce;
    private Boolean isRelatedProduct;

    private String returnRule;

    @Transient
    private String transactionComId;
    @Transient
    private String date;
    @Transient
    private String status;
    @Transient
    private double discount;
    @Transient
    private double retailDiscount;
    @Transient
    private double totalProductPrice;
    @Transient
    private double taxAmountOnProduct;
    @Transient
    private String imeiNo;

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

    public Boolean getTax() {
        return isTax;
    }

    public void setTax(Boolean tax) {
        isTax = tax;
    }

    public Boolean getVarient() {
        return isVarient;
    }

    public void setVarient(Boolean varient) {
        isVarient = varient;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Boolean getEcomerce() {
        return isEcomerce;
    }

    public void setEcomerce(Boolean ecomerce) {
        isEcomerce = ecomerce;
    }

    public Boolean getRelatedProduct() {
        return isRelatedProduct;
    }

    public void setRelatedProduct(Boolean relatedProduct) {
        isRelatedProduct = relatedProduct;
    }

    public String getReturnRule() {
        return returnRule;
    }

    public void setReturnRule(String returnRule) {
        this.returnRule = returnRule;
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

    public double getTaxAmountOnProduct() {
        return taxAmountOnProduct;
    }

    public void setTaxAmountOnProduct(double taxAmountOnProduct) {
        this.taxAmountOnProduct = taxAmountOnProduct;
    }

    public String getImeiNo() {
        return imeiNo;
    }

    public void setImeiNo(String imeiNo) {
        this.imeiNo = imeiNo;
    }

    public String getTransactionComId() {
        return transactionComId;
    }

    public void setTransactionComId(String transactionComId) {
        this.transactionComId = transactionComId;
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

    public int getDefaultQuantity() {
        return defaultQuantity;
    }

    public void setDefaultQuantity(int defaultQuantity) {
        this.defaultQuantity = defaultQuantity;
    }
}
