package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.BrandDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */
public interface BrandRepository extends JpaRepository<BrandDao, String>{

    //@Query("SELECT  b.name, b.description FROM BrandDao b join ProductDao p where p.brandName = b.name")
    List<BrandDao> findAll();
}
