package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.EmployeeDao;
import com.abm.pos.ABMPos.dao.StoreCreditDao;
import com.abm.pos.ABMPos.repository.CustomerRepository;
import com.abm.pos.ABMPos.repository.StoreCreditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 5/17/17.
 */

@Component
public class CustomerManager {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private StoreCreditRepository storeCreditRepository;


    public void addCustomer(CustomerDao customerDao) {

        customerRepository.save(customerDao);
    }

    public List<CustomerDao> getCustomer() {

        return customerRepository.findAll();
    }

    public void deleteCustomer(String phonoNo) {
        customerRepository.delete(phonoNo);
    }


    public void addCustomerStoreCredit(StoreCreditDao storeCreditDao) {

        storeCreditRepository.save(storeCreditDao);

        // After Adding store credit credit into store_credit table i need to add or update store credit for that particular customer

        CustomerDao customerDao = new CustomerDao();

        if(null != storeCreditDao)
        {
            customerDao = customerRepository.findByPhoneNo(storeCreditDao.getCustomerPhoneno());

            if(null != customerDao)
            {
                customerDao.setStoreCredit(customerDao.getStoreCredit() + storeCreditDao.getAmount());
                customerRepository.save(customerDao);
            }
        }





    }

    public List<StoreCreditDao> getCustomerStoreCreditHistory(String phoneNo) {

        return storeCreditRepository.findAllByCustomerPhoneno(phoneNo);
    }
}
