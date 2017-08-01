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

    //@Query("select c.name, count(p.category_name) as no_of_products from CategoryDao c inner join c. p on p.categoryName = c.name group by c.name")
    List<CategoryDao> findAll();

}
