package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.util.SQLQuery;
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

    TransactionDao findOneByTransactionComId(int transactionCompId);

    TransactionDao findFirstByCustomerPhoneno(String phoneNo);

    List<TransactionDao> findAllByStatusEqualsAndCustomerPhoneno(String status, String phoneNo);

    List<TransactionDao> findAllByCustomerPhonenoAndStatusAndDateBetweenOrderByDateDesc(String phoneNo,String status, String startDate, String endDate);

    // I have hard coded this value to fix the, product of adding prevois invoices balance.
    @Query("SELECT SUM(t.transactionBalance) from TransactionDao t where t.customerPhoneno = ?1 AND t.status = 'Pending' ")
    List<Double> getCustomerBalanceByPendingInvoice(String phoneNo);

    @Query(value = "SELECT * FROM transaction t WHERE t.date BETWEEN ?1 AND ?2 ORDER BY t.date DESC", nativeQuery = true)
    List<Object[]> getTransactionByDate(String startDate, String endDate);

//    @Query("SELECT SUM(subtotal), SUM(tax), SUM(totalDiscount)  FROM TransactionDao  WHERE (status = 'Complete' OR status = 'Return') AND (date BETWEEN ?1 AND ?2) ")
    @Query("SELECT SUM(totalAmount),SUM(tax),SUM(totalDiscount),SUM(shipping),(SELECT SUM(totalAmount) from TransactionDao WHERE status = 'Return' AND (date BETWEEN ?1 AND ?2 )) As totalReturn FROM TransactionDao  WHERE (status = 'Complete' OR status = 'Return') AND (date BETWEEN ?1 AND ?2)")
    List<Object[]> getSumOfTransactionDetailsForCloseRegister(String startDate, String endDate);

    @Query("SELECT COALESCE(SUM(transactionBalance), 0),COALESCE(SUM(totalAmount),0),(SELECT COALESCE(SUM(totalAmount),0) from TransactionDao WHERE status = 'Return' AND (date BETWEEN ?1 AND ?2 ) AND customerPhoneno = ?3 ) As totalReturn FROM TransactionDao  WHERE (status = 'Complete' OR status = 'Return' OR status = 'Pending') AND (date BETWEEN ?1 AND ?2) AND customerPhoneno = ?3")
    List<Object[]> getCustomerFinancialDetails(String startDate, String endDate, String phoneNo);


    // Old Query to get sales history
