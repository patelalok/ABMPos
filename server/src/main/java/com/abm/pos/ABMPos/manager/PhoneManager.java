package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.Phone;
import com.abm.pos.ABMPos.repository.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PhoneManager {

    @Autowired
    private PhoneRepository phoneRepository;

    public Phone addPhone(Phone phone) {
        return phoneRepository.save(phone);
    }
}
