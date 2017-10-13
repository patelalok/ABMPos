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

    @Query("SELECT p FROM ProductDao p WHERE p.active = true")
    List<ProductDao> getAllActiveProduct();

    @Query("SELECT p FROM ProductDao p WHERE p.active = true AND p.brandId = ?1")
    List<ProductDao> getAllActivePrductByBrandId(int brandId);

    @Query("SELECT p FROM ProductDao p WHERE p.active = true AND p.categoryId = ?1")
    List<ProductDao> getAllActivePrductByCategoryId(int categoryId);

    @Query("SELECT p FROM ProductDao p WHERE p.active = true AND p.vendorId = ?1")
    List<ProductDao> getAllActivePrductByVendorId(int vendorId);

    @Query("SELECT p FROM ProductDao p WHERE p.active = true AND p.modelId = ?1")
    List<ProductDao> getAllActivePrductByModelId(int modelId);

    @Query("SELECT p.quantity FROM ProductDao p WHERE p.productNo = ?1")
    int getProductQuantity(String productNo);

    @Modifying
    @Query("UPDATE ProductDao SET quantity = ?2 WHERE productNo = ?1")
    void updateProductQuantity(String productNo, int quantity);

    @Modifying
    @Query("UPDATE ProductDao SET active = false WHERE productNo = ?1")
    void deleteProduct(String productNo);

//    @Query("SELECT p, SUM(i.quantity) as Quantity FROM ProductDao p JOIN ProductDao p ON p.productNo = i.productNo GROUP BY p.productNo, p.description, p.retail")
//    List<Object[]> getProductWithInventory();
}
