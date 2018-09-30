package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductImageDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductImageRepository extends JpaRepository<ProductImageDao, Integer> {

    @Modifying
    @Query("UPDATE ProductImageDao p SET p.productNo = ?1 where p.productNo = ?2")
    void updateProductNo(String productNo, String oldProductNo);
}
