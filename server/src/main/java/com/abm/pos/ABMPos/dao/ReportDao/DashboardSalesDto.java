package com.abm.pos.ABMPos.dao.ReportDao;

import org.springframework.stereotype.Component;

@Component
public class DashboardSalesDto {

    private String name;
    private double value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
