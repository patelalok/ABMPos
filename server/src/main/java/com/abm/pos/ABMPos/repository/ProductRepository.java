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

    public static final String KEY = "products";



    List<ProductDao> findAll();

    @Query("SELECT p.description FROM ProductDao p WHERE p.productNo = ?1")
    @Cacheable(value = "description")
    String test(String productNo);

   //@Query("SELECT p FROM ProductDao p WHERE p.active = true ORDER BY p.description ASC")
    @Query("SELECT p FROM ProductDao p WHERE p.active = true ORDER BY p.productNo ASC")
    //@Cacheable(value = "products",  key = "#root.target.KEY")
    List<ProductDao> getAllActiveProduct();

    @Query("SELECT p FROM ProductDao p WHERE p.active = true")
    //@Cacheable(value = "products")
    List<ProductDao> getAllActiveProductForSellPage();

    ProductDao findOneByProductNo(String productNo);

    @Modifying
    @Query("UPDATE ProductDao SET quantity = ?1, cost = ?2 WHERE productNo = ?3")
    void updateQuantityAfterInventoryUpdate(int quantity, double cost, String productNo);

    @Modifying
    @Query("UPDATE ProductDao SET active = false WHERE productNo = ?1")
    void deleteProduct(String productNo);



    @Query(value = "SELECT distinct p.description,\n" +
            "SUM(l.sale_quantity) quantity,\n" +
            "SUM(l.cost * l.sale_quantity) cost,\n" +
            "SUM(l.retail * l.sale_quantity) retail,\n" +
            "SUM((l.retail * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "from product p\n" +
            "inner join transaction_line_item l on l.product_no = p.product_no\n" +
            "WHERE l.date BETWEEN ?1 AND ?2\n" +
            "AND (l.status = 'Complete' OR l.status = 'Return')\n" +
            "GROUP BY p.description", nativeQuery = true)
    List<Object[]> getSalesReportByProduct(String startDate, String endDate);

    @Query(value = "SELECT p.description,\n" +
            "p.product_no,\n" +
            "SUM(l.sale_quantity) quantity,\n" +
            "SUM(l.cost) cost,\n" +
            "SUM(l.total_product_price) retail,\n" +
            "SUM(l.discount) discount,\n" +
            "SUM((l.retail * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "FROM product p\n" +
            "INNER JOIN transaction_line_item l ON p.product_no = l.product_no\n" +
            "WHERE  l.date BETWEEN ?1 AND ?2 AND (l.status = 'Complete' OR l.status = 'Return')\n" +
            "GROUP BY p.description, p.product_no\n" +
            "ORDER BY retail DESC LIMIT 50", nativeQuery = true)
    List<Object[]> getTop50SellingItem(String startDate, String endDate);

    @Query(value = "SELECT p.description,\n" +
            "p.product_no,\n" +
            "SUM(i.sale_quantity) quantity,\n" +
            "SUM(i.cost) cost,\n" +
            "SUM(i.retail) retail,\n" +
            "SUM(i.retail - i.cost) profit\n" +
            "FROM product p\n" +
            "INNER JOIN product_inventory i ON p.product_no = i.product_no\n" +
            "GROUP BY p.description, p.product_no\n" +
            "ORDER BY profit DESC LIMIT 50", nativeQuery = true)
    List<Object[]> getTop50MostProfitableItem(String startDate, String endDate);
}
