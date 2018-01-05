package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ClockInDao;
import com.abm.pos.ABMPos.dao.EmployeeDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.manager.EmployeeManager;
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
public class EmployeeController {

    @Autowired
    EmployeeManager employeeManager;

    @RequestMapping(value = "/addEmployee", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addProduct(@RequestBody EmployeeDao employeeDao)
    {
        employeeManager.addEmployee(employeeDao);
        System.out.println("Employee Added Or Updated Successfully!!");

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getEmployee", method = RequestMethod.GET, produces = "application/json")
    public List<EmployeeDao> getEmployee()
    {
        return employeeManager.getEmployee();
    }

    @RequestMapping(value = "/validateEmployeeForClockIn", method = RequestMethod.GET, produces = "application/json")
    public EmployeeDao validateEmployeeForClockIn(String username, String password)
    {
        return employeeManager.validateEmployeeForClockIn(username, password);
    }

    @RequestMapping(value = "/deleteEmployee", method = RequestMethod.DELETE)
    public ResponseEntity deleteEmployee(@RequestParam int id)
    {
        employeeManager.deleteEmployee(id);
        System.out.println("Employee Deleted Successfully!!");
        return new ResponseEntity(HttpStatus.OK);
    }


    @RequestMapping(value = "/addClockIn", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addClockIn(@RequestBody ClockInDao clockInDao)
    {
        employeeManager.addClockIn(clockInDao);
        System.out.println("Employee Clock In Add Or Updated Successfully!!");

        return new ResponseEntity(HttpStatus.CREATED);
    }

    // I am using this one only for clock in, which helps to get clock in details for perticular date.
    @RequestMapping(value = "/getClockIn", method = RequestMethod.GET, produces = "application/json")
    public List<ClockInDao> getClockIn(@RequestParam String username,@RequestParam String startDate,@RequestParam String endDate ) {

        return employeeManager.getClockIn(username,startDate, endDate);

    }

    @RequestMapping(value = "/getAllClockIn", method = RequestMethod.GET, produces = "application/json")
    public List<ClockInDao> getAllClockIn(@RequestParam String username,@RequestParam String startDate,@RequestParam String endDate ) {

        return employeeManager.getAllClockIn(username,startDate, endDate);

    }
}
