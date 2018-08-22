package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.SubCategoryDao;
import com.abm.pos.ABMPos.repository.CategoryRepository;
import com.abm.pos.ABMPos.repository.ProductRepository;
import com.abm.pos.ABMPos.repository.SubCategoryRepository;
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

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;


    public void addCategory(CategoryDao categoryDao)
    {
        categoryRepository.save(categoryDao);
    }

    public String deleteCategory(int categoryId) {

        boolean isDeletableCategory = true;
        String response = "";


        try
        {
            List<ProductDao> productDaoList = productRepository.findAllByCategoryId(String.valueOf(categoryId));
            if(null != productDaoList && productDaoList.size() > 0)
            {
                isDeletableCategory = false;
                System.out.println("Can Not Deleted Category!!!");
                response = "Can Not Delete Category, Please Delete All Products From This Category First";
            }

            if(isDeletableCategory){
                categoryRepository.delete(categoryId);
                System.out.println("Category Deleted Successfully!!!");
                response = "Category Delete Successfully";
            }
        }
        catch (Exception e){
            System.out.println("Opps Some Exception is coming!!!");
        }

        return response;
    }

    public List<CategoryDao> getCategoryForAddProductPage() {

        return categoryRepository.findAllByOrderByNameAsc();


//        List<Object[]> categoryObject =  categoryRepository.getNoOfProducts();
//
//        List<CategoryDao> categoryDaoList = new ArrayList<>();
//        CategoryDao categoryDao = new CategoryDao();


//        for(Object[] i:categoryObject)
//        {
//            for(int i = 0; i <= categoryObject.size(); i ++)
//            {
//                categoryDao.setCategoryId(Integer.parseInt(categoryDaoList[i].toString()));
//                categoryDao.setName(i[0].toString());
//                categoryDao.setNoOfProducts(Integer.parseInt(i[2].toString()));

//                System.out.println(categoryObject);
//            }
//
////        }
//        categoryDaoList.add(categoryDao);
//        return categoryDaoList;
    }

    public List<SubCategoryDao> getSubCategory(int categoryId) {

        return subCategoryRepository.findAllByCategoryId(categoryId);
    }
}
