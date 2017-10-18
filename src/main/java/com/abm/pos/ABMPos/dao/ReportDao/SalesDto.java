package com.abm.pos.ABMPos.dao.ReportDao;

public class SalesDto {

    private String name;
    private int quantity;
    private double cost;
    private double retail;
    private double profit;
    private double discount;
    private double markup;
    private double perOfTotal;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
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

    public double getProfit() {
        return profit;
    }

    public void setProfit(double profit) {
        this.profit = profit;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getMarkup() {
        return markup;
    }

    public void setMarkup(double markup) {
        this.markup = markup;
    }

    public double getPerOfTotal() {
        return perOfTotal;
    }

    public void setPerOfTotal(double perOfTotal) {
        this.perOfTotal = perOfTotal;
    }
}
