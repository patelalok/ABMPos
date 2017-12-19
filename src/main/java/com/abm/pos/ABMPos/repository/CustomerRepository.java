package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CustomerDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/17/17.
 */

@Transactional
public interface CustomerRepository extends JpaRepository<CustomerDao, String>{

    List<CustomerDao> findAll();

    CustomerDao findOneByPhoneNo(String phoneNo);

    CustomerDao findByPhoneNo(String phoneNo);

    @Query(value = "SELECT distinct c.name,\n" +
            "SUM(l.quantity) quantity, \n" +
            "SUM(l.cost * l.quantity) cost, \n" +
            "SUM(l.retail * l.quantity) retail,\n" +
            "SUM(l.retail * l.quantity - l.cost * l.quantity) profit\n" +
            "from transaction t \n" +
            "Inner Join customer c on c.phone_no = t.customer_phoneno\n" +
            "inner join transaction_line_item l on l.transaction_com_id = t.transaction_com_id\n" +
            "WHERE l.date BETWEEN ?1 AND ?2\n" +
            "GROUP BY c.name", nativeQuery = true)
    List<Object[]> getSalesReportByCustomer(String startDate, String endDate);
}
