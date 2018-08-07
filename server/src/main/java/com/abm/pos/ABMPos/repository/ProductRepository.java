package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.ProductInventoryDao;
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
public interface ProductRepository extends JpaRepository<ProductDao, Integer> {
    List<ProductDao> findAll();
    List<ProductDao> findAllByCategoryIdAndActive(String categoryId, boolean active);

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

    List<ProductDao> findAllByCategoryId(String categoryId);

    ProductDao findOneByProductId(Integer productId);

    ProductDao findOneByProductNo(String productNo);

    @Modifying
    @Query("UPDATE ProductDao SET quantity = ?1, cost = ?2 WHERE productNo = ?3")
    void updateQuantityAfterInventoryUpdate(int quantity, double cost, String productNo);

    @Modifying
    @Query("UPDATE ProductDao SET active = false WHERE productId = ?1")
    void deleteProduct(int productNo);

    @Modifying
    @Query("UPDATE ProductDao SET active = true WHERE productNo = ?1")
    void activeProduct(String phoneNo);

    @Query(value = "SELECT distinct p.description,\n" +
            "SUM(l.sale_quantity) quantity,\n" +
            "SUM(l.cost * l.sale_quantity) cost,\n" +
            "SUM(l.retail_with_discount * l.sale_quantity) retail,\n" +
            "SUM(l.discount) discount,\n" +
            "SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "from product p\n" +
            "inner join transaction_line_item l on l.product_no = p.product_no\n" +
            "WHERE l.date BETWEEN ?1 AND ?2\n" +
            "AND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending')\n" +
            "GROUP BY p.description", nativeQuery = true)
    List<Object[]> getSalesReportByProduct(String startDate, String endDate);

    @Query(value = "SELECT p.description,\n" +
            "p.product_no,\n" +
            "SUM(l.sale_quantity) quantity,\n" +
            "SUM(l.cost) cost,\n" +
            "SUM(l.retail_with_discount) retail,\n" +
            "SUM(l.discount) discount,\n" +
            "SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "FROM product p\n" +
            "INNER JOIN transaction_line_item l ON p.product_no = l.product_no\n" +
            "WHERE  l.date BETWEEN ?1 AND ?2 AND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending')\n" +
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

    List<ProductDao> findAllByBrandId(String s);

    List<ProductDao> findAllByModelId(String s);

    List<ProductDao> findAllByVendorId(String s);


    // always keep the inner join dont think of left outer join, cause that will create problem.
    @Query(value = "SELECT p.product_id,\n" +
            "p.product_no,\n" +
            "p.description,\n" +
            "p.tax," +
            "p.vendor_id,\n" +
            "i.tier1,\n" +
            "i.tier2, \n" +
            "i.tier3,\n" +
            "sum(i.quantity) quantity from product p\n" +
            "inner join product_inventory i\n" +
            "on p.product_no = i.product_no\n" +
            "Where p.variant = 0 AND p.active = 1\n" +
            "group by p.product_id, p.product_no,p.description, p.tax,p.vendor_id,i.tier1, i.tier2, i.tier3 " +
            "order by quantity asc", nativeQuery = true)
    List<Object[]> getAllActiveProductWithoutVariant();

    @Query(value = "SELECT \n" +
            "p.product_id,\n" +
            "p.product_no,\n" +
            "p.description,\n" +
            "p.tax,\n" +
            "p.vendor_id,\n" +
            "i.tier1,\n" +
            "i.tier2,\n" +
            "i.tier3,\n" +
            "sum(i.quantity) quantity from product p\n" +
            "inner join product_inventory i\n" +
            "on p.product_no = i.product_no\n" +
            "Where p.variant = 1 AND p.active = 1\n" +
            "group by p.product_id, p.product_no,p.description, p.tax,p.vendor_id,i.tier1, i.tier2, i.tier3 \n" +
            "order by quantity asc" , nativeQuery = true)
    List<Object[]> getAllActiveProductWithVariant();

    @Query(value = "select " +
            "p.product_id,\n" +
            "p.product_no,\n" +
            "p.description,\n" +
            "p.tax,\n" +
            "p.vendor_id,\n" +
            "i.tier1,\n" +
            "i.tier2, \n" +
            "i.tier3,\n" +
            "i.cost,\n" +
            "b.quantity\n" +
            "from product p\n" +
            "inner join product_inventory i\n" +
            "on i.product_no = p.product_no\n" +
            "inner join (Select product_no, max(created_timestamp) maxDate, sum(quantity) quantity from product_inventory group by product_no) \n" +
            "b on i.product_no = b.product_no and i.created_timestamp = b.maxDate\n" +
            "Where p.variant = 0 AND p.active = 1\n" +
            "group by p.product_id, p.product_no,p.description, p.tax,p.vendor_id,i.tier1, i.tier2, i.tier3, i.cost\n" +
            "order by quantity asc;", nativeQuery = true)
    List<Object[]> getAllActiveProductWithoutVariantForPurchaseOrder();

    @Query(value = "select p.product_id,\n" +
            "p.product_no,\n" +
            "p.description,\n" +
            "p.tax,\n" +
            "p.vendor_id,\n" +
            "i.tier1,\n" +
            "i.tier2, \n" +
            "i.tier3,\n" +
            "i.cost,\n" +
            "b.quantity\n" +
            "from product p\n" +
            "inner join product_inventory i\n" +
            "on i.product_no = p.product_no\n" +
            "inner join (Select product_no, max(created_timestamp) maxDate, sum(quantity) quantity from product_inventory group by product_no) \n" +
            "b on i.product_no = b.product_no and i.created_timestamp = b.maxDate\n" +
            "Where p.variant = 0 AND p.active = 1\n" +
            "group by p.product_id, p.product_no,p.description, p.tax,p.vendor_id,i.tier1, i.tier2, i.tier3, i.cost\n" +
            "order by quantity asc;", nativeQuery = true)
 List<Object[]> getAllActiveProductWithVariantForPurchaseOrder();
}
