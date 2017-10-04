package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Transactional
public interface TransactionLineItemRepository extends JpaRepository<TransactionLineItemDao, Integer> {

    List<TransactionLineItemDao> findAll();

    //List<TransactionLineItemDao> findAllByTransactionComId(int transactionId);


}
