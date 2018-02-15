package com.abm.pos.ABMPos.dao;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "customer_product_price")
public class CustomerProductPrice implements Serializable{

    @EmbeddedId
    private CustomerProductPricePK customerProductPricePK;

    private double retail;
    private double cost;
    private String lastUpdatedTimestamp;

    public CustomerProductPricePK getCustomerProductPricePK() {
        return customerProductPricePK;
    }

    public void setCustomerProductPricePK(CustomerProductPricePK customerProductPricePK) {
        this.customerProductPricePK = customerProductPricePK;
    }

    public double getRetail() {
        return retail;
    }

    public void setRetail(double retail) {
        this.retail = retail;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getLastUpdatedTimestamp() {
        return lastUpdatedTimestamp;
    }

    public void setLastUpdatedTimestamp(String lastUpdatedTimestamp) {
        this.lastUpdatedTimestamp = lastUpdatedTimestamp;
    }
}
