package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ExpenseNameDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 8/8/17.
 */
@Transactional
public interface ExpenseNameRepository extends JpaRepository<ExpenseNameDao, Integer>{

    List<ExpenseNameDao> findAll();
}
