package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.TransactionDao;
import org.omg.CORBA.OBJ_ADAPTER;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Transactional
public interface TransactionRepository extends JpaRepository<TransactionDao, Integer> {

    List<TransactionDao> findAll();

    @Query("SELECT t FROM TransactionDao t WHERE t.date BETWEEN ?1 AND ?2 ORDER BY t.date DESC")
    List<TransactionDao> getTransactionByDate(String startDate, String endDate);

    @Query("SELECT SUM(totalAmount), SUM(tax), SUM(totalDiscount)  FROM TransactionDao  WHERE date BETWEEN ?1 AND ?2")
    List<Object[]> getSumOfTransactionDetailsForCloseRegister(String startDate, String endDate);


    @Query(value = "SELECT monthname(t.date) AS NameOfMonth, " +
            "SUM(p.cash) cash, " +
            "SUM(p.credit) credit, " +
            "SUM(p.debit) debit, " +
            "SUM(p.check_amount) checkAmount, " +
            "SUM(t.tax) tax, " +
            "SUM(t.subtotal) subtotal, " +
            "SUM(t.total_discount) discount, " +
            "SUM(l.retail - l.cost) profit " +
            "FROM Transaction t " +
            "INNER JOIN transaction_line_item l ON t.transaction_com_id = l.transaction_com_id " +
            "INNER JOIN transaction_payment p ON t.transaction_com_id = p.transaction_com_id " +
            "WHERE t.date BETWEEN ?1 AND ?2 " +
            "GROUP BY NameOfMonth ORDER BY field(NameOfMonth,'January','February','March','April','May','June','July','August','September','October','November','December')", nativeQuery = true)
    List<Object[]> getYearlySalesReport(String startDate, String endDate);


    @Query(value = "SELECT DATE(t.date) AS dates, " +
            "SUM(p.cash) cash, " +
            "SUM(p.credit) credit, " +
            "SUM(p.debit) debit, " +
            "SUM(p.check_amount) checkAmount, " +
            "SUM(t.tax) tax, " +
            "SUM(t.subtotal) subtotal, " +
            "SUM(t.total_discount) discount, " +
            "SUM(l.retail - l.cost) profit " +
            "FROM Transaction t " +
            "INNER JOIN transaction_line_item l ON t.transaction_com_id = l.transaction_com_id " +
            "INNER JOIN transaction_payment p ON t.transaction_com_id = p.transaction_com_id " +
            "WHERE t.date BETWEEN ?1 AND ?2 " +
            "GROUP BY dates ", nativeQuery = true)
    List<Object []> getMonthlySalesReport(String startDate, String endDate);


    @Query(value = "SELECT HOUR(t.date) AS hours, " +
            "SUM(p.cash) cash, " +
            "SUM(p.credit) credit, " +
            "SUM(p.debit) debit, " +
            "SUM(p.check_amount) checkAmount, " +
            "SUM(t.tax) tax, " +
            "SUM(t.subtotal) subtotal, " +
            "SUM(t.total_discount) discount, " +
            "SUM(l.retail - l.cost) profit " +
            "FROM Transaction t " +
            "INNER JOIN transaction_line_item l ON t.transaction_com_id = l.transaction_com_id " +
            "INNER JOIN transaction_payment p ON t.transaction_com_id = p.transaction_com_id " +
            "WHERE t.date BETWEEN ?1 AND ?2 " +
            "GROUP BY hours ", nativeQuery = true)
    List<Object[]> getHourlySalesReport(String startDate, String endDate);
}
