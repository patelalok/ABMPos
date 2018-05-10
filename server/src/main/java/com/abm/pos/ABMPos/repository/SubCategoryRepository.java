package com.abm.pos.ABMPos.repository;


import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.dao.SubCategoryDao;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface SubCategoryRepository extends JpaRepository<SubCategoryDao, Integer> {

    List<SubCategoryDao> findAllByCategoryId(int categoryId);

}
