package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ExpenseDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 8/8/17.
 */
@Transactional
public interface ExpenseRepository extends JpaRepository<ExpenseDao, Integer> {

    List<ExpenseDao> findAll();
}
