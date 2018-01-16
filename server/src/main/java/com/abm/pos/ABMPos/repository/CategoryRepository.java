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

    @Query(value = "SELECT distinct c.name, sum(i.quantity) quantity, sum(i.cost * i.quantity) cost, sum(i.retail * i.quantity) retail from product p Inner Join category c on p.category_id = c.category_id\n" +
            "inner join product_inventory i on i.product_no = p.product_no group by c.name", nativeQuery = true)
    List<Object[]> getInventoryByCategory();

    @Query(value = "SELECT distinct c.name, " +
            "SUM(l.quantity) quantity, " +
            "SUM(l.cost * l.quantity) cost, " +
            "SUM(l.retail * l.quantity) retail " +
            "from product p " +
            "Inner Join category c on p.category_id = c.category_id " +
            "inner join transaction_line_item l on l.product_no = p.product_no " +
            "WHERE l.date BETWEEN ?1 AND ?2 " +
            "GROUP BY c.name", nativeQuery = true)
    List<Object[]> getSalesReportByCategory(String startDate, String endDate);
}