//    @Query(value = "SELECT monthname(t.date) AS NameOfMonth,\n" +
//            "            SUM(payment.cash) cash,\n" +
//            "            SUM(payment.credit) credit,\n" +
//            "            SUM(payment.debit) debit,\n" +
//            "            SUM(payment.check_amount) checkAmount,\n" +
//            "            SUM(payment.store_credit) store_credit,\n" +
//            "            SUM(t.tax) tax,\n" +
//            "            SUM(t.total_amount) totalAmount,\n" +
//            "            SUM(CASE WHEN t.status = 'Pending' THEN t.transaction_balance ELSE 0 end) dueBalance,\n" +
//            "            SUM(t.total_discount) discount,\n" +
//            "            SUM(temp.profit) profit\n" +
//            "            FROM transaction t\n" +
//            "\n" +
//            "            INNER JOIN (SELECT t.transaction_com_id, sum(p.cash) cash,SUM(p.credit) credit,SUM(p.debit) debit,SUM(p.check_amount) check_Amount, SUM(p.store_credit) store_credit\n" +
//            "            from transaction_payment p INNER JOIN transaction t ON t.transaction_com_id = p.transaction_com_id\n" +
//            "            WHERE p.date BETWEEN ?1 AND ?2\n" +
//            "            AND (p.status = 'Complete' OR p.status = 'Return' OR p.status = 'Pending') GROUP BY t.transaction_com_id ) AS payment on\n" +
//            "            payment.transaction_com_id = t.transaction_com_id\n" +
//            "            \n" +
//            "            INNER JOIN (SELECT t.transaction_com_id, SUM((l.retail_with_discount * l.sale_quantity) - (l.cost * l.sale_quantity)) profit\n" +
//            "            FROM transaction_line_item l\n" +
//            "            INNER JOIN transaction t on t.transaction_com_id = l.transaction_com_id\n" +
//            "            WHERE l.date BETWEEN ?1 AND ?2\n" +
//            "            AND (l.status = 'Complete' OR l.status = 'Return' OR l.status = 'Pending') GROUP BY t.transaction_com_id)\n" +
//            "            AS temp  ON temp.transaction_com_id = t.transaction_com_id\n" +
//            "            WHERE t.date BETWEEN ?1 AND ?2\n" +
//            "            AND (t.status = 'Complete' OR t.status = 'Return' OR t.status = 'Pending')\n" +
//            "            GROUP BY NameOfMonth ORDER BY field(NameOfMonth,'January','February','March','April','May','June','July','August','September','October','November','December')", nativeQuery = true)
//    List<Object[]> getYearlySalesReport(String startDate, String endDate);


    @Query(value = "select temp.NameOfMonth, max(cash) cash, max(credit) credit, max(check_amount) check_amount, max(store_credit) store_credit from \n" +
            "(select monthname(date) AS NameOfMonth,  \n" +
            "if(type = 'CASH', sum(amount),0) as cash, \n" +
            "if(type = 'CREDIT', sum(amount),0) as credit,\n" +
            "if(type = 'CHECK', sum(amount),0) as check_amount,\n" +
            "if(type = 'STORE CREDIT', sum(amount),0) as store_credit \n" +
            "from transaction_payment \n" +
            "where date between ?1 and ?2\n" +
            "group by NameOfMonth,type) temp \n" +
            "group by temp.NameOfMonth\n" +
            "ORDER BY field(NameOfMonth,'January','February','March','April','May','June','July','August','September','October','November','December')", nativeQuery = true)
    List<Object[]> getYearlySalesReport(String startDate, String endDate);
    
    @Query(value = "select temp.dates, max(cash) cash, max(credit) credit, max(check_amount) check_amount, max(store_credit) store_credit from \n" +
            "(select date(date) AS dates,  \n" +
            "if(type = 'CASH', sum(amount),0) as cash, \n" +
            "if(type = 'CREDIT', sum(amount),0) as credit,\n" +
            "if(type = 'CHECK', sum(amount),0) as check_amount,\n" +
            "if(type = 'STORE CREDIT', sum(amount),0) as store_credit \n" +
            "from transaction_payment \n" +
            "where date between ?1 and ?2 \n" +
            "group by dates,type) temp \n" +
            "group by temp.dates",nativeQuery = true)
    List<Object []> getMonthlySalesReport(String startDate, String endDate);

    @Query(value = "select temp.dates, max(cash) cash, max(credit) credit, max(check_amount) check_amount, max(store_credit) store_credit from \n" +
            "(select date(date) AS dates,  \n" +
            "if(type = 'CASH', sum(amount),0) as cash, \n" +
            "if(type = 'CREDIT', sum(amount),0) as credit,\n" +
            "if(type = 'CHECK', sum(amount),0) as check_amount,\n" +
            "if(type = 'STORE CREDIT', sum(amount),0) as store_credit \n" +
            "from transaction_payment \n" +
            "where date between ?1 and ?2 \n" +
            "group by dates,type) temp \n" +
            "group by temp.dates",nativeQuery = true)
    List<Object []> getWeeklySalesReport(String startDate, String endDate);


    @Query(value = "select temp.hours, max(cash) cash, max(credit) credit, max(check_amount) check_amount, max(store_credit) store_credit from \n" +
            "(select HOUR(date) AS hours,  \n" +
            "if(type = 'CASH', sum(amount),0) as cash, \n" +
            "if(type = 'CREDIT', sum(amount),0) as credit,\n" +
            "if(type = 'CHECK', sum(amount),0) as check_amount,\n" +
            "if(type = 'STORE CREDIT', sum(amount),0) as store_credit \n" +
            "from transaction_payment \n" +
            "where date between ?1 and ?2 \n" +
            "group by hours,type) temp \n" +
            "group by temp.hours", nativeQuery = true)
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

    @Query(value = "select c.company_name, t.customer_phoneno, sum(t.transaction_balance)\n" +
            "from transaction t inner join customer c on t.customer_phoneno = c.phone_no\n" +
            "where status = 'Pending' and date between ?1 and ?2\n" +
            "group by customer_phoneno, c.company_name;", nativeQuery = true)
    List<Object[]> getCustomerDetailsForPendingInvoice(String startDate, String endDate);

    List<TransactionDao> findAllByCustomerPhonenoAndStatusAndDateBetweenOrderByDateAsc(String phoneNo, String status, String startDate, String endDate);

    @Query(value = "SELECT t.transaction_com_id as a, t.date as b, p.date as c, t.total_amount as d, t.transaction_balance as e FROM transaction t\n" +
            "LEFT JOIN transaction_payment p \n" +
            "ON p.transaction_com_id = t.transaction_com_id\n" +
            "WHERE t.date BETWEEN '2018-01-15 09:28:06' AND '2018-12-15 09:28:06' AND t.customer_phoneno = 7707030801;", nativeQuery = true)
    List<Object[]> getCustomerStatement();
//
//    @Query("")
//    List<Object[]> getPaymentSummaryReport(String startDate, String endDate);

//    @Query(value = "SELECT t.transaction_com_id,t.date, t.total_amount,t.transaction_balance\n" +
//            "FROM transaction t \n" +
//            "INNER JOIN customer c ON c.phone_no = t.customer_phoneno\n" +
//            "WHERE status = 'Pending' \n" +
//            "AND t.customer_phoneno = ?3 \n" +
//            "AND date BETWEEN ?1 AND ?2 ", nativeQuery = true)
//    List<Object[]> getOpenInvoiceByCustomer(String startDate, String endDate, String phoneNo);
}
