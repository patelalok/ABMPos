package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.BrandDao;
import com.abm.pos.ABMPos.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */
@Component
public class BrandManager {

    @Autowired
    private BrandRepository brandRepository;


    public void addBrand(BrandDao brandDao) {
        brandRepository.save(brandDao);
    }

    public void deleteBrand(int brandId) {
        brandRepository.delete(brandId);
    }

    public List<BrandDao> getBrand() {
        return brandRepository.findAll();
    }
}
