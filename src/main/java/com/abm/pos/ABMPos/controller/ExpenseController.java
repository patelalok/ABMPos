package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ExpenseDao;
import com.abm.pos.ABMPos.dao.ExpenseNameDao;
import com.abm.pos.ABMPos.manager.ExpenseManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by apatel2 on 8/8/17.
 */

@RestController
@RequestMapping("*")
@CrossOrigin("*")
@Configurable
public class ExpenseController {

    @Autowired
    private ExpenseManager expenseManager;

    @RequestMapping(value = "/addExpense", method = RequestMethod.POST, consumes = "application/json")
    public void addExpense(@RequestBody ExpenseDao expenseDao)
    {
        expenseManager.addExpense(expenseDao);
        System.out.println("Expense Added or Updated Successfully!!");
    }

    @RequestMapping(value = "/getExpense", method = RequestMethod.GET, produces = "application/json")
    public List<ExpenseDao> getExpense(String startDate, String endDate)
    {
        System.out.println("Send Expense Details Successfully!!");
        return expenseManager.getExpense(startDate, endDate);

    }

    @RequestMapping(value = "/getExpenseNames", method = RequestMethod.GET, produces = "application/json")
    public List<ExpenseNameDao> getExpenseNames()
    {
        return expenseManager.getExpenseNames();
    }

    @RequestMapping(value = "/deleteExpense", method = RequestMethod.DELETE)
    public void deleteExpense(@RequestParam Integer expenseId)
    {
         expenseManager.deleteExpense(expenseId);
        System.out.println("Delete Expense Details Successfully!!");
    }
}
