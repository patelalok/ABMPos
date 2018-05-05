package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.VendorDao;
import com.abm.pos.ABMPos.repository.ProductRepository;
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

    @Autowired
    private ProductRepository productRepository;


    public void addVendor(VendorDao vendorDao) {

        vendorRepository.save(vendorDao);
    }

    public String deleteVendor(int vendorId) {

        boolean isDeletableModel = true;
        String response = "";
        try
        {
            List<ProductDao> productDaoList = productRepository.findAllByVendorId(String.valueOf(vendorId));
            if(null != productDaoList && productDaoList.size() > 0)
            {
                isDeletableModel = false;
                System.out.println("Can Not Delete Vendor!!!");
                response = "Can Not Delete Vendor, Please Delete All Products From This Vendor First";
            }

            if(isDeletableModel){
                vendorRepository.delete(vendorId);
                System.out.println("Vendor Deleted Successfully!!!");
                response = "Vendor Delete Successfully";
            }
        }
        catch (Exception e){
            System.out.println("Opps Some Exception is coming!!!");
        }

        return response;
    }

    public List<VendorDao> getVendor() {

        return vendorRepository.findAll();
    }

    public VendorDao getVendorById(int vendorId) {

        return vendorRepository.findOne(vendorId);
    }
}
