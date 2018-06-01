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
    private boolean ecommerce;
    private String description;


    @Transient
    private int noOfProducts;

    @Transient
    private SubCategoryDao subCategoryDao;

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

    public boolean isEcommerce() {
        return ecommerce;
    }

    public void setEcommerce(boolean ecommerce) {
        this.ecommerce = ecommerce;
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
