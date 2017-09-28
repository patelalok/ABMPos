package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.StoreSetupDao;
import com.abm.pos.ABMPos.repository.StoreSetupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 9/26/17.
 */

@Component
public class StoreSetupManager {

    @Autowired
   private StoreSetupRepository storeSetupRepository;


    public void addStoreSetupDetails(StoreSetupDao storeSetupDao) {

        storeSetupRepository.save(storeSetupDao);
    }

    public List<StoreSetupDao> getStoreSetupDetails() {

        return storeSetupRepository.findAll();
    }

}
