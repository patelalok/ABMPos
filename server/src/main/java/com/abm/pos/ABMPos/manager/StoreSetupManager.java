package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.StoreSetupDao;
import com.abm.pos.ABMPos.repository.StoreSetupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.SqlLobValue;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Types;
import java.util.List;

/**
 * Created by apatel2 on 9/26/17.
 */

@Component
public class StoreSetupManager {

    @Autowired
   private StoreSetupRepository storeSetupRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    public void addStoreSetupDetails(StoreSetupDao storeSetupDao) {

        storeSetupRepository.save(storeSetupDao);
    }

    public StoreSetupDao getStoreSetupDetails() {

        return storeSetupRepository.findOne(1);
    }

    public void insertStoreImage(MultipartFile file) throws IOException {
        LobHandler lobHandler = new DefaultLobHandler();

        //Here getting image as MultipartFile and then getting input stream of the file and then getting the size of the file.
        SqlLobValue lobValue = new SqlLobValue(file.getInputStream(), (int) file.getSize(), lobHandler);

        int a = jdbcTemplate.update("UPDATE store_setup SET logo = ? WHERE id = 1" ,new Object[]{lobValue}, new int[] {Types.BLOB} );
//                jdbcTemplate.update("INSERT INTO  product_image ('product_no', 'image') VALUE (?1,?2)" , lobValue, productNo);
        System.out.println(a);
    }

    }

