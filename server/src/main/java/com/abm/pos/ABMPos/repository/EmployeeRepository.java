package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.EmployeeDao;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/17/17.
 */

@Transactional
public interface EmployeeRepository extends JpaRepository<EmployeeDao,Integer> {

    List<EmployeeDao> findAll();

    @Query(value = "SELECT distinct e.username,\n" +
            "SUM(l.sale_quantity) quantity,\n" +
            "SUM(l.cost * l.sale_quantity) cost,\n" +
            "SUM(l.retail_with_discount * l.sale_quantity) retail,\n" +
            "SUM(l.discount) discount,\n" +
            "SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "from transaction t\n" +
            "Inner Join employee e on e.username = t.username\n" +
            "inner join transaction_line_item l on l.transaction_com_id = t.transaction_com_id\n" +
            "WHERE l.date BETWEEN ?1 AND ?2 \n" +
            "AND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending')\n" +
            "GROUP BY e.username", nativeQuery = true)
    List<Object[]> getSalesReportByEmployee(String startDate, String endDate);

    EmployeeDao findOneByUsername(String username);
}