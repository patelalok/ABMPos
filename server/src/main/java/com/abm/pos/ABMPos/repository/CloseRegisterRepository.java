package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CloseRegisterDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface CloseRegisterRepository extends JpaRepository<CloseRegisterDao, Integer> {

    List<CloseRegisterDao> findAll();

    @Query("SELECT SUM(c.closeCash), SUM(c.closeCredit), SUM(c.closeDebit), SUM(c.closeCheck) FROM CloseRegisterDao c where c.date BETWEEN ?1 AND ?2")
    List<Object[]> getCloseRegisterDetailsByDate(String startDate, String endDate);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM CloseRegisterDao c WHERE c.date BETWEEN ?1 AND ?2")
    void deleteClosingDetailsForDate(String startDate, String endDate);
}
