package com.abm.pos.ABMPos.dao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Created by apatel2 on 5/16/17.
 */

@Entity
@Table(name = "category")
public class CategoryDao {

    @Id
    private String name;
    private String description;

    @Transient
    private int noOfProducts;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNoOfProducts() {
        return noOfProducts;
    }

    public void setNoOfProducts(int noOfProducts) {
        this.noOfProducts = noOfProducts;
    }
}
