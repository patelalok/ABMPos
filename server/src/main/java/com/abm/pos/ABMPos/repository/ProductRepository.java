package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductDao;
import org.springframework.cache.annotation.Cacheable;
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

    @Query("SELECT p.description FROM ProductDao p WHERE p.productNo = ?1")
    @Cacheable(value = "description")
    String test(String productNo);

   //@Query("SELECT p FROM ProductDao p WHERE p.active = true ORDER BY p.description ASC")
    @Query("SELECT p FROM ProductDao p WHERE p.active = true")
    @Cacheable(value = "products")
    List<ProductDao> getAllActiveProduct();

    @Query("SELECT p FROM ProductDao p WHERE p.active = true")
    @Cacheable(value = "products")
    List<ProductDao> getAllActiveProductForSellPage();

    ProductDao findOneByProductNo(String productNo);

//    @Query("SELECT p FROM ProductDao p WHERE p.active = true AND p.brandId = ?1")
//    List<ProductDao> getAllActivePrductByBrandId(int brandId);
//
//    @Query("SELECT p FROM ProductDao p WHERE p.active = true AND p.categoryId = ?1")
//    List<ProductDao> getAllActivePrductByCategoryId(int categoryId);
//
//    @Query("SELECT p FROM ProductDao p WHERE p.active = true AND p.vendorId = ?1")
//    List<ProductDao> getAllActivePrductByVendorId(int vendorId);
//
//    @Query("SELECT p FROM ProductDao p WHERE p.active = true AND p.modelId = ?1")
//    List<ProductDao> getAllActivePrductByModelId(int modelId);

//    @Query("SELECT p.quantity FROM ProductDao p WHERE p.productNo = ?1")
//    int getProductQuantity(String productNo);

//    @Modifying
//    @Query("UPDATE ProductDao SET quantity = ?2 WHERE productNo = ?1")
//    void updateProductQuantity(String productNo, int quantity);

    @Modifying
    @Query("UPDATE ProductDao SET active = false WHERE productNo = ?1")
    void deleteProduct(String productNo);

    @Query(value = "SELECT distinct p.description, \n" +
            "SUM(l.quantity) quantity, \n" +
            "SUM(l.cost * l.quantity) cost, \n" +
            "SUM(l.retail * l.quantity) retail,\n" +
            "SUM(l.retail * l.quantity - l.cost * l.quantity) profit\n" +
            "from product p \n" +
            "inner join transaction_line_item l on l.product_no = p.product_no\n" +
            "WHERE l.date BETWEEN ?1 AND ?2\n" +
            "GROUP BY p.description", nativeQuery = true)
    List<Object[]> getSalesReportByProduct(String startDate, String endDate);

    @Query(value = "SELECT p.description,\n" +
            "p.product_no,  \n" +
            "SUM(l.quantity) quantity, \n" +
            "SUM(l.cost) cost,\n" +
            "SUM(l.total_product_price) retail,\n" +
            "SUM(l.retail * l.quantity - l.cost * l.quantity) profit,\n" +
            "sum(l.discount) discount \n" +
            "FROM product p\n" +
            "INNER JOIN transaction_line_item l ON p.product_no = l.product_no\n" +
            "WHERE  l.date BETWEEN ?1 AND ?2 \n" +
            "GROUP BY p.description, p.product_no\n" +
            "ORDER BY retail DESC LIMIT 50", nativeQuery = true)
    List<Object[]> getTop50SellingItem(String startDate, String endDate);

    @Query(value = "SELECT p.description,\n" +
            "p.product_no,  \n" +
            "SUM(i.quantity) quantity, \n" +
            "SUM(i.cost) cost,\n" +
            "SUM(i.retail) retail,\n" +
            "SUM(i.retail - i.cost) profit\n" +
            "FROM product p\n" +
            "INNER JOIN product_inventory i ON p.product_no = i.product_no\n" +
            "GROUP BY p.description, p.product_no\n" +
            "ORDER BY profit DESC LIMIT 50", nativeQuery = true)
    List<Object[]> getTop50MostProfitableItem(String startDate, String endDate);
}
