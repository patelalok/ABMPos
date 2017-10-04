package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.TransactionDao;
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

    @Query("select max(t.transactionComId) from TransactionDao t")
    int getMaxTransactionId();
}
