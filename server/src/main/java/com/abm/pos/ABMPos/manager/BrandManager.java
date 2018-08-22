package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.BrandDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.repository.BrandRepository;
import com.abm.pos.ABMPos.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */
@Component
public class BrandManager {

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ProductRepository productRepository;


    public void addBrand(BrandDao brandDao) {
        brandRepository.save(brandDao);
    }

    public String deleteBrand(int brandId) {
        boolean isDeletableBrand = true;
        String response = "";


        try
        {
            List<ProductDao> productDaoList = productRepository.findAllByBrandId(String.valueOf(brandId));
            if(null != productDaoList && productDaoList.size() > 0)
            {
                isDeletableBrand = false;
                System.out.println("Can Not Delete Brand!!!");
                response = "Can Not Delete Brand, Please Delete All Products From This Brand First";
            }

            if(isDeletableBrand){
                brandRepository.delete(brandId);
                System.out.println("Brand Deleted Successfully!!!");
                response = "Brand Delete Successfully";
            }
        }
        catch (Exception e){
            System.out.println("Opps Some Exception is coming!!!");
        }

        return response;
    }

    public List<BrandDao> getBrand() {
        return brandRepository.findAllByOrderByNameAsc();
    }

    @Scheduled(fixedDelay = 50000)
    public void keepConnectionGoingWithDB()
    {
        BrandDao b = brandRepository.findOne(1);
        System.out.println("Connection is going on buddy for brand!!!" + b.getName());
    }
}
