package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.TransactionDao;
import org.omg.CORBA.OBJ_ADAPTER;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */

@Transactional
public interface TransactionRepository extends JpaRepository<TransactionDao, Integer> {

    List<TransactionDao> findAll();

    List<TransactionDao> findAllByOrderByTransactionComIdAsc();

    TransactionDao findFirstByCustomerPhoneno(String phoneNo);

    List<TransactionDao> findAllByStatusEqualsAndCustomerPhoneno(String status, String phoneNo);

    List<TransactionDao> findAllByCustomerPhonenoAndDateBetweenOrderByDateDesc(String phoneNo, String startDate, String endDate);

    // I have hard coded this value to fix the, product of adding prevois invoices balance.
    @Query("SELECT SUM(t.transactionBalance) from TransactionDao t where t.customerPhoneno = ?1 AND t.status = 'Pending' ")
    List<Double> getCustomerBalanceByPendingInvoice(String phoneNo);

    @Query(value = "SELECT * FROM transaction t WHERE t.date BETWEEN ?1 AND ?2 ORDER BY t.date DESC", nativeQuery = true)
    List<Object[]> getTransactionByDate(String startDate, String endDate);

//    @Query("SELECT SUM(subtotal), SUM(tax), SUM(totalDiscount)  FROM TransactionDao  WHERE (status = 'Complete' OR status = 'Return') AND (date BETWEEN ?1 AND ?2) ")
    @Query("SELECT SUM(totalAmount),SUM(tax),SUM(totalDiscount),(SELECT SUM(totalAmount) from TransactionDao WHERE status = 'Return' AND (date BETWEEN ?1 AND ?2 )) As totalReturn FROM TransactionDao  WHERE (status = 'Complete' OR status = 'Return') AND (date BETWEEN ?1 AND ?2)")
    List<Object[]> getSumOfTransactionDetailsForCloseRegister(String startDate, String endDate);

    @Query(value = "SELECT monthname(t.date) AS NameOfMonth,\n" +
            "            SUM(payment.cash) cash,\n" +
            "            SUM(payment.credit) credit,\n" +
            "            SUM(payment.debit) debit,\n" +
            "            SUM(payment.check_amount) checkAmount,\n" +
            "            SUM(payment.store_credit) store_credit,\n" +
            "            SUM(t.tax) tax,\n" +
            "            SUM(t.total_amount) totalAmount,\n" +
            "            SUM(CASE WHEN t.status = 'Pending' THEN t.transaction_balance ELSE 0 end) dueBalance,\n" +
            "            SUM(t.total_discount) discount,\n" +
            "            SUM(temp.profit) profit\n" +
            "            FROM transaction t\n" +
            "\n" +
            "            INNER JOIN (SELECT t.transaction_com_id, sum(p.cash) cash,SUM(p.credit) credit,SUM(p.debit) debit,SUM(p.check_amount) check_Amount, SUM(p.store_credit) store_credit\n" +
            "            from transaction_payment p INNER JOIN transaction t ON t.transaction_com_id = p.transaction_com_id\n" +
            "            WHERE p.date BETWEEN ?1 AND ?2\n" +
            "            AND (p.status = 'Complete' OR p.status = 'Return' OR p.status = 'Pending') GROUP BY t.transaction_com_id ) AS payment on\n" +
            "            payment.transaction_com_id = t.transaction_com_id\n" +
            "            \n" +
            "            INNER JOIN (SELECT t.transaction_com_id, SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "            FROM transaction_line_item l\n" +
            "            INNER JOIN transaction t on t.transaction_com_id = l.transaction_com_id\n" +
            "            WHERE l.date BETWEEN ?1 AND ?2\n" +
            "            AND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending') GROUP BY t.transaction_com_id)\n" +
            "            AS temp  ON temp.transaction_com_id = t.transaction_com_id\n" +
            "            WHERE t.date BETWEEN ?1 AND ?2\n" +
            "            AND (t.status = 'Complete' OR t.status = 'Return' OR t.status = 'Pending')\n" +
            "            GROUP BY NameOfMonth ORDER BY field(NameOfMonth,'January','February','March','April','May','June','July','August','September','October','November','December')", nativeQuery = true)
    List<Object[]> getYearlySalesReport(String startDate, String endDate);
    
