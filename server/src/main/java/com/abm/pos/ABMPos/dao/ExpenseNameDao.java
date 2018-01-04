package com.abm.pos.ABMPos.dao;

import javax.persistence.*;

/**
 * Created by apatel2 on 8/8/17.
 */

@Entity
@Table(name = "expense_name")
public class ExpenseNameDao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int expenseNameId;

    private String expenseName;

    public int getExpenseNameId() {
        return expenseNameId;
    }

    public void setExpenseNameId(int expenseNameId) {
        this.expenseNameId = expenseNameId;
    }

    public String getExpenseName() {
        return expenseName;
    }

    public void setExpenseName(String expenseName) {
        this.expenseName = expenseName;
    }
}
