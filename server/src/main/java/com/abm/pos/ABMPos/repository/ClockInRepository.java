package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ClockInDao;
import com.abm.pos.ABMPos.dao.EmployeeDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by apatel2 on 8/1/17.
 */
public interface ClockInRepository extends JpaRepository<ClockInDao, Integer> {

    List<ClockInDao> findAll();

    @Query("SELECT c FROM ClockInDao c WHERE c.clockIn BETWEEN ?2 AND ?3 AND username = ?1")
    List<ClockInDao> findByUsernameAndClockIn(String username, String startDate, String endDate);

    @Query("SELECT c FROM ClockInDao c WHERE c.clockIn BETWEEN ?2 AND ?3 AND username = ?1")
    List<ClockInDao> findAllByUsernameAndClockIn(String username, String startDate, String endDate);

}
