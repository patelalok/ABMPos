package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Transactional
public interface TransactionLineItemRepository extends JpaRepository<TransactionLineItemDao, Integer> {

    List<TransactionLineItemDao> findAll();

    @Query(value = "SELECT t.date, p.product_no, p.description, t.quantity,t.imei_no,\n" +
            "            (select sum(quantity) from transaction_line_item where date BETWEEN ?1 AND ?2 AND product_no = ?3) as TOTALQUANTITY,\n" +
            "            t.retail, t.cost, t.discount\n" +
            "            FROM transaction_line_item t ,product p\n" +
            "            WHERE t.product_no = p.product_no\n" +
            "            AND t.product_no = ?3" +
            "            AND (t.status = 'Complete' OR t.status = 'Return')\n" +
            "            AND t.date BETWEEN ?1 AND ?2 ", nativeQuery = true)
    List<Object[]> getProductHistory(String startDate, String endDate, String productNo);


}
