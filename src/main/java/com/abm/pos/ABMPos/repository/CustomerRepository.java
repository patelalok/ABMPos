package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CustomerDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/17/17.
 */

@Transactional
public interface CustomerRepository extends JpaRepository<CustomerDao, String>{

    List<CustomerDao> findAll();

    CustomerDao findByPhoneNo(String phoneNo);

}
