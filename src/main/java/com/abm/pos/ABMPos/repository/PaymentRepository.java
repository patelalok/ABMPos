package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.dao.PaymentDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 9/28/17.
 */

@Transactional
public interface PaymentRepository extends JpaRepository<PaymentDao, Integer> {

    List<PaymentDao> findAll();
}
