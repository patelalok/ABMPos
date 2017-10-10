package com.abm.pos.ABMPos.dao;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "store_credit")
public class StoreCreditDao {


    @Id
    private int id;

    private String customerPhoneno;
    private double amount;
    private String reason;
    private String createdTimestamp;
    private String employeeName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomerPhoneno() {
        return customerPhoneno;
    }

    public void setCustomerPhoneno(String customerPhoneno) {
        this.customerPhoneno = customerPhoneno;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getCreatedTimestamp() {
        return createdTimestamp;
    }

    public void setCreatedTimestamp(String createdTimestamp) {
        this.createdTimestamp = createdTimestamp;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }
}
