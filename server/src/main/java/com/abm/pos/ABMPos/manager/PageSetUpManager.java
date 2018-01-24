package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.repository.CustomerRepository;
import com.abm.pos.ABMPos.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by asp5045 on 7/14/16.
 */

@Component
public class PageSetUpManager {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;




    public void addMultyCustomer(final List<CustomerDao> customerDao) {

           customerRepository.save(customerDao);
    }

    public void addProductToDB(final List<ProductDao> productDao) {
        productRepository.save(productDao);
    }

}




