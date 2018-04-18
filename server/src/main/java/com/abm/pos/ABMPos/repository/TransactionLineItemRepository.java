package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Transactional
public interface TransactionLineItemRepository extends JpaRepository<TransactionLineItemDao, Integer> {

    List<TransactionLineItemDao> findAll();

    @Query("SELECT p FROM TransactionLineItemDao p WHERE p.productNo = ?1 AND p.date BETWEEN ?2 AND ?3")
    List<TransactionLineItemDao> getProductHistory(String productNo, String startDate, String endDate);



}
