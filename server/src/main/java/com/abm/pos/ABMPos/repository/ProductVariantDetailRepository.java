package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductVariantDetailDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface ProductVariantDetailRepository extends JpaRepository<ProductVariantDetailDao, Integer> {

    @Query("SELECT DISTINCT v.name FROM ProductVariantDetailDao v")
    List<ProductVariantDetailDao> findAll();

//    @Query("SELECT v FROM ProductVariantDetailDao v WHERE v.name = ?1")
    List<ProductVariantDetailDao> findDistinctByName(String name);

}
