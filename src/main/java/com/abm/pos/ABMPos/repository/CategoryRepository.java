package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CategoryDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface CategoryRepository extends JpaRepository<CategoryDao, String>{

    @Query("select c.name, c.description, count(p.categoryName) as noOfProducts from CategoryDao c join c.productDaoSet p group by c.name,c.description")
    List<Object[]> getNoOfProducts();

    List<CategoryDao> findAll();

}
