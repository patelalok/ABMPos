package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.Phone;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.repository.PhoneRepository;
import com.abm.pos.ABMPos.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class PhoneManager {

    @Autowired
    private PhoneRepository phoneRepository;

    @Autowired
    private ProductRepository productRepository;

    public Phone addPhone(Phone phone) {
        return phoneRepository.save(phone);
    }

    public List<ProductDao> getPhones() {

        return productRepository.findAllByCategoryIdAndActive("10", true);
    }

    public List<Phone> getImeiByPhone(String productNo) {

        return phoneRepository.findAllByProductNoAndSold(productNo, false);
    }
}
