package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ModelDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface ModelRepository extends JpaRepository<ModelDao, Integer> {

    List<ModelDao> findAll();

    @Query(value = "SELECT distinct m.name, sum(i.quantity) quantity, sum(i.cost * i.quantity) cost, sum(i.retail * i.quantity) retail from product p Inner Join model m on p.model_id = m.model_id\n" +
            "inner join product_inventory i on i.product_no = p.product_no group by m.name", nativeQuery = true)
    List<Object[]> getInventoryByModel();

    @Query(value = "SELECT distinct m.name, \n" +
            "SUM(l.quantity) quantity, \n" +
            "SUM(l.cost * l.quantity) cost, \n" +
            "SUM(l.retail * l.quantity) retail \n" +
            "from product p \n" +
            "Inner Join model m on p.model_id = m.model_id\n" +
            "inner join transaction_line_item l on l.product_no = p.product_no\n" +
            "WHERE l.date BETWEEN ?1 AND ?2 \n" +
            "GROUP BY m.name", nativeQuery = true)
    List<Object[]> getSalesReportByModel(String startDate, String endDate);
}
