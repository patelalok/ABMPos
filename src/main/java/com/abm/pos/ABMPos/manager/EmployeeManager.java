package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.EmployeeDao;
import com.abm.pos.ABMPos.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 5/17/17.
 */

@Component
public class EmployeeManager {

    @Autowired
    private EmployeeRepository employeeRepository;


    public void addEmployee(EmployeeDao employeeDao) {

        employeeRepository.save(employeeDao);
    }

    public List<EmployeeDao> getEmployee() {

        return employeeRepository.findAll();
    }

    public void deleteEmployee(EmployeeDao employeeDao) {

        employeeRepository.delete(employeeDao);
    }


}
