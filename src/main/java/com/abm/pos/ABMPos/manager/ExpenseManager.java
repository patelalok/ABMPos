package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ExpenseDao;
import com.abm.pos.ABMPos.dao.ExpenseNameDao;
import com.abm.pos.ABMPos.repository.ExpenseNameRepository;
import com.abm.pos.ABMPos.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 8/8/17.
 */
@Component
public class ExpenseManager {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ExpenseNameRepository expenseNameRepository;

    public void addExpense(ExpenseDao expenseDao)
    {
         expenseRepository.save(expenseDao);
    }

    public List<ExpenseDao> getExpense() {

        return expenseRepository.findAll();
    }

    public void deleteExpense(Integer expenseId) {

        expenseRepository.delete(expenseId);
    }



    //***************************GET EXPENSE NAMES****************************************
    public List<ExpenseNameDao> getExpenseNames() {

        return expenseNameRepository.findAll();
    }
}
