package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CloseRegisterDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CloseRegisterRepository extends JpaRepository<CloseRegisterDao, Integer> {

    List<CloseRegisterDao> findAll();

    @Query("SELECT c FROM CloseRegisterDao c where c.date BETWEEN ?1 AND ?2")
    CloseRegisterDao getCloseRegisterDetailsByDate(String startDate, String endDate);
}
