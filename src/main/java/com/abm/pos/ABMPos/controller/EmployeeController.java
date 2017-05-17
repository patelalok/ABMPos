package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.EmployeeDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.manager.EmployeeManager;
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
public class EmployeeController {

    @Autowired
    EmployeeManager employeeManager;

    @RequestMapping(value = "/addEmployee", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addProduct(@RequestBody EmployeeDao employeeDao)
    {
        employeeManager.addEmployee(employeeDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getEmployee", method = RequestMethod.GET, produces = "application/json")
    public List<EmployeeDao> getEmployee()
    {
        return employeeManager.getEmployee();
    }

    @RequestMapping(value = "/deleteEmployee", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteEmployee(@RequestBody EmployeeDao employeeDao)
    {
        employeeManager.deleteEmployee(employeeDao);
        return new ResponseEntity(HttpStatus.OK);
    }
}
