package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductInventoryLog;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface ProductInventoryLogRepository extends JpaRepository<ProductInventoryLog, Integer> {

}
