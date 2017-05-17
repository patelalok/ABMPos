package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.VendorDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface VendorRepository extends JpaRepository<VendorDao, String>{

    List<VendorDao> findAll();
}
