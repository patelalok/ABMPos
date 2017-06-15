package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.VendorDao;
import com.abm.pos.ABMPos.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Component
public class VendorManager {

    @Autowired
    private VendorRepository vendorRepository;


    public void addVendor(VendorDao vendorDao) {

        vendorRepository.save(vendorDao);
    }

    public void deleteVendor(String name) {

        vendorRepository.delete(name);
    }

    public List<VendorDao> getVendor() {

        return vendorRepository.findAll();
    }

    public VendorDao getVendorById(String name) {

        return vendorRepository.findOne(name);
    }
}
