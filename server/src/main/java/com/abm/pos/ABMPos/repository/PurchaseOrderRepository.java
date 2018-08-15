package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.PurchaseOrderDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrderDao, Integer> {

    List<PurchaseOrderDao> findAllByDateBetweenOrderByDateDesc(String startDate, String endDate);

    @Modifying
    @Query("UPDATE PurchaseOrderDao p set p.status = ?1 WHERE p.purchaseOrderId = ?2")
    void updatePurchaseOrderStatus(String status,int orderId);
}
