package com.abm.pos.ABMPos.repository;


import com.abm.pos.ABMPos.dao.PurchaseOrderDetailsDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface PurchaseOrderDetailsRepository extends JpaRepository<PurchaseOrderDetailsDao, Integer> {

}

