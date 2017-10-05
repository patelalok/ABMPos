package com.abm.pos.ABMPos.dao;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by apatel2 on 5/16/17.
 */

@Entity
@Table(name = "product")
public class ProductDao implements Serializable {

    @Id
    private String productNo;

    @NotEmpty
    private String description;
    @NotEmpty
    private String categoryId;
    @NotEmpty
    private String brandId;
    @NotEmpty
    private String vendorId;
    private String modelId;
    private String alternetNo;

    private double cost;
    private double retail;
    private double markup;
    private double quantity;

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

//    @OneToMany
//    @JoinColumn(name="product_no_fk")
//    private Set<ProductInventoryDao> productInventoryDaoSet;


    public String getProductNo() {
        return productNo;
    }

    public void setProductNo(String productNo) {
        this.productNo = productNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getBrandId() {
        return brandId;
    }

    public void setBrandId(String brandId) {
        this.brandId = brandId;
    }

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId;
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

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public int getMinQuantity() {
        return minQuantity;
    }

    public void setMinQuantity(int minQuantity) {
        this.minQuantity = minQuantity;
    }

    public int getDefaultQuantity() {
        return defaultQuantity;
    }

    public void setDefaultQuantity(int defaultQuantity) {
        this.defaultQuantity = defaultQuantity;
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

}
