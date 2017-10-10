package com.abm.pos.ABMPos.repository;


import com.abm.pos.ABMPos.dao.StoreCreditDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.event.ListDataEvent;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface StoreCreditRepository extends JpaRepository<StoreCreditDao,Integer> {

    List<StoreCreditDao> findAll();

    List<StoreCreditDao> findAllByCustomerPhoneno(String phoneNo);

}