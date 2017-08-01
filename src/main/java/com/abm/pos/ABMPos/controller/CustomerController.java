package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.EmployeeDao;
import com.abm.pos.ABMPos.manager.CustomerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by apatel2 on 5/17/17.
 */

@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class CustomerController {

    @Autowired
    private
    CustomerManager customerManager;

    @RequestMapping(value = "/addCustomer", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addCustomer(@RequestBody CustomerDao customerDao)
    {
        customerManager.addCustomer(customerDao);
        System.out.println("Customer Added or Updated Successfully!!");
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getCustomer", method = RequestMethod.GET, produces = "application/json")
    public List<CustomerDao> getCustomer()
    {
        return customerManager.getCustomer();
    }

    @RequestMapping(value = "/deleteCustomer", method = RequestMethod.DELETE)
    public ResponseEntity deleteCustomer(@RequestParam Long phoneNo)
    {
        customerManager.deleteCustomer(phoneNo);
        System.out.println("Customer Deleted Successfully!!");

        return new ResponseEntity(HttpStatus.OK);
    }
}
