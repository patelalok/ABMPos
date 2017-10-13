package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.TransactionDao;
import org.omg.CORBA.OBJ_ADAPTER;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Transactional
public interface TransactionRepository extends JpaRepository<TransactionDao, Integer> {

    List<TransactionDao> findAll();

    @Query("SELECT t FROM TransactionDao t WHERE t.date BETWEEN ?1 AND ?2 ORDER BY t.date DESC")
    List<TransactionDao> getTransactionByDate(String startDate, String endDate);

    @Query("SELECT SUM(totalAmount), SUM(tax), SUM(totalDiscount)  FROM TransactionDao  WHERE date BETWEEN ?1 AND ?2")
    List<Object[]> getSumOfTransactionDetailsForCloseRegister(String startDate, String endDate);


}
