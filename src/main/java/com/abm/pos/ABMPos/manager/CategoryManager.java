package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

        return categoryRepository.findAll();
    }
}
