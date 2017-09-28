package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Component
public class CategoryManager {

    @Autowired
    private CategoryRepository categoryRepository;


    public void addCategory(CategoryDao categoryDao)
    {
        categoryRepository.save(categoryDao);
    }

    public void deleteCategory(String name) {
        categoryRepository.delete(name);
    }

    public List<CategoryDao> getCategory() {


        List<Object[]> categoryObject =  categoryRepository.getNoOfProducts();
        List<CategoryDao> categoryDaoList = new ArrayList<>();
        CategoryDao categoryDao = new CategoryDao();


        for(Object[] i:categoryObject)
        {
            categoryDao.setName(i[0].toString());
            categoryDao.setNoOfProducts(Integer.parseInt(i[2].toString()));

        }
        categoryDaoList.add(categoryDao);
        return categoryDaoList;
    }
}
