package com.abm.pos.ABMPos.dao;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "purchase_order")
public class PurchaseOrderDao {


    @Id
    @Column(name = "purchase_order_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int purchaseOrderId;

    private int vendorId;
    private String vendorName;
    private String date;
    private String username;
    private int totalQuantity;
    private double totalAmount;
    private String status;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "purchase_order_id")
    private List<PurchaseOrderDetailsDao> purchaseOrderDetailsDaoList;

    public int getPurchaseOrderId() {
        return purchaseOrderId;
    }

    public void setPurchaseOrderId(int purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    public String getVendorName() {
        return vendorName;
    }

    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<PurchaseOrderDetailsDao> getPurchaseOrderDetailsDaoList() {
        return purchaseOrderDetailsDaoList;
    }

    public void setPurchaseOrderDetailsDaoList(List<PurchaseOrderDetailsDao> purchaseOrderDetailsDaoList) {
        this.purchaseOrderDetailsDaoList = purchaseOrderDetailsDaoList;
    }
}
