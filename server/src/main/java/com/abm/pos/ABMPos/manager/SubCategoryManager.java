package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.SubCategoryDao;
import com.abm.pos.ABMPos.repository.ProductRepository;
import com.abm.pos.ABMPos.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SubCategoryManager {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addSubCategory(SubCategoryDao subCategoryDao) {
        subCategoryRepository.save(subCategoryDao);
    }

    public List<SubCategoryDao> getSubCategoryForAddProductPage() {
        return subCategoryRepository.findAll();
    }

    public List<SubCategoryDao> getSubCategoryByCategoryId(int categoryId) {

        if(categoryId > 0){
            return subCategoryRepository.findAllByCategoryId(categoryId);
        }
        else return subCategoryRepository.findAll();
    }

    public String deleteSubCategory(int subCategoryId) {
        boolean isDeletableCategory = true;
        String response = "";


        try
        {
            List<ProductDao> productDaoList = productRepository.findAllByCategoryId(String.valueOf(subCategoryId));
            if(null != productDaoList && productDaoList.size() > 0)
            {
                isDeletableCategory = false;
                System.out.println("Can Not Deleted Category!!!");
                response = "Can Not Delete Category, Please Delete All Products From This Category First";
            }

            if(isDeletableCategory){
                subCategoryRepository.delete(subCategoryId);
                System.out.println("SubCategory Deleted Successfully!!!");
                response = "SubCategory Delete Successfully";
            }
        }
        catch (Exception e){
            System.out.println("Opps Some Exception is coming!!!");
        }

        return response;
    }
}
