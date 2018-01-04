package com.abm.pos.ABMPos.dao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by apatel2 on 7/4/17.
 */

@Entity
@Table(name = "last_product_no")
public class LastProductNo {

    @Id
    private int id;

    private Long lastProductNo;

    public Long getLastProductNo() {
        return lastProductNo;
    }

    public void setLastProductNo(Long lastProductNo) {
        this.lastProductNo = lastProductNo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
