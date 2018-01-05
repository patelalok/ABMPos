package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ClockInDao;
import com.abm.pos.ABMPos.dao.EmployeeDao;
import com.abm.pos.ABMPos.repository.ClockInRepository;
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

    @Autowired
    private ClockInRepository clockInRepository;


    public void addEmployee(EmployeeDao employeeDao) {

        employeeRepository.save(employeeDao);
    }

    public List<EmployeeDao> getEmployee() {

        return employeeRepository.findAll();
    }

    public void deleteEmployee(int id) {

        employeeRepository.delete(id);
    }

//All Methods to handle clock in

    public void addClockIn(ClockInDao clockInDao) {

        clockInRepository.save(clockInDao);
    }

    public List<ClockInDao> getClockIn(String username, String startDate, String endDate) {

        return clockInRepository.findAllByUsernameAndClockIn(username, startDate, endDate);
    }


    public EmployeeDao validateEmployeeForClockIn(String username, String password) {

        EmployeeDao employeeDao = employeeRepository.findOneByUsername(username);

        if(null != employeeDao && employeeDao.getPassword().equals(password) && username.equalsIgnoreCase(employeeDao.getUsername()))
        {
            employeeDao.setPassword("*********");
            return employeeDao;
        }
        else
        {
            return null;
        }

    }

    public List<ClockInDao> getAllClockIn(String username, String startDate, String endDate) {

        return clockInRepository.findByUsernameAndClockIn(username, startDate, endDate);
    }
}
