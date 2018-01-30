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

    TransactionDao findFirstByCustomerPhoneno(String phoneNo);

    @Query("SELECT t FROM TransactionDao t WHERE t.date BETWEEN ?1 AND ?2 ORDER BY t.date DESC")
    List<TransactionDao> getTransactionByDate(String startDate, String endDate);

//    @Query("SELECT SUM(subtotal), SUM(tax), SUM(totalDiscount)  FROM TransactionDao  WHERE (status = 'Complete' OR status = 'Return') AND (date BETWEEN ?1 AND ?2) ")
    @Query("SELECT SUM(subtotal - totalDiscount),SUM(tax),SUM(totalDiscount),(SELECT SUM(totalAmount) from TransactionDao WHERE status = 'Return' AND (date BETWEEN ?1 AND ?2 )) As totalReturn, SUM(tip)  FROM TransactionDao  WHERE (status = 'Complete' OR status = 'Return') AND (date BETWEEN ?1 AND ?2)")
    List<Object[]> getSumOfTransactionDetailsForCloseRegister(String startDate, String endDate);

    @Query(value = "SELECT monthname(t.date) AS NameOfMonth, " +
            "SUM(p.cash) cash, " +
            "SUM(p.credit) credit, " +
            "SUM(p.debit) debit, " +
            "SUM(p.check_amount) checkAmount, " +
            "SUM(t.tax) tax, " +
            "SUM(t.subtotal) subtotal, " +
            "SUM(t.total_discount) discount, " +
            "SUM(temp.profit) profit\n" +
            "FROM Transaction t " +
            "INNER JOIN transaction_payment p ON t.transaction_com_id = p.transaction_com_id " +
            "INNER JOIN (\n" +
            "               SELECT t.transaction_com_id, sum(l.retail - l.cost) profit\n" +
            "               FROM transaction_line_item l\n" +
            "               INNER JOIN Transaction t on t.transaction_com_id = l.transaction_com_id\n" +
            "               WHERE l.date BETWEEN ?1 AND ?2  AND (l.status = 'Complete' OR l.status = 'Return') GROUP BY t.transaction_com_id)\n" +
            "AS temp  ON temp.transaction_com_id = t.transaction_com_id\n" +
            "WHERE t.date BETWEEN ?1 AND ?2 AND (t.status = 'Complete' OR t.status = 'Return') \n" +
            "GROUP BY NameOfMonth ORDER BY field(NameOfMonth,'January','February','March','April','May','June','July','August','September','October','November','December')", nativeQuery = true)
    List<Object[]> getYearlySalesReport(String startDate, String endDate);


    @Query(value = "SELECT DATE(t.date) AS dates,\n" +
            "SUM(p.cash) cash,\n" +
            "SUM(p.credit) credit,\n" +
            "SUM(p.debit) debit,\n" +
            "SUM(p.check_amount) checkAmount,\n" +
            "SUM(t.tax) tax,\n" +
            "SUM(t.subtotal) subtotal,\n" +
            "SUM(t.total_discount) discount,\n" +
            "SUM(temp.profit) profit\n" +
            "FROM Transaction t " +
            "INNER JOIN transaction_payment p ON t.transaction_com_id = p.transaction_com_id\n" +
            "INNER JOIN (\n" +
            "            SELECT t.transaction_com_id, sum(l.retail - l.cost) profit\n" +
            "            FROM transaction_line_item l\n" +
            "            INNER JOIN Transaction t on t.transaction_com_id = l.transaction_com_id\n" +
            "            where l.date BETWEEN ?1 AND ?2  AND (l.status = 'Complete' OR l.status = 'Return') GROUP BY t.transaction_com_id)\n" +
            " AS temp  on temp.transaction_com_id = t.transaction_com_id\n" +
            " WHERE t.date BETWEEN ?1 AND ?2 " +
            " AND (t.status = 'Complete' OR t.status = 'Return') GROUP BY dates", nativeQuery = true)
    List<Object []> getMonthlySalesReport(String startDate, String endDate);


    @Query(value = "SELECT HOUR(t.date) AS hours, " +
            "SUM(p.cash) cash, " +
            "SUM(p.credit) credit, " +
            "SUM(p.debit) debit, " +
            "SUM(p.check_amount) checkAmount, " +
            "SUM(t.tax) tax, " +
            "SUM(t.subtotal) subtotal, " +
            "SUM(t.total_discount) discount, " +
            "SUM(temp.profit) profit\n" +
            "FROM Transaction t " +
            "INNER JOIN transaction_payment p ON t.transaction_com_id = p.transaction_com_id " +
            "INNER JOIN (\n" +
            "               SELECT t.transaction_com_id, sum(l.retail - l.cost) profit\n" +
            "               FROM transaction_line_item l\n" +
            "               INNER JOIN Transaction t on t.transaction_com_id = l.transaction_com_id\n" +
            "               WHERE l.date BETWEEN ?1 AND ?2  AND (l.status = 'Complete' OR l.status = 'Return') GROUP BY t.transaction_com_id)\n" +
            "AS temp  ON temp.transaction_com_id = t.transaction_com_id\n" +
            "WHERE t.date BETWEEN ?1 AND ?2 AND (t.status = 'Complete' OR t.status = 'Return') \n" +
            "GROUP BY hours ", nativeQuery = true)
    List<Object[]> getHourlySalesReport(String startDate, String endDate);


}
