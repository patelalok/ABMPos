package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.PurchaseOrderDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrderDao, Integer> {

    List<PurchaseOrderDao> findAllByDateBetweenOrderByDateAsc(String startDate, String endDate);

}
