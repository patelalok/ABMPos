package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ExpenseDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 8/8/17.
 */
@Transactional
public interface ExpenseRepository extends JpaRepository<ExpenseDao, Integer> {

    List<ExpenseDao> findAll();

    @Query("SELECT e FROM ExpenseDao e WHERE date BETWEEN ?1 AND ?2")
    List<ExpenseDao> getExpenseDetailsByDate(String startDate, String endDate);
}
