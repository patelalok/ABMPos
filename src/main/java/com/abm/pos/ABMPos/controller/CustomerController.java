package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.EmployeeDao;
import com.abm.pos.ABMPos.manager.CustomerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by apatel2 on 5/17/17.
 */

@RestController
@RequestMapping("*")
public class CustomerController {

    @Autowired
    private
    CustomerManager customerManager;

    @RequestMapping(value = "/addCustomer", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addCustomer(@RequestBody CustomerDao customerDao)
    {
        customerManager.addCustomer(customerDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getCustomer", method = RequestMethod.GET, produces = "application/json")
    public List<CustomerDao> getCustomer()
    {
        return customerManager.getCustomer();
    }

    @RequestMapping(value = "/deleteCustomer", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteCustomer(@RequestBody CustomerDao customerDao)
    {
        customerManager.deleteCustomer(customerDao);
        return new ResponseEntity(HttpStatus.OK);
    }
}
