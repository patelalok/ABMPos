package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 8/8/17.
 */
@Entity
@Table(name = "expense")
public class ExpenseDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int expenseId;
    private String expenseName;
    private String date;
    private double amount;
    private String expenseOwner;
    private String expenseDocument;
    private String expenseNotes;

    public int getExpenseId() {
        return expenseId;
    }

    public void setExpenseId(int expenseId) {
        this.expenseId = expenseId;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getExpenseOwner() {
        return expenseOwner;
    }

    public void setExpenseOwner(String expenseOwner) {
        this.expenseOwner = expenseOwner;
    }

    public String getExpenseDocument() {
        return expenseDocument;
    }

    public void setExpenseDocument(String expenseDocument) {
        this.expenseDocument = expenseDocument;
    }

    public String getExpenseNotes() {
        return expenseNotes;
    }

    public void setExpenseNotes(String expenseNotes) {
        this.expenseNotes = expenseNotes;
    }
}
