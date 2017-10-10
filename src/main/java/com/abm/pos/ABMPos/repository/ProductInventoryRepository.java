package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductInventoryDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

@Transactional
public interface ProductInventoryRepository extends JpaRepository<ProductInventoryDao, Integer> {


    //@Query("SELECT i FROM ProductInventoryDao i WHERE i.createdTimestamp = (SELECT MAX(ii.createdTimestamp) FROM ProductInventoryDao ii WHERE ii.productNo = i.productNo")
   // ProductInventoryDao findFirstProductNoByOrderByCreatedTimestampAsc();
    //ProductInventoryDao test();

    @Query("SELECT i FROM ProductInventoryDao i WHERE i.createdTimestamp = '2017-10-08 12:49:42' ")
    ProductInventoryDao test();


    @Modifying
    @Query("UPDATE ProductInventoryDao SET quantity = ?1 WHERE productNo = ?2 AND createdTimestamp = ?3")
    void updateProductQuantity(int quantity, String productNo, String createdTimestamp);

    @Query("SELECT COUNT(productNo) FROM ProductInventoryDao WHERE productNo = ?1")
    int getCountOfRowByProductNo(String productNo);
}
