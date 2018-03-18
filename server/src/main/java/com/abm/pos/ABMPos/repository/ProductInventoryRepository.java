package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductInventoryDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface ProductInventoryRepository extends JpaRepository<ProductInventoryDao, Integer> {

    // This query help to get oldest data from inventory table cause we need to manage inventory by FIFO.
    ProductInventoryDao findFirstByProductNoOrderByCreatedTimestampAsc(String productNo);

    List<ProductInventoryDao> findAllByProductNo(String productNo);

    @Query("SELECT i FROM ProductInventoryDao i WHERE i.createdTimestamp = '2017-10-08 12:49:42' ")
    ProductInventoryDao test();

    @Query("SELECT COUNT(productNo) FROM ProductInventoryDao WHERE productNo = ?1")
    int getCountOfRowByProductNo(String productNo);

    @Modifying
    @Query("UPDATE ProductInventoryDao SET retail = ?1 WHERE productNo = ?2")
    void updateProductRetailPrice(double retail, String productNo);
}