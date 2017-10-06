package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface ProductRepository extends JpaRepository<ProductDao, String> {

    List<ProductDao> findAll();

    @Query("SELECT p FROM ProductDao p WHERE p.isActive = true")
    List<ProductDao> getAllActiveProduct();

    @Query("SELECT p.quantity FROM ProductDao p WHERE p.productNo = ?1")
    int getProductQuantity(String productNo);

    @Modifying
    @Query("UPDATE ProductDao SET quantity = ?2 WHERE productNo = ?1")
    void updateProductQuantity(String productNo, int quantity);

    @Modifying
    @Query("UPDATE ProductDao SET isActive = false WHERE productNo = ?1")
    void deleteProduct(String productNo);

}
