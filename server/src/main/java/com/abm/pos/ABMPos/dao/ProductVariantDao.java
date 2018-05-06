package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 5/16/17.
 */

@Entity
@Table(name = "product_variant")
public class ProductVariantDao {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private int id;

    private int productId;
    private String name;
    private String value;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
