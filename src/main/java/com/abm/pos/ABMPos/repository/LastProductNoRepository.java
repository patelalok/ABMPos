package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.LastProductNo;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 7/4/17.
 */

@Transactional
public interface LastProductNoRepository extends JpaRepository<LastProductNo, Long> {

    List<LastProductNo> findAll();
}
