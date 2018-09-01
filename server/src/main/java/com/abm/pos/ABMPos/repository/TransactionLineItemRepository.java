package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Transactional
public interface TransactionLineItemRepository extends JpaRepository<TransactionLineItemDao, Integer> {

    List<TransactionLineItemDao> findAll();

    @Query(value = "SELECT t.transaction_com_id,\n" +
            "t.date,\n" +
            "t.status,\n" +
            "t.customer_first_last_name,\n" +
            "t.username,\n" +
            "l.product_id,\n" +
            "l.product_no,\n" +
            "l.cost,\n" +
            "l.retail_with_discount,\n" +
            "l.sale_quantity\n" +
            "FROM transaction t\n" +
            "INNER JOIN transaction_line_item l\n" +
            "ON t.transaction_com_id = l.transaction_com_id\n" +
            "WHERE l.product_no = ?1\n" +
            "AND t.date between ?2 and ?3\n" +
            "AND (t.status = 'Complete' || t.status = 'Return' || t.status = 'Pending')", nativeQuery = true)
    List<Object[]> getProductHistory(String productNo,String startDate, String endDate);

    @Modifying
    @Query("UPDATE TransactionLineItemDao l SET l.productNo = ?1 where l.productNo = ?2 and l.productId = ?3")
    void updateProductNo(String newProductNo, String oldProductNo, int productId);
}
