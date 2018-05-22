package com.abm.pos.ABMPos.dao;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by apatel2 on 5/16/17.
 */

@Entity
@Table(name = "category")
public class CategoryDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int categoryId;
    private String name;
    private String description;
    private double tier1;
    private double tier2;
    private double tier3;

    @Transient
    private int noOfProducts;

    @OneToMany
    @JoinColumn(name="categoryId")
    private Set<ProductDao> productDaoSet;

    public Set<ProductDao> getProductDaoSet() {
        return productDaoSet;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public void setProductDaoSet(Set<ProductDao> productDaoSet) {
        this.productDaoSet = productDaoSet;
    }

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
}