    @Query(value = "SELECT DATE(t.date) AS dates,\n" +
            "SUM(payment.cash) cash,\n" +
            "SUM(payment.credit) credit,\n" +
            "SUM(payment.debit) debit,\n" +
            "SUM(payment.check_amount) checkAmount," +
            "SUM(payment.store_credit) store_credit,\n" +
            "SUM(t.tax) tax,\n" +
            "SUM(t.total_amount) totalAmount,\n" +
            "SUM(CASE WHEN t.status = 'Pending' THEN t.transaction_balance ELSE 0 end) dueBalance,\n" +
            "SUM(t.total_discount) discount,\n" +
            "SUM(temp.profit) profit\n" +
            "FROM transaction t\n" +
            "            \n" +
            "\tINNER JOIN (SELECT t.transaction_com_id, sum(p.cash) cash,SUM(p.credit) credit,SUM(p.debit) debit,SUM(p.check_amount) check_Amount,SUM(p.store_credit) store_credit\n\n" +
            "\tfrom transaction_payment p INNER JOIN transaction t ON t.transaction_com_id = p.transaction_com_id\n" +
            "\tWHERE p.date BETWEEN ?1 AND ?2\n" +
            "\n" +
            "\tAND (p.status = 'Complete' OR p.status = 'Return' OR p.status = 'Pending') GROUP BY t.transaction_com_id ) AS payment on \n" +
            "\tpayment.transaction_com_id = t.transaction_com_id\n" +
            "            \n" +
            "\tINNER JOIN (SELECT t.transaction_com_id, SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "\tFROM transaction_line_item l\n" +
            "\tINNER JOIN transaction t on t.transaction_com_id = l.transaction_com_id\n" +
            "\tWHERE l.date BETWEEN ?1 AND ?2\n" +
            "\n" +
            "\tAND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending') GROUP BY t.transaction_com_id)\n" +
            "\tAS temp  ON temp.transaction_com_id = t.transaction_com_id\n" +
            "             \n" +
            "WHERE t.date BETWEEN ?1 AND ?2\n" +
            "\n" +
            "AND (t.status = 'Complete' OR t.status = 'Return' OR t.status = 'Pending')\n" +
            "GROUP BY dates", nativeQuery = true)
    List<Object []> getMonthlySalesReport(String startDate, String endDate);


    @Query(value = "SELECT HOUR(t.date) AS hours,\n" +
            "SUM(payment.cash) cash,\n" +
            "SUM(payment.credit) credit,\n" +
            "SUM(payment.debit) debit,\n" +
            "SUM(payment.check_amount) checkAmount," +
            "SUM(payment.store_credit) store_credit,\n" +
            "SUM(t.tax) tax,\n" +
            "SUM(t.total_amount) totalAmount, \n" +
            "SUM(CASE WHEN t.status = 'Pending' THEN t.transaction_balance ELSE 0 end) dueBalance,\n" +
            "SUM(t.total_discount) discount,\n" +
            "SUM(temp.profit) profit\n" +
            "FROM transaction t\n" +
            "            \n" +
            "\tINNER JOIN (SELECT t.transaction_com_id, sum(p.cash) cash,SUM(p.credit) credit,SUM(p.debit) debit,SUM(p.check_amount) check_Amount,SUM(p.store_credit) store_credit \n" +
            "\tfrom transaction_payment p INNER JOIN transaction t ON t.transaction_com_id = p.transaction_com_id\n" +
            "\tWHERE p.date BETWEEN ?1 AND ?2\n" +
            "\n" +
            "\tAND (p.status = 'Complete' OR p.status = 'Return' OR p.status = 'Pending') GROUP BY t.transaction_com_id ) AS payment on \n" +
            "\tpayment.transaction_com_id = t.transaction_com_id\n" +
            "            \n" +
            "\tINNER JOIN (SELECT t.transaction_com_id, SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
            "\tFROM transaction_line_item l\n" +
            "\tINNER JOIN transaction t on t.transaction_com_id = l.transaction_com_id\n" +
            "\tWHERE l.date BETWEEN ?1 AND ?2\n" +
            "\n" +
            "\tAND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending') GROUP BY t.transaction_com_id)\n" +
            "\tAS temp  ON temp.transaction_com_id = t.transaction_com_id\n" +
            "             \n" +
            "WHERE t.date BETWEEN ?1 AND ?2\n" +
            "\n" +
            "AND (t.status = 'Complete' OR t.status = 'Return' OR t.status = 'Pending')\n" +
            "GROUP BY hours", nativeQuery = true)
    List<Object[]> getHourlySalesReport(String startDate, String endDate);

    @Query("SELECT SUM(transactionBalance) from TransactionDao WHERE status = 'Pending' AND date BETWEEN ?1 AND ?2 ")
    List<Double> getTransactionDueAmount(String startDate, String endDate);

    @Query("SELECT SUM(transactionBalance) from TransactionDao WHERE status = 'Pending' AND customerPhoneno = ?1 ")
    List<Double> getTransactionDueAmountByCustomer(String phoneNo);

    @Query(value = "SELECT monthname(t.date) AS NameOfMonth,SUM(t.transaction_balance) totalBalance\n" +
            "from transaction t\n" +
            "WHERE t.date BETWEEN ?1 AND ?2 AND t.status = 'Pending'\n" +
            "group by NameOfMonth", nativeQuery = true)
    List<Object[]> getYearlySalesReportForDueBalance(String startDate, String endDate);

    @Modifying
    @Query(value = "update transaction set transaction_com_id = ?1 where transaction_com_id = ?2", nativeQuery = true)
    void updateTransactionId(int newId, int oldId);
}
