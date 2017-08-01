package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 8/1/17.
 */

@Entity
@Table(name = "employee_clock_in")
public class ClockInDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userClockInId;

    private String username;
    private String date;
    private String clockIn;
    private String clockOut;
    private double noOfHours;
    private double hourlyRate;
    private double totalAmount;
    private double commissionAmount;

    public int getUserClockInId() {
        return userClockInId;
    }

    public void setUserClockInId(int userClockInId) {
        this.userClockInId = userClockInId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getClockIn() {
        return clockIn;
    }

    public void setClockIn(String clockIn) {
        this.clockIn = clockIn;
    }

    public String getClockOut() {
        return clockOut;
    }

    public void setClockOut(String clockOut) {
        this.clockOut = clockOut;
    }

    public double getNoOfHours() {
        return noOfHours;
    }

    public void setNoOfHours(double noOfHours) {
        this.noOfHours = noOfHours;
    }

    public double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getCommissionAmount() {
        return commissionAmount;
    }

    public void setCommissionAmount(double commissionAmount) {
        this.commissionAmount = commissionAmount;
    }
}
