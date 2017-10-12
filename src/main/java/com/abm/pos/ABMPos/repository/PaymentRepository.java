package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.dao.PaymentDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by apatel2 on 9/28/17.
 */

@Transactional
public interface PaymentRepository extends JpaRepository<PaymentDao, Integer> {

    List<PaymentDao> findAll();

    @Query("SELECT SUM(cash), sum(credit), SUM(debit), SUM(checkAmount), SUM(storeCredit), SUM(onAccount), SUM(loyalty) FROM PaymentDao WHERE date BETWEEN ?1 AND ?2")
    List<Object[]> sumOfAllPayments(String startDate, String endDate);
}
