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
    List<CategoryDao> findAllByOrderByNameAsc();

    @Query(value = "SELECT distinct c.name, sum(i.quantity) quantity, sum(i.cost * i.quantity) cost, sum(i.retail * i.quantity) retail \n" +
            "from product p \n" +
            "Inner Join category c on p.category_id = c.category_id\n" +
            "inner join product_inventory i on i.product_no = p.product_no\n" +
            "Where i.quantity > 0\n" +
            "group by c.name", nativeQuery = true)
    List<Object[]> getInventoryByCategory();

    @Query(value = "SELECT distinct\n" +
            "c.name,\n" +
            "SUM(l.sale_quantity) quantity,\n" +
            "SUM(l.cost * l.sale_quantity) cost,\n" +
            "SUM(l.retail_with_discount * l.sale_quantity) retail,\n" +
            "SUM(l.discount) discount,\n" +
            "SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "FROM product p , category c , transaction_line_item l\n" +
            "where p.category_id = c.category_id\n" +
            "and l.product_no = p.product_no\n" +
            "and l.date BETWEEN ?1  AND ?2\n" +
            "AND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending')\n" +
            "GROUP BY c.name\n" +
            "\n" +
            "union\n" +
            "\n" +
            "SELECT distinct\n" +
            "c.name,\n" +
            "SUM(l.sale_quantity) quantity,\n" +
            "SUM(l.cost * l.sale_quantity) cost,\n" +
            "SUM(l.retail_with_discount * l.sale_quantity) retail,\n" +
            "SUM(l.discount) discount,\n" +
            "SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "FROM\n" +
            "product p , category c , transaction_line_item l , product_variant v\n" +
            "where\n" +
            "v.product_no != p.product_no\n" +
            "and\n" +
            "l.product_no = v.product_no\n" +
            "and\n" +
            "v.product_id = p.product_id\n" +
            "and\n" +
            "p.category_id = c.category_id\n" +
            "and\n" +
            "l.date BETWEEN ?1  AND ?2\n" +
            "AND\n" +
            "(l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending')\n" +
            "GROUP BY c.name\n", nativeQuery = true)
    List<Object[]> getSalesReportByCategory(String startDate, String endDate);
}
