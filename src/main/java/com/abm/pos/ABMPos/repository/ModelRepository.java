package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ModelDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface ModelRepository extends JpaRepository<ModelDao, String> {

    List<ModelDao> findAll();
}
