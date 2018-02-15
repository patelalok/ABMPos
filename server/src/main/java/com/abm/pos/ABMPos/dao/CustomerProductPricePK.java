package com.abm.pos.ABMPos.dao;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class CustomerProductPricePK implements Serializable {

    protected String phoneNo;
    protected String productNo;

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getProductNo() {
        return productNo;
    }

    public void setProductNo(String productNo) {
        this.productNo = productNo;
    }
}
