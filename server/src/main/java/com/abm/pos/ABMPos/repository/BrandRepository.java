package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.BrandDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */
public interface BrandRepository extends JpaRepository<BrandDao, Integer>{

    //@Query("SELECT  b.name, b.description FROM BrandDao b join ProductDao p where p.brandName = b.name")
    List<BrandDao> findAll();

    @Query(value = "SELECT distinct b.name, sum(i.quantity) quantity, sum(i.cost * i.quantity) cost, sum(i.retail * i.quantity) retail \n" +
            "from product p Inner Join brand b on p.brand_id = b.brand_id\n" +
            "inner join product_inventory i on i.product_no = p.product_no\n" +
            "WHERE i.quantity > 0\n" +
            "group by b.name", nativeQuery = true)
    List<Object[]> getInventoryByBrand();

    @Query(value = "SELECT distinct b.name, \n" +
            "SUM(l.sale_quantity) quantity, \n" +
            "SUM(l.cost * l.sale_quantity) cost, \n" +
            "SUM(l.retail * l.sale_quantity) retail,\n" +
            "SUM((l.retail * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "FROM product p \n" +
            "INNER JOIN brand b on p.brand_id = b.brand_id\n" +
            "INNER JOIN transaction_line_item l on l.product_no = p.product_no\n" +
            "WHERE l.date BETWEEN ?1 AND ?2 \n" +
            "AND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending') \n" +
            "GROUP BY b.name;", nativeQuery = true)
    List<Object[]> getSalesReportByBrand(String startDate, String endDate);



}
