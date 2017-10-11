package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CloseRegisterDao;
import com.abm.pos.ABMPos.repository.CloseRegisterRepository;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CloseRegisterManager {

    @Autowired
    private CloseRegisterRepository closeRegisterRepository;

    @Autowired
    private Utility utility;

    public void addCloseRegisterDetails(CloseRegisterDao closeRegisterDao) {

        this.closeRegisterRepository.save(closeRegisterDao);
    }

    public CloseRegisterDao getCloseRegisterDetailsByDate(String date) {

        TimeIntervalDto timeIntervalDto;

        timeIntervalDto = utility.getDateByInputString(date);

        if (null != timeIntervalDto) {
            return closeRegisterRepository.getCloseRegisterDetailsByDate(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
        } else {
            return null;
        }
    }

}
