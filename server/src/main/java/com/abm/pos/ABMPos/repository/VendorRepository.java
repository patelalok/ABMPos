package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.VendorDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface VendorRepository extends JpaRepository<VendorDao, Integer>{

    List<VendorDao> findAll();

    @Query(value = "SELECT distinct v.name, sum(i.quantity) quantity, sum(i.cost * i.quantity) cost, sum(i.retail * i.quantity) retail from product p Inner Join vendor v on p.vendor_id = v.vendor_id\n" +
            "inner join product_inventory i on i.product_no = p.product_no group by v.name", nativeQuery = true)
    List<Object[]> getInventoryByVendor();

    @Query(value = "SELECT distinct v.name,\n" +
            "SUM(l.quantity) quantity,\n" +
            "SUM(l.cost * l.quantity) cost,\n" +
            "SUM(l.retail * l.quantity) retail,\n" +
            "SUM((l.retail * l.quantity) - (l.cost * l.quantity)) profit\n" +
            "FROM product p\n" +
            "INNER JOIN vendor v on p.vendor_id = v.vendor_id\n" +
            "INNER JOIN transaction_line_item l on l.product_no = p.product_no\n" +
            "WHERE l.date BETWEEN ?1 AND ?2\n" +
            " AND (l.status = 'Complete' OR l.status = 'Return')\n" +
            "GROUP BY v.name", nativeQuery = true)
    List<Object[]> getSalesReportByVendor(String startDate, String endDate);
}
