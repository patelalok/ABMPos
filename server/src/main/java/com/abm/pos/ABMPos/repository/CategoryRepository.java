package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CategoryDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface CategoryRepository extends JpaRepository<CategoryDao, Integer>{

   // @Query("select c.categoryId,c.name,count(p.categoryId) as noOfProducts from CategoryDao c join c.productDaoSet p group by c.name,c.categoryId")
    @Query("select c.categoryId,c.name from CategoryDao c join c.productDaoSet p")

    List<Object[]> getNoOfProducts();

    List<CategoryDao> findAll();

    @Query(value = "SELECT distinct c.name, sum(i.quantity) quantity, sum(i.cost * i.quantity) cost, sum(i.retail * i.quantity) retail \n" +
            "from product p \n" +
            "Inner Join category c on p.category_id = c.category_id\n" +
            "inner join product_inventory i on i.product_no = p.product_no\n" +
            "Where i.quantity > 0\n" +
            "group by c.name", nativeQuery = true)
    List<Object[]> getInventoryByCategory();

    @Query(value = "SELECT distinct c.name, \n" +
            "SUM(l.sale_quantity) quantity, \n" +
            "SUM(l.cost * l.sale_quantity) cost, \n" +
            "SUM(l.retail_with_discount * l.sale_quantity) retail,\n" +
            "SUM(l.discount) discount,\n" +
            "SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "FROM product p \n" +
            "INNER Join category c on p.category_id = c.category_id \n" +
            "INNER join transaction_line_item l on l.product_no = p.product_no \n" +
            "WHERE l.date BETWEEN ?1 AND ?2 \n" +
            " AND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending') " +
            "GROUP BY c.name", nativeQuery = true)
    List<Object[]> getSalesReportByCategory(String startDate, String endDate);
}
